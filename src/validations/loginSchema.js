const yup = require('./yup');

const loginSchema = yup.object().shape({
    nome: yup.string().required(),
    senha: yup.string().required(),

});

module.exports = loginSchema;