var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/livros", function (req, res) {
    usuarioController.livros(req, res);
});

router.post("/addlivro", function (req, res) {
    usuarioController.adicionarLivro(req, res);
});

router.post("/exibir_dashboard", function (req, res) {
    usuarioController.exibir_dashboard(req, res);
});

router.post("/buscarLivrosUsuario", function (req, res) {
    usuarioController.buscarLivrosUsuario(req, res);
});


module.exports = router;