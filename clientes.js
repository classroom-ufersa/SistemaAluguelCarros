// Classe para representar informações de um cliente
class Cliente {
  constructor(nome, sobrenome, cnh, carroCliente, placa, status, dataDevolucao, totalDias, valorReserva) {
    this.nome = nome;                   // Nome do cliente
    this.sobrenome = sobrenome;         // Sobrenome do cliente
    this.cnh = cnh;                     // Número da CNH 
    this.carroCliente = carroCliente;                 // Carro liente
    this.placa = placa;                 // Placa do carro alugado pelo cliente
    this.status = status;               // Se possui ou não reserva
    this.totalDias = totalDias;         // Total de dias de aluguel
    this.valorReserva = valorReserva;   // Valor da reserva
    this.dataDevolucao = dataDevolucao; // Data de devolução do carro alugado
  }
}

// Classe para representar um nó em uma lista encadeada de clientes
class listaCliente {
  constructor(cliente) {
    this.cliente = cliente; // Um objeto da classe Cliente que representa as informações do cliente
    this.next = null;      // Uma referência para o próximo nó na lista encadeada
  }
}

// Classe LinkedList para gerenciar a lista encadeada de clientes
class LinkedListCliente {
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

const infocliente = new LinkedListCliente(); // Cria uma nova lista encadeada de clientes e a armazena na variável 'infoCliente'


document.addEventListener("DOMContentLoaded", function () {
  tabelacliente();
});

function tabelacliente() {
  // URL da API de onde você obtém os dados
  const apiUrl = 'http://localhost:3000/clientes';
  getClientes(apiUrl)
}

function enviarClientesBanco() {
  // Coleta as informações do formulário
  const nome = formatarTexto(document.getElementById('nome').value);
  const sobrenome = formatarTexto(document.getElementById('sobrenome').value);
  const cnh = formatarTexto(document.getElementById('cnh').value);

  // Define valores padrão para outras propriedades do cliente
  const carroCliente = "";
  const placa = "";
  const statusCliente = "Não";
  const valorReserva = "";
  const dataDevolucao = "";
  const totalDias = "";

  // Cria um objeto cliente com as informações coletadas
  const cliente = new Cliente(nome, sobrenome, cnh, carroCliente, placa, statusCliente, dataDevolucao, totalDias, valorReserva);
  // Chama a função 'postCliente' para enviar o cliente para a API
  postCliente(cliente);

}

function enviarclienteAtualizado() {
  // Obtém os valores dos campos de entrada do formulário de edição de cliente
  const nome = document.getElementById('nomeAtualizado').value;
  const sobrenome = document.getElementById('sobrenomeAtualizado').value;
  const cnh = document.getElementById('cnhAtualizada').value;
  const carroCliente = "";
  const placa = "";
  const statusCliente = "Não";
  const valorReserva = "";
  const dataDevolucao = "";
  const totalDias = "";

  // Cria um novo objeto Cliente com os valores atualizados
  const cliente = new Cliente(nome, sobrenome, cnh, carroCliente, placa, statusCliente, dataDevolucao, totalDias, valorReserva);

  // Chama a função 'putCarro' (essa função deve ser ajustada para 'putCliente' se estiver atualizando informações de cliente)
  putCliente(cliente); // A função 'putCarro' é chamada, mas deve ser chamada 'putCliente' para refletir a atualização do cliente
}
// Adiciona um evento de escuta ao elemento com o ID 'barraDeBuscaClientes' quando o usuário interage com a barra de busca
document.getElementById('barraDeBuscaClientes').addEventListener('input', buscarCliente);

function buscarCliente() {
  // Obtém o termo de busca do campo de entrada e converte para letras minúsculas
  const termoDeBusca = document.getElementById('barraDeBuscaClientes').value.toLowerCase();

  // Obtém a tabela onde os resultados serão filtrados
  const tabela = document.getElementById('tabelaCliente');

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
//funções que interagem com o banco

// Função para obter dados de clientes de uma API e preencher uma tabela HTML
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
            const form = document.getElementById('clienteFormEdit');

            const cnhInput = form.elements['cnhAtualizada'];
            cnhInput.readOnly = true;

            // Preenche os campos do formulário com os valores
            form.elements['nomeAtualizado'].value = celulas[0].textContent;
            form.elements['sobrenomeAtualizado'].value = celulas[1].textContent;
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
      });
    })
    .catch(error => {
      console.error('Erro ao buscar dados da API:', error);
    });
}

function deleteCliente(cnh) {
  // Faz uma solicitação DELETE para a API com a CNH do cliente a ser excluído
  fetch(`http://localhost:3000/cliente/${cnh} `, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        // Se a resposta não for bem-sucedida (código de status diferente de 200), lança um erro
        throw new Error('Erro na resposta da API');
      }
      return response.json();
    })
    .then((data) => {
      // Trata a resposta do servidor e exibe a mensagem de sucesso
      alert(`cliente com CNH ${cnh} excluído com sucesso.`, data);

      // Você pode adicionar código aqui para atualizar a tabela ou fazer outras ações após a exclusão.
      tabelacliente(); // Atualiza a tabela após a exclusão.
    })
    .catch((error) => {
      // Trata erros, como exibir uma mensagem de erro
      console.error(`Erro ao excluir cliente com CNH ${cnh}:`, error);
    });
}

function postCliente(cliente) {
  // Envia uma requisição POST para a URL da API
  fetch('http://localhost:3000/cliente', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  })
    .then((response) => {
      // Verifica se a resposta da API é bem-sucedida
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      return response.json();
    })
    .then((data) => {
      // Se a criação do cliente na API for bem-sucedida, registra uma mensagem de sucesso no console
      alert('Cliente cadastrado com sucesso');
    })
    .catch((error) => {
      // Trata erros que possam ocorrer durante a criação do cliente
      console.error('Erro ao criar cliente:', error);

      // Placa a ser verificada
      const cnhVerifica = cliente.cnh;

      // Verifica se a CNH já existe na tabela de clientes na interface
      const tabela = document.getElementById('tabelaCliente');
      const linhas = tabela.getElementsByTagName('tr');

      let cnhJaExiste = false;

      for (let i = 1; i < linhas.length; i++) {
        const colunas = linhas[i].getElementsByTagName('td');
        const cnhExistente = colunas[2].textContent;

        if (cnhExistente === cnhVerifica) {
          cnhJaExiste = true;
          break;
        }
      }

      if (cnhJaExiste) {
        // Exibe um alerta informando que o cliente com a CNH já existe na tabela
        alert(`O cliente de CNH '${cnhVerifica}' já existe na tabela.`);
        e.preventDefault();
      }
      // Recarrega a página para atualizar a tabela de clientes na interface
      window.location.reload();
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

// Adiciona um evento de clique ao botão "Enviar Cliente"
document.getElementById('enviarCliente').addEventListener('click', function (e) {
  // Obtém referências aos campos do formulário
  var cnhCampo = document.getElementById('cnh');
  var nomeCampo = document.getElementById('nome');
  var sobrenomeCampo = document.getElementById('sobrenome');

  // Verifica se a CNH é válida
  if (cnhCampo.checkValidity() && nomeCampo.checkValidity() && sobrenomeCampo.checkValidity()) {
    e.preventDefault(); // Impede o envio do formulário se o campo for inválido
    enviarClientesBanco(); // Chama a função para enviar os dados do cliente para o banco
  }
});

// Adiciona um evento de clique ao botão "Enviar Cliente Editado"
document.getElementById('enviarClienteEditado').addEventListener('click', function (e) {
  // Obtém referências aos campos do formulário de edição
  var cnhCampoAtualizada = document.getElementById('cnhAtualizada');
  var nomeCampoAtualizada = document.getElementById('nomeAtualizado');
  var sobrenomeCampoAtualizada = document.getElementById('sobrenomeAtualizado');

  // Verifica se a CNH, nome e sobrenome são válidos
  if (cnhCampoAtualizada.checkValidity() && nomeCampoAtualizada.checkValidity() && sobrenomeCampoAtualizada.checkValidity()) {
    e.preventDefault(); // Impede o envio do formulário se os campos forem inválidos
    enviarclienteAtualizado(); // Chama a função para enviar os dados do cliente editado para o banco
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
  // Aplica uma máscara ao campo de placa no formato '999999999'
  $('#cnh').mask('999999999', {
    clearIncomplete: true, // Limpar o campo se o ano não estiver completo
  });

  $('#nome').on('input', function () {
    var nome = $(this).val();
    var regex = /^[a-zA-ZÀ-ÿ\s]*$/;

    if (!regex.test(nome)) {
      // Se o nome contiver caracteres inválidos, remova-os
      nome = nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      $(this).val(nome);
    }

    // Verifica se o primeiro caractere é um espaço em branco e remove-o
    if (nome.charAt(0) === ' ') {
      nome = nome.slice(1);
      $(this).val(nome);
    }
  });

  $('#nomeAtualizado').on('input', function () {
    var nome = $(this).val();
    var regex = /^[a-zA-ZÀ-ÿ\s]*$/;

    if (!regex.test(nome)) {
      // Se o nome contiver caracteres inválidos, remova-os
      $(this).val(nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''));
    }
  });
  $('#sobrenome').on('input', function () {
    var sobrenome = $(this).val();
    var regex = /^[a-zA-ZÀ-ÿ\s]*$/;
  
    if (!regex.test(sobrenome)) {
      // Se o sobrenome contiver caracteres inválidos, remova-os
      sobrenome = sobrenome.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      $(this).val(sobrenome);
    }
  
    // Verifica se o primeiro caractere é um espaço em branco e remove-o
    if (sobrenome.charAt(0) === ' ') {
      sobrenome = sobrenome.slice(1);
      $(this).val(sobrenome);
    }
  });
  
  $('#sobrenomeAtualizado').on('input', function () {
    var sobrenome = $(this).val();
    var regex = /^[a-zA-ZÀ-ÿ\s]*$/;

    if (!regex.test(sobrenome)) {
      // remopve e o sobrenome contiver caracteres inválidos
      $(this).val(sobrenome.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''));
    }
  });
});

document.getElementById('cnh').addEventListener("input", function () {
  var valor = this.value;

  // Remove caracteres não numéricos
  valor = valor.replace(/\D/g, "");

  // Verifica se o campo possui 9 dígitos
  if (valor.length === 9) {
    this.setCustomValidity(""); // O valor é válido
  } else {
    this.setCustomValidity("A CNH deve conter 9 dígitos"); // O valor é inválido
  }
});

function formatarTexto(texto) {
  // Converte todo o texto para letras minúsculas e, em seguida, divide-o em palavras usando espaço como separador
  // Para cada palavra, a função pega a primeira letra (charAt(0)) e a torna maiúscula (toUpperCase())
  // Em seguida, concatena a primeira letra maiúscula com o restante da palavra (slice(1))
  // Por fim, junta as palavras formatadas com espaço para formar o texto final
  return texto.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}