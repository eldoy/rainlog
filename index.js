const util = require('util')
const fs = require('fs')
require('colors')

const DEFAULT_CONFIG = {
  quiet: process.env.NODE_ENV === 'production',
  file: false
}

class Rainlog {
  constructor () {
    this.reset()
  }

  reset () {
    this.config = DEFAULT_CONFIG
  }

  set (config) {
    this.config = { ...this.config, ...config }
  }

  p (...a) {
    const out = util.format(...a)
    console.log(out)
    if (this.config.file) {
      if (!this.file) {
        this.file = fs.createWriteStream(this.config.file, { flags: 'a' })
      }
      this.file.write(out + '\n')
    }
  }
}

module.exports = new Rainlog()
