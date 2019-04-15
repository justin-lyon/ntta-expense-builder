const { getTime, parse } = require('date-fns')
const datePattern = /([0-9]{2}\/){2}([0-9]{4}\s){1}([0-9]{2}\:){2}[0-9]{2}/

const camelize = label => {
  return label.split(/\s|\//)
    .map((n, i) => {
      const value = n.toLowerCase()

      if (i > 0) {
        return Array.from(value).map((v, i) => {
          if (i === 0) {
            return v.toUpperCase()
          }
          return v
        }).join('')
      }
      return value
    })
    .join('')
}

const readFile = bufferContent => {
  return new Promise((resolve, reject) => {
    try {
      const stringContent = bufferContent.toString('utf8')
      const rows = stringContent.split('\n')
      const headers = rows.shift().split('\t')

      const data = rows.reduce((acc, rowString, rowIndex) => {
        if (rowString === '') return acc

        const row = rowString.split('\t')

        const rowData = {}
        headers.forEach((h, i) => {
          const columnName = camelize(h)

          if (row[i]) {
            const prop = row[i]
            if (datePattern.test(prop)) {
              rowData[columnName] = getTime(parse(prop))
            } else {
              rowData[columnName] = prop.trim()
            }
          }
        })
        return acc.concat(rowData)
      }, [])

      resolve(data)

    } catch(err) {
      reject(err)
    }
  })
}

module.exports = {
  readFile
}