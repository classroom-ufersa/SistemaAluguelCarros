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


var contadorCliente = 0;
var contadorCarros = 0;
var contaodrReservas = 0;
var valorAReceber = 0;

document.addEventListener("DOMContentLoaded", function () {
    tabelacliente();
    tabelaCarro();
    tabelaReservas();
});

function tabelacliente() {
    // URL da API de onde você obtém os dados
    const apiUrl = 'http://localhost:3000/clientes';
    getClientes(apiUrl)
}

function tabelaCarro() {
    const apiUrl = 'http://localhost:3000/carros';
    getCarros(apiUrl)
}

function tabelaReservas() {
    // URL da API de onde você obtém os dados
    const apiUrl = 'http://localhost:3000/clientes';
    getReservas(apiUrl)
}

function getClientes(apiUrl) {
    const tabela = document.getElementById('tabelaCliente'); // Obtém a tabela na qual os dados serão exibidos
    const tbody = tabela.querySelector('tbody'); // Obtém o corpo da tabela
    fetch(apiUrl) // Faz uma solicitação para a API usando a URL fornecida
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json(); // Converte a resposta em formato JSON
        })
        .then(data => {
            // Limpa qualquer conteúdo existente na tabela
            tbody.innerHTML = '';
            // Preenche a tabela com os dados da API
            data.forEach(item => {
                const tr = document.createElement('tr'); // Cria uma nova linha na tabela
                if (item.Status === 'Sim') {
                    // Código para quando o Status for 'Sim'
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

                    // Adiciona um evento de clique ao botão de edição
                    const eButton = tr.querySelector('.editButton');
                    eButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const linha = this.parentNode.parentNode; // Obtém a linha da tabela
                        const celulas = linha.querySelectorAll('td');
                        const form = document.getElementById('moldalEditReserva');

                        const cnhInput = form.elements['cnhAtual'];
                        cnhInput.readOnly = true;

                        // Preenche os campos do formulário com os valores
                        form.elements['nomeAtual'].value = celulas[0].textContent;
                        form.elements['sobrenomeAtual'].value = celulas[1].textContent;
                        cnhInput.value = celulas[2].textContent;

                    });

                    // Adiciona a linha à tabela
                    tabela.appendChild(tr);

                    // Adiciona um evento de clique ao botão de exclusão
                    const deleteButton = tr.querySelector('.deleteButton');
                    deleteButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const cnh = item.CNH;
                        deleteCliente(cnh);
                    });
                }

                // Adiciona a linha ao corpo da tabela
                tbody.appendChild(tr);
                const totalClientes = document.getElementById('totalClientes');

                totalClientes.textContent = `${contadorCliente}`;
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
}

function getCarros(apiUrl) {
    const tabela = document.getElementById('tabelaCarros'); // Obtém a tabela de carros do documento HTML
    const tbody = tabela.querySelector('tbody'); // Obtém o corpo da tabela

    // Faz uma solicitação para a API usando a URL fornecida
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            tbody.innerHTML = ''; // Limpa o conteúdo atual do corpo da tabela

            // Itera sobre os dados recebidos da API
            data.forEach(item => {
                contadorCarros++;
                console.log(contadorCarros)
                const tr = document.createElement('tr'); // Cria uma nova linha na tabela

                // Preenche as células da linha com os dados do item da API
                if (item.Status === 'Alugado') {
                    tr.innerHTML = `
                        <td>${item.Marca}</td>
                        <td>${item.Modelo}</td>
                        {item.Placa}</td>
                        <td>${item.Ano}</td>
                        <td>${item.Status}</td>
                        <td>R$ ${item.ValorDiaria}</td>
                        <td>${item.Cliente}</td>
                        <td>${item.valorReserva}</td>
                        <td>${item.totalDias}</td>
                        <td>${item.dataDevolucao}</td>
                        <td></td>
                        <td></td>
                    `;
                    const valorNumerico = parseFloat(item.valorReserva.replace(/[^\d,]/g, '').replace(',', '.'));

                    valorAReceber = valorAReceber + valorNumerico;

                    const valorFormatado = valorAReceber.toFixed(2);
                    // Formate o valor para o formato de moeda brasileira (R$ 1.000,00)
                    const valorFormatadoComoDinheiro = parseFloat(valorFormatado).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                    contaodrReservas++

                    const totalReceber = document.getElementById('totalReceber');

                    totalReceber.textContent = `${valorFormatadoComoDinheiro}`;

                } else {
                    tr.innerHTML = `
                    <td>${item.Marca}</td>
                    <td>${item.Modelo}</td>
                    <td class="placaDelete">${item.Placa}</td>
                    <td>${item.Ano}</td>
                    <td>${item.Status}</td>
                    <td>R$ ${item.ValorDiaria}</td>
                    <td>${item.Cliente}</td>
                    <td>${item.valorReserva}</td>
                    <td>${item.totalDias}</td>
                    <td>${item.dataDevolucao}</td>
                        <td class="tamanho"><button class="editButton" data-toggle="modal" data-target="#modalEdit"><i class="bi bi-pencil-square btn p-0"></button></td>
                        <td class="tamanho"><button class="deleteButton"><i class="bi bi-trash btn p-0"></button></td>
                    `;

                    // Adiciona a linha à tabela
                    tabela.appendChild(tr);
                }

                // Adiciona a linha ao corpo da tabela
                tbody.appendChild(tr);
            });
            const totalCarros = document.getElementById('totalCarros');

            totalCarros.textContent = `${contadorCarros - contaodrReservas}/${contadorCarros}`;
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
}
var dadosCliente
var diferencaEmDias
var placaData
const novaData = document.getElementById('tituloNovaData');
const novoValorReserva = document.getElementById('novoValorReserva'); // Obtenha o elemento com o ID 'novoValorReserva'
const placaInput = document.getElementById("placaReserva");
function getReservas(apiUrl) {
    const tabela = document.getElementById('tabelaReservas'); // Obtém a tabela na qual os dados serão exibidos
    const tbody = tabela.querySelector('tbody'); // Obtém o corpo da tabela
    fetch(apiUrl) // Faz uma solicitação para a API usando a URL fornecida
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json(); // Converte a resposta em formato JSON
        })
        .then(data => {
            // Limpa qualquer conteúdo existente na tabela
            tbody.innerHTML = '';
            // Preenche a tabela com os dados da API
            data.forEach(item => {
                contadorCliente++;
                const tr = document.createElement('tr'); // Cria uma nova linha na tabela
                if (item.Status === 'Sim') {
                    tr.innerHTML = `
                        <td>${item.Nome}</td>
                        <td>${item.Sobrenome}</td>
                        <td>${item.CNH}</td>
                        <td>${item.Status}</td>
                        <td>${item.Carro}</td>
                        <td style="display: none;">${item.Placa}</td>
                        <td>${item.valorReserva}</td>
                        <td>${item.totalDias}</td>
                        <td>${item.dataDevolucao}</td>
                        <td class="tamanho"><button class="editButton" data-toggle="modal" data-target="#moldalReserva"><i class="bi bi-pencil-square btn p-0"></button></td>
                        <td class="tamanho"><button class="editButtonReserva" data-toggle="modal" data-target="#moldalData"><i class="bi bi-calendar-date btn p-0"></button></td>
                        <td class="tamanho"><button class="deleteButton"><i class="bi bi-check2-square btn p-0"></button></td>
                    `;

                    // Adiciona um evento de clique ao botão de edição
                    const eButton = tr.querySelector('.editButton');
                    eButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const linha = this.parentNode.parentNode; // Obtém a linha da tabela
                        const celulas = linha.querySelectorAll('td');
                        const form = document.getElementById('moldalEditReserva');
                        const sobrenomeInput = form.elements['sobrenomeAtual'];
                        const nomeInput = form.elements['nomeAtual'];
                        const cnhInput = form.elements['cnhAtual'];
                        cnhInput.readOnly = true;
                        nomeInput.readOnly = true;
                        sobrenomeInput.readOnly = true;

                        // Preenche os campos do formulário com os valores
                        nomeInput.value = celulas[0].textContent;
                        sobrenomeInput.value = celulas[1].textContent
                        cnhInput.value = celulas[2].textContent;
                        placaInput.value = celulas[5].textContent;
                    });

                    const dButton = tr.querySelector('.editButtonReserva');
                    dButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const linha = this.parentNode.parentNode; // Obtém a linha da tabela
                        const celulas = linha.querySelectorAll('td');
                        const form = document.getElementById('moldalEditData');
                        placaData = celulas[5].textContent;
                        const dataInput = form.elements['dataAntiga'];
                        dataInput.readOnly = true;
                        const datacelula = celulas[8];
                        dataInput.value = datacelula.textContent;
                        var dataAtual = new Date();
                        var datanova;
                        if (new Date(dataInput.value) > dataAtual) {
                            datanova = new Date(dataInput.value);
                        } else {
                            datanova = dataAtual;
                        }
                        // Formata a data atual no formato 'YYYY-MM-DD'
                        var dataFormatada = datanova.toISOString().split('T')[0];
                        const modalData = document.getElementById('moldalData'); // Substitua 'moldalData' pelo ID do seu modal
                        if (getComputedStyle(modalData).display === 'none') {
                            // Limpa o campo de data e define o novoValorReserva como 'R$ 0'
                            novaData.value = '';
                            novoValorReserva.innerHTML = 'R$ 0';
                        }
                        novaData.setAttribute('min', dataFormatada);
                        const dias = celulas[7].textContent;
                        const valor = celulas[6].textContent;
                        const valorFloat = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));
                        const diasInt = parseInt(dias);
                        const novoValorDiaria = parseFloat(valorFloat / diasInt);
                        novaData.addEventListener("input", function () {
                            var dataInicioValue = new Date(dataInput.value);
                            var dataFimValue = new Date(novaData.value);
                            // Verifica se as datas são válidas
                            if (!isNaN(dataInicioValue) && !isNaN(dataFimValue)) {
                                const diferencaEmMilissegundos = dataFimValue - dataInicioValue;
                                diferencaEmDias = Math.abs(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                                var dias = parseInt(diferencaEmDias)
                                console.log(diferencaEmDias)
                                const valorTotal = novoValorDiaria * (dias + 1);
                                novoValorReserva.innerHTML = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });;
                                dadosCliente = new Cliente(celulas[0].textContent, celulas[1].textContent, celulas[2].textContent, celulas[4].textContent, celulas[5].textContent, celulas[3].textContent, novaData.value, diferencaEmDias, novoValorReserva.textContent)
                            } else {
                                console.log("Datas inválidas");
                            }
                        })
                    });

                    // Adiciona a linha à tabela
                    tabela.appendChild(tr);

                    // Adiciona um evento de clique ao botão de exclusão
                    const deleteButton = tr.querySelector('.deleteButton');
                    deleteButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const placa = item.Placa; // Declare a variável placa antes de usá-la
                        const cnh = item.CNH;
                        getCarro(placa)
                            .then(carro => {
                                console.log('Carro obtido:', carro);

                                // Faça o que precisar fazer com os dados do carro aqui
                            })
                            .catch(error => {
                                // Lide com erros, se houver algum
                                console.error('Erro ao obter o carro:', error);
                            });

                        getCliente(cnh)
                    });

                }
                // Adiciona a linha ao corpo da tabela
                tbody.appendChild(tr);
                const totalClientes = document.getElementById('totalClientes');

                totalClientes.textContent = `${contadorCliente}`;
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
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

function putCliente(cliente) {
    // Realiza uma requisição HTTP PUT
    fetch('http://localhost:3000/cliente', {
        method: 'PUT', // Método HTTP utilizado para atualização
        headers: {
            'Content-Type': 'application/json', // Define o tipo de conteúdo da requisição como JSON
        },
        body: JSON.stringify(cliente), // Converte o objeto 'cliente' em JSON e o envia no corpo da requisição
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

function getCarro(placa) {
    return fetch(`http://localhost:3000/carros/${placa}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then((data) => {
            const marca = data.Marca;
            const modelo = data.Modelo;
            const placa = data.Placa;
            const ano = data.Ano;
            const status = "Disponivel";
            const cliente = "";
            const dataDevolucao = "";
            const valorReserva = "";
            const totalDias = "";
            const valorDiaria = data.ValorDiaria;

            // Cria uma lista Carro com as informações coletadas
            const carro = new Carro(marca, modelo, placa, ano, valorDiaria, status, cliente, dataDevolucao, totalDias, valorReserva);
            putCarro(carro)
            // Retorna o objeto carro para que ele seja acessível externamente
            return carro;
        })
        .catch((error) => {
            // Trate erros, como exibir uma mensagem de erro
            console.error(`Erro ao buscar carro com placa ${placa}:`, error);
            throw error; // Rejeite o erro para que ele possa ser tratado posteriormente
        });
}

function getCarroReserva(placa) {
    return fetch(`http://localhost:3000/carros/${placa}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then((data) => {
            const marca = data.Marca;
            const modelo = data.Modelo;
            const placa = data.Placa;
            const ano = data.Ano;
            const status = data.Status
            const cliente = data.Cliente
            const dataDevolucao = data.dataDevolucao
            const valorReserva = data.valorReserva
            const totalDias = data.totalDias
            const valorDiaria = data.ValorDiaria;
            // Cria uma lista Carro com as informações coletadas
            const carro = new Carro(marca, modelo, placa, ano, valorDiaria, status, cliente, dataDevolucao, totalDias, valorReserva);

            // Retorna o objeto carro para que ele seja acessível externamente
            return carro;
        })
        .catch((error) => {
            // Trate erros, como exibir uma mensagem de erro
            console.error(`Erro ao buscar carro com placa ${placa}:`, error);
            throw error; // Rejeite o erro para que ele possa ser tratado posteriormente
        });
}

function getCliente(CNH) {
    fetch(`http://localhost:3000/clientes/${CNH}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API'); // Lança um erro se a resposta não for bem-sucedida
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then((data) => {
            console.log('Dados do Cliente:', data);
            data.Nome
            data.Sobrenome
            data.CNH
            const nome = data.Nome
            const sobrenome = data.Sobrenome
            const cnh = data.CNH
            const carroCliente = "";
            const placa = "";
            const statusCliente = "Não";
            const valorReserva = "";
            const dataDevolucao = "";
            const totalDias = "";

            // Cria um novo objeto Cliente com os valores atualizados
            const cliente = new Cliente(nome, sobrenome, cnh, carroCliente, placa, statusCliente, dataDevolucao, totalDias, valorReserva);
            putCliente(cliente)

        })
        .catch((error) => {
            // Trate erros, como exibir uma mensagem de erro
            console.error(`Erro ao excluir carro com placa ${CNH}:`, error);
        });
}

var botao = document.getElementById('atualizarReserva');
botao.disabled = true;
const sobrenomeClienteInput = document.getElementById("sobrenomeNovo");
const buscarNovoCliente = document.getElementById("nomeNovo");
const tabelaClientes = document.getElementById("tabelaCliente");
const linhasClinte = tabelaClientes.getElementsByTagName("tr");
const resultadosBuscaCliente = document.getElementById("resultadosBuscaCliente");
const cnhInput = document.getElementById("cnhNova");
buscarNovoCliente.addEventListener("input", function () {
    const termoBusca = buscarNovoCliente.value.toLowerCase();
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
                if (cnhInput.checkValidity()) {
                    botao.disabled = false;
                }
                const resultadoIndex = Array.from(opcoes).indexOf(opcao);
                buscarNovoCliente.value = resultados[resultadoIndex].Nome;
                sobrenomeClienteInput.value = resultados[resultadoIndex].Sobrenome;
                cnhInput.value = resultados[resultadoIndex].cnh;
                resultadosBuscaCliente.innerHTML = "";
            });
        });
    } else {
        resultadosBuscaCliente.innerHTML = "";
    }
    let teste = buscarNovoCliente.value.length
    if (buscarNovoCliente.value.trim() !== teste) {
        cnhInput.value = ""; // Define o valor de placaInput como vazio
        botao.disabled = true;
    }
});


document.getElementById('atualizarReserva').addEventListener('click', function (e) {
    var marcaCampoAtualizada = document.getElementById('cnhNova');
    var marca = document.getElementById('nomeNovo');
    if (marcaCampoAtualizada.checkValidity() && marca.checkValidity()) {
        enviarReservaAtualizada()
        e.preventDefault();
    }

});

function enviarReservaAtualizada() {
    const nome = document.getElementById('nomeNovo').value;
    const sobrenome = document.getElementById('sobrenomeNovo').value;
    const cnh = document.getElementById('cnhNova').value;
    const statusCliente = "Sim"
    var marca
    var modelo
    var placa
    var ano
    var valorDiaria
    var statuscarro
    var cliente = nome;
    var dataDevolucao
    var valorReserva
    var totalDias
    alert(placaInput.value)
    getCarroReserva(placaInput.value)
        .then(carro => {
            console.log('Carro obtido:', carro);
            marca = carro.marca
            modelo = carro.modelo
            placa = carro.placa
            ano = carro.ano
            valorDiaria = carro.valorDiaria
            statuscarro = carro.status
            dataDevolucao = carro.dataDevolucao
            valorReserva = carro.valorReserva
            totalDias = carro.totalDias
            var carroCliente = marca + ' ' + modelo;
            // Faça o que precisar fazer com os dados do carro aqui
            alert(status)
            const carro2 = new Carro(marca, modelo, placa, ano, valorDiaria, statuscarro, cliente, dataDevolucao, totalDias, valorReserva)
            putCarro(carro2)

            const clienteAtualizado = new Cliente(nome, sobrenome, cnh, carroCliente, placa, statusCliente, dataDevolucao, valorReserva, totalDias)
            putCliente(clienteAtualizado)
            const nomeAtual = document.getElementById('nomeAtual').value;
            const sobrenomeAtual = document.getElementById('sobrenomeAtual').value;
            const cnhAtual = document.getElementById('cnhAtual').value;
            const statusClienteAtual = "Não"
            const carroClienteVazio = ""
            const placaClienteVazio = ""
            const dataDevolucaoVazio = ""
            const totalDiasVazio = ""
            const valorReservaAntigo = ""
            const clienteAntigo = new Cliente(nomeAtual, sobrenomeAtual, cnhAtual, carroClienteVazio, placaClienteVazio, statusClienteAtual, dataDevolucaoVazio, totalDiasVazio, valorReservaAntigo)
            putCliente(clienteAntigo)
        })
        .catch(error => {
            // Lide com erros, se houver algum
            console.error('Erro ao obter o carro:', error);
        });
}

function enviardataAtual() {
    alert(placaData)
    getCarroReserva(placaData)
        .then(carro => {
            console.log('Carro obtido:', carro);
            var marca = carro.marca
            var modelo = carro.modelo
            var placa = carro.placa
            var ano = carro.ano
            var valorDiaria = carro.valorDiaria
            var statuscarro = carro.status
            var dataDevolucao = novaData.value
            var valorReserva = novoValorReserva.textContent
            var totalDias = diferencaEmDias;
            var cliente = carro.cliente
            // Faça o que precisar fazer com os dados do carro aqui
            const carro2 = new Carro(marca, modelo, placa, ano, valorDiaria, statuscarro, cliente, dataDevolucao, valorReserva, totalDias)
            console.log(dataDevolucao)
            putCarro(carro2)
            putCliente(dadosCliente)
                .catch(error => {
                    // Lide com erros, se houver algum
                    console.error('Erro ao obter o carro:', error);
                });
        });

}

document.getElementById('atualizarData').addEventListener('click', function (e) {
    e.preventDefault()
    enviardataAtual()
});

document.getElementById('barraDeBuscaReserva').addEventListener('input', buscarCliente);

function buscarCliente() {
  // Obtém o termo de busca do campo de entrada e converte para letras minúsculas
  const termoDeBusca = document.getElementById('barraDeBuscaReserva').value.toLowerCase();

  // Obtém a tabela onde os resultados serão filtrados
  const tabela = document.getElementById('tabelaReservas');

  // Obtém todas as linhas da tabela
  const linhas = tabela.getElementsByTagName('tr');

  // Itera sobre as linhas a partir da segunda linha (índice 1) - a primeira linha contém os cabeçalhos
  for (let i = 1; i < linhas.length; i++) {
    const linha = linhas[i];

    // Obtém todas as células da linha
    const celulas = linha.getElementsByTagName('td');

    // Inicialmente, assume que a linha corresponde ao termo de busca
    let corresponde = true;

    // Divide o termo de busca em palavras individuais
    const termos = termoDeBusca.split(' ');

    // Itera sobre cada termo de busca
    for (let j = 0; j < termos.length; j++) {
      const termo = termos[j];

      // Inicialmente, assume que o termo foi encontrado em alguma célula da linha
      let encontrado = false;

      // Itera sobre todas as células da linha
      for (let k = 0; k < celulas.length; k++) {
        const celula = celulas[k];
        const textoCelula = celula.textContent.toLowerCase();

        // Verifica se o termo está presente na célula
        if (textoCelula.includes(termo)) {
          encontrado = true;
          break;
        }
      }

      // Se o termo não foi encontrado em nenhuma célula da linha, a linha não corresponde
      if (!encontrado) {
        corresponde = false;
        break;
      }
    }

    // Define a exibição da linha com base na correspondência do termo de busca
    if (corresponde) {
      linha.style.display = ''; // Exibe a linha
    } else {
      linha.style.display = 'none'; // Oculta a linha
    }
  }
}