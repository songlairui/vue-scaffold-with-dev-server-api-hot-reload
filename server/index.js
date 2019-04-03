const express = require('express')

const app = express.Router()

app.get('/whoami', (req, res) => {
  res.send('you are a winner!')
})

module.exports = app
