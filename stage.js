const Rainlog = require('./index.js')
const log = new Rainlog()

log.info('hello')
log.err('ERROR %s', 'asdf')
