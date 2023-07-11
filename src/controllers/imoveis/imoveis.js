const knex = require('../../database/connection');

const getImoveis = async (req, res) => {

    try {
        const imoveis = await knex('imoveis');

        res.status(200).json({
            success: imoveis
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getImoveis;