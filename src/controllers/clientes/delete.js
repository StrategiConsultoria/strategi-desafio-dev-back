const knex = require('../../database/connection');

const deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {

        const clienteDeletado = await knex('clientes').del().where({ id });

        if (clienteDeletado === 0) {
            return res.status(400).json({
                error: 'não foi possivel deletar o cadastro do cliente'
            });
        };

        res.status(200).json({
            success: 'cadastro do usuario deletado com sucesso'
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

module.exports = deleteCliente;