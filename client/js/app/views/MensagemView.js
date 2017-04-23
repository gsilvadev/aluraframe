class MensagemView extends View{

    constructor(elemento){
        super(elemento);
    }

    template(model){
        return model.texto ? `<p class="alert alert-info alert-dismissible">${model.texto}</p>` : `<p></p>`;
    }
}