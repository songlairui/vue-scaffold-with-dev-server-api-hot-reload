const express = require('express')
const chokidar = require('chokidar')
const path = require('path')
const app = express()

app.use((...reAndNext) => {
  // execute require everytime
  require('./server/index')(...reAndNext)
})

app.use((...reAndNext) => {
  // execute require everytime
  require('./server/code')(...reAndNext)
})

const watcher = chokidar.watch('./server')

watcher.on('ready', function() {
  watcher.on('all', function(type, file) {
    try {
      const targetId = path.resolve(__dirname, file)
      console.log('Clear module cache', file, targetId)
      delete require.cache[targetId]
    } catch (error) {
      console.info('targetId err', error.message)
    }
  })
})

module.exports = app
