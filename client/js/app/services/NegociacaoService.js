class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes(){
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