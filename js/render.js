
import { estComplet, placesLibres } from "./reservations.js";
import { sauvegarder } from "./store.js";

export function affichageTrajet(trips) {
    const contaiaier = document.getElementById('tripsContainer');

    trips.forEach(function (trip) {


        const card = document.createElement('div');
        card.className = 'trajet bg-blue-50 rounded-2xl p-2 m-1 shadow-xl'
        card.innerHTML = `
                <div class=" flex justify-between">
                    <p class=" border-0 rounded-2xl px-2 bg-blue-100 text-blue-500">Trajet ${trip.id}</p>
                    <p class="statusTrajet border-0 rounded-2xl px-2 bg-red-200" >Disponible</p>
                </div>
                <h2 class="direction text-xl font-bold text-blue-950">${trip.departure} → ${trip.destination}</h2>
                <p class="text-blue-400 ">${trip.departureTime} - ${trip.arrivalTime}</p>

                <div class="infoCard bg-blue-100 rounded-2xl p-4">
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
                        <p class="Recette text-blue-950 ">${trip.price * trip.reservations.length}</p>
                    </div>
                </div>
                <a href="./cabine.html?id=${Number(trip.id)}" ><button class=" bg-blue-600 rounded-xl py-1.5 px-4 hover:bg-blue-700 font-bold flex justify-self-center justify-center w-full m-2 cursor-pointer">Gérer la cabine</button></a>
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
    TOTALPASSAGERS.textContent = 400 - SeateCabinelibre
}


export function rechercherEndFiltrer() {

    const cabine_serch = document.getElementById('cabine_serch');
    const filtrer = document.getElementById('filtrer');
    const tripsContainer = document.getElementById('tripsContainer')

    function application() {

        let sersh = cabine_serch.value.toLowerCase();
        const trajets = document.querySelectorAll('.direction');

        trajets.forEach((trajet) => {
            const statusTrajet = trajet.parentElement.querySelector('.statusTrajet').textContent

            if (trajet.textContent.toLowerCase().includes(sersh) && (filtrer.value === 'Tous les status' || statusTrajet === filtrer.value)) {
                trajet.parentElement.style.display = 'block'
            }
            else {
                trajet.parentElement.style.display = 'none';
            }
        })
    }

    cabine_serch.addEventListener('input', application)
    filtrer.addEventListener('change', application)
}

//partie pagination


export function pagenationAndBtns() {
    const cardstrajet = document.querySelectorAll('.trajet')

    const tab = Array.from(cardstrajet)

    function pagination(numberPage) {

        const limite = 6;
        const tripsContainer = document.querySelector('#tripsContainer')
        const start = (numberPage - 1) * limite;
        const end = numberPage * limite;
        console.log(tab)

        const trips_pagination = tab.slice(start, end).map(Element => {
            return Element.outerHTML
        })

        tripsContainer.innerHTML = trips_pagination.join("")
    }

    function btns() {

        const bottons = [...Array(Math.ceil(tab.length / 6)).keys()].map(Element => {
            return `<li class="pages py-2 px-3 bg-blue-100 rounded-xl border-2 shadow-xl border-blue-200 cursor-pointer focus:not-odd:border-black" data-page="${Element + 1}">${Element + 1}</li>`
        })
        const ul = document.querySelector('.paginaction');

        ul.insertAdjacentHTML("beforeend", bottons.join(""))
        ul.addEventListener('click', e => {
            const NUMBERPAGE = e.target.dataset.page
            pagination(NUMBERPAGE)
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
    const selectSiege = document.getElementById('selectSiege');
    const confirmer = document.getElementById('confirmer');

    //Modifier une place

    const PassagerExistant = document.getElementById('PassagerExistant');
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
        selectSiege.innerHTML = '<option value="">-- Automatique (1er libre) --</option>';
        NouveauSiege.innerHTML = '<option value="" >-- choisir un nouveau siege</option>';
        for (let i = 0; i < Totalplace; i++) {
            const option1 = document.createElement('option');
            option1.value = i + 1;
            option1.textContent = `siege ${i + 1}`;
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
        }, 1500)
    }



    //var dataName = JSON.parse(localStorage.getItem("busNames")) || [];
    //var dataSeat = JSON.parse(localStorage.getItem("busSeats")) || [];

    const reservations = trip.reservations;

    function returnStyle() {
        reservations.forEach(function (reservation, index) {

            const targetPlace = document.getElementById(`place-${reservation.seat}`);
            if (targetPlace) {
                targetPlace.classList.remove('bg-blue-200');
                targetPlace.classList.add('bg-orange-400');

                const statusPlace = targetPlace.querySelector('p');
                statusPlace.textContent = reservation.name;
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


        let toltalrecet = totalOccupe * trip.price;
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
            let siegeShoisi = selectSiege.value;

            if (nom === "") {
                message('Entre un nom')
                return;
            }

            if (reservations.some(reservation => reservation.name === nom)) {
                message('Le nom est deja existe');
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
                for (let i = 1; i <= Totalplace; i++) {
                    if (!reservations.some(reservation => reservation.seat === i)) {
                        siegeFinal = i;
                        break;
                    }
                }
            }

            if (reservations.length >= 20) {
                message('Aucun siege disponible')
                return;
            }


            reservations.push({
                name: nom,
                seat: siegeFinal
            });

            sauvegarder(trips)

            adapteStyle()

            nomPassager.value = "";
            selectSiege.value = "";

            alert("Réservation enregistrée !");

            const targetPlace = document.getElementById(`place-${siegeFinal}`);
            if (targetPlace) {
                targetPlace.classList.remove('bg-blue-200');
                targetPlace.classList.add('bg-orange-400');
                const statusPlace = targetPlace.querySelector('p');
                statusPlace.textContent = nom;


                console.log("Siege final:", siegeFinal);
                console.log("Target place:", targetPlace);
                console.log("Classes:", targetPlace.className);

            }

            let totalOccupe = reservations.length;
            placeOccupe.textContent = totalOccupe;

            let TotalLibre = 20 - totalOccupe;
            placeLibre.textContent = (TotalLibre);


            let toltalrecet = totalOccupe * trip.price;
            resetTotal.textContent = (toltalrecet + '.00DH');

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
            let nouveauNam = NomPassagerM.value.trim();
            let nouveauSiege = NouveauSiege.value;

            if (nouveauNam === "" && nouveauSiege === "") {
                message('remplis ou moins deux chemps!');
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
                    return reservation.name === nomfinal  && index !== position;
                })) {
                    message('le nom est deja existe');
                    return;
                }
            }

            else {
                nomfinal = nomChoisi;
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
            }

            const NPlace = document.getElementById(`place-${siegeFinal}`);
            if (NPlace) {
                NPlace.classList.remove('bg-blue-200');
                NPlace.classList.add('bg-orange-400');
                NPlace.querySelector('p').textContent = nomfinal;
            }

            reservations[position].name = nomfinal;
            reservations[position].seat = siegeFinal;
            sauvegarder(trips)

            alert('Modification termine');



            NomPassagerM.value = "";
            PassagerExistant.value = "";
            NouveauSiege.value = "";

            remplirSeiges();
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

            let Siege = reservations[positionNam].name;

            alert(`supprimer la place de ${reservations[positionNam].name}`);

            reservations.splice(positionNam, 1);

            sauvegarder(trips)
            
            let totalOccupe = reservations.length;
            placeOccupe.textContent = totalOccupe;

            let TotalLibre = 20 - totalOccupe;
            placeLibre.textContent = (TotalLibre);


            let toltalrecet = totalOccupe * trip.price;
            resetTotal.textContent = (toltalrecet + '.00DH');

            const supp = document.getElementById(`place-${Siege}`);
            if (supp) {
                supp.classList.remove('bg-orange-400');
                supp.classList.add('bg-blue-200');
                supp.querySelector('p').textContent = 'Libre';
            }

            remplisagePassagerModif_Supp();
        });
    }

    staistique();
    returnStyle();
    remplirSeiges();
    reservation();
    remplisagePassagerModif_Supp();
    modification();
    suppression();
    adapteStyle();

}


