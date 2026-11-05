
import { estComplet, placesLibres } from "./reservations.js";

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
                <button class=" bg-blue-600 rounded-xl py-1.5 px-4 hover:bg-blue-700 font-bold flex justify-self-center justify-center w-full m-2 cursor-pointer">Gérer la cabine</button>
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

