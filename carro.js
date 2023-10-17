class Carro {
    constructor(marca, modelo, placa, ano, valorDiaria, status, cliente, dataDevolucao, valorReserva, totalDias) {
        this.marca = marca; // Marca do carro
        this.modelo = modelo; // Modelo do carro
        this.placa = placa; // Placa do carro
        this.ano = ano; // Ano de fabricação do carro
        this.status = status; // Status do carro (disponível ou alugado)
        this.valorDiaria = valorDiaria; // Valor da diária de aluguel
        this.cliente = cliente; // Informações do cliente que alugou o carro
        this.valorReserva = valorReserva; // Valor da reserva do carro
        this.dataDevolucao = dataDevolucao; // Data prevista para a devolução do carro
        this.totalDias = totalDias; // Total de dias do aluguel
    }
};

class listaCarro {
    constructor(carro) {
        this.carro = carro; // Carro associado a este nó da lista
        this.next = null; // Referência para o próximo nó da lista
    }
}

class LinkedListCarro {
    constructor() {
        this.head = null; // Nó inicial da lista encadeada de carros
    }

    append(carro) {
        const carroNo = new listaCarro(carro); // Cria um novo nó da lista com o carro
        if (!this.head) {
            this.head = carroNo; // Se a lista estiver vazia, o novo nó se torna o nó inicial
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = carroNo; // Adiciona o novo nó no final da lista
        }
    }

    toArray() {
        const carrosArray = [];
        let current = this.head;
        while (current) {
            carrosArray.push(current.carro); // Adiciona carros à matriz
            current = current.next;
        }
        return carrosArray;
    }
}

const infoCarro = new LinkedListCarro(); // Cria uma nova lista encadeada de carros e a armazena na variável 'infoCarro'

document.addEventListener("DOMContentLoaded", function () {
    tabelaCarro();
});

//Funções de preenchimento de tabelas
function tabelaCarro() {
    const apiUrl = 'http://localhost:3000/carros';
    getCarros(apiUrl)
}

function enviarCarrosBanco() {
    // Coleta informações do formulário HTML
    const marca = formatarTexto(document.getElementById('marca').value); // Coleta e formata a marca do carro
    const modelo = formatarTexto(document.getElementById('modelo').value); // Coleta e formata o modelo do carro
    const placa = document.getElementById('placa').value.toUpperCase(); // Coleta e converte para maiúsculas a placa do carro
    const ano = document.getElementById('ano').value; // Coleta o ano do carro
    const valorDiaria = document.getElementById('valor').value; // Coleta o valor da diária do carro
    const status = "Disponível"; // Define o status como "Disponível"
    const cliente = ""; // Inicializa o cliente como vazio
    const dataDevolucao = ""; // Inicializa a data de devolução como vazia
    const valorReserva = ""; // Inicializa o valor da reserva como vazio
    const totalDias = ""; // Inicializa o total de dias como vazio

    // Cria uma lista Carro com as informações coletadas
    const carro = new Carro(marca, modelo, placa, ano, valorDiaria, status, cliente, dataDevolucao, totalDias, valorReserva);
    console.log(carro)
    // Envia a lista do carro para a função que faz o envio pro servidor
    postCarro(carro);
}


function enviarCarroAtualizado() {
    // Coleta informações do formulário HTML
    const marca = formatarTexto(document.getElementById('marcaAtualizada').value); // Coleta e formata a marca atualizada do carro
    const modelo = formatarTexto(document.getElementById('modeloAtualizado').value); // Coleta e formata o modelo atualizado do carro
    const placa = document.getElementById('placaAtualizado').value; // Coleta a placa 
    const ano = document.getElementById('anoAtualizado').value; // Coleta o ano atualizado do carro
    const valorDiaria = document.getElementById('valorAtualizado').value; // Coleta o valor da diária atualizado do carro
    const status = "Disponivel"; // Define o status como "Disponivel"
    const cliente = ""; // Inicializa o cliente como vazio
    const dataDevolucao = ""; // Inicializa a data de devolução como vazia
    const valorReserva = ""; // Inicializa o valor da reserva como vazio
    const totalDias = ""; // Inicializa o total de dias como vazio

    // Cria uma lista Carro com as informações coletadas
    const carro = new Carro(marca, modelo, placa, ano, valorDiaria, status, cliente, dataDevolucao, totalDias, valorReserva);

    // Envia a lista do carro para a função que faz o envio pro servidor
    putCarro(carro);
}

// Adiciona um ouvinte de eventos de entrada à barra de busca com o ID "barraDeBuscaCarro"
document.getElementById('barraDeBuscaCarro').addEventListener('input', buscarCarro);

// Função para buscar carros com base no termo de busca
function buscarCarro() {
    // Obtém o termo de busca, remove acentos e converte para letras minúsculas
    const termoDeBusca = removerAcentos(document.getElementById('barraDeBuscaCarro').value.toLowerCase());

    // Obtém a tabela que contém os carros
    const tabela = document.getElementById('tabelaCarros');

    // Obtém todas as linhas da tabela
    const linhas = tabela.getElementsByTagName('tr');

    // Percorre as linhas da tabela (começando a partir da segunda linha, já que a primeira é o cabeçalho)
    for (let i = 1; i < linhas.length; i++) {
        const linha = linhas[i];

        // Obtém todas as células (colunas) na linha
        const celulas = linha.getElementsByTagName('td');

        // Inicializa a variável que indica se a linha corresponde ao termo de busca
        let corresponde = true;

        // Divide o termo de busca em palavras individuais
        const termos = termoDeBusca.split(' ');

        // Itera sobre cada termo de busca
        for (let j = 0; j < termos.length; j++) {
            const termo = termos[j];

            // Inicializa a variável que indica se o termo foi encontrado em alguma célula da linha
            let encontrado = false;

            // Itera sobre todas as células da linha
            for (let k = 0; k < celulas.length; k++) {
                const celula = celulas[k];
                const textoCelula = removerAcentos(celula.textContent.toLowerCase());

                // Se o termo estiver contido no texto da célula, o termo foi encontrado
                if (textoCelula.includes(termo)) {
                    encontrado = true;
                    break;
                }
            }

            // Se um dos termos não for encontrado em nenhuma célula da linha, a linha não corresponde
            if (!encontrado) {
                corresponde = false;
                break;
            }
        }

        // Exibe ou oculta a linha com base na correspondência com o termo de busca
        if (corresponde) {
            linha.style.display = ''; // Exibe a linha
        } else {
            linha.style.display = 'none'; // Oculta a linha
        }
    }
}

//funções que interagem com o banco
// Função para buscar carros na API e atualizar a tabela de carros no HTML
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
                const tr = document.createElement('tr'); // Cria uma nova linha na tabela

                // Preenche as células da linha com os dados do item da API
                if (item.Status === 'Alugado') {
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
                        <td></td>
                        <td></td>
                    `;
                    console.log(item.ValorDiaria)
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

                    // Adiciona um evento de clique para o botão de edição
                    // Seleciona o botão de edição na linha da tabela
                    const eButton = tr.querySelector('.editButton');

                    // Adiciona um evento de clique ao botão de edição
                    eButton.addEventListener('click', function (e) {
                        e.preventDefault(); // Impede o comportamento padrão do botão (neste caso, evitar a abertura de um link)

                        // Obtém a linha (tr) pai do botão de edição
                        const linha = this.parentNode.parentNode;

                        // Obtém todas as células (colunas) na linha
                        const celulas = linha.querySelectorAll('td');

                        // Obtém o formulário de edição no documento HTML
                        const form = document.getElementById('carroFormEdit');

                        // Obtém o texto da primeira célula da linha, que geralmente contém a marca e modelo do carro
                        const marcaModeloTexto = celulas[0].textContent;

                        // Divide o texto em partes, separando a marca do modelo
                        const partes = marcaModeloTexto.split(' ');

                        const placaInput = form.elements['placaAtualizado'];
                        placaInput.readOnly = true;

                        // Preenche os campos do formulário de edição com as informações do carro
                        form.elements['marcaAtualizada'].value = celulas[0].textContent;
                        form.elements['modeloAtualizado'].value = celulas[1].textContent;
                        placaInput.value = celulas[2].textContent;
                        form.elements['anoAtualizado'].value = celulas[3].textContent; // Preenche o ano
                        form.elements['valorAtualizado'].value = (celulas[5].textContent).replace('R$', '').trim(); // Preenche o valor (removendo "R$" e espaços em branco)
                    });


                    // Adiciona a linha à tabela
                    tabela.appendChild(tr);

                    // Adiciona um evento de clique para o botão de exclusão
                    const deleteButton = tr.querySelector('.deleteButton');
                    deleteButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        const placa = item.Placa;
                        deleteCarro(placa);
                    });
                }

                // Adiciona a linha ao corpo da tabela
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
}


function deleteCarro(placa) {
    // Envia uma solicitação DELETE para a API usando a URL com a placa do carro
    fetch(`http://localhost:3000/carro/${placa} `, {
        method: 'DELETE', // Define o método HTTP como DELETE
        headers: {
            'Content-Type': 'application/json', // Define o tipo de conteúdo da solicitação
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API'); // Lança um erro se a resposta não for bem-sucedida
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then((data) => {
            // Trate a resposta do servidor, por exemplo, atualizando a tabela HTML ou mostrando uma mensagem de sucesso.
            alert(`Carro com placa ${placa} excluído com sucesso.`, data);

            // Você pode adicionar código aqui para atualizar a tabela ou fazer outras ações após a exclusão.
            tabelaCarro(); //   Atualiza a tabela após a exclusão.
        })
        .catch((error) => {
            // Trate erros, como exibir uma mensagem de erro
            console.error(`Erro ao excluir carro com placa ${placa}:`, error);
        });
}

function postCarro(carro) {
    // Envia uma solicitação POST para a API com o objeto carro em formato JSON
    fetch('http://localhost:3000/carro', {
        method: 'POST', // Define o método HTTP como POST
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
            alert('Carro adicionado com sucesso.'); // Exibe uma mensagem de sucesso

            // Você pode adicionar código aqui para atualizar a tabela ou fazer outras ações após a adição.
            // tabelaCarro(); // Se necessário, atualize a tabela após a adição.
        })
        .catch((error) => {
            // Trate erros, como exibir uma mensagem de erro
            console.error('Erro ao criar item:', error);

            // Verificar se a placa já existe na tabela
            const tabela = document.getElementById('tabelaCarros'); // Substitua 'sua-tabela' pelo ID da sua tabela
            const linhas = tabela.getElementsByTagName('tr');

            let placaJaExiste = false;
            const placaVerifica = carro.placa; // Obtém a placa do objeto carro

            for (let i = 1; i < linhas.length; i++) {
                const colunas = linhas[i].getElementsByTagName('td');
                const placaExistente = colunas[1].textContent; // Suponha que a placa esteja na segunda coluna (índice 1)

                if (placaExistente === placaVerifica) {
                    placaJaExiste = true;
                    break;
                }
            }

            if (placaJaExiste) {
                alert(`O carro de placa '${carro.placa}' já existe na tabela.`);
                e.preventDefault()
            }

            // Recarrega a página para exibir a tabela atualizada
            window.location.reload();
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


// Configura um evento de clique para o botão "enviarCarro"
document.getElementById('enviarCarro').addEventListener('click', function (e) {
    var marcaCampo = document.getElementById('marca');
    var modeloCampo = document.getElementById('modelo');
    var anoCampo = document.getElementById('ano');
    var valorCampo = document.getElementById("valor");
    var valorPlaca = document.getElementById("placa");

    // Verifica se todos os campos passam na validação
    if (marcaCampo.checkValidity() && modeloCampo.checkValidity() && anoCampo.checkValidity() && valorCampo.checkValidity() && valorPlaca.checkValidity()) {
        e.preventDefault(); // Impede o comportamento padrão do botão (neste caso, evitar o envio do formulário)
        enviarCarrosBanco(); // Chama a função para enviar o novo carro para o banco de dados
    }
});

// Configura um evento de clique para o botão "enviarCarroEditado"
document.getElementById('enviarCarroEditado').addEventListener('click', function (e) {
    var marcaCampoAtualizada = document.getElementById('marcaAtualizada');
    var modeloCampoAtualizada = document.getElementById('modeloAtualizado');
    var anoCampoAtualizada = document.getElementById('anoAtualizado');
    var valorCampoAtualizada = document.getElementById('valorAtualizado');

    // Verifica se todos os campos passam na validação
    if (marcaCampoAtualizada.checkValidity() && modeloCampoAtualizada.checkValidity() && anoCampoAtualizada.checkValidity() && valorCampoAtualizada.checkValidity()) {
        e.preventDefault(); // Impede o comportamento padrão do botão (neste caso, evitar o envio do formulário)
        enviarCarroAtualizado(); // Chama a função para enviar o carro atualizado para o banco de dados
    }
});

//funções de estilo visual 

// Seleciona todos os links de navegação com a classe "nav-link" dentro de elementos com a classe "nav-item"
const navLinks = document.querySelectorAll('.nav-item a.nav-link');

// Itera sobre todos os links de navegação
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Ao clicar em um link, remove a classe "active" de todos os links de navegação
        navLinks.forEach(navLink => {
            navLink.parentElement.classList.remove('active');
        });

        // Adiciona a classe "active" ao link que foi clicado (ou seja, ao elemento pai do link)
        this.parentElement.classList.add('active');
    });
});

$(document).ready(function () {
    // Aplica uma máscara ao campo de ano com o formato '9999/9999'
    $('#ano').mask('9999/9999', {
        translation: {
            '9': { pattern: /[0-9]/ }
        },
        clearIncomplete: true // Limpar o campo se o ano não estiver completo
    });
    $('#anoAtualizado').mask('9999/9999', {
        clearIncomplete: true, // Limpar o campo se o ano não estiver completo
    });

    // Aplica uma máscara ao campo de valor no formato '000.000.000,00'
    $('#valor').mask('000.000.000,00', {
        clearIncomplete: true, // Limpar o campo se o valor não estiver completo
        reverse: true // Inverte a ordem dos dígitos para formato monetário
    });

    // Aplica uma máscara ao campo de valor atualizado com o mesmo formato
    $('#valorAtualizado').mask('000.000.000,00', {
        clearIncomplete: true, // Limpar o campo se o valor não estiver completo
        reverse: true // Inverte a ordem dos dígitos para formato monetário
    });
    // Aplica uma máscara ao campo de placa no formato 'SSS99S9'
    $('#placa').mask('SSS99S9', {
        translation: {
            '9': { pattern: /[0-9]/ },
            'S': { pattern: /[A-Za-z]/ }
        },
        clearIncomplete: true, // Limpar o campo se a placa não estiver completa
        onKeyPress: function (value, event, currentField, options) {
            if (event.key && event.key.match(/[a-z]/)) {
                // Converte letra minúscula para maiúscula se inserida
                event.preventDefault();
                currentField.val(currentField.val() + event.key.toUpperCase());
            }
        }
    });
    
    $('#marca').on('input', function () {
        var marca = $(this).val();
        var regex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;
      
        if (!regex.test(marca)) {
          // Se a marca contiver caracteres inválidos, remova-os
          marca = marca.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '');
          $(this).val(marca);
        }
      
        // Verifica se o primeiro caractere é um espaço em branco e remove-o
        if (marca.charAt(0) === ' ') {
          marca = marca.slice(1);
          $(this).val(marca);
        }
      });

      $('#marcaAtualizada').on('input', function () {
        var marca = $(this).val();
        var regex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;
      
        if (!regex.test(marca)) {
          // Se a marca contiver caracteres inválidos, remova-os
          marca = marca.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '');
          $(this).val(marca);
        }
      
        // Verifica se o primeiro caractere é um espaço em branco e remove-o
        if (marca.charAt(0) === ' ') {
          marca = marca.slice(1);
          $(this).val(marca);
        }
      });

      $('#modelo').on('input', function () {
        var modelo = $(this).val();
        var regex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;
      
        if (!regex.test(modelo)) {
          // Se o modelo contiver caracteres inválidos, remova-os
          modelo = modelo.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '');
          $(this).val(modelo);
        }
      
        // Verifica se o primeiro caractere é um espaço em branco e remove-o
        if (modelo.charAt(0) === ' ') {
          modelo = modelo.slice(1);
          $(this).val(modelo);
        }
      });

      $('#modeloAtualizado').on('input', function () {
        var modelo = $(this).val();
        var regex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;
      
        if (!regex.test(modelo)) {
          // Se o modelo contiver caracteres inválidos, remova-os
          modelo = modelo.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '');
          $(this).val(modelo);
        }
      
        // Verifica se o primeiro caractere é um espaço em branco e remove-o
        if (modelo.charAt(0) === ' ') {
          modelo = modelo.slice(1);
          $(this).val(modelo);
        }
      });
});

// Configura um evento de entrada (input) para o campo de placa
document.getElementById('placa').addEventListener("input", function () {
    var valor = this.value;
    if (valor.length === 7) {
        this.setCustomValidity(""); // O valor é válido, portanto, remove qualquer mensagem de erro personalizada
    } else {
        this.setCustomValidity("Formato de placa inválido. A placa deve conter 7 caracteres"); // O valor é inválido, define uma mensagem de erro personalizada
    }
});

document.getElementById('ano').addEventListener("input", function () {
    var valor = this.value;
    valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (valor.length === 4 || valor.length === 8) {
        this.setCustomValidity(""); // O valor é válido
    } else {
        this.setCustomValidity("Digite exatamente 4 ou 8 dígitos"); // O valor é inválido
    }
});

document.getElementById('anoAtualizado').addEventListener("input", function () {
    var valor = this.value;
    valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (valor.length === 4 || valor.length === 8) {
        this.setCustomValidity(""); // O valor é válido
    } else {
        this.setCustomValidity("Digite exatamente 4 ou 8 dígitos"); // O valor é inválido
    }
})

// Função para remover acentos de um texto
function removerAcentos(texto) {
    // A função `normalize("NFD")` separa os caracteres acentuados em duas partes: a letra e o acento
    // A expressão regular `[\u0300-\u036f]` corresponde aos acentos na forma separada
    // O `replace` remove esses caracteres, resultando em um texto sem acentos
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Função para formatar um texto em estilo título (iniciais maiúsculas)
function formatarTexto(texto) {
    // Converte todo o texto para letras minúsculas e, em seguida, divide-o em palavras usando espaço como separador
    // Para cada palavra, a função pega a primeira letra (charAt(0)) e a torna maiúscula (toUpperCase())
    // Em seguida, concatena a primeira letra maiúscula com o restante da palavra (slice(1))
    // Por fim, junta as palavras formatadas com espaço para formar o texto final
    return texto.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
