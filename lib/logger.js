const util = require('util')
const fs = require('fs')
require('colors')

const DEFAULT_CONFIG = {
  quiet: process.env.NODE_ENV === 'production',
  file: false
}

class Logger {
  constructor (config) {
    this.reset()
    if (config) {
      this.set(config)
    }
  }

  reset () {
    this.config = DEFAULT_CONFIG
  }

  set (config) {
    this.config = { ...this.config, ...config }
  }

  p (...a) {
    if (!this.config.quiet) {
      console.log(util.format(...a))
    }
    this.f(...a)
  }

  f (...a) {
    if (this.config.file) {
      if (!this.file) {
        this.file = fs.createWriteStream(this.config.file, { flags: 'a' })
      }
      this.file.write(util.format(...a) + '\n')
    }
  }
}

module.exports = Logger