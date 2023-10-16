# Documentação do Sistema de Aluguel de Carros

## Visão Geral

O sistema de gerenciamento de aluguéis de carros é um aplicativo baseado em JavaScript que utiliza uma API CRUD com um banco de dados SQL para armazenar informações sobre carros e clientes. O sistema possui quatro telas principais: Home, Reservar, Carros e Clientes.

## Problema

O sistema aborda a seguinte problemática:

Projetar um sistema para gerenciamento de aluguéis de carros. O sistema precisará manipular carros e clientes.

### linkedLists

#### Carros

carro = new Carro(marca, modelo, placa, ano, valorDiaria, status, cliente, dataDevolucao, totalDias, valorReserva);

#### Clientes

cliente = new Cliente(nome, sobrenome, cnh, carroCliente, placa, statusCliente, dataDevolucao, totalDias, valorReserva);

## Funcionalidades

### Tela Home

1. **Total a Receber em Reservas:**
   - Exibe o valor total a receber com base nas reservas ativas no sistema.

2. **Total de Carros Alugados e Disponíveis:**
   - Apresenta o número total de carros alugados e disponíveis no momento.

3. **Total de Clientes:**
   - Mostra a quantidade total de clientes registrados no sistema.

4. **Tabela de Reservas com Barra de Busca Dinâmica:**
   - Exibe uma tabela com todas as reservas no sistema.
   - Barra de busca dinâmica permite a filtragem de reservas com base em critérios específicos.
   
   Dentro da Tabela de Reservas:
   - **Troca de Cliente:** Permite substituir o cliente associado a uma reserva por outro.
   - **Alteração de Data:** Permite a modificação da data de fim da reserva.
   - **Finalização de Reserva:** Permite marcar uma reserva como concluída.

### Tela Reservar

1. **Seleção de Carro e Cliente:**
   - Permite ao usuário escolher um carro disponível e um cliente para criar uma nova reserva.

2. **Definição do Intervalo de Tempo da Reserva:**
   - Permite ao usuário especificar o início e o fim da reserva, estabelecendo a duração do aluguel.

3. **Validações e Máscaras (jQuery):**
   - Aplica validações para garantir que o intervalo de tempo seja válido.
   - Utiliza máscaras com jQuery para formatar campos de entrada, como nome e cnh.

### Tela Carros

1. **Cadastro de Carros (Marca, Modelo, Valor da Diária, Placa):**
   - Permite ao usuário adicionar novos carros ao sistema, inserindo informações de marca, modelo, valor da diária e placa.

2. **Barra de Busca Dinâmica:**
   - Oferece uma barra de pesquisa que permite ao usuário encontrar carros com base em critérios específicos em tempo real.

3. **Edição e Exclusão de Veículos:**
   - Permite a edição das informações de um carro.
   - Possibilita a exclusão de carros do sistema.

### Tela Clientes

1. **Cadastro de Clientes (Nome, Sobrenome, CNH):**
   - Permite ao usuário adicionar novos clientes ao sistema, fornecendo informações de nome, sobrenome e número da CNH .

2. **Barra de Busca Dinâmica:**
   - Oferece uma barra de pesquisa que permite ao usuário encontrar clientes com base em critérios específicos em tempo real.

3. **Edição e Exclusão de Clientes:**
   - Permite a edição das informações de um cliente.
   - Possibilita a exclusão de clientes do sistema.

## Tecnologias Utilizadas

- JavaScript
- SQL
- HTML
- CSS
- Bootstrap
- jQuery

---
