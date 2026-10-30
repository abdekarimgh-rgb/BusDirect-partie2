import { affichageTrajet, statistiqueTrajet } from "./render.js";
import { initialize } from "./store.js";

let trips = [];
trips = await initialize();
console.log(trips)


affichageTrajet(trips);

statistiqueTrajet();