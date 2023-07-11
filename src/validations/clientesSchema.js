const yup = require('./yup');

const clientesSchema = yup.object().shape({
    nome: yup.string().required(),
    cpf: yup.string().required(),
    email: yup.string().email().required(),
    telefone: yup.string().required()

});

module.exports = clientesSchema;