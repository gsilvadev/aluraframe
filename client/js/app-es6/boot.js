import {negociacaoControllerSigleton} from "./controllers/NegociacaoController";
import {} from "./polyfill/fetch";

let negociacaoController = negociacaoControllerSigleton();

document.querySelector(".form").onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector("[type=button]").onclick = negociacaoController.apaga.bind(negociacaoController);