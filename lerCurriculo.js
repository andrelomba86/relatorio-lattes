import { readdir, readFile } from 'fs/promises'

import xml2js from 'xml2js'
const parser = new xml2js.Parser()

const dir = './curriculos/'

export async function readLattes(arquivo) {
  return readFile(dir + arquivo, 'binary')
}

// async function lerTodosCurriculos(callback) {
//   const files = await readdir(dir)
//   // CHECAR SE É XML

//   return files
//   // files.forEach(file => {
//   //   console.log(file)
//   //   const curriculo = lerCurriculo(file)
//   // })
// }
export const getLattesData = (function () {
  let dadosCurriculo = {}
  return async arquivo => {
    if (!dadosCurriculo[arquivo]) {
      dadosCurriculo[arquivo] = await readLattes(arquivo)
    }

    const lattesJSON = await parser.parseStringPromise(dadosCurriculo[arquivo])

    // const dadosProducaoJSON = lattesJSON[CURRICULO][PRODUCAO][0]
    return lattesJSON
  }
})()
