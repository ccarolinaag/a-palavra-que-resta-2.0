-- Script A palavra que resta
CREATE DATABASE palavraresta;

USE palavraresta;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
    sobrenome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE livro (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	autor VARCHAR (150),
	numpaginas INT,
    editora VARCHAR (100),
	imagem VARCHAR (1000),
    resenha TEXT,
	dtinicio DATE,
	dttermino DATE,
    favorito TINYINT,
    fkusuario INT,
    CONSTRAINT fkusuario_livro
    foreign key (fkusuario) REFERENCES usuario(id)
);

CREATE TABLE quero_ler (
fkusuario INT,
fklivro INT,
FOREIGN KEY (fkusuario) REFERENCES usuario(id),
FOREIGN KEY (fklivro) REFERENCES livro(id)
);


-- SELECT auntenticar 
SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';

-- SELECT cadastrar
INSERT INTO usuario (nome, sobrenome, email, senha) VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}');

-- SELECT livro 
SELECT l.nome nome_livro, l.autor, l.resenha, u.nome nome_usuario, u.sobrenome
FROM livro l 
JOIN usuario u ON l.fkusuario = u.id
LEFT JOIN quero_ler q ON q.fklivro = l.id
WHERE u.id != '${id}';

-- INSERT para adicionar livro
INSERT INTO livro (nome, autor, numpaginas, editora, imagem, resenha, dtinicio, dttermino, favorito, fkusuario) VALUES 
    ("${nome}", "${autor}", ${numpaginas}, "${editora}", "${imagem}", "${resenha}", "${dtinicio}", "${dttermino}", 0, ${fkusuario});
    
-- SELECT para buscar todos os livros cadastrados pelo usuario
SELECT * FROM livro WHERE fkusuario = '${id}';

-- DML para deletar o livro cadastrado pelo usuário
DELETE FROM livro WHERE id = ${id};

-- VIEW para selecionar e somar quantidade de livros lidos por mês
CREATE VIEW vw_livros_lidos_por_mes AS
SELECT 
    l.fkusuario as IdUsuario,
    YEAR(l.dttermino) AS ano,
    SUM(CASE WHEN MONTH(l.dttermino) = 1  THEN 1 ELSE 0 END) AS janeiro,
    SUM(CASE WHEN MONTH(l.dttermino) = 2  THEN 1 ELSE 0 END) AS fevereiro,
    SUM(CASE WHEN MONTH(l.dttermino) = 3  THEN 1 ELSE 0 END) AS marco,
    SUM(CASE WHEN MONTH(l.dttermino) = 4  THEN 1 ELSE 0 END) AS abril,
    SUM(CASE WHEN MONTH(l.dttermino) = 5  THEN 1 ELSE 0 END) AS maio,
    SUM(CASE WHEN MONTH(l.dttermino) = 6  THEN 1 ELSE 0 END) AS junho,
    SUM(CASE WHEN MONTH(l.dttermino) = 7  THEN 1 ELSE 0 END) AS julho,
    SUM(CASE WHEN MONTH(l.dttermino) = 8  THEN 1 ELSE 0 END) AS agosto,
    SUM(CASE WHEN MONTH(l.dttermino) = 9  THEN 1 ELSE 0 END) AS setembro,
    SUM(CASE WHEN MONTH(l.dttermino) = 10 THEN 1 ELSE 0 END) AS outubro,
    SUM(CASE WHEN MONTH(l.dttermino) = 11 THEN 1 ELSE 0 END) AS novembro,
    SUM(CASE WHEN MONTH(l.dttermino) = 12 THEN 1 ELSE 0 END) AS dezembro
FROM livro AS l
WHERE YEAR(l.dttermino) = YEAR(CURRENT_DATE())
GROUP BY l.fkusuario, YEAR(l.dttermino);

-- VIEW utilizada na API 
SELECT * FROM vw_livros_lidos_por_mes WHERE idUsuario = 1;
