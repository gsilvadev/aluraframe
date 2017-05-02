class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaLegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")),
            "adiciona", "esvazia", "ordena", "inverteOrdem");
        this._ordemAtual = "";

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            "texto");

        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _init(){
        this.listar();

        setInterval(() => {
            this._obterNegociacoes();
        }, 3000);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._negociacaoService
            .adiciona(negociacao)
                .then(msg => {
                    this._listaLegociacoes.adiciona(negociacao);
                    this._mensagem.texto = msg;
                    this._limpaFormulario();
                })
                .catch(erro => this._mensagem.texto = erro);

        this._inputData.focus();
    }

    _obterNegociacoes() {
            this._negociacaoService
                .importa(this._listaLegociacoes.negociacoes)
                .then(negociacoes => {
                    negociacoes.forEach(negociacao => 
                        this._listaLegociacoes.adiciona(negociacao));
                    if(negociacoes.length > 0)
                        this._mensagem.texto = "Negociações importadas com sucesso."
                    })
                .catch(erro => this._mensagem.texto = erro);
    }

    apaga(event) {
        event.preventDefault();

        this._negociacaoService
            .apagarTodos()
            .then(msg => {
                this._listaLegociacoes.esvazia();
                this._mensagem.texto = msg;
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao() {
        return new Negociacao(DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = "1";
        this._inputValor.value = "0.0";
    }

    ordena(coluna){
        if(this._ordemAtual == coluna)
            this._listaLegociacoes.inverteOrdem();
        else
            this._listaLegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        
        this._ordemAtual = coluna;
    }

    listar(){
        this._negociacaoService
            .listarTodos()
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listaLegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
    }
}