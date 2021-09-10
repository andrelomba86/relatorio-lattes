import { ARTIGOS, PRODUCAO, CURRICULO, EVENTOS, LIVROS } from './consts.js'
import { checarAnoTrabalhos } from './checarAno.js'
import { lerCurriculo } from './lerCurriculo.js'

import xml2js from 'xml2js'
const parser = new xml2js.Parser()

export const producaoBibliografica = (function () {
  let dadosProducao = {}
  return async arquivo => {
    if (!dadosProducao[arquivo]) {
      console.log('-> ', arquivo)
      dadosProducao[arquivo] = await lerCurriculo(arquivo)
    }

    const lattesJSON = await parser.parseStringPromise(dadosProducao[arquivo])

    const dadosProducaoJSON = lattesJSON[CURRICULO][PRODUCAO][0]
    return dadosProducaoJSON
  }
})()

export async function artigosPublicados(arquivo) {
  const producao = await producaoBibliografica(arquivo)
  let artigosPublicados = producao[ARTIGOS.CABECALHO]
  const artigosLista = []
  let index = 0
  artigosPublicados.forEach(
    //REMOVER?
    artigos =>
      artigos[ARTIGOS.ARTIGO].forEach(artigo => {
        const dados = artigo[ARTIGOS.DADOS][0]['$']
        const autores = artigo[ARTIGOS.AUTORES]

        let autoresLista = []

        autores.forEach(autor => {
          const indiceAutor = autor['$'][ARTIGOS.ORDEM_AUTORIA] - 1
          const nome = autor['$'][ARTIGOS.CITACAO_AUTOR]
          autoresLista[indiceAutor] = nome
        })

        // console.log(autoresLista.join('; '))

        const ano = parseInt(dados[ARTIGOS.ANO])

        if (checarAnoTrabalhos(ano)) {
          artigosLista[index] = {
            Arquivo: arquivo,
            Ano: ano,
            Autores: autoresLista.join('; '),
            Titulo: dados[ARTIGOS.TITULO],
            Natureza: dados[ARTIGOS.NATUREZA],
            Idioma: dados[ARTIGOS.IDIOMA],
          }
          index++
        }
      })
  )

  return artigosLista
}

export async function publicaoesEmEventos(arquivo) {
  const producao = await producaoBibliografica(arquivo)
  let trabalhosEmEventos = producao[EVENTOS.CABECALHO]

  const eventosLista = []
  let index = 0
  trabalhosEmEventos.forEach(eventos =>
    eventos[EVENTOS.TRABALHO].forEach(evento => {
      const dados = evento[EVENTOS.DADOS][0]['$']
      const autores = evento[EVENTOS.AUTORES]

      let autoresLista = []

      autores.forEach(autor => {
        const indiceAutor = autor['$'][EVENTOS.ORDEM_AUTORIA] - 1
        const nome = autor['$'][EVENTOS.CITACAO_AUTOR]
        autoresLista[indiceAutor] = nome
        // console.log(nome)
      })

      const ano = parseInt(dados[EVENTOS.ANO])

      if (checarAnoTrabalhos(ano)) {
        eventosLista[index] = {
          Arquivo: arquivo,
          Ano: ano,
          Autores: autoresLista.join('; '),
          Titulo: dados[EVENTOS.TITULO],
          Natureza: dados[EVENTOS.NATUREZA],
          Pais: dados[EVENTOS.PAIS],
          Idioma: dados[EVENTOS.IDIOMA],
        }
        index++
      }
    })
  )

  return eventosLista
}

export async function livrosPublicadosOuOrganizados(arquivo) {
  const producao = await producaoBibliografica(arquivo)
  let livros =
    producao[LIVROS.CABECALHO]?.[0]?.[LIVROS.COMPLETOS]?.[0]?.[
      LIVROS.PUBLICADO_OU_ORGANIZADO.CABECALHO
    ]

  const livrosLista = []
  let index = 0

  livros?.forEach(livro => {
    const dados = livro[LIVROS.PUBLICADO_OU_ORGANIZADO.DADOS][0]['$']
    const autores = livro[LIVROS.PUBLICADO_OU_ORGANIZADO.AUTORES]

    let autoresLista = []

    autores?.forEach(autor => {
      const indiceAutor =
        autor['$'][LIVROS.PUBLICADO_OU_ORGANIZADO.ORDEM_AUTORIA] - 1
      const nome = autor['$'][LIVROS.PUBLICADO_OU_ORGANIZADO.CITACAO_AUTOR]
      autoresLista[indiceAutor] = nome
    })

    const ano = parseInt(dados[LIVROS.PUBLICADO_OU_ORGANIZADO.ANO])

    if (checarAnoTrabalhos(ano)) {
      livrosLista[index] = {
        Arquivo: arquivo,
        Ano: ano,
        Autores: autoresLista.join('; '),
        Titulo: dados[LIVROS.PUBLICADO_OU_ORGANIZADO.TITULO],
        Natureza: dados[LIVROS.PUBLICADO_OU_ORGANIZADO.NATUREZA],
        Pais: dados[LIVROS.PUBLICADO_OU_ORGANIZADO.PAIS],
        Idioma: dados[LIVROS.PUBLICADO_OU_ORGANIZADO.IDIOMA],
      }
      index++
    }
  })

  // console.log(livrosLista)
  return livrosLista
}

export async function capitulosDeLivros(arquivo) {
  const producao = await producaoBibliografica(arquivo)
  let capitulos =
    producao[LIVROS.CABECALHO]?.[0]?.[LIVROS.CAPITULOS]?.[0]?.[
      LIVROS.CAPITULO.CABECALHO
    ]

  const capitulosLista = []
  let index = 0

  capitulos?.forEach(capitulo => {
    const dados = capitulo[LIVROS.CAPITULO.DADOS][0]['$']
    const autores = capitulo[LIVROS.CAPITULO.AUTORES]
    const detalhes = capitulo[LIVROS.CAPITULO.DETALHES][0]['$']

    let autoresLista = []

    autores?.forEach(autor => {
      const indiceAutor = autor['$'][LIVROS.CAPITULO.ORDEM_AUTORIA] - 1
      const nome = autor['$'][LIVROS.CAPITULO.CITACAO_AUTOR]
      autoresLista[indiceAutor] = nome
    })

    const ano = parseInt(dados[LIVROS.CAPITULO.ANO])

    if (checarAnoTrabalhos(ano)) {
      capitulosLista[index] = {
        Arquivo: arquivo,
        Ano: ano,
        Autores: autoresLista.join('; '),
        Titulo: dados[LIVROS.CAPITULO.TITULO],
        Tipo: dados[LIVROS.CAPITULO.TIPO],
        'Titulo do livro': detalhes[LIVROS.CAPITULO.LIVRO],
        Pais: dados[LIVROS.CAPITULO.PAIS],
        Idioma: dados[LIVROS.CAPITULO.IDIOMA],
      }
      index++
    }
  })

  return capitulosLista
}
