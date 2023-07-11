const knex  = require('../../database/connection');
const clientesSchema = require('../../validations/clientesSchema');

const cadastroClientes = async (req, res) => {
    const { nome, cpf, email, telefone } = req.body;

    try {
        await clientesSchema.validate(req.body);

        const emailCliente = await knex('clientes').where({email}).first();
        const cpfCliente = await knex('clientes').where({cpf}).first();

        if(emailCliente){
            return res.status(400).json({
                error: 'Email já cadastrado'
            });
        };

        if(cpfCliente){
            return res.status(400).json({
                error: 'Cpf já cadastrado'
            });
        };

        const dataDeCadastro = new Date();

        const newCliente = {
            nome,
            cpf,
            email,
            telefone,
            data_de_cadastro: dataDeCadastro
        };

        const insertNewCliente = await knex("clientes").insert(newCliente);

        if(insertNewCliente.rowCount === 0){
           return res.status(400).json({
                error: 'não foi possivel fazer o cadastro do cliente, tente novamente'
            });
        };

        res.status(200).json({
            success: 'cliente cadastrado com sucesso'
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

module.exports = cadastroClientes;