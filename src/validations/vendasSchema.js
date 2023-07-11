const yup = require('./yup');

const vendasSchema = yup.object().shape({
    id_imovel: yup.number().required(),
    valor: yup.string().required(),
    condicaoDePagamento: yup.string().required(),
    email: yup.string().email().required(),
    nomeCliente: yup.string().required()
});

module.exports = vendasSchema;