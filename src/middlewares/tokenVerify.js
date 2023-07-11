const jwt = require('jsonwebtoken');
const knex = require('../database/connection');
const secret = require('../config/config');

const tokenVerify = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization === 'Bearer' || !authorization) {
        return res.status(405).json({error: 'é necessário estar logado para ter acesso a esta página'});
    }

    try {
        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, secret);

        if (!id) {
            return res.status(400).json({error: 'token inválido'});
        }

        const corretor = await knex('corretores').where({id}).first();

        if(!corretor) {
            return res.status(400).json({
                error :'corretor não cadastrado'
            })
        }

        req.user = { id };
        next();

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

module.exports = tokenVerify;