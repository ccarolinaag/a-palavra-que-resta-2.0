var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    console.log("cheguei na controller")

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.status(200).json(resultadoAutenticar)
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sobrenome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function livros(req, res) {
    var id = req.body.idUserServer;
    console.log("cheguei na controller")

    usuarioModel.livros(id)
        .then(
            function (resultadolivros) {
                console.log(`\nResultados encontrados: ${resultadolivros.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadolivros)}`); // transforma JSON em String

                if (resultadolivros.length >= 1) {
                    console.log(resultadolivros);
                    res.status(200).json(resultadolivros)
                } else {
                    res.status(204).send("não existem livros cadastrados");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar livros! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function adicionarLivro(req, res) {
    console.log(req.body)

    var nome = req.body.nomeLivro_server;
    var autor = req.body.autor_server;
    var numpaginas = req.body.nPaginas_server;
    var editora = req.body.editora_server;
    var imagem = req.body.capa_server;
    var resenha = req.body.resenha_server;
    var dtinicio = req.body.dtInicio_server;
    var dttermino = req.body.dtTermino_server;
    var fkusuario = req.body.idUserServer;

    console.log("cheguei na controller adicionar livro")

    usuarioModel.adicionarLivro(nome, autor, numpaginas, editora, imagem, resenha, dtinicio, dttermino, fkusuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro do livro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function exibir_dashboard(req, res) {
    var id = req.body.idUserServer;
    console.log("cheguei na controller")

    usuarioModel.exibir_dashboard(id)
        .then(
            function (dados_dashboard) {
                console.log(`\nResultados encontrados: ${dados_dashboard.length}`);
                console.log(`Resultados: ${JSON.stringify(dados_dashboard)}`); // transforma JSON em String

                if (dados_dashboard.length >= 1) {
                    console.log(dados_dashboard);
                    res.status(200).json(dados_dashboard)
                } else {
                    res.status(204).send("ainda não existem dados de leitura");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar dados de leitura! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarLivrosUsuario(req, res) {
    var id = req.body.idUserServer;
    console.log("cheguei na controller")

    usuarioModel.buscarLivrosUsuario(id)
        .then(
            function (resultadolivros) {
                console.log(`\nResultados encontrados: ${resultadolivros.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadolivros)}`); 

                if (resultadolivros.length >= 1) {
                    console.log(resultadolivros);
                    res.status(200).json(resultadolivros)
                } else {
                    res.status(204).send("não existem livros cadastrados");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar livros! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function apagarLivro(req, res) {
    var id = req.body.idLivroServer;
    console.log("cheguei na controller")

    usuarioModel.apagarLivro(id)
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao excluir o livro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function DadosAno(req, res) {
    var id = req.body.idUserServer;
    console.log("cheguei na controller")

    usuarioModel.DadosAno(id)
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar dados do ano Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar,
    livros,
    adicionarLivro,
    exibir_dashboard,
    buscarLivrosUsuario,
    apagarLivro,
    DadosAno
}