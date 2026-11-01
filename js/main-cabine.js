import { workCabine } from "./render.js";
import { initialize } from "./store.js";
async function afficheCabine() {
    try {
        const trips = await initialize();
        console.log(trips)

        const params = new URLSearchParams(location.search);

        const id = Number(params.get("id"))

        console.log('id='+id)

        const trip = trips.find(trip => trip.id === id);
        console.log(trip.reservations)
    

        workCabine(trip, trips);

    }catch(error){
        console.error('Error:', error);
    }
    
}

afficheCabine();
