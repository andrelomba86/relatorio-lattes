import { getLattesData } from './lerCurriculo.js'
import exportarParaExcel from './exportar.js'
import { promises as fs } from 'fs'
import { existsSync as fileExists } from 'fs'
import { checarAno } from './checarAno.js'
import { searchKeys, columnsOrders } from './constants.js'
const XLSfile = './relatorio.xls'
const lattesFilesDir = './curriculos/'
const hasSubKeys = obj => typeof obj === 'object' && !!Object.keys(obj).length

async function getAuthors(lattesData) {
  let authors = []
  for (let author of lattesData) {
    const index = author['$']['ORDEM-DE-AUTORIA'] - 1
    authors[index] = author['$']['NOME-PARA-CITACAO'].split(';')[0]
  }
  // console.log(authors)
  return authors.join('; ')
}

async function collectDataSubitens(keys, lattesData, fullName) {
  let collectedSubitens = {}
  if (!lattesData) {
    console.log('no lattesData - keys:', keys)
    return ''
  }
  for (let key in keys) {
    const nextKeys = keys[key]
    // if (!lattesData) continue

    let newLattesData = lattesData[key]

    if (hasSubKeys(nextKeys)) {
      let scanResult

      if (key === 'AUTORES') {
        scanResult = await getAuthors(newLattesData)
        scanResult = { Autores: scanResult }
      } else if (nextKeys.Column) {
        scanResult = { [nextKeys.Column]: newLattesData }
      } else {
        scanResult = await collectDataSubitens(
          nextKeys,
          newLattesData,
          fullName
        )
      }

      collectedSubitens = { ...collectedSubitens, ...scanResult }
    }
    // } else {
    //   /* APAGAR ELSE ? --- NÃO PASSA POR AQUI ? */
    //   collectedSubitens = { ...collectedSubitens, [key]: nextKeys }
    // }
  }
  return collectedSubitens
}

async function collectData(keys, lattesData, fullName) {
  let collectMultiple = []
  for (let key of lattesData) {
    // let data = await scanSubitens(keys, key, fullName)
    let data = await collectDataSubitens(keys, key, fullName)
    data = { ...data, Docente: fullName }
    if (checarAno(data['Ano'])) {
      collectMultiple.push(data)
    }
  }
  return collectMultiple
}

async function scanSubitens(keys, lattesData, fullName) {
  let arrayMudarDeNome = []
  for (let key in keys) {
    const nextKeys = keys[key]
    if (!lattesData) continue
    let newLattesData = lattesData[key]
    if (hasSubKeys(nextKeys)) {
      // let scanResult
      if (nextKeys.MultipleData) {
        const multipleData = await collectData(
          nextKeys[0],
          newLattesData,
          fullName
        )

        // arrayMudarDeNome.push(...multipleData)
        return multipleData
      } else {
        const scan = await scanSubitens(nextKeys, newLattesData, fullName)
        arrayMudarDeNome.push(...scan)
      }
    }
    // console.log('>>>', arrayMudarDeNome, '<<< \n')
    // } else {
    //   /* APAGAR ? --- NÃO PASSA POR AQUI ? */
    //   console.log('*******************************************************8')
    //   collectSubitens = { ...collectSubitens, [key]: nextKeys }
    // }
  }
  return arrayMudarDeNome
}

export async function scanLattes(keys, lattesData, fullName, resultCallback) {
  for (let key in keys) {
    const nextKeys = keys[key]

    let newLattesData = lattesData[key]
    if (!newLattesData) continue

    if (nextKeys['Sheet']) {
      const result = await scanSubitens(nextKeys[0], newLattesData[0], fullName)
      const sheetData = nextKeys['Sheet']
      process.stdout.write('.')
      // console.log(result)
      resultCallback(sheetData, result)

      // constconsole.log('RESULT', result)
    } else if (hasSubKeys(nextKeys)) {
      await scanLattes(nextKeys, newLattesData, fullName, resultCallback)
    }
  }
}

async function getFiles() {
  const arquivosLattes = await fs.readdir(lattesFilesDir)
  return arquivosLattes
}
const init = async () => {
  if (fileExists(XLSfile)) fs.unlink(XLSfile)

  // const fileNames = ['Chang.xml'] //, 'Cesar.xml']
  const fileNames = await getFiles()

  let fullData = {}
  process.stdout.write('Lendo Currículos')
  for (let fileName of fileNames) {
    const lattesJSON = await getLattesData(fileName)
    const fullName =
      lattesJSON['CURRICULO-VITAE']['DADOS-GERAIS'][0]['$']['NOME-COMPLETO']
    process.stdout.write(`\n-> ${fullName}`)

    await scanLattes(searchKeys, lattesJSON, fullName, (sheet, result) => {
      if (result.length) {
        //const prevData = fullData[sheet.Name] || []
        //fullData[sheet.Name] = [...prevData, ...result]

        if (!fullData[sheet.Name]) {
          fullData[sheet.Name] = []
        }
        // console.log('>>> ', result, '<<< \n')
        fullData[sheet.Name].push(...result)
        // console.log(fullData[sheet.Name])
      }
    })
  }
  // console.dir(fullData)

  // console.log(fullData)
  if (Object.keys(fullData).length === 0) {
    process.stdout.write('\nNada encontrado.')
  } else {
    process.stdout.write('\nExportando')

    for (let sheet in fullData) {
      let order = columnsOrders[sheet] || undefined
      console.log(sheet, order)
      exportarParaExcel(XLSfile, fullData[sheet], sheet, order)
      process.stdout.write('.')
    }
  }
  console.log('\nFim.')
}

init()

// async function start() {
//   await init()

//   await init()
// }

// start()
