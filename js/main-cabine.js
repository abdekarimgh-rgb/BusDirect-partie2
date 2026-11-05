import { workCabine } from "./render.js";
import { initialize } from "./store.js";
async function afficheCabine() {
    try {
        let trips = await initialize();
        console.log(trips)
        
        if(!Array.isArray(trips)){
            trips = [];
        }

        const params = new URLSearchParams(location.search);

        const id = Number(params.get("id"))
        console.log(trips)

        console.log('id='+id)

        const trip = trips.find(trip => trip.id === id);

        if(!trip){
            const body = document.body;
            body.innerHTML = '<div class="flex justify-center self-center text-5xl font-serif font-semibold  text-blue-400"> « Trajet introuvable »</div>'
            body.className = "h-screen flex justify-center text-blue-400"
        }

        workCabine(trip, trips);

    }catch(error){
        console.error('Error:', error);
    }
    
}

afficheCabine();
