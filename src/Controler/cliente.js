import { openDb } from '../configDB.js';

export async function criarTabelaCliente() {
    const db = await openDb();
    db.exec(`
      CREATE TABLE IF NOT EXISTS cliente (
        Nome TEXT,
        Sobrenome TEXT,
        CNH TEXT PRIMARY KEY,
        Carro TEXT,
        Status TEXT, 
        Placa TEXT,
        valorReserva TEXT,
        totalDias TEXT,
        dataDevolucao TEXT
      )
    `);
}

export async function selecinarClientes(req, res) {
    try {
        const db = await openDb();
        const clientes = await db.all('SELECT * FROM cliente ORDER BY Nome ASC');
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Ocorreu um erro ao buscar os clientes." });
    }
}

export async function selecinarCliente(req, res) {
    const CNH = req.params.CNH;
    console.log(CNH);
    openDb().then(db => {
        db.get('SELECT * FROM cliente WHERE CNH=?', [CNH])
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.error('Erro na consulta ao banco de dados:', error);
                res.status(500).json({
                    "statusCode": 500,
                    "error": "Internal Server Error"
                });
            });
    });
}

export async function inserirCliente(req, res) {
    try {
        const cliente = req.body;
        console.log('Dados do cliente:', cliente); // Verifique se os dados do cliente estão corretos
        const db = await openDb()

        // Verifica se a CNH já existe no banco de dados
        const existingCliente = await db.get('SELECT CNH FROM cliente WHERE CNH = ?', [cliente.cnh]);

        if (existingCliente) {
            console.error('A CNH já existe no banco de dados');
            res.status(400).json({ error: 'A CNH já existe no banco de dados' });
        } else {
            // A CNH não existe, continuar com a inserção
            await db.run('INSERT INTO cliente (Nome, Sobrenome, CNH, Carro, Status, Placa, valorReserva,totalDias,dataDevolucao) VALUES (?,?,?,?,?,?,?,?,?)',
                [cliente.nome, cliente.sobrenome, cliente.cnh, cliente.carroCliente, cliente.status, cliente.placa, cliente.valorReserva, cliente.totalDias, cliente.dataDevolucao]);

            console.log('Cliente inserido com sucesso');
            res.json({
                statusCode: 200
            });
        }
    } catch (error) {
        console.error('Erro ao inserir cliente no banco de dados:', error);
        res.status(500).json({ error: 'Erro ao inserir cliente no banco de dados' });
    }
}

export async function autalizarCliente(req, res) {
    try {
        let cliente = req.body;
        console.log(req.body)
        const db = await openDb(); // Abra o banco de dados SQLite.

        // Atualize o registro do cliente com base na CNH.
        await db.run('UPDATE cliente SET Nome=?, Sobrenome=?, CNH=?, Carro=?, Status=?, Placa=?, valorReserva=?, totalDias=?,  dataDevolucao=? WHERE CNH=?',
            [cliente.nome, cliente.sobrenome, cliente.cnh, cliente.carroCliente, cliente.status, cliente.placa, cliente.valorReserva,cliente.totalDias, cliente.dataDevolucao, cliente.cnh]
        );

        // Feche o banco de dados após a atualização.
        await db.close();

        res.json({
            "statusCode": 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Ocorreu um erro durante a atualização do cliente." });
    }
}

export async function deletarCliente(req, res) {
    try {
        const CNH = req.params.CNH;
        const db = await openDb();
        console.log(CNH)
        await db.run('DELETE FROM cliente WHERE CNH=?', [CNH]);
        res.json({
            "statusCode": 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Ocorreu um erro durante a exclusão do cliente." });
    }
}
