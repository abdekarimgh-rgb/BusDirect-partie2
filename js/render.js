import { estComplet, placesLibres } from "./reservations.js";

export function affichageTrajet(trips) {
    const contaiaier = document.getElementById('tripsContainer');

    trips.forEach(function(trip) {


        const card = document.createElement('div');
        card.className ='trajet bg-blue-50 rounded-2xl p-2 m-1 w-20 shadow-xl'
        card.innerHTML = `
                <div class=" flex justify-between">
                    <p class=" border-0 rounded-2xl px-2 bg-blue-100 text-blue-500">Trajet ${trip.id}</p>
                    <p class="statusTrajet border-0 rounded-2xl px-2 bg-red-200" >Disponible</p>
                </div>
                <h2 class=" text-xl font-bold text-blue-950">${trip.departure} → ${trip.destination}</h2>
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

        if(estComplet(trip)){
            status.textContent = "Complet"
            status.style.backgroundColor = '#ff4d4d'
        }
        else{
            status.textContent = "Disponible"
            status.style.backgroundColor = '#5CCB5F'
        }
    });
}

export function statistiqueTrajet(){
    const trajets = document.querySelectorAll('.trajet')
    let totolRocetTrajets = 0;
    let SeateCabinelibre = 0
    trajets.forEach(function(trajet){
        const recet = trajet.querySelector('.Recette').textContent
        totolRocetTrajets += parseInt(recet)

        const SeateCabinelibres  = trajet.querySelector('.SeateCabinelibre').textContent
        SeateCabinelibre += parseInt(SeateCabinelibres);
    })

    //recette Reseau
    const resetTotal = document.getElementById('resetTotal');
    resetTotal.textContent = totolRocetTrajets + " DH"
    //number de passagers
    const TOTALPASSAGERS = document.getElementById('TOTALPASSAGERS')
    TOTALPASSAGERS.textContent = 400 - SeateCabinelibre
}