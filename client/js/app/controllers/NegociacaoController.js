"use strict";

System.register(["../models/Negociacao", "../services/NegociacaoService", "../helpers/DataHelper", "../models/Mensagem", "../models/ListaNegociacoes", "../views/NegociacoesView", "../helpers/Bind", "../views/MensagemView"], function (_export, _context) {
    "use strict";

    var Negociacao, NegociacaoService, DataHelper, Mensagem, ListaNegociacoes, NegociacoesView, Bind, MensagemView, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDataHelper) {
            DataHelper = _helpersDataHelper.DataHelper;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
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

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);
                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");

                    this._listaLegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), "adiciona", "esvazia", "ordena", "inverteOrdem");
                    this._ordemAtual = "";

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), "texto");

                    this._negociacaoService = new NegociacaoService();

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: "_init",
                    value: function _init() {
                        var _this = this;

                        this.listar();

                        setInterval(function () {
                            _this._obterNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: "adiciona",
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._negociacaoService.adiciona(negociacao).then(function (msg) {
                            _this2._listaLegociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = msg;
                            _this2._limpaFormulario();
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });

                        this._inputData.focus();
                    }
                }, {
                    key: "_obterNegociacoes",
                    value: function _obterNegociacoes() {
                        var _this3 = this;

                        this._negociacaoService.importa(this._listaLegociacoes.negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                return _this3._listaLegociacoes.adiciona(negociacao);
                            });
                            if (negociacoes.length > 0) _this3._mensagem.texto = "Negociações importadas com sucesso.";
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: "apaga",
                    value: function apaga(event) {
                        var _this4 = this;

                        event.preventDefault();

                        this._negociacaoService.apagarTodos().then(function (msg) {
                            _this4._listaLegociacoes.esvazia();
                            _this4._mensagem.texto = msg;
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: "_criaNegociacao",
                    value: function _criaNegociacao() {
                        return new Negociacao(DataHelper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
                    }
                }, {
                    key: "_limpaFormulario",
                    value: function _limpaFormulario() {
                        this._inputData.value = "";
                        this._inputQuantidade.value = "1";
                        this._inputValor.value = "0.0";
                    }
                }, {
                    key: "ordena",
                    value: function ordena(coluna) {
                        if (this._ordemAtual == coluna) this._listaLegociacoes.inverteOrdem();else this._listaLegociacoes.ordena(function (a, b) {
                            return a[coluna] - b[coluna];
                        });

                        this._ordemAtual = coluna;
                    }
                }, {
                    key: "listar",
                    value: function listar() {
                        var _this5 = this;

                        this._negociacaoService.listarTodos().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this5._listaLegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this5._mensagem.texto = erro;
                        });
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function negociacaoControllerSigleton() {
                return negociacaoController;
            }

            _export("negociacaoControllerSigleton", negociacaoControllerSigleton);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map