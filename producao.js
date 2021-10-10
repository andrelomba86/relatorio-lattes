import {
  ARTIGOS,
  PRODUCAO,
  PRODUCAO_TECNICA,
  CURRICULO,
  EVENTOS,
  LIVROS,
  JORNAIS_REVISTAS,
  OUTRAS,
  TECNICAS,
} from './consts.js'
import { checarAno } from './checarAno.js'
import { lerCurriculo } from './lerCurriculo.js'

import xml2js from 'xml2js'
const parser = new xml2js.Parser()

export const dadosCurriculo = (function () {
  let dadosCurriculo = {}
  return async arquivo => {
    if (!dadosCurriculo[arquivo]) {
      dadosCurriculo[arquivo] = await lerCurriculo(arquivo)
    }

    const lattesJSON = await parser.parseStringPromise(dadosCurriculo[arquivo])

    // const dadosProducaoJSON = lattesJSON[CURRICULO][PRODUCAO][0]
    return lattesJSON
  }
})()

const producaoBibliografica = async arquivo => {
  const curriculo = await dadosCurriculo(arquivo)
  const producoes = curriculo[CURRICULO][PRODUCAO][0]
  return producoes
}

const producoesTecnicas = async arquivo => {
  const curriculo = await dadosCurriculo(arquivo)
  const producoes = curriculo[CURRICULO][PRODUCAO_TECNICA]
  return producoes
}
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

        if (checarAno(ano)) {
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

      if (checarAno(ano)) {
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

    if (checarAno(ano)) {
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

    if (checarAno(ano)) {
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

export async function jornalOuRevista(arquivo) {
  const producao = await producaoBibliografica(arquivo)
  let jornaisOuRevistas =
    producao[JORNAIS_REVISTAS.CABECALHO]?.[0]?.[
      JORNAIS_REVISTAS.JORNAL_OU_REVISTA
    ]

  const jornaisOuRevistasLista = []
  let index = 0

  jornaisOuRevistas?.forEach(jornalOuRevista => {
    const dados = jornalOuRevista[JORNAIS_REVISTAS.DADOS][0]['$']
    const autores = jornalOuRevista[JORNAIS_REVISTAS.AUTORES]
    const detalhes = jornalOuRevista[JORNAIS_REVISTAS.DETALHES][0]['$']

    let autoresLista = []

    autores?.forEach(autor => {
      const indiceAutor = autor['$'][JORNAIS_REVISTAS.ORDEM_AUTORIA] - 1
      const nome = autor['$'][JORNAIS_REVISTAS.CITACAO_AUTOR]
      autoresLista[indiceAutor] = nome
    })

    const ano = parseInt(dados[JORNAIS_REVISTAS.ANO])

    if (checarAno(ano)) {
      jornaisOuRevistasLista[index] = {
        Arquivo: arquivo,
        Ano: ano,
        Autores: autoresLista.join('; '),
        Titulo: dados[JORNAIS_REVISTAS.TITULO],
        'Titulo do jornal ou revista':
          detalhes[JORNAIS_REVISTAS.TITULO_DO_JORNAL_REVISTA],
        Pais: dados[JORNAIS_REVISTAS.PAIS],
        Idioma: dados[JORNAIS_REVISTAS.IDIOMA],
      }
      index++
    }
  })

  return jornaisOuRevistasLista
}

export async function outrasProducoes(arquivo) {
  const producao = await producaoBibliografica(arquivo)
  let outras = producao[OUTRAS.CABECALHO]?.[0]?.[OUTRAS.OUTRA]

  const outrasLista = []
  let index = 0

  outras?.forEach(outra => {
    // if (!outra[OUTRAS.DADOS]) return
    const dados = outra[OUTRAS.DADOS][0]['$']
    const autores = outra[OUTRAS.AUTORES]
    const detalhes = outra[OUTRAS.DETALHES][0]['$']

    let autoresLista = []

    autores?.forEach(autor => {
      const indiceAutor = autor['$'][OUTRAS.ORDEM_AUTORIA] - 1
      const nome = autor['$'][OUTRAS.CITACAO_AUTOR]
      autoresLista[indiceAutor] = nome
    })

    const ano = parseInt(dados[OUTRAS.ANO])

    if (checarAno(ano)) {
      outrasLista[index] = {
        Arquivo: arquivo,
        Ano: ano,
        Autores: autoresLista.join('; '),
        Titulo: dados[OUTRAS.TITULO],
        Natureza: dados[OUTRAS.NATUREZA],
        Editora: detalhes[OUTRAS.EDITORA],
        Pais: dados[OUTRAS.PAIS],
        Idioma: dados[OUTRAS.IDIOMA],
      }
      index++
    }
  })

  return outrasLista
}

export async function todasProducoesTecnicas(arquivo) {
  // const producao = await producoesTecnicas(arquivo)
  // let tecnicas = producao[TECNICAS.CABECALHO]?.[0]?.[TECNICAS.OUTRA]
  const tecnicas = await producoesTecnicas(arquivo)

  const tecnicasLista = []
  let index = 0

  tecnicas?.forEach((outra, key) => {
    console.log(outra)
    return
    // if (!outra[OUTRAS.DADOS]) return
    const dados = outra[TECNICAS.DADOS][0]['$']
    const autores = outra[TECNICAS.AUTORES]
    const detalhes = outra[TECNICAS.DETALHES][0]['$']

    let autoresLista = []

    autores?.forEach(autor => {
      const indiceAutor = autor['$'][TECNICAS.ORDEM_AUTORIA] - 1
      const nome = autor['$'][TECNICAS.CITACAO_AUTOR]
      autoresLista[indiceAutor] = nome
    })

    const ano = parseInt(dados[TECNICAS.ANO])

    if (checarAno(ano)) {
      tecnicasLista[index] = {
        Arquivo: arquivo,
        Ano: ano,
        Autores: autoresLista.join('; '),
        Titulo: dados[TECNICAS.TITULO],
        Natureza: dados[TECNICAS.NATUREZA],
        Editora: detalhes[TECNICAS.EDITORA],
        Pais: dados[TECNICAS.PAIS],
        Idioma: dados[TECNICAS.IDIOMA],
      }
      index++
    }
  })

  return tecnicasLista
}
