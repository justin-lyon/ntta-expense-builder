const router = require('express').Router()
const multer = require('multer')
const uploadSingle = multer().single('file')

const { readFile } = require('./tsv2json')

router.post('/upload', uploadSingle, (req, res) => {
  readFile(req.file.buffer)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.error('Error reading file.', err)
      res.status(500).send('Server Error')
    })
})

module.exports = router