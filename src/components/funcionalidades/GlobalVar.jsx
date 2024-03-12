import * as XLSX from 'xlsx';

export default class GlobalVar{ //Variaveis Globais

  static converteFloat = (valor) => {
    return parseFloat(valor).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }

  static desconverterFloat = (valor) => {
    var valorSemFormatacao = valor.replace('.', '').replace(',', '.');
    return parseFloat(valorSemFormatacao);
  }

  static exportaExcel (table, nomeArquivo) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(table);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Planilha 1');

    // Salvar o arquivo
    XLSX.writeFile(workbook, `${nomeArquivo}.xlsx`);
  }

  static retornaMesAnterior = ()=>{
    let dataAnterior = new Date();
    dataAnterior = new Date(dataAnterior.getFullYear(), dataAnterior.getMonth(), 1)
    
    // Converte a data para uma string no formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
    const dataAnteriorISO = dataAnterior.toISOString();

    // Extrai apenas a parte da data (YYYY-MM-DD)
    const dataAnteriorFormatada = dataAnteriorISO.split('T')[0];

    return dataAnteriorFormatada
  }
}

