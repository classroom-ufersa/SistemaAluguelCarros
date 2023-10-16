import { Funcionario } from "./funcionario.js";

document.addEventListener('DOMContentLoaded', function () {
    const aquivoEnviado = document.getElementById('aquivoEnviado');
    const dadosDaTabela = document.getElementById('dadosDaTabela');
    const tbody = dadosDaTabela.querySelector('tbody');
    const form = document.getElementById('formTabela');
    const folhaSalarial = document.getElementById('folhaSalarial');
    const downloadButton = document.getElementById('downloadButton');
    const criarPlanilha = document.getElementById('criarPlanilha');
    const bemVindoSection = document.getElementById('bemVindo');
    const tabelaSection = document.getElementById('tabela');

    criarPlanilha.addEventListener('click', function () {

        const thead = document.createElement('thead');

        const tr = document.createElement('tr');

        const dadosColuna = ['Nome', 'Cargo', 'Salário'];

        for (const dadoColuna of dadosColuna) {

            const th = document.createElement('th');

            th.textContent = dadoColuna;

            tr.appendChild(th);
        }


        thead.appendChild(tr);

        dadosDaTabela.appendChild(thead);

        const planilhaVazia = XLSX.utils.aoa_to_sheet([dadosColuna]);

        const areaVazia = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(areaVazia, planilhaVazia, 'Planilha Vazia');

        const planilhaVaziaBlob = new Blob([s2ab(XLSX.write(areaVazia, { bookType: 'xlsx', type: 'binary' }))], {
            type: 'application/octet-stream'
        });

        bemVindoSection.style.display = 'none';

        tabelaSection.style.display = 'block';

        dadosDaTabela.style.display = 'table';
    });

    aquivoEnviado.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
                preencheTabela(sheetData);
                quickSort();
                bemVindoSection.style.display = 'none';
                tabelaSection.style.display = 'block';
            };
            reader.readAsArrayBuffer(file);
        }
    });
    

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const cargo = document.getElementById('cargo').value;
        const salario = document.getElementById('salario').value;

        if (name && cargo && salario) {
            const novoFuncionario = new Funcionario(name, cargo, salario);
            adicionarLinhaNaTabela(novoFuncionario, true); // Novo funcionário
            quickSort();
            form.reset();
        } else {
            alert('Preencha todos os campos do formulário.');
        }
    });

    downloadButton.addEventListener('click', function () {
        const dadosCabecalho = [];
        const cabecalhoLinha = dadosDaTabela.querySelector('thead tr');
        for (const celula of cabecalhoLinha.cells) {
            dadosCabecalho.push(celula.textContent);
        }
    
        const conteudoLinha = [];
        const linhas = dadosDaTabela.querySelectorAll('tbody tr');
        for (const row of linhas) {
            const conteudoLinhaCelula = [];
            
            // Ignorar as duas últimas células (Edit e Delete) em cada linha
            for (let i = 0; i < row.cells.length - 2; i++) {
                conteudoLinhaCelula.push(row.cells[i].textContent);
            }
            
            conteudoLinha.push(conteudoLinhaCelula);
        }
    
        const conteudo = [dadosCabecalho, ...conteudoLinha];
        const planilha = XLSX.utils.aoa_to_sheet(conteudo);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, planilha, 'Tabela');
    
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    
        function s2ab(s) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
    
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    
        const planilhaDowload = document.createElement('a');
        planilhaDowload.href = URL.createObjectURL(blob);
        planilhaDowload.download = 'Funcionarios.xlsx';
        planilhaDowload.click();
    });

    function adicionarLinhaNaTabela(funcionario) {
        const tr = document.createElement('tr');
        const celulas = [funcionario.nome, funcionario.cargo, funcionario.salario];

        for (const conteudoCelula of celulas) {
            const td = document.createElement('td');
            td.textContent = conteudoCelula;
            tr.appendChild(td);
        }
    
        // Adicione o botão "Edit"
        const editarDados = document.createElement('td');
        editarDados.classList.add('tamanho');
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="bi bi-pencil-square p-0"></i>';
        editButton.addEventListener('click', function () {
            editarLinhas(tr); // Chama a função para editar a linha
        });
        editarDados.appendChild(editButton);
        tr.appendChild(editarDados);
    
        // Adicione o botão "Delete"
        const deletarDados = document.createElement('td');
        deletarDados.classList.add('tamanho');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="bi bi-trash btn p-0"></i>';
        deleteButton.addEventListener('click', function () {
            deletaLinha(tr); // Chama a função para deletar a linha
        });
        deletarDados.appendChild(deleteButton);
        tr.appendChild(deletarDados);
    
        tbody.appendChild(tr);
        atualizaTotalFuncionarios();
        const totalSalario = calculaTotalSalario(); // Calcula a soma total dos salários
        folhaSalarial.querySelector('h2').textContent = `${totalSalario}`;
    }

    function editarLinhas(linha) {
        const celulas = linha.querySelectorAll('td');
        const form = document.getElementById('formTabela'); // Substitua pelo ID do seu formulário

        // Preencha os campos de formulário com os valores atuais da linha
        form.elements['name'].value = celulas[0].textContent; // Substitua 'name' pelo nome do campo
        form.elements['cargo'].value = celulas[1].textContent; // Substitua 'cargo' pelo nome do campo
        form.elements['salario'].value = celulas[2].textContent; // Substitua 'salario' pelo nome do campo

        // Remova a linha existente da tabela
        linha.remove();
        atualizaTotalFuncionarios();
    }
    
    function deletaLinha(linha) {
        linha.remove();
        
        const celualaSalarios = tbody.querySelectorAll('tr td:nth-child(3)');
        let totalSalario = 0;
    
        celualaSalarios.forEach(cell => {
            const celulaSalarioValor = parseFloat(cell.textContent.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
            totalSalario += celulaSalarioValor;
        });
    
        folhaSalarial.querySelector('h2').textContent = formataSalario(totalSalario);
        atualizaTotalFuncionarios();
    }
    
    function preencheTabela(data) {
        const thead = document.createElement('thead');
        const thRow = document.createElement('tr');
        const dadosColuna = ['Nome', 'Cargo', 'Salário'];
    
        for (const dadoColuna of dadosColuna) {
            const th = document.createElement('th');
            th.textContent = dadoColuna;
            thRow.appendChild(th);
        }
    
        thead.appendChild(thRow);
        dadosDaTabela.appendChild(thead);
    
        // Adicione os dados ao corpo da tabela, evitando adicionar os cabeçalhos novamente
        for (let i = 0; i < data.length; i++) {
            if (i !== 0) {
                const funcionario = new Funcionario(data[i][0], data[i][1], data[i][2]);
                adicionarLinhaNaTabela(funcionario);
            }
        }
    
        // Certifique-se de que a tabela seja visível
        dadosDaTabela.style.display = 'table';
    }
    
    
    
    function quickSort() {
    const linhas = Array.from(tbody.querySelectorAll('tr'));
    linhas.sort((a, b) => a.cells[0].textContent.localeCompare(b.cells[0].textContent));
        
    for (let row of linhas) {
        tbody.appendChild(row);
    }

     // Formatar coluna de salário
     const celualaSalarios = tbody.querySelectorAll('tr td:nth-child(3)'); // Coluna de salário é a terceira coluna
     celualaSalarios.forEach(cell => {
        const valorSalario = parseFloat(cell.textContent.replace('R$', '').replace('.', '').replace(',', '.').trim());
        cell.textContent = formataSalario(valorSalario);
    });    
    // Adicionar "R$" à coluna de salário após a ordenação
    for (let row of linhas) {
        const celulaSalario = row.cells[2]; // Supondo que o salário esteja na terceira coluna

        // Verifica se o "R$" já foi adicionado
        if (!celulaSalario.textContent.startsWith('R$')) {
            const valorSalario = celulaSalario.textContent;
            celulaSalario.textContent = `R$ ${valorSalario}`;
        }
    }
    }
         
    function totalFuncionarios() {
        const linhas = tbody.querySelectorAll('tr'); // Seleciona todas as linhas da tabela
        const totalFuncionarios = linhas.length; // Subtrai 1 para excluir a linha do cabeçalho
        return totalFuncionarios;
    }

    function atualizaTotalFuncionarios() {
        const totalFuncionariosAtualizado = totalFuncionarios();
        // Atualize o elemento HTML onde você deseja exibir o total
        document.getElementById('totalFuncionarios').textContent = totalFuncionariosAtualizado; // Substitua pelo ID correto
    }

    function formataSalario(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function calculaTotalSalario() {
        let totalSalario = 0;
    
        // Itera através das linhas da tabela para somar os salários
        const celulaSalarios = tbody.querySelectorAll('tr td:nth-child(3)'); // Coluna de salário é a terceira coluna
        celulaSalarios.forEach(cell => {
            const valorSalario = parseFloat(cell.textContent.replace('R$', '').replace('.', '').replace(',', '.').trim());
            totalSalario += valorSalario;
        });
    
        return formataSalario(totalSalario);
    }

    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
    
    $(document).ready(function () {
        $('#salario').maskMoney({
            thousands: '.',
            decimal: ',',
            affixesStay: false
        });
    });

    
});




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
// const carrosArray = [];

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
    const valor = document.getElementById('valor').value;


    const carro = new Carro(marca, modelo, placa, ano, valor);
    carrosList.append(carro);
    document.getElementById('valor').value = '';
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
            quickSortCarros(tbody) 
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
    const cliente = new Cliente(id, nome, sobrenome, cnh, valor);
    clienteList.append(cliente);

    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('cnh').value = '';
    // carrosArray.push(cliente); 
    // console.log('Conteúdo da LinkedListCarro:', carrosList.toArray());
    // carrosArray.forEach((cliente, index) => {
    //     console.log(`Cliente ${cliente + 1}:`);
    //     console.log(`id: ${cliente.id}`);
    //     console.log(`nome: ${cliente.nome}`);
    //     console.log(`sobrenome: ${cliente.sobrenome}`);
    //     console.log(`cnh: ${cliente.cnh}`);
    //     console.log(`Reserva?: ${cliente.possuiReserva}`);
    //     console.log('---');

    // });
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

function quickSortCarros(tbody) {
    const clientes = Array.from(tbody.querySelectorAll('tr'));
    clientes.sort((a, b) => {
        const nomeA = a.cells[0].textContent;
        const nomeB = b.cells[0].textContent;
        return nomeA.localeCompare(nomeB);
    });

    tbody.innerHTML = '';

    clientes.forEach((row) => {
        tbody.appendChild(row);
    });
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

function buscarCliente() {
    const termoDeBusca = document.getElementById('barraDeBuscaCliente').value.toLowerCase();
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

document.getElementById('barraDeBuscaCliente').addEventListener('input', buscarCliente);

function buscarCarro() {
    const termoDeBusca = document.getElementById('barraDeBuscaCarro').value.toLowerCase();
    const tabela = document.getElementById('tabelaCarros');
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

document.getElementById('barraDeBuscaCarro').addEventListener('input', buscarCarro);

