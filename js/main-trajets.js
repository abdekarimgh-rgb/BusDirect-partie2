import { affichageTrajet, rechercherEndFiltrer, pagenationAndBtns, statistiqueTrajet } from "./render.js";
import { initialize } from "./store.js";

const trips = await initialize();
console.log(trips)
console.log(Array.isArray(trips));

affichageTrajet(trips);

statistiqueTrajet();
rechercherEndFiltrer();
//pagenationAndBtns()


