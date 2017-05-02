"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, db, version, stores, connection, close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            db = "aluraframe";
            version = 1;
            stores = ["negociacao"];
            connection = null;
            close = null;

            _export("ConnectionFactory", ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error("Esta classe não pode ser instanciada.");
                }

                _createClass(ConnectionFactory, null, [{
                    key: "getConnection",
                    value: function getConnection() {
                        return new Promise(function (resolve, reject) {
                            var openRequest = window.indexedDB.open(db, version);

                            openRequest.onupgradeneeded = function (e) {
                                ConnectionFactory._createStores(e.target.result);
                            };

                            openRequest.onsuccess = function (e) {
                                if (!connection) connection = e.target.result;

                                close = connection.close.bind(connection);
                                connection.close = function () {
                                    throw new Error("Você não pode fechar a conexão diretamente.");
                                };

                                resolve(connection);
                            };

                            openRequest.onerror = function (e) {
                                console.log(e.target.error);
                                reject(e.target.error.name);
                            };
                        });
                    }
                }, {
                    key: "_createStores",
                    value: function _createStores(connection) {
                        stores.forEach(function (store) {
                            if (connection.objectStoresNames.contains(store)) connection.deleteObjectStore(store);

                            connection.createObjectStore(store, { autoIncrement: true });
                        });
                    }
                }, {
                    key: "closeConnection",
                    value: function closeConnection() {
                        if (close) {
                            close();
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export("ConnectionFactory", ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map