import { getLattesData } from './lerCurriculo.js'

const searchKeys = {
  'CURRICULO-VITAE': {
    'PRODUCAO-BIBLIOGRAFICA': {
      0: {
        'TRABALHOS-EM-EVENTOS': {
          Title: 'Trabalhos em eventos',
          0: {
            'TRABALHO-EM-EVENTOS': {
              MultipleData: true,
              0: {
                AUTORES: {
                  Column: 'Autores',
                },
                'DADOS-BASICOS-DO-TRABALHO': {
                  0: {
                    $: {
                      'ANO-DO-TRABALHO': {
                        Column: 'Ano do trabalho',
                      },

                      'TITULO-DO-TRABALHO': {
                        Column: 'Título',
                      },
                      NATUREZA: {
                        Column: 'Natureza',
                      },
                      'PAIS-DO-EVENTO': {
                        Column: 'País',
                      },
                    },
                  },
                },
                'DETALHAMENTO-DO-TRABALHO': {
                  0: {
                    $: {
                      'NOME-DO-EVENTO': {
                        Column: 'Evento',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        // 'ARTIGOS-PUBLICADOS': {
        //   Title: 'Artigos publicados',
        //   'TRABALHO-EM-EVENTOS': {
        //     'DADOS-BASICOS-DO-TRABALHO': {},
        //   },
        // },
      },
    },
  },
}

const hasSubKeys = obj => typeof obj === 'object' && !!Object.keys(obj).length

async function scanAuthors(lattesData) {
  let authors = []
  // console.log(lattesData)
  for (let author of lattesData) {
    authors.push(author['$']['NOME-PARA-CITACAO'].split(';')[0])
  }
  // console.log(authors)
  return authors.join('; ')
}

async function scanMultipleData(keys, lattesData) {
  let collectMultiple = []
  // console.log(lattesData)
  for (let key of lattesData) {
    const data = await scanSubitens(keys, key)
    collectMultiple.push(data)
  }
  // console.log(collectMultiple)
  return collectMultiple
}

async function scanSubitens(keys, lattesData) {
  let collectSubitens
  for (let key in keys) {
    const nextKeys = keys[key]
    let newLattesData = lattesData[key]
    // console.log(nextKeys)
    if (hasSubKeys(nextKeys)) {
      let scanResult
      // let fullResult = []
      if (nextKeys.MultipleData) {
        /* RETURN ??? */
        return scanMultipleData(nextKeys[0], newLattesData)
      } else if (key === 'AUTORES') {
        // console.log('AUTORES', newLattesData)

        scanResult = await scanAuthors(newLattesData)
        console.log(scanResult)
        process.exit(0)
      } else if (nextKeys.Column) {
        scanResult = { [nextKeys.Column]: newLattesData }
        // console.log(nextKeys.Column)
      } else {
        scanResult = await scanSubitens(nextKeys, newLattesData, true)
      }
      collectSubitens = { ...collectSubitens, ...scanResult }
    } else {
      collectSubitens = { ...collectSubitens, [key]: nextKeys }
    }
  }
  return collectSubitens
}

export async function scanLattes(keys, lattesData, isSubItem = false) {
  let autores

  for (let key in keys) {
    // console.log('->', key)
    const nextKeys = keys[key]

    let newLattesData = lattesData[key]

    if (nextKeys['Title']) {
      const result = await scanSubitens(nextKeys[0], newLattesData[0], true)
      console.log('RESULT', result)
    } else if (hasSubKeys(nextKeys)) {
      await scanLattes(nextKeys, newLattesData, false)
    }
  }
}

const init = async () => {
  const curriculo = await getLattesData('Chang.xml')
  // console.log(curriculo)
  scanLattes(searchKeys, curriculo)
}
init()
