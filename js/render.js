
import { estComplet, inscrireEnAttente, placesLibres, prixSiege, retirerDeAttente, voirListeAttenet } from "./reservations.js";
import { sauvegarder } from "./store.js";
import { validationForm } from "./validators.js";

export function affichageTrajet(trips) {
    const contaiaier = document.getElementById('tripsContainer');

    trips.forEach(function (trip) {


        const card = document.createElement('div');
        card.className = 'trajet bg-blue-50 rounded-2xl p-2 m-1 shadow-xl hover:shadow-blue-400'
        card.innerHTML = `
                <div class=" flex justify-between">
                    <p class=" border-0 rounded-2xl px-2 bg-blue-100 text-blue-500">Trajet ${trip.id}</p>
                    <p class="statusTrajet border-0 rounded-2xl px-2 bg-red-200" >Disponible</p>
                </div>
                <h2 class="direction text-xl font-bold text-blue-950">${trip.departure} → ${trip.destination}</h2>
                <p class="text-blue-400 ">${trip.departureTime} - ${trip.arrivalTime}</p>

                <div class="infoCard bg-blue-100 rounded-2xl p-4 ">
                    <div class=" flex justify-between">
                        <p class="text-blue-950">Prix base:</p>
                        <p class=" text-blue-950 m">${trip.price}dh</p>
                    </div> 
                    <div class="place flex justify-between">
                        <p class=" text-blue-950">Places libres:</p>
                        <p class="SeateCabinelibre text-blue-950">${placesLibres(trip)}</p>
                    </div>
                    <div class="attente flex justify-between">
                        <p class=" text-blue-950">Liste d'attente:</p>
                        <p class=" text-blue-950">${trip.waitingList.length}</p>
                    </div>
                    <div class="flex justify-between">
                        <p class="text-blue-950">Recette:</p>
                        <p class="Recette text-blue-950 ">${trip.reservations.reduce(function (total, reservation) {
            return total + prixSiege(trip.price, reservation.seat)
        }, 0)}</p>
                    </div>
                </div>
                <a href="./cabine.html?id=${Number(trip.id)}" ><button class=" bg-blue-600 rounded-xl py-1.5 px-4 hover:bg-blue-700 font-bold flex justify-self-center justify-center w-full m-2 cursor-pointer hover:scale-105">Gérer la cabine</button></a>
        `
        contaiaier.appendChild(card)

        //status complet & disponible

        const status = card.querySelector('.statusTrajet')

        if (estComplet(trip)) {
            status.textContent = "Complet"
            status.style.backgroundColor = '#ff4d4d'
        }
        else {
            status.textContent = "Disponible"
            status.style.backgroundColor = '#5CCB5F'
        }

    });
}

export function statistiqueTrajet() {
    const trajets = document.querySelectorAll('.trajet')
    let totolRocetTrajets = 0;
    let SeateCabinelibre = 0
    trajets.forEach(function (trajet) {
        const recet = trajet.querySelector('.Recette').textContent
        totolRocetTrajets += parseInt(recet)

        const SeateCabinelibres = trajet.querySelector('.SeateCabinelibre').textContent
        SeateCabinelibre += parseInt(SeateCabinelibres);
    })

    //recette Reseau
    const resetTotal = document.getElementById('resetTotal');
    resetTotal.textContent = totolRocetTrajets + " DH"
    //number de passagers
    const TOTALPASSAGERS = document.getElementById('TOTALPASSAGERS')
    TOTALPASSAGERS.textContent = 400 - SeateCabinelibre;
}



//partie recherchwe et filter


export function rechercherEndFiltrer() {

    const cabine_serch = document.getElementById('cabine_serch');
    const filtrer = document.getElementById('filtrer');

    function application() {

        let sersh = cabine_serch.value.toLowerCase().trim();
        const trajets = document.querySelectorAll('.direction');

        trajets.forEach((trajet) => {

            const statusTrajet = trajet.parentElement.querySelector('.statusTrajet').textContent.trim()

            if (trajet.textContent.toLowerCase().includes(sersh) && (filtrer.value === 'Tous les status' || statusTrajet === filtrer.value)) {
                trajet.parentElement.style.display = ''
            }
            else {
                trajet.parentElement.style.display = 'none';
            }
        })
    }

    cabine_serch.addEventListener('input', application)
    filtrer.addEventListener('change', application)
}




export function pagenationAndBtns() {

    const cardstrajet = document.querySelectorAll('.trajet')
    const tab = Array.from(cardstrajet)

    const limite = 6;

    function pagination(numberPage) {


        const tripsContainer = document.querySelector('#tripsContainer')
        tripsContainer.innerHTML = ""
        const start = (numberPage - 1) * limite;
        const end = numberPage * limite;

        const trips_pagination = tab.slice(start, end).map(Element => {
            return Element.outerHTML
        })

        tripsContainer.innerHTML = trips_pagination.join("")
    }

    function btns() {

        const bottons = [...Array(Math.ceil(tab.length / 6)).keys()].map(Element => {
            return `<li class="pages py-2 px-3 bg-blue-100 rounded-xl border-2 shadow-xl border-blue-200 cursor-pointer :border-black" data-page="${Element + 1}">${Element + 1}</li>`
        })
        const ul = document.querySelector('.paginaction');
        ul.innerHTML = "";

        ul.insertAdjacentHTML("beforeend", bottons.join(""))
        ul.addEventListener('click', e => {
            if (e.target.dataset.page) {
                const NUMBERPAGE = Number(e.target.dataset.page)
                pagination(NUMBERPAGE)
            }

        });
    }
    pagination(1);
    btns();
}



//partie cabine copie la fichie js de la priemier partie BUsDirecr:

export function workCabine(trip, trips) {

    if (!trip) {
        console.error("trips invailible")
        return;
    }

    //element header

    const placeLibre = document.getElementById('placeLibre');
    const placeOccupe = document.getElementById('placeOccupe');
    const resetTotal = document.getElementById('resetTotal');
    const Totalplace = trip.capacity;

    //element form

    //Reservation d'un place

    const nomPassager = document.getElementById('nomPassager');
    const telephone = document.getElementById('telephone');
    const selectSiege = document.getElementById('selectSiege');
    const confirmer = document.getElementById('confirmer');

    //Modifier une place

    const PassagerExistant = document.getElementById('PassagerExistant');
    const nouvellePhone = document.getElementById('telephonMdf');
    const NomPassagerM = document.getElementById('NomPassagerM');
    const NouveauSiege = document.getElementById('NouveauSiege');
    const Valider = document.getElementById('Valider');

    //Supprimer une reservation

    const PassagerReserve = document.getElementById('PassagerReserve');
    const Supprimer = document.getElementById('Supprimer');

    //element capined

    const cards = document.querySelectorAll('.card')
    const cardLibre = document.getElementById('cardLibre');

    //////////main



    function remplirSeiges() {

        const direction = document.getElementById('direction');
        direction.innerHTML += `<b class="text-5 flex items-center gap-2 bg-blue-200 shadow-sm border-blue-200  rounded-xl px-2 py-2"> <span class="material-symbols-outlined">route</span>ligne : ${trip.departure} → ${trip.destination}</b>
                                <b class="flex items-center gap-2 text-blue-500 text-sm bg-blue-200 shadow-sm border-blue-200 rounded-xl px-2 py2"><span class="material-symbols-outlined">schedule</span>  ${trip.departureTime} - ${trip.arrivalTime} </b>
                             `

        selectSiege.innerHTML = `<option value="">-- Automatique (1er libre) --</option>`;
        NouveauSiege.innerHTML = `<option value="" >-- choisir un nouveau siege</option>`;
        for (let i = 0; i < Totalplace; i++) {
            const option1 = document.createElement('option');
            option1.value = i + 1;
            if (i <= 3) {
                option1.textContent = `siege ${i + 1} — VIP ${parseInt(trip.price * 1.1)} DH`
            } else {
                option1.textContent = `siege ${i + 1}`;
            }

            selectSiege.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = i + 1;
            option2.textContent = `Siege ${i + 1}`;
            NouveauSiege.appendChild(option2);

        }
    }

    function message(text) {
        const formulaire = document.querySelector('#formulaire');
        const message = document.createElement('div');
        message.classList.add('messageStyle');
        message.textContent = text
        message.style.color = "white"
        formulaire.append(message);
        setTimeout(function () {
            message.remove();
        }, 3000)
    }

    function remplisNumero(trips) {
        const phones = document.querySelectorAll('.phones');

        phones.forEach((phone, index) => {
            const reservation = trip.reservations.find(reservation => {
                return reservation.seat === index + 1
            })

            if (reservation) {
                phone.textContent = reservation.phone
            }
        })
    }



    const reservations = trip.reservations;

    function returnStyle() {
        reservations.forEach(function (reservation, index) {

            const targetPlace = document.getElementById(`place-${reservation.seat}`);
            if (targetPlace) {
                targetPlace.classList.remove('bg-blue-200');
                targetPlace.classList.add('bg-orange-400');

                const statusPlace = targetPlace.querySelector('p');
                statusPlace.textContent = reservation.name;
                const phone = document.querySelector('.phones')
                phone.textContent = reservation.phone
            }
        })
    }

    function adapteStyle() {

        cards.forEach(function (element) {
            let seat = parseInt(element.dataset.value)

            const reservationsExiste = reservations.some(function (reservation) {
                return Number(reservation.seat) === seat
            })

            if (reservationsExiste) {
                element.classList.remove('bg-blue-200');
                element.classList.add('bg-orange-400');
            }
            else {
                element.classList.remove('bg-orange-400');
                element.classList.add('bg-blue-200');
                element.querySelector('.cardLibre').textContent = 'Libre'
            }
        })

    }

    function staistique() {
        let totalOccupe = reservations.length;
        placeOccupe.textContent = totalOccupe;

        let TotalLibre = 20 - totalOccupe;
        placeLibre.textContent = (TotalLibre);


        let toltalrecet = reservations.reduce(function (total, reservation) {
            return total + prixSiege(trip.price, reservation.seat)
        }, 0)
        resetTotal.textContent = (toltalrecet + '.00DH');
    }

    let drag = null;

    function dragDrop() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(function (card) {

            card.addEventListener('dragstart', function (e) {
                const testDrag = this.querySelector('.cardLibre').textContent

                if (testDrag === 'Libre') {
                    message('la place est vide');
                    return;
                }

                drag = card.querySelector('.cardLibre').textContent;
                //card.querySelector('.cardLibre').textContent = 'Libre'
            })

            card.addEventListener('dragend', function (e) {
                e.preventDefault();
                drag = null;

            })

            cards.forEach(function (element) {
                element.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    element.style.backgroudColor = 'red'
                })
            });

            card.addEventListener('dragleave', function (e) {

            });

            card.addEventListener('drop', function () {
                const verificateurSeat = parseInt(card.dataset.value);

                if (reservations.some(reservation => reservation.seat === verificateurSeat)) {
                    message('place deja reserve!');
                    return;
                }

                else {
                    if (drag) {
                        let position = dataName.indexOf(drag);

                        dataName.splice(position, 1);
                        dataSeat.splice(position, 1);

                        let seat = this.dataset.value;
                        if (dataSeat.includes(parseInt(seat))) {
                            return;
                        }
                        else {
                            dataName.push(drag);
                            dataSeat.push(seat);

                            this.querySelector('.cardLibre').textContent = drag;

                            localStorage.setItem('busNames', JSON.stringify(dataName))
                            localStorage.setItem('busSeats', JSON.stringify(dataSeat))
                            adapteStyle();
                        }
                    }
                }
            });
        });
    }

    //dragDrop();

    //adapteStyle();

    function reservation() {

        const form = document.getElementById('form1');
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let nom = nomPassager.value.trim();
            let tele = telephone.value.trim();
            let siegeShoisi = selectSiege.value;


            if (nom === "") {
                message('Entre un nom')
                return;
            }

            if (reservations.some(reservation => reservation.name === nom)) {
                message('Le nom est deja existe');
                return;
            }

            //telephone 
            const messageIn = form.querySelector('.messageIn');

            if (!validationForm(tele, trip, messageIn)) {
                return;
            }

            let siegeFinal = null;

            //choisi un place

            if (siegeShoisi !== "") {
                siegeFinal = parseInt(siegeShoisi);
                if (reservations.some(reservation => reservation.seat === siegeFinal)) {
                    message("cette place est deja reserve")
                    return;
                }
            }

            //place auto

            else {
                for (let i = 5; i <= Totalplace; i++) {
                    if (!reservations.some(reservation => reservation.seat === i)) {
                        siegeFinal = i;
                        break;
                    }
                }
            }

            // ajoute ou liste d'attente
            if (reservations.length >= Totalplace) {
                const listeAtt = trip.waitingList;
                if (listeAtt.length >= 3) {
                    message('Aucun siege disponible')
                    return;
                }
                const p = {
                    name: nom,
                    phone: tele
                }
                inscrireEnAttente(trip, p);

                renderListeAttente();

                message('le client entre sur la liste attente');
                return;
            }


            reservations.push({
                name: nom,
                seat: siegeFinal,
                phone: tele
            });

            sauvegarder(trips)
            renderListeAttente()
            remplisNumero(trip)
            adapteStyle()

            nomPassager.value = "";
            selectSiege.value = "";
            telephone.value = "";

            message("Réservation enregistrée !");

            const targetPlace = document.getElementById(`place-${siegeFinal}`);
            if (targetPlace) {
                targetPlace.classList.remove('bg-blue-200');
                targetPlace.classList.add('bg-orange-400');
                const statusPlace = targetPlace.querySelector('p');
                statusPlace.textContent = nom;
                const phone = targetPlace.querySelector('.phones')
                phone.textContent = tele
            }

            let totalOccupe = reservations.length;
            placeOccupe.textContent = totalOccupe;

            let TotalLibre = Totalplace - totalOccupe;
            placeLibre.textContent = (TotalLibre);

            let toltalrecet = reservations.reduce(function (total, reservation) {
                return total + prixSiege(trip.price, reservation.seat);
            }, 0);

            resetTotal.textContent = toltalrecet + "DH";

            remplisagePassagerModif_Supp();
        });

    }


    //remplissage===============================

    function remplisagePassagerModif_Supp() {

        PassagerExistant.innerHTML = '<option value="">-- Nom de passager</option>';
        PassagerReserve.innerHTML = '<option value="">--nom de de passager</option>';

        for (let i = 0; i < reservations.length; i++) {
            const option3 = document.createElement('option');
            option3.value = reservations[i].name;
            option3.textContent = reservations[i].name;
            PassagerExistant.appendChild(option3);


            const option4 = document.createElement('option');
            option4.value = reservations[i].name;
            option4.textContent = reservations[i].name;
            PassagerReserve.appendChild(option4);
        }
    }



    //modification==============================

    function modification() {
        const form2 = document.getElementById('form2');
        form2.addEventListener('submit', function (e) {
            e.preventDefault();

            let nomChoisi = PassagerExistant.value;
            let nouveauPhone = nouvellePhone.value.trim()
            let nouveauNam = NomPassagerM.value.trim();
            let nouveauSiege = NouveauSiege.value;

            if (nouveauNam === "" && nouveauSiege === "" && nomChoisi === "") {
                message('remplis ou moins deux chemps! choisir un nom obliguatoire');
                return;
            }

            const nomRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

            if (!nomRegex.test(nouveauNam) && nouveauNam !== "") {
                message('Nom invalid')
                return;
            }

            if (nomChoisi === "") {
                message('choisir un dans la liste');
                return;
            }

            let position = reservations.findIndex(reservation => {
                return reservation.name === nomChoisi
            });


            let oldSiege = reservations[position].seat;

            let nomfinal;
            if (nouveauNam !== "") {
                nomfinal = nouveauNam;
                if (reservations.some((reservation, index) => {
                    return reservation.name === nomfinal && index !== position;
                })) {
                    message('le nom est deja existe');
                    return;
                }
            }

            else {
                nomfinal = nomChoisi;
            }

            let phoneFinal;
            if (nouveauPhone !== "") {
                phoneFinal = nouveauPhone;
                const messageIn2 = form2.querySelector(".messageIn2")

                validationForm(nouveauPhone, trip, messageIn2)
                if (!validationForm(nouveauPhone, trip, messageIn2)) {
                    return;
                }
            }

            else {
                phoneFinal = reservations[position].phone;
            }

            let siegeFinal;
            if (nouveauSiege !== "") {
                siegeFinal = nouveauSiege;
            }
            else {
                siegeFinal = oldSiege;
            }

            if (nouveauSiege !== "" && reservations.some(reservation => reservation.seat === siegeFinal) && siegeFinal !== oldSiege) {
                message('cette place est deja reserve');
                return;
            }

            const XPlace = document.getElementById(`place-${oldSiege}`);
            if (XPlace) {
                XPlace.classList.remove('bg-orange-400');
                XPlace.classList.add('bg-blue-200');
                XPlace.querySelector('p').textContent = 'Libre';
                XPlace.querySelector('.phones').textContent = "";
            }

            const NPlace = document.getElementById(`place-${siegeFinal}`);
            if (NPlace) {
                NPlace.classList.remove('bg-blue-200');
                NPlace.classList.add('bg-orange-400');
                NPlace.querySelector('p').textContent = nomfinal;
                NPlace.querySelector('.phones').textContent = phoneFinal

            }


            reservations[position].seat = siegeFinal;
            reservations[position].name = nomfinal;
            reservations[position].phone = phoneFinal;
            sauvegarder(trips)

            alert('Modification termine');



            NomPassagerM.value = "";
            PassagerExistant.value = "";
            NouveauSiege.value = "";
            nouvellePhone.value = ""

            remplisNumero(trip)
            remplisagePassagerModif_Supp();
        });
    }

    function suppression() {
        const form3 = document.getElementById('form3');
        form3.addEventListener('submit', function (e) {
            e.preventDefault();
            let nomChoisi = PassagerReserve.value;

            if (nomChoisi === "") {
                message('selectionne un nom');
                return;
            }

            let positionNam = reservations.findIndex(function (reservation) {
                return reservation.name === nomChoisi;
            });

            if (positionNam === -1) {
                message("cette nom n'existe pas");
                return;
            }

            let Siege = reservations[positionNam].seat;      //j'ai doit verifie

            alert(`supprimer la place de ${reservations[positionNam].name}`);

            reservations.splice(positionNam, 1);
            //ajoute personne de liste attente
            const passager = voirListeAttenet(trip, Siege)
            if (passager) {
                message(`${passager.name} a obtenu le Siege ${Siege}`)
            }
            sauvegarder(trips);
            renderListeAttente()
            remplisNumero(trip);

            let totalOccupe = reservations.length;
            placeOccupe.textContent = totalOccupe;

            let TotalLibre = Totalplace - totalOccupe;
            placeLibre.textContent = (TotalLibre);


            let toltalrecet = reservations.reduce((total, reservation) => {
                return total + prixSiege(trip.price, reservation.seat);
            }, 0)
            resetTotal.textContent = toltalrecet + ' DH';

            const supp = document.getElementById(`place-${Siege}`);
            if (supp) {
                supp.classList.remove('bg-orange-400');
                supp.classList.add('bg-blue-200');

                supp.querySelector('p').textContent = 'Libre';
                supp.querySelector('.phones').textContent = ""
            }

            if (passager) {
                supp.classList.remove('bg-blue-200');
                supp.classList.add('bg-orange-400');

                supp.querySelector('p').textContent = passager.name;
                supp.querySelector('.phones').textContent = passager.phone;
            }

            else {
                supp.classList.remove('bg-orange-400');
                supp.classList.add('bg-blue-200');

                supp.querySelector('p').textContent = 'Libre';
                supp.querySelector('.phones').textContent = '';
            }

            remplisagePassagerModif_Supp();
        });
    }

    function renderListeAttente() {

        const listeAttente = document.getElementById('listeAttente');
        const tailleAttente = document.getElementById('tailleAttente')

        const listeWiting = trip.waitingList

        tailleAttente.textContent = listeWiting.length

        if (listeWiting.length > 0) {
            if (listeAttente.querySelector('i')) {
                listeAttente.querySelector('i').remove()
            }
        }

        listeAttente.innerHTML = '';
        listeWiting.forEach((element, index) => {
            const p = document.createElement('p');

            p.className = 'att flex items-center justify-between gap-3 bg-orange-50 border border-orange-200 rounded-xl p-3 mb-2 shadow-sm'
            p.dataset.index = index;
            p.textContent = `${element.name} ——— ${element.phone}`
            const btn = document.createElement('button');
            btn.className = " bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-lg font-bold transition"
            btn.textContent = '✕'
            btn.type = "button"
            p.appendChild(btn)
            listeAttente.appendChild(p);

            btn.addEventListener('click', (event) => {
                event.preventDefault();
                const i = Number(p.dataset.index)

                retirerDeAttente(trip, i);
                sauvegarder(trips);
                renderListeAttente()
            })
        })

    }



    renderListeAttente();
    remplisNumero(trip)
    staistique();
    returnStyle();
    remplirSeiges();
    reservation();
    remplisagePassagerModif_Supp();
    modification();
    suppression();
    adapteStyle();

}


