const readFile = bufferContent => {
  return new Promise((resolve, reject) => {
    try {
      const stringContent = bufferContent.toString('utf8')
      const rows = stringContent.split('\n')
      const headers = rows.shift().split('\t')
      const firstRow = rows[1].split('\t')

      const data = rows.reduce((acc, rowString) => {
        const row = rowString.split('\t')
        const rowData = {}
        headers.forEach((h, i) => {
          if (row[i]) {
            const prop = row[i].trim()
            rowData[h] = prop
          }
        })
        return acc.concat(rowData)
      }, [])

      console.log('headers', headers)
      resolve({ data })

    } catch(err) {
      reject(err)
    }
  })
}

module.exports = {
  readFile
}