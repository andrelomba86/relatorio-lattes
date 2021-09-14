// var fs = require('fs')
// var xml2js = require('xml2js')
// var parser = new xml2js.Parser()

// const { artigos_publicados } = require('./producao')
// const lerLattes = require('./lerLattes')

import {
  artigosPublicados,
  publicaoesEmEventos,
  livrosPublicadosOuOrganizados,
  capitulosDeLivros,
  jornalOuRevista,
  outrasProducoes,
  todasProducoesTecnicas,
} from './producao.js'
import exportarParaExcel from './exportar.js'
import fs from 'fs/promises'
import { existsSync as fileExists } from 'fs'

const arquivoXLS = './relatorio.xls'

const dir = './curriculos/'

async function gerarRelatorio() {
  const arquivosLattes = await fs.readdir(dir)
  console.log('Gerando relatório...')
  console.log('Lendo arquivos...')

  let [
    artigos,
    eventos,
    livros,
    capitulos,
    jornaisOuRevistas,
    outras,
    tecnicas,
  ] = [[], [], [], [], [], [], []]
  for await (let arquivo of arquivosLattes) {
    process.stdout.write(`->  ${arquivo}`)
    process.stdout.write('.')
    // artigos.push(...(await artigosPublicados(arquivo)))
    // process.stdout.write('.')
    // eventos.push(...(await publicaoesEmEventos(arquivo)))
    // process.stdout.write('.')
    // livros.push(...(await livrosPublicadosOuOrganizados(arquivo)))
    // process.stdout.write('.')
    // capitulos.push(...(await capitulosDeLivros(arquivo)))
    // process.stdout.write('.')
    // jornaisOuRevistas.push(...(await jornalOuRevista(arquivo)))
    // process.stdout.write('.')
    // outras.push(...(await outrasProducoes(arquivo)))
    // process.stdout.write('.\n')
    tecnicas.push(...(await todasProducoesTecnicas(arquivo)))
  }

  console.log('Exportando... ')
  if (fileExists(arquivoXLS)) fs.unlink(arquivoXLS)

  if (artigos[0]) exportarParaExcel(arquivoXLS, artigos, 'Artigos')
  if (eventos[0]) exportarParaExcel(arquivoXLS, eventos, 'Eventos')
  if (livros[0]) exportarParaExcel(arquivoXLS, livros, 'Livros')
  if (capitulos[0]) exportarParaExcel(arquivoXLS, capitulos, 'Capitulos')
  if (jornaisOuRevistas[0]) {
    exportarParaExcel(arquivoXLS, jornaisOuRevistas, 'Jornais ou revistas')
  }
  if (outras[0]) {
    exportarParaExcel(arquivoXLS, outras, 'Outras produções bibliográficas')
  }
  if (outras[0]) {
    exportarParaExcel(arquivoXLS, todasProducoesTecnicas, 'Producoes técnicas')
  }
  // console.log(curriculo)
}

gerarRelatorio()
