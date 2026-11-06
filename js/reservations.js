export function placesLibres(trip){
    return trip.capacity - trip.reservations.length;
}

export function estComplet(trip){
    return placesLibres(trip) === 0;
}

export function estVip(nemero){
    return nemero >= 1 && nemero <= 4
}
 
export function prixSiege(prix, nemero){
    if(estVip(nemero)){
        return Math.round(prix * 1.1)
    }
    return prix
}

export function inscrireEnAttente(trip, p){
    trip.waitingList.push(p)
}

export function retirerDeAttente(trip, i) {
    trip.waitingList.splice(i, 1);
}

export function voirListeAttenet(trip, seat){
    if(trip.waitingList.length > 0){

        const p = trip.waitingList.shift();
        trip.reservations.push({
            seat: seat,
            name: p.name,
            phone: p.phone
        })

        return p
    }

    return null;
}