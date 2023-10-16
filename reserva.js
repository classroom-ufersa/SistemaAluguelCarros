class Carro {
    constructor(marca, modelo, placa, ano, valorDiaria, status, cliente, dataDevolucao, valorReserva, totalDias) {
        this.marca = marca;
        this.modelo = modelo;
        this.placa = placa;
        this.ano = ano;
        this.status = status;
        this.valorDiaria = valorDiaria;
        this.cliente = cliente;
        this.valorReserva = valorReserva;
        this.dataDevolucao = dataDevolucao;
        this.totalDias = totalDias;
    }
};

class ListaCarro {
    constructor(carro) {
        this.carro = carro;
        this.next = null;
    }
}

class LinkedListCarro {
    constructor() {
        this.head = null;
    }

    append(carro) {
        const carroNo = new ListaCarro(carro);
        if (!this.head) {
            this.head = carroNo;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = carroNo;
        }
    }

    toArray() {
        const carrosArray = [];
        let current = this.head;
        while (current) {
            carrosArray.push(current.carro);
            current = current.next;
        }
        return carrosArray;
    }
}

class Cliente {
    constructor(nome, sobrenome, cnh, carroCliente, placa, status, dataDevolucao, totalDias, valorReserva) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cnh = cnh;
        this.carroCliente = carroCliente;
        this.placa = placa;
        this.status = status;
        this.totalDias = totalDias;
        this.valorReserva = valorReserva;
        this.dataDevolucao = dataDevolucao;
    }
};

class listaCliente {
    constructor(cliente) {
        this.cliente = cliente;
        this.next = null;
    }
}

// Classe LinkedList para gerenciar a lista encadeada de clientes
class LinkedListClinete {
    constructor() {
        this.head = null;
    }

    append(cliente) {
        const clienteNo = new listacliente(cliente);
        if (!this.head) {
            this.head = clienteNo;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = clienteNo;
        }
    }

    toArray() {
        const clientesArray = [];
        let current = this.head;
        while (current) {
            clientesArray.push(current.cliente);
            current = current.next;
        }
        return clientesArray;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    tabelaCarro();
    tabelacliente()

});

const infoCarro = new LinkedListCarro();

function tabelaCarro() {
    const tabela = document.getElementById('tabelaCarros');
    const tbody = tabela.querySelector('tbody');

    // URL da API de onde você obtém os dados
    const apiUrl = 'http://localhost:3000/carros';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(data => { 
            // Preencher a tabela com os dados da API
            data.forEach(item => {
                const tr = document.createElement('tr');
                if (item.Status === 'Alugado') {
                    // Código para quando o Status for 'Alugado'
                    tr.innerHTML = `
                    <td>${item.Marca}</td>
                    <td>${item.Modelo}</td>
                    <td class="placaDelete">${item.Placa}</td>
                    <td>${item.Ano}</td>
                    <td>${item.Status}</td>
                    <td>${item.ValorDiaria}</td>
                    <td>${item.Cliente}</td>
                    <td>${item.valorReserva}</td>
                    <td>${item.totalDias}</td>
                    <td>${item.dataDevolucao}</td>
                    <td></td>
                    <td></td>
            `;
                } else {
                    tr.innerHTML = `
                    <td>${item.Marca}</td>
                    <td>${item.Modelo}</td>
                    <td class="placaDelete">${item.Placa}</td>
                    <td>${item.Ano}</td>
                    <td>${item.Status}</td>
                    <td>${item.ValorDiaria}</td>
                    <td>${item.Cliente}</td>
                    <td>${item.valorReserva}</td>
                    <td>${item.totalDias}</td>
                    <td>${item.dataDevolucao}</td>
              <td class="tamanho"><button class="editButton" data-toggle="modal" data-target="#modalEdit"><i class="bi bi-pencil-square btn p-0"></button></td>
              <td class="tamanho"><button class="deleteButton"><i class="bi bi-trash btn p-0"></button></td>
            `;
                    const eButton = tr.querySelector('.editButton');
                    eButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const linha = this.parentNode.parentNode; // Obtém a linha clicada
                        const celulas = linha.querySelectorAll('td');
                        const form = document.getElementById('carroFormEdit');

                        // Obtém o texto da coluna "marca" da célula 0
                        const marcaModeloTexto = celulas[0].textContent;

                        // Divide a string em "marca" e "modelo" usando um espaço como separador
                        const partes = marcaModeloTexto.split(' ');

                        if (partes.length >= 2) {
                            const marca = partes[0];
                            const modelo = partes.slice(1).join(' ');
                            const placaInput = form.elements['placaAtualizado'];
                            placaInput.readOnly = true;
                            // Preenche os campos do formulário com os valores
                            form.elements['marcaAtualizada'].value = marca;
                            form.elements['modeloAtualizado'].value = modelo;
                            placaInput.value = celulas[1].textContent;
                            form.elements['anoAtualizado'].value = celulas[2].textContent;
                            form.elements['valorAtualizado'].value = celulas[4].textContent;
                        } else {
                            console.error('Formato da string incorreto. Não foi possível dividir em marca e modelo.');
                        }
                    });
                    tabela.appendChild(tr);
                    const deleteButton = tr.querySelector('.deleteButton');
                    deleteButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const placa = item.Placa;
                        excluirCarro(placa);
                    });
                }


                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
}
function tabelacliente() {
    const tabela = document.getElementById('tabelaCliente');
    const tbody = tabela.querySelector('tbody');

    // URL da API de onde você obtém os dados
    const apiUrl = 'http://localhost:3000/clientes';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(data => {

            // Preencher a tabela com os dados da API
            data.forEach(item => {
                const tr = document.createElement('tr');
                if (item.Status === 'Sim') {
                    // Código para quando o Status for 'Indisponivel'
                    tr.innerHTML = `
              <td>${item.Nome}</td>
              <td>${item.Sobrenome}</td>
              <td>${item.CNH}</td>
              <td>${item.Status}</td>
              <td>${item.Carro}</td>
              <td>${item.Placa}</td>
              <td>${item.valorReserva}</td>
              <td>${item.totalDias}</td>
              <td>${item.dataDevolucao}</td>
              <td></td>
              <td></td>
            `;
                } else {
                    tr.innerHTML = `
            <td>${item.Nome}</td>
            <td>${item.Sobrenome}</td>
            <td>${item.CNH}</td>
            <td>${item.Status}</td>
            <td>${item.Carro}</td>
            <td>${item.Placa}</td>
            <td>${item.valorReserva}</td>
            <td>${item.totalDias}</td>
            <td>${item.dataDevolucao}</td>
              <td class="tamanho"><button class="editButton" data-toggle="modal" data-target="#moldalClienteEdit"><i class="bi bi-pencil-square btn p-0"></button></td>
              <td class="tamanho"><button class="deleteButton"><i class="bi bi-trash btn p-0"></button></td>
            `;
                    const eButton = tr.querySelector('.editButton');
                    eButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const linha = this.parentNode.parentNode; // Obtém a linha clicada
                        const celulas = linha.querySelectorAll('td');
                        const form = document.getElementById('clienteFormEdit');

                        // Obtém o texto da coluna "marca" da célula 0
                        const nomeSobrenomeTexto = celulas[0].textContent;

                        // Divide a string em "marca" e "modelo" usando um espaço como separador
                        const partes = nomeSobrenomeTexto.split(' ');

                        if (partes.length >= 2) {
                            const nome = partes[0];
                            const sobrenome = partes.slice(1).join(' ');
                            const cnhInput = form.elements['cnhAtualizada'];
                            cnhInput.readOnly = true;
                            // Preenche os campos do formulário com os valores
                            form.elements['nomeAtualizado'].value = nome;
                            form.elements['sobrenomeAtualizado'].value = sobrenome;
                            cnhInput.value = celulas[1].textContent;
                        } else {
                            console.error('Formato da string incorreto. Não foi possível dividir em marca e modelo.');
                        }
                    });
                    tabela.appendChild(tr);
                    const deleteButton = tr.querySelector('.deleteButton');
                    deleteButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const cnh = item.CNH;
                        excluircliente(cnh);
                    });
                }
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
}

const modeloCarroInput = document.getElementById("carroReservarModelo");
const buscaCarroInput = document.getElementById("carroReservar");
const tabelaCarros = document.getElementById("tabelaCarros");
const linhas = tabelaCarros.getElementsByTagName("tr");
const resultadosBusca = document.getElementById("resultadosBusca");
const placaInput = document.getElementById("placaCarro");
const anoInput = document.getElementById("anoCarro");
let valorFinalDiaria;
buscaCarroInput.addEventListener("input", function () {
    const termoBusca = buscaCarroInput.value.toLowerCase();
    let resultados = [];

    if (termoBusca.trim() !== "") {
        for (let i = 1; i < linhas.length; i++) {
            const linha = linhas[i];
            const colunas = linha.getElementsByTagName("td");
            const marca = colunas[0].textContent.toLowerCase();
            const Marca = colunas[0].textContent;
            const Modelo = colunas[1].textContent;
            const Placa = colunas[2].textContent;
            const placa = colunas[2].textContent.toLowerCase();
            const ano = colunas[3].textContent;
            const statusColuna = colunas[4].textContent;
            const valor = colunas[5].textContent;
            const valorFloat = parseFloat(valor.replace(/\./g, '').replace(',', '.'));

            if (statusColuna !== "Alugado") {
                const texto = `${marca} ${placa}  ${ano}`;
                const termosBusca = termoBusca.split(' '); // Divide o termo de busca em palavras individuais

                // Verifica se todas as palavras estão presentes na linha
                const todasAsPalavrasEncontradas = termosBusca.every(termo => texto.includes(termo));

                if (todasAsPalavrasEncontradas) {
                    resultados.push({ Marca, Placa, ano, valorFloat, Modelo });
                }
            }
        }
    }

    if (resultados.length > 0) {
        const resultadoHTML = resultados.map(resultado => `<div class="opcao">Carro: ${resultado.Marca} ${resultado.Modelo} Ano: ${resultado.ano} Placa: ${resultado.Placa}</div>`).join('');
        resultadosBusca.innerHTML = resultadoHTML;
        const opcoes = document.querySelectorAll(".opcao");
        opcoes.forEach(opcao => {
            opcao.addEventListener("click", function () {
                const resultadoIndex = Array.from(opcoes).indexOf(opcao);
                buscaCarroInput.value = resultados[resultadoIndex].Marca;
                modeloCarroInput.value = resultados[resultadoIndex].Modelo;
                placaInput.value = resultados[resultadoIndex].Placa;
                anoInput.value = resultados[resultadoIndex].ano;
                resultadosBusca.innerHTML = "";
                console.log(resultados[resultadoIndex].valorFloat);
                valorFinalDiaria = resultados[resultadoIndex].valorFloat;
                dataInicio.disabled = false;
                calcularValorFinal();
            });
        });
    } else {
        resultadosBusca.innerHTML = "";
    }
    let teste = buscaCarroInput.value.length
    if (buscaCarroInput.value.trim() !== teste) {
        placaInput.value = ""; // Define o valor de placaInput como vazio
        document.getElementById('valorFinalReserva').innerHTML = 'R$ 0'
        botaoReserva.disabled = true;
    }

});

const sobrenomeClienteInput = document.getElementById("clienteReservarSobrenome");
const buscaClienteInput = document.getElementById("clienteReservar");
const tabelaClientes = document.getElementById("tabelaCliente");
const linhasClinte = tabelaClientes.getElementsByTagName("tr");
const resultadosBuscaCliente = document.getElementById("resultadosBuscaCliente");
const cnhInput = document.getElementById("cnhCliente");
buscaClienteInput.addEventListener("input", function () {
    const termoBusca = buscaClienteInput.value.toLowerCase();
    let resultados = [];
    if (termoBusca.trim() !== "") {
        for (let i = 1; i < linhasClinte.length; i++) {
            const linha = linhasClinte[i];
            const colunas = linha.getElementsByTagName("td");
            const statusColuna = colunas[3].textContent;
            const nome = colunas[0].textContent.toLowerCase();
            const Nome = colunas[0].textContent;
            const Sobrenome = colunas[1].textContent;
            const cnh = colunas[2].textContent;
            if (statusColuna !== "Sim") {
                const texto = `${nome} ${cnh}`;
                const termosBusca = termoBusca.split(' '); // Divide o termo de busca em palavras individuais

                // Verifica se todas as palavras estão presentes na linha
                const todasAsPalavrasEncontradas = termosBusca.every(termo => texto.includes(termo));

                if (todasAsPalavrasEncontradas) {
                    resultados.push({ Nome, cnh, Sobrenome });
                }
            }
        }
    }

    if (resultados.length > 0) {
        const resultadoHTML = resultados.map(resultado => `<div class="opcao">Cliente: ${resultado.Nome} ${resultado.Sobrenome} CNH: ${resultado.cnh}</div>`).join('');
        resultadosBuscaCliente.innerHTML = resultadoHTML;
        const opcoes = document.querySelectorAll(".opcao");
        opcoes.forEach(opcao => {
            opcao.addEventListener("click", function () {
                const resultadoIndex = Array.from(opcoes).indexOf(opcao);
                buscaClienteInput.value = resultados[resultadoIndex].Nome;
                sobrenomeClienteInput.value = resultados[resultadoIndex].Sobrenome;
                cnhInput.value = resultados[resultadoIndex].cnh;
                resultadosBuscaCliente.innerHTML = "";

            });
        });
    } else {
        resultadosBuscaCliente.innerHTML = "";
    }
    let teste = buscaClienteInput.value.length
    if (buscaClienteInput.value.trim() !== teste) {
        cnhInput.value = ""; // Define o valor de placaInput como vazio
    }
});

var dataAtual = new Date();
var dataFormatada = dataAtual.toISOString().split('T')[0];

var dataInicio = document.getElementById('dataLocacao');
var dataFim = document.getElementById('dataEntrega');

// Define o atributo 'min' no elemento de entrada para a data atual
dataInicio.setAttribute('min', dataFormatada);

dataInicio.addEventListener("change", function () {
    dataFim.setAttribute('min', dataInicio.value);
  });
// Acessa os valores corretamente a partir do resultado
var diferencaEmDias;
var valorFinalReserva// diferencaEmDias;

var botaoReserva = document.getElementById('fazerReserva');

dataInicio.disabled = true;    
dataFim.disabled = true;
botaoReserva.disabled = true;
// Função para calcular o valor final da reserva
function calcularValorFinal() {
    var dataInicioValue = new Date(dataInicio.value);
    var dataFimValue = new Date(dataFim.value);
    const datas = document.querySelectorAll(".data");
    const diferencaEmMilissegundos = dataFimValue - dataInicioValue;
    diferencaEmDias = Math.abs(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
    valorFinalReserva = ((diferencaEmDias + 1) * valorFinalDiaria).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    datas.forEach(data => {
        data.addEventListener("input", function () {
            dataFim.disabled = false;
            dataFim.value = '';
        });
    });

    if (dataInicio.checkValidity()) {
        if (dataInicioValue > dataFimValue) {
            document.getElementById('valorFinalReserva').innerHTML = 'R$ 0'
        } else {
            // Exibir o valor final da reserva
            document.getElementById('valorFinalReserva').innerHTML = valorFinalReserva
            botaoReserva.disabled = false;
        }
        if (dataInicioValue > dataFimValue) {
            botaoReserva.disabled = true;
        }
    }
}


// Associar a função de cálculo ao evento 'input' do campo 'dataEntrega'
dataEntrega.addEventListener('input', calcularValorFinal);

// Chamar a função de cálculo quando o botão 'fazerReserva' é clicado

document.getElementById('fazerReserva').addEventListener('click', function (e) {
    var marcaCampoAtualizada = document.getElementById('carroReservar');
    var modeloCampoAtualizada = document.getElementById('clienteReservar');
    if (marcaCampoAtualizada.checkValidity() && modeloCampoAtualizada.checkValidity()) {
        enviarResrvaBranco()
        e.preventDefault();
    }


});

var dataInicio = document.getElementById('dataLocacao');
var dataFim = document.getElementById('dataEntrega');

function enviarResrvaBranco() {
    const marca = document.getElementById('carroReservar').value;
    const modelo = document.getElementById('carroReservarModelo').value;
    var carroCliente = marca + ' ' + modelo;
    const placa = document.getElementById('placaCarro').value;
    const ano = document.getElementById('anoCarro').value;
    const valorDiaria = valorFinalDiaria;
    const status = "Alugado"
    const cliente = document.getElementById('clienteReservar').value;
    const dataDevolucao = document.getElementById('dataEntrega').value;
    const valorReserva = valorFinalReserva;
    const totalDias = diferencaEmDias + 1;

    const carro = new Carro(marca, modelo, placa, ano, valorDiaria, status, cliente, dataDevolucao, valorReserva, totalDias)

    putCarro(carro)
    const nome = document.getElementById('clienteReservar').value;
    const sobrenome = document.getElementById('clienteReservarSobrenome').value;
    const cnh = document.getElementById('cnhCliente').value;
    const statusCliente = "Sim"

    const clienteAtualizado = new Cliente(nome, sobrenome, cnh, carroCliente, placa, statusCliente, dataDevolucao, totalDias, valorReserva)
    putCliente(clienteAtualizado)
}

function putCliente(clienteAtualizado) {
    // Realiza uma requisição HTTP PUT
    fetch('http://localhost:3000/cliente', {
        method: 'PUT', // Método HTTP utilizado para atualização
        headers: {
            'Content-Type': 'application/json', // Define o tipo de conteúdo da requisição como JSON
        },
        body: JSON.stringify(clienteAtualizado), // Converte o objeto 'cliente' em JSON e o envia no corpo da requisição
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API'); // Trata erros na resposta da API
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then((data) => {
            if (data.statusCode === 200) {
                // Se a atualização for bem-sucedida, exibe um alerta informando o sucesso
                alert('Cliente atualizado com sucesso.');
            } else {
                throw new Error('Erro na atualização do cliente.');
            }
        })
        .catch((error) => {
            console.error('Erro ao atualizar o cliente:', error); // Trata erros na atualização do cliente e exibe mensagens de erro
        });
}

function putCarro(carro) {
    // Envia uma solicitação PUT (ou POST) para a API com o objeto carro em formato JSON
    fetch('http://localhost:3000/carro', {
        method: 'PUT', // Define o método HTTP como PUT (ou POST, dependendo da sua API)
        headers: {
            'Content-Type': 'application/json', // Define o tipo de conteúdo da solicitação como JSON
        },
        body: JSON.stringify(carro), // Converte o objeto carro em JSON e o envia no corpo da solicitação
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API'); // Lança um erro se a resposta não for bem-sucedida
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then((data) => {
            if (data.statusCode === 200) {
                // Atualização bem-sucedida
                alert('Carro atualizado com sucesso.');
            } else {
                throw new Error('Erro na atualização do carro.');
            }
        })
        .catch((error) => {
            // Trate erros, como exibir uma mensagem de erro
            console.error('Erro ao atualizar o carro:', error);
        });
}


