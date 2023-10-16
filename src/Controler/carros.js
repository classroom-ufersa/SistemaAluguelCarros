import { openDb } from '../configDB.js';

export async function criarTabela() {
    const db = await openDb();
    db.exec(`
      CREATE TABLE IF NOT EXISTS carro (
        Marca TEXT,
        Modelo TEXT,
        Placa TEXT PRIMARY KEY,
        Ano TEXT,
        Status TEXT,
        ValorDiaria TEXT,
        Cliente TEXT,
        valorReserva TEXT,
        totalDias TEXT,
        dataDevolucao TEXT
      )
    `);

}

export async function selecinarCarros(req, res) {
    openDb().then(db => {
        db.all('SELECT * FROM carro ORDER BY Marca ASC')
            .then(carros => res.json(carros))
    });
}

export async function selecinarCarro(req, res) {
    const placa = req.params.placa;
    console.log(placa);
    openDb().then(db => {
        db.get('SELECT * FROM carro WHERE Placa=?', [placa])
            .then(result => {
                console.log(result);
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


export async function inserirCarro(req, res) {
    const carro = req.body;
    console.log('Dados do Carro:', carro); // Verifique se os dados do carro estão corretos
    try {
        const db = await openDb()

        // Verifica se a placa já existe no banco de dados
        const existingCar = await db.get('SELECT Placa FROM carro WHERE Placa = ?', [carro.placa]);

        if (existingCar) {
            console.error('A placa já existe no banco de dados');
            res.status(400).json({ error: 'A placa já existe no banco de dados' });
        } else {
            // A placa não existe, continuar com a inserção
            await db.run('INSERT INTO carro (Marca, Modelo, Placa, Ano, Status, ValorDiaria, Cliente, valorReserva, totalDias, dataDevolucao) VALUES (?,?,?,?,?,?,?,?,?,?)', [carro.marca, carro.modelo, carro.placa, carro.ano, carro.status, carro.valorDiaria, carro.cliente, carro.valorReserva, carro.totalDias, carro.dataDevolucao]);

            console.log('Carro inserido com sucesso');
            res.json({
                statusCode: 200
            });
        }
    } catch (error) {
        console.error('Erro ao inserir carro no banco de dados:', error);
        res.status(500).json({ error: 'Erro ao inserir carro no banco de dados' });
    }
}

export async function autalizarCarro(req, res) {
    try {
        let carro = req.body;
        console.log(req.body)
        const db = await openDb(); // Abra o banco de dados SQLite.

        // Atualize o registro do carro com base na placa.
        await db.run('UPDATE carro SET marca=?, modelo=?, ano=?, status=?, valorDiaria=?, cliente=?, valorReserva=?, totalDias=?, dataDevolucao=? WHERE Placa=?',
            [carro.marca, carro.modelo, carro.ano, carro.status, carro.valorDiaria, carro.cliente, carro.valorReserva, carro.totalDias, carro.dataDevolucao, carro.placa]
        );
        // Feche o banco de dados após a atualização.
        await db.close();

        res.json({
            "statusCode": 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Ocorreu um erro durante a atualização do carro." });
    }
}

export async function deletarCarro(req, res) {
    const Placa = req.params.placa;
    openDb().then(db => {
        db.get('DELETE FROM carro WHERE Placa=?', [Placa])
            .then(res => res)
    });
    res.json({
        "statusCode": 200
    })
}
