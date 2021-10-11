//import { readFile } from 'fs/promises'
import { promises } from 'fs'
const { readFile, writeFile } = promises

import xml2js from 'xml2js'
const parser = new xml2js.Parser()

const file = './curriculos/Fabio.xml'

async function readLattes() {
  return readFile(file, 'binary')
}

async function getLattesData() {
  const fileContent = await readLattes()
  const dadosCurriculo = await parser.parseStringPromise(fileContent)

  return dadosCurriculo
}

async function init() {
  const data = await getLattesData()
  writeFile('./out.json', JSON.stringify(data))
}

init()
