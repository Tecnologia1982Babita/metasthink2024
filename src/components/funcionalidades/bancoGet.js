import fetchFunc from './fetchFunc.js'

export const ConsultaTipoPagVendedora = ({DATAINIT, DATAFIM, CODIGOVEND, LOJAORIGEM})=>fetchFunc.fetchPost('http://177.70.12.42:3336/ConsultaTipoPagVendedora',{DATAINIT, DATAFIM, CODIGOVEND, LOJAORIGEM})
export const ConsultaTipoPagVendedoraGeral = ({DATAINIT, DATAFIM, CODIGOVEND, LOJAORIGEM})=>fetchFunc.fetchPost('http://177.70.12.42:3336/ConsultaTipoPagVendedoraGeral',{DATAINIT, DATAFIM, CODIGOVEND, LOJAORIGEM})
export const AlteraSenhaVendedora = ({LOGIN, NOVASENHA})=>fetchFunc.fetchPost('http://177.70.12.42:3336/AlteraSenhaVendedora',{LOGIN, NOVASENHA})




const db = {
    ConsultaTipoPagVendedora,
    AlteraSenhaVendedora
}

export default db;


