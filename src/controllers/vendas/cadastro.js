const knex = require('../../database/connection');
const vendasSchema = require('../../validations/vendasSchema');


const cadastroDeVendas = async (req, res) => {
    const { id_imovel, valor, condicaoDePagamento, email: emailCliente, nomeCliente, comissao } = req.body;

    try {
        await vendasSchema.validate(req.body);

        const imovel = await knex('imoveis').where('id', id_imovel).first();

        if (!imovel) {
            return res.status(400).json({ error: 'imovel não encontrado' });
        }

        const cliente = await knex('clientes').where('email', emailCliente).first();

        if (!cliente) {
            return res.status(400).json({ error: 'cliente não encontrado' });
        }

        const newVenda = {
            id_imovel,
            valor,
            condicao_de_pagamento: condicaoDePagamento,
            id_corretor: req.user.id,
            cliente: {
                nomeCliente,
                emailCliente
            },
            comissao
        }

        const insertNewVenda = await knex('vendas').insert(newVenda);

        if (insertNewVenda.rowcount === 0) {
            return res.status(400).json({
                error: 'não foi possivel cadastrar a venda, tente novamente'
            })
        }

        res.status(200).json({
            success: 'venda cadastrada com sucesso'
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = cadastroDeVendas;