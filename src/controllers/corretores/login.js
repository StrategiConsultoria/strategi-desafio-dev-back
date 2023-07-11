const knex = require('../../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../../config/config');
const loginSchema = require('../../validations/loginSchema');

const login = async (req, res) => {
    const { nome, senha } = req.body;

    try {

        await loginSchema.validate(req.body);

        const username = await knex('corretores').where({ nome }).first();

        if (!username) {
            return res.status(400).json({ error: 'usuário não encontrado' });
        }

        const checkPassword = await bcrypt.compare(senha, username.senha);

        if (!checkPassword) {
            return res.status(400).json({ error: 'senha incorreta' });
        }

        const token = jwt.sign({
            nome: username.nome,
            id: username.id
        },
            secret
        );

        return res.status(200).json({
            success: 'login efetuado com sucesso',
            token,
            dadosDoUsuario: {
                nome: username.nome,
                id: username.id
            }
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = login;