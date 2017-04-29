class DataHelper{

    constructor(){
        throw new Error("Esta classe não pode ser instanciada.");
    }

    static textoParaData(texto){
        if(!/\d{4}([-\/])\d{1,2}\1\d{1,2}/.test(texto) &&
            !/\d{1,2}([-\/])\d{1,2}\1\d{4}/.test(texto))
            throw new Error("Verificar formato da data.");
        return new Date(...texto.split(/[-\/]/).map((item, indice) => item - (indice % 2)));
    }
    
    static dataParaTexto(data){
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
}