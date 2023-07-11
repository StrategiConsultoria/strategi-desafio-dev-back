const knex = require('../../database/connection');
const bcrypt = require('bcrypt');
const loginSchema = require('../../validations/loginSchema');

const cadastro = async (req, res) => {
    const {nome, senha} = req.body;

    try {
        await loginSchema.validate(req.body);

        const hashPassword = await bcrypt.hash(senha, 10);

        const newCorretor = {
            nome: nome,
            senha: hashPassword
        };

        const insertNewCorretor = await knex('corretores').insert(newCorretor);

        if(insertNewCorretor.rowCount === 0){
            return res.status(400).json({
                error: 'não foi possivel realizar o cadastro, tente novamente'
            });
        };

        return res.status(200).json({
            success:'corretor cadastrado com sucesso',
            newCorretor: insertNewCorretor
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = cadastro;