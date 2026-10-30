import { initialize } from "./store";
async function afficaheCabine() {
    try {
        const trips = initialize();
    }catch{
        console.error('Error:', Error.data);
    }
}

afficaheCabine();