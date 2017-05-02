import {View} from "./View";
import {DataHelper} from "../helpers/DataHelper";
import {negociacaoControllerSigleton} from "../controllers/NegociacaoController";

export class NegociacoesView extends View {

    constructor(elemento){
        super(elemento);

        elemento.addEventListener("click", event => {
            if(event.target.nodeName =="TH")
                negociacaoControllerSigleton()
                    .ordena(event.target.textContent.toLowerCase());
        });
    }

    template(model){
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${model.negociacoes.map(negociacao => 
                        `<tr>
                            <td>${DataHelper.dataParaTexto(negociacao.data)}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                            <td>${negociacao.volume}</td>
                        </tr>`
                    ).join("")}
                </tbody>
                
                <tfoot>
                    <tr>
                        <td colspan='3'></td>
                        <td>${model.negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0)}</td>
                    </tr>
                </tfoot>
            </table>
    `
    }  
}