"use strict";

System.register(["../models/Negociacao", "../dao/NegociacaoDao", "./HttpService", "./ConnectionFactory"], function (_export, _context) {
    "use strict";

    var Negociacao, NegociacaoDao, HttpService, ConnectionFactory, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("NegociacaoService", NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: "adiciona",
                    value: function adiciona(negociacao) {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return "Negociação adicionada com sucesso.";
                        }).catch(function () {
                            throw new Error("Não foi possível adicionar a negociação.");
                        });
                    }
                }, {
                    key: "listarTodos",
                    value: function listarTodos() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.listarTodos();
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível listar as negociações.");
                        });
                    }
                }, {
                    key: "apagarTodos",
                    value: function apagarTodos() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.apagarTodos();
                        }).then(function (msg) {
                            return msg;
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível apagar as negociações.");
                        });
                    }
                }, {
                    key: "importa",
                    value: function importa(listaAtual) {
                        return this.obterNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                                });
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível obter as negociações.");
                        });
                    }
                }, {
                    key: "obterNegociacoes",
                    value: function obterNegociacoes() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            Promise.all([_this.obterNegociacoesDaSemana(), _this.obterNegociacoesDaSemanaAnterior(), _this.obterNegociacoesDaSemanaRetrasada()]).then(function (negociacoes) {
                                return resolve(negociacoes.reduce(function (novoArray, array) {
                                    return novoArray.concat(array);
                                }, []));
                            }).catch(function (erro) {
                                return reject(erro);
                            });
                        });
                    }
                }, {
                    key: "obterNegociacoesDaSemana",
                    value: function obterNegociacoesDaSemana() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            return _this2._http.get("negociacoes/semana").then(function (negociacoes) {
                                return resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                return reject("Não foi possível obter as negociações da semana.");
                            });
                        });
                    }
                }, {
                    key: "obterNegociacoesDaSemanaAnterior",
                    value: function obterNegociacoesDaSemanaAnterior() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            return _this3._http.get("negociacoes/anterior").then(function (negociacoes) {
                                return resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                return reject("Não foi possível obter as negociações da semana anterior.");
                            });
                        });
                    }
                }, {
                    key: "obterNegociacoesDaSemanaRetrasada",
                    value: function obterNegociacoesDaSemanaRetrasada() {
                        var _this4 = this;

                        return new Promise(function (resolve, reject) {
                            return _this4._http.get("negociacoes/retrasada").then(function (negociacoes) {
                                return resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                return reject("Não foi possível obter as negociações da semana retrasada.");
                            });
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export("NegociacaoService", NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map