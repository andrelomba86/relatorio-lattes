import { readdir, readFile } from 'fs/promises'

const dir = './curriculos/'

async function lerCurriculo(arquivo) {
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

export { lerCurriculo }
