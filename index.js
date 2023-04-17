//Importando o framework Express.js
const express = require("express");
const app = express();
const fs = require("fs");

function trataErro(erro){
    app.get("/validar", function(req, res){
        res.sendFile(__dirname + "/view/404.html");
    });
}

//Extracao de Links
function extraiLinks(texto){
    const regex = /\[([^\]])\]\((https?:\/\/[^$#\s].[^\s])\)/gm
    const arrayResultado = [];
    let temp;
    while((temp = regex.exec(texto)) != null){
        arrayResultado.push({ [temp[1]] : [temp[2]] });
    }
    return(arrayResultado);
}

//Rotas
app.get("/", function(req, res){
    res.sendFile(__dirname + "/view/index.html");
});

app.get("/:link", function(req, res){
    switch(req.params.link){
        
        case 'entrada':
            res.sendFile(__dirname + "/entrada/texto.md");
            break;
        case 'validar':
            try{
                res.sendFile(__dirname + "/view/200.html");
            }catch(erro){
                trataErro(erro);
            }
            break;
        case 'links':
            function pegaArquivo(caminhoDoArquivo){
                    fs.promises
                    .readFile(caminhoDoArquivo, 'utf-8')
                    .then((texto) => console.log(texto))
                    .catch((erro) => trataErro(erro))
                }
            pegaArquivo('/entrada/texto.md')         
            break;
        case 'teste':
            res.sendFile(__dirname + "/view/teste.html"); 
            break;
        case 'sobre':
            res.sendFile(__dirname + "/view/sobre.html");
            break;
        default:
            res.sendFile(__dirname + "/view/404.html");
            break;
    }
});

module.exports = app;

