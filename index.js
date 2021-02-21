const Logger = require('./lib/logger.js')

const DEFAULT_LOGGERS = {
  'info': { style: 'green' },
  'err': { style: 'red' }
}
const ILLEGAL_NAMES = ['get', 'reset', 'add']

class Rainlog {
  constructor (config) {
    this.get = {}
    this.initLoggers(config)
  }

  initLoggers (config) {
    for (const name in DEFAULT_LOGGERS) {
      this.buildLogger(name, { ...DEFAULT_LOGGERS[name], ...config })
    }
  }

  buildLogger (name, config) {
    this.get[name] = new Logger(name, config)
    this[name] = (...a) => {
      this.get[name].p(...a)
    }
    this[`$${name}`] = (...a) => {
      this.get[name].f(...a)
    }
  }

  add (name, config) {
    if (ILLEGAL_NAMES.includes(name)) {
      throw new Error(`'${name}' is not a legal name for loggers`)
    }
    this.buildLogger(name, config)
  }

  reset () {
    for (const name in this.get) {
      this.get[name].reset(DEFAULT_LOGGERS[name])
    }
  }

  set (config) {
    for (const name in this.get) {
      this.get[name].set(config)
    }
  }
}

module.exports = Rainlog
