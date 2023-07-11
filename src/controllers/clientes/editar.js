const knex = require('../../database/connection');
const clientesSchema = require('../../validations/clientesSchema');

const editarCliente = async (req, res) => {
    const { id, nome, cpf, email, telefone } = req.body;

    try {
        await clientesSchema.validate(req.body);

        const cliente = await knex('clientes').where({ id }).first();

        if (cliente.cpf !== cpf) {
            const clienteExistente = await knex('clientes').where({ cpf }).first();

            if (clienteExistente) {
                return res.status(400).json({
                    error: 'este cpf já está cadastrado'
                });
            };
        };

        if (cliente.email !== email) {
            const clienteExistente = await knex('clientes').where({ email }).first();

            if (clienteExistente) {
                return res.status(400).json({
                    error: 'este email já está cadastrado'
                });
            };
        };

        const newDadosDocliente = {
            nome,
            cpf,
            email,
            telefone
        };

        const clienteEditado = await knex('clientes').where({ id }).update(newDadosDocliente);

        if (clienteEditado === 0) {
            return res.status(400).json({
                error: 'não foi possivel fazer a edição do cadastro do cliente, tente novamente'
            });
        };

        res.status(200).json({
            success: 'cadastro do cliente editado com sucesso'
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = editarCliente;
