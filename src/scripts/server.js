const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Importe o pacote CORS

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use o middleware CORS para permitir solicitações de origens diferentes

const arquivoCarros = 'C:/Users/Esig/Documents/Sistema_de_Aluguel_de_Carros/carros.txt'; // Caminho absoluto completo para o arquivo
const arquivoCliente = 'C:/Users/Esig/Documents/Sistema_de_Aluguel_de_Carros/clientes.txt';
// Rota para receber os dados do formulário
app.post('/adicionarCarro', (req, res) => {
    const { marca, modelo, placa, ano, status } = req.body;
    const marcaModelo = `${marca}, ${modelo}`;
    // Formatar os dados em uma string de texto
    const carroText = `${marcaModelo}, ${placa}, ${ano}, ${status}\n`;

    // Salvar os dados no arquivo de texto
    fs.appendFile(arquivoCarros, carroText, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao salvar os dados do carro.');
        } else {
            console.log('Dados do carro foram salvos no arquivo de texto.');
            res.status(200).send('Dados do carro foram salvos no arquivo de texto.');
        }
    });
});

app.post('/adicionarCliente', (req, res) => {
    const { id, nome, sobrenome, cnh, possuiReserva } = req.body;
    const nomeComleto = `${nome} ${sobrenome}`;
                
    // Formatar os dados em uma string de texto
    const clienteText = `${id}, ${nomeComleto}, ${cnh}, ${possuiReserva}\n`;

    // Salvar os dados no arquivo de texto
    fs.appendFile(arquivoCliente, clienteText, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao salvar os dados do carro.');
        } else {
            console.log('Dados do carro foram salvos no arquivo de texto.');
            res.status(200).send('Dados do carro foram salvos no arquivo de texto.');
        }
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
