import { affichageTrajet, rechercherEndFiltrer, pagenationAndBtns, statistiqueTrajet } from "./render.js";
import { trips } from "./store.js";

// trips = await initialize();
console.log(trips)


affichageTrajet(trips);

statistiqueTrajet();
rechercherEndFiltrer();
//pagenationAndBtns()

