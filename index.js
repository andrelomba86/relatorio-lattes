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

  // let artigos = []
  // let eventos = []
  // let livros = []
  // let capitulos = []
  let [artigos, eventos, livros, capitulos] = [[], [], [], []]

  for await (let arquivo of arquivosLattes) {
    artigos.push(...(await artigosPublicados(arquivo)))
    eventos.push(...(await publicaoesEmEventos(arquivo)))
    livros.push(...(await livrosPublicadosOuOrganizados(arquivo)))
    capitulos.push(...(await capitulosDeLivros(arquivo)))
  }

  console.log('Exportando... ')
  if (fileExists(arquivoXLS)) fs.unlink(arquivoXLS)
  if (artigos[0]) exportarParaExcel(arquivoXLS, artigos, 'Artigos')
  if (eventos[0]) exportarParaExcel(arquivoXLS, eventos, 'Eventos')
  if (livros[0]) exportarParaExcel(arquivoXLS, livros, 'Livros')
  if (capitulos[0]) exportarParaExcel(arquivoXLS, capitulos, 'Capitulos')

  // console.log(curriculo)
}

gerarRelatorio()
