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
    }

    adiciona(event) {
        event.preventDefault();

        this._listaLegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso!";

        this._limpaFormulario();
        this._inputData.focus();
    }

    obterNegociacoes() {
        let negociacaoService = new NegociacaoService();
        Promise.all([
            negociacaoService.obterNegociacoesDaSemana(),
            negociacaoService.obterNegociacoesDaSemanaAnterior(),
            negociacaoService.obterNegociacoesDaSemanaRetrasada()])
            .then(negociacoes =>
                negociacoes
                    .reduce((novoArray, array) => novoArray.concat(array), [])
                    .forEach(negociacao => this._listaLegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga(event) {
        event.preventDefault();

        this._listaLegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso!";
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
}