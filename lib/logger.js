const util = require('util')
const fs = require('fs')
const chalk = require('chalk')

const DEFAULT_CONFIG = {
  quiet: process.env.NODE_ENV === 'production',
  file: false,
  style: 'green'
}

class Logger {
  constructor (name, config) {
    this.name = name
    this.reset()
    if (config) {
      this.set(config)
    }
  }

  reset (config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  set (config) {
    this.config = { ...this.config, ...config }
  }

  p (...a) {
    if (!this.config.quiet) {
      let out = util.format(...a)
      if (this.config.style) {
        const styles = this.config.style.split('.')
        for (const s of styles) {
          try {
            out = chalk[s](out)
          } catch (err) {
            console.error('Invalid color or modifier: %s', s)
          }
        }
      }
      console.log(out)
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