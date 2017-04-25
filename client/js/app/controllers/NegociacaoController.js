class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        this.negociacaoView = new NegociacoesView($("#negociacoesView"));
        let self = this;
        this.listaLegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver){
                
                if(["adiciona", "esvazia"].includes(prop) && typeof(target[prop]) == typeof(Function)){
                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        self.negociacaoView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });

        this.mensagemView = new MensagemView($("#mensagemView"));
        this.mensagemView.update(new Mensagem());

        this.negociacaoView.update(this.listaLegociacoes);
    }

    adiciona(event){
        event.preventDefault();

        this.listaLegociacoes.adiciona(this._criaNegociacao());
        this.mensagemView.update(new Mensagem("Negociação adicionada com sucesso!"));

        this._limpaFormulario();
        this.inputData.focus();
    }

    apaga(event){
        event.preventDefault();

        this.listaLegociacoes.esvazia();
        this.mensagemView.update(new Mensagem("Negociações apagadas com sucesso!"))
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