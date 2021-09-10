//const exportFromJSON = require('export-from-json')
import json2xlsx from 'json2xlsx'

const exportarParaExcel = (arquivo, dados, planilha = 'Relatório') => {
  json2xlsx.write(arquivo, planilha, dados)
}
export default exportarParaExcel

// module.exports = exportarParaExcel
