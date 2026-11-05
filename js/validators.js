export function validationForm(telephone, trip) {

    const messageIn = document.querySelector('.messageIn');

    const phoneregex = /^0[67]\d{8}$/;
    if (!phoneregex.test(telephone)) {
        
        messageIn.className = ' bg-red-200 rounded-xl text-sm m-2 px-2 text-center text-red-900'
        messageIn.textContent = '10 chiffres commençant par 06 ou 07 '
        return false;
    }

    if (trip.reservations.find(reservation => reservation.phone === telephone) || trip.waitingList.find(waitingListe => waitingListe.phone === telephone)) {

        const messageIn = document.querySelector('.messageIn');
        messageIn.className = 'bg-red-200 rounded-xl text-sm m-2 px-2 text-center text-red-900'
        messageIn.textContent = 'Ce numéro est déjà utilisé sur ce trajet'
        return false;
    }

    messageIn.textContent="";
    return true;
}