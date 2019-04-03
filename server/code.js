const fs = require('fs')
const path = require('path')

const express = require('express')

const app = express.Router()

const targetFile = path.resolve(__dirname, 'index.js')

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

app.get('/code', (req, res) => {
  fs.readFile(targetFile, (err, data) => {
    if (err) {
      res.status(500).send(err.message)
    } else {
      res.send(data.toString())
    }
  })
})

app.post('/code', jsonParser, (req, res) => {
  const { raw } = req.body || {}
  if (raw) {
    fs.writeFile(targetFile, raw, (err) => {
      if (err) {
        res.status(500)
      } else {
        res.json('ok')
      }
    })
  }
})

module.exports = app
