import { affichageTrajet, pagenationAndBtns,  rechercherEndFiltrer, statistiqueTrajet } from "./render.js";
import { initialize } from "./store.js";

let trips = [];
trips = await initialize();
console.log(trips)


affichageTrajet(trips);

statistiqueTrajet();

rechercherEndFiltrer();

//pagination(1);
pagenationAndBtns()
//btns();
