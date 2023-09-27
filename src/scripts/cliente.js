export class Cliente {
  constructor(id, nome, cnh, possuiReserva, carro, valorReserva, dataDevolucao) {
    this.id = id;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.cnh = cnh;
    this.possuiReserva = 'Não'; // Booleano indicando se o cliente possui reserva
    this.carro = carro; // Carro associado ao cliente (pode ser nulo se não houver reserva)
    this.valorReserva = valorReserva; // Valor da reserva (pode ser nulo se não houver reserva)
    this.dataDevolucao = dataDevolucao; // Data de devolução (pode ser nulo se não houver reserva)
  }
}

export class listaCliente {
  constructor(cliente) {
    this.cliente = cliente;
    this.next = null;
  }
}

// Classe LinkedList para gerenciar a lista encadeada de clientes
export class LinkedListCliente {
  constructor() {
    this.head = null;
  }

  append(cliente) {
    const clienteNo = new listaCliente(cliente);
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

