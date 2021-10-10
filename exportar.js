//const exportFromJSON = require('export-from-json')
import json2xlsx from 'json2xlsx'

const exportarParaExcel = (arquivo, dataJSON, sheetName, order) => {
  json2xlsx.write(arquivo, sheetName, dataJSON, order)

  // (fileName, sheetName, [object], order)
}
export default exportarParaExcel

// module.exports = exportarParaExcel
