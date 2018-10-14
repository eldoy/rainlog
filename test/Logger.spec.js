const { format } = require('util')
const fs = require('fs')
const Logger = require('../lib/logger.js')
const log = new Logger()
let output
console['log'] = jest.fn((...input) => {
  output = format(...input)
})
const LOGFILE = 'log.txt'

const rmfile = () => {
  if (fs.existsSync(LOGFILE)) {
    fs.unlinkSync(LOGFILE)
  }
}

beforeEach(() => {
  output = undefined
  log.reset()
  rmfile()
})

afterAll(rmfile)

describe('Log', () => {
  it('should have default config', () => {
    expect(log.config.file).toBe(false)
    expect(log.config.quiet).toBe(false)
    expect(log.stream).toBeUndefined()
  })

  it('should be configurable', () => {
    expect(log.config.quiet).toBe(false)
    log.set({ quiet: false })
    expect(log.config.quiet).toBe(false)
    log.set({ quiet: true })
    expect(log.config.quiet).toBe(true)
    log.set({ file: 'log.txt' })
    expect(log.config.file).toBe('log.txt')
    log.set({ file: 'log2.txt' })
    expect(log.config.file).toBe('log2.txt')
    log.set({ quiet: false })
    expect(log.config.quiet).toBe(false)
  })

  it('should print normally', () => {
    log.p('hello')
    expect(output).toBe('hello')
  })

  it('should print normally with substitution', () => {
    log.p('hello %s %o', 'hello', { hello: 'world' })
    expect(output).toBe("hello hello { hello: 'world' }")
  })

  it('should write to file', (done) => {
    log.set({ file: LOGFILE })
    log.p('hello')
    expect(output).toBe('hello')
    setTimeout(() => {
      expect(fs.existsSync(LOGFILE)).toBe(true)
      const r = fs.readFileSync(LOGFILE, 'utf-8')
      expect(r).toEqual('hello\n')
      done()
    }, 10)
  })
})