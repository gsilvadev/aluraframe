var ConnectionFactory = (() => {
const db = "aluraframe";
const version = 1;
const stores = ["negociacao"];

var connection = null;
var close = null;

return class ConnectionFactory{

    constructor(){

        throw new Error("Esta classe não pode ser instanciada.");
    }

    static getConnection(){
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(db, version);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {
                if(!connection) connection = e.target.result;
                
                close = connection.close.bind(connection);
                connection.close = function(){
                    throw new Error("Você não pode fechar a conexão diretamente.");
                }

                resolve(connection);
            };

            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }

    static _createStores(connection){
        stores.forEach(store => {
            if(connection.objectStoresNames.contains(store))
                connection.deleteObjectStore(store);

            connection.createObjectStore(store, {autoIncrement : true});
        });
    }

    static closeConnection(){
        if(close){
            close();
        }
    }
}
})();