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
            this.listar();

        this._init();
    }

    _init(){
        this._obterNegociacoes();
    }

    adiciona(event) {
        event.preventDefault();

        ConnectionFactory.getConnection()
            .then(connection => {
                let dao = new NegociacaoDao(connection);

                let negociacao = this._criaNegociacao();
                dao.adiciona(negociacao)
                    .then(() => {
                        this._listaLegociacoes.adiciona(negociacao);
                        this._mensagem.texto = "Negociação adicionada com sucesso!";
                        this._limpaFormulario();
                    })
                    .catch(erro => this._mensagem.texto = erro);
            })

        this._inputData.focus();
    }

    _obterNegociacoes() {
        let negociacaoService = new NegociacaoService();
            negociacaoService.obterNegociacoes()
            .then(negociacoes => 
                            negociacoes.filter(negociacao => 
                                !this._listaLegociacoes.negociacoes.some(negociacaoExistente =>
                                    JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))
            .then(negociacoes =>
                negociacoes.forEach(negociacao => 
                    this._listaLegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga(event) {
        event.preventDefault();

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagarTodos())
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
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listarTodos())
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listaLegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
    }
}