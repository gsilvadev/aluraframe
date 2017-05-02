class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    adiciona(negociacao) {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => "Negociação adicionada com sucesso.")
            .catch(() => {
                throw new Error("Não foi possível adicionar a negociação.");
            });
    }

    listarTodos() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listarTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível listar as negociações.");
            });
    }

    apagarTodos(){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagarTodos())
            .then(msg => msg)
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível apagar as negociações.");
            });
    }

    importa(listaAtual){
        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !listaAtual.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações.");
            });
    }

    obterNegociacoes() {
        return new Promise((resolve, reject) => {
            Promise.all([this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()])
                .then(negociacoes =>
                    resolve(negociacoes.reduce((novoArray, array) =>
                        novoArray.concat(array), [])))
                .catch(erro => reject(erro));
        });
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) =>
            this._http.get("negociacoes/semana")
                .then(negociacoes =>
                    resolve(negociacoes.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => reject("Não foi possível obter as negociações da semana.")));
    }
    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) =>
            this._http.get("negociacoes/anterior")
                .then(negociacoes =>
                    resolve(negociacoes.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => reject("Não foi possível obter as negociações da semana anterior.")));
    }
    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) =>
            this._http.get("negociacoes/retrasada")
                .then(negociacoes =>
                    resolve(negociacoes.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => reject("Não foi possível obter as negociações da semana retrasada.")));
    }
}