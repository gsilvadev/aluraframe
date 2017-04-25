class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");

        this.listaLegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($("#negociacoesView")),
            "adiciona", "esvazia");

        this.mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            "texto");
    }

    adiciona(event){
        event.preventDefault();

        this.listaLegociacoes.adiciona(this._criaNegociacao());
        this.mensagem.texto = "Negociação adicionada com sucesso!";

        this._limpaFormulario();
        this.inputData.focus();
    }

    apaga(event){
        event.preventDefault();

        this.listaLegociacoes.esvazia();
        this.mensagem.texto = "Negociações apagadas com sucesso!";
    }

    _criaNegociacao(){
        return new Negociacao(DataHelper.textoParaData(this.inputData.value),
                                        this.inputQuantidade.value,
                                        this.inputValor.value);
    }

    _limpaFormulario(){
        this.inputData.value = "";
        this.inputQuantidade.value = "1";
        this.inputValor.value = "0.0";
    }
}