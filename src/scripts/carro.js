export class Carro {
    constructor(marca, modelo, placa, ano, valor) {
        this.marca = marca;
        this.modelo = modelo;
        this.placa = placa;
        this.ano = ano;
        this.status = 'disponível';
        this.valor = valor
    }
};

export class listaCarro {
    constructor(carro) {
        this.carro = carro;
        this.next = null;
    }
}

// Classe LinkedList para gerenciar a lista encadeada de carros
export class LinkedListCarro {
    constructor() {
        this.head = null;
    }

    append(carro) {
        const carroNo = new listaCarro(carro);
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
