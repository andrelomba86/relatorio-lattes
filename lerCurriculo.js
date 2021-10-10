//import { readFile } from 'fs/promises'
import { promises } from 'fs'
const { readFile } = promises

import xml2js from 'xml2js'
const parser = new xml2js.Parser()

const dir = './curriculos/'

export async function readLattes(arquivo) {
  return readFile(dir + arquivo, 'binary')
}

export const getLattesData = (function () {
  let dadosCurriculo = {}
  return async fileName => {
    if (!dadosCurriculo[fileName]) {
      const fileContent = await readLattes(fileName)
      // dadosCurriculo[arquivo] = await readLattes(arquivo)
      dadosCurriculo[fileName] = await parser.parseStringPromise(fileContent)
    }

    //const lattesJSON = await parser.parseStringPromise(dadosCurriculo[fileName])

    return dadosCurriculo[fileName]
  }
})()
