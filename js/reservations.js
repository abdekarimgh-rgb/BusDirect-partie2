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

