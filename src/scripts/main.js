import { Carro } from './carro.js';
import { Cliente } from './cliente.js';
import { LinkedListCarro } from './carro.js';
import { LinkedListCliente } from './cliente.js';


document.addEventListener("DOMContentLoaded", function () {
    const mostrarHomeLink = document.getElementById("mostrarHome");
    const mostrarReservarLink = document.getElementById("mostrarReservar");
    const mostrarCarrosLink = document.getElementById("mostrarCarros");
    const mostrarClientesLink = document.getElementById("mostrarClientes");
    const homeSection = document.getElementById("home");
    const reservarSection = document.getElementById("reservar");
    const carrosSection = document.getElementById("carros");
    const clientesSection = document.getElementById("clientes");


    mostrarHomeLink.addEventListener("click", function (e) {
        homeSection.style.display = "block";
        reservarSection.style.display = "none";
        carrosSection.style.display = "none";
        clientesSection.style.display = "none";
    });

    mostrarReservarLink.addEventListener("click", function (e) {
        homeSection.style.display = "none";
        reservarSection.style.display = "block";
        carrosSection.style.display = "none";
        clientesSection.style.display = "none";
    });
    mostrarCarrosLink.addEventListener("click", function (e) {
        homeSection.style.display = "none";
        reservarSection.style.display = "none";
        carrosSection.style.display = "block";
        clientesSection.style.display = "none";
    });
    mostrarClientesLink.addEventListener("click", function (e) {
        homeSection.style.display = "none";
        reservarSection.style.display = "none";
        carrosSection.style.display = "none";
        clientesSection.style.display = "block";
    });
});

const navLinks = document.querySelectorAll('.nav-item a.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remover a classe "active" de todos os links
        navLinks.forEach(navLink => {
            navLink.parentElement.classList.remove('active');
        });

        // Adicionar a classe "active" ao link selecionado
        this.parentElement.classList.add('active');
    });
});
const clienteList = new LinkedListCliente(); // Lista encadeada para armazenar os carros
//const clienteArray = [];

const carrosList = new LinkedListCarro(); // Lista encadeada para armazenar os carros
const carrosArray = []; 

window.addEventListener('load', () => {
    {
        
        fetch('carros.txt')
            .then((response) => response.text())
            .then((data) => {
                if (data.trim() !== '') { 
                    preencherTabelaCarro();
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do arquivo "carros.txt":', error);
            });

        fetch('clientes.txt')
            .then((response) => response.text())
            .then((data) => {
                if (data.trim() !== '') {
                    preencherTabelaCliente();
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do arquivo "clientes.txt":', error);
            });
    }
});

function criarCarro() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const placa = document.getElementById('placa').value;
    const ano = parseInt(document.getElementById('ano').value);

    const carro = new Carro(marca, modelo, placa, ano);
    carrosList.append(carro);

    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('ano').value = '';
}


document.getElementById('enviarCarro').addEventListener('click', (event) => {
    event.preventDefault(); 
    criarCarro();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:3000/adicionarCarro', true); 
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Dados do carro foram enviados com sucesso.');
        } else {
            alert('Ocorreu um erro ao enviar os dados do carro.');
        }
    };

    const carrosArray = carrosList.toArray();
    xhr.send(JSON.stringify(carrosArray[carrosArray.length - 1])); 
});


function preencherTabelaCarro() {
    const tabela = document.getElementById('tabelaCarros');
    const tbody = tabela.querySelector('tbody');

    fetch('carros.txt')
        .then((response) => response.text()) 
        .then((data) => {
            const linhas = data.trim().split('\n');
            linhas.forEach((linha) => {
                const [marca, modelo, placa, ano, status] = linha.split(', ');
                const marcaModelo = `${marca} ${modelo}`;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${marcaModelo}</td>
                    <td>${placa}</td>
                    <td>${ano}</td>
                    <td>${status}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                `;

                tbody.appendChild(row);

            });
        })
        .catch((error) => {
            console.error('Erro ao buscar dados do arquivo "carros.txt":', error);
        });
}


function criarCliente() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const cnh = document.getElementById('cnh').value;
    const id = generateRandomID(8);
    const cliente = new Cliente(id, nome, sobrenome, cnh);
    clienteList.append(cliente);

    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('cnh').value = '';
    carrosArray.push(cliente); 
    console.log('Conteúdo da LinkedListCarro:', carrosList.toArray());
    carrosArray.forEach((cliente, index) => {
        console.log(`Cliente ${cliente + 1}:`);
        console.log(`id: ${cliente.id}`);
        console.log(`nome: ${cliente.nome}`);
        console.log(`sobrenome: ${cliente.sobrenome}`);
        console.log(`cnh: ${cliente.cnh}`);
        console.log(`Reserva?: ${cliente.possuiReserva}`);
        console.log('---');

    });
}


document.getElementById('enviarCliente').addEventListener('click', (event) => {
    event.preventDefault(); 
    criarCliente();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:3000/adicionarCliente', true); 
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Dados do Cliente foram enviados com sucesso.');
        } else {
            alert('Ocorreu um erro ao enviar os dados do Cliente.');
        }
    };

    const clienteArray = clienteList.toArray();
    xhr.send(JSON.stringify(clienteArray[clienteArray.length - 1])); 
});

function preencherTabelaCliente() {
    const tabela = document.getElementById('tabelaCliente');
    const tbody = tabela.querySelector('tbody');

    fetch('clientes.txt') 
        .then((response) => response.text()) 
        .then((data) => {
            const linhas = data.trim().split('\n');
            linhas.forEach((linha) => {
                const [id, nome, sobrenome, cnh, possuiReserva] = linha.split(', ');
                const nomeComleto = `${nome} ${sobrenome}`;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${id}</td>
                    <td>${nomeComleto}</td>
                    <td>${cnh}</td>
                    <td>${possuiReserva}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                `;
                tbody.appendChild(row);

            });
            quickSort(tbody);
        })
        .catch((error) => {
            console.error('Erro ao buscar dados do arquivo "carros.txt":', error);
        });
}


function generateRandomID(length) {
    let randomID = '';
    const digits = '0123456789';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        randomID += digits.charAt(randomIndex);
    }

    return randomID;
}

function quickSort(tbody) {
    const clientes = Array.from(tbody.querySelectorAll('tr'));
    clientes.sort((a, b) => {
        const nomeA = a.cells[1].textContent;
        const nomeB = b.cells[1].textContent;
        return nomeA.localeCompare(nomeB);
    });

    tbody.innerHTML = '';

    clientes.forEach((row) => {
        tbody.appendChild(row);
    });
}

function buscarNaTabela() {
    const termoDeBusca = document.getElementById('barraDeBusca').value.toLowerCase(); 
    const tabela = document.getElementById('tabelaCliente');
    const linhas = tabela.getElementsByTagName('tr');

    for (let i = 1; i < linhas.length; i++) {
        const linha = linhas[i];
        const celulas = linha.getElementsByTagName('td');
        let corresponde = false;

        for (let j = 0; j < celulas.length; j++) {
            const celula = celulas[j];
            const textoCelula = celula.textContent.toLowerCase();

            if (textoCelula.includes(termoDeBusca)) {
                corresponde = true;
                break;
            }
        }

        if (corresponde) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    }
}

document.getElementById('barraDeBusca').addEventListener('input', buscarNaTabela);
