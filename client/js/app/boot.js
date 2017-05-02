"use strict";

System.register(["./controllers/NegociacaoController", "./polyfill/fetch"], function (_export, _context) {
  "use strict";

  var negociacaoControllerSigleton, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      negociacaoControllerSigleton = _controllersNegociacaoController.negociacaoControllerSigleton;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = negociacaoControllerSigleton();


      document.querySelector(".form").onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector("[type=button]").onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map