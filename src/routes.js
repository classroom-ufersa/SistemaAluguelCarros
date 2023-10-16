import { Router } from "express";
import { criarTabela, selecinarCarros, selecinarCarro, inserirCarro, autalizarCarro, deletarCarro } from './Controler/carros.js';
import { criarTabelaCliente, selecinarClientes, selecinarCliente, inserirCliente, autalizarCliente, deletarCliente } from './Controler/cliente.js';

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
})
router.get('/carros', selecinarCarros);
router.get('/carros/:placa', selecinarCarro);
router.post('/carro', inserirCarro);
router.put('/carro', autalizarCarro);
router.delete('/carro/:placa', deletarCarro);

router.get('/clientes', selecinarClientes);
router.get('/clientes/:CNH', selecinarCliente);
router.post('/cliente', inserirCliente);
router.put('/cliente', autalizarCliente);
router.delete('/cliente/:CNH', deletarCliente);

export default router;