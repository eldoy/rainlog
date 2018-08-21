const colors = require('colors')

const log = {}

// Pretty print object
log.pp = (obj) => {
  return JSON.stringify(obj, null, 2).replace(/\\"/g, '')
}

// Print request info
log.request = (req) => {
  log.green([
    `\n${req.token ? '😜' : '😎'}  ${req.method} ${req.path}`.bold.underline,
    `${log.pp(req.params || {})}`,
    `${log.pp(req.files || [])}`
  ].join('\n'))
}

const l = (m, c) => { console.log(m[c]) }
log.green = (m) => l(m, 'green')
log.red = (m) => l(m, 'red')
log.cyan = (m) => l(m, 'cyan')
log.rainbow = (m) => l(m, 'rainbow')

module.exports = log
