const keyStorage = "busTrips";

export async function initialize(){
    const donneesLocalStorage = localStorage.getItem(keyStorage);

    if(donneesLocalStorage !== null){
        return JSON.parse(donneesLocalStorage);
    }

    const reponse = await fetch("./data/trips.json");

    if(!reponse.ok){
        throw new Error("Imposiblede charger les donnees")
    }

    const trips = await reponse.json();

    localStorage.setItem(keyStorage, JSON.stringify(trips));

    return trips;
}

export function sauvegarder(trips){
    localStorage.setItem(keyStorage,  JSON.stringify(trips));
}