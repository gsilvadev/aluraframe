class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        this.listaLegociacoes = new ListaNegociacoes();
        this.negociacaoView = new NegociacoesView($("#negociacoesView"));
        
        this.mensagemView = new MensagemView($("#mensagemView"));
        this.mensagemView.update(new Mensagem());

        this.negociacaoView.update(this.listaLegociacoes.negociacoes);
    }

    adiciona(event){
        event.preventDefault();

        this.listaLegociacoes.adiciona(this._criaNegociacao());
        this.mensagemView.update(new Mensagem("Negociação adicionada com sucesso!"));
        this.negociacaoView.update(this.listaLegociacoes.negociacoes);

        this._limpaFormulario();
        this.inputData.focus();
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