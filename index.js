const Logger = require('./lib/logger')

const DEFAULT_LOGGERS = ['info', 'error']
const ILLEGAL_NAMES = ['get', 'reset', 'add']

class Rainlog {
  constructor (config) {
    this.get = {}
    this.initLoggers(config)
  }

  initLoggers (config) {
    for (const name of DEFAULT_LOGGERS) {
      this.buildLogger(name, config)
    }
  }

  buildLogger (name, config) {
    this.get[name] = new Logger(config)
    this[name] = (...a) => {
      this.get[name].p(...a)
    }
    this[`$${name}`] = (...a) => {
      this.get[name].f(...a)
    }
  }

  reset () {
    for (const name in this.get) {
      this.get[name].reset()
    }
  }

  add (name, config) {
    if (ILLEGAL_NAMES.includes(name)) {
      throw new Error(`'${name}' is not a legal name for loggers`)
    }
    this.buildLogger(name, config)
  }
}

module.exports = Rainlog
