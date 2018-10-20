const { format } = require('util')
const fs = require('fs')
const Rainlog = require('../index')
const Logger = require('../lib/logger')
const log = new Rainlog()

const FILES = {
  info: 'info.txt',
  error: 'error.txt'
}

const rmfile = () => {
  for (const f in FILES) {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f)
    }
  }
}

beforeEach(() => {
  output = undefined
  log.reset()
  rmfile()
})

let output
console['log'] = jest.fn((...input) => {
  output = format(...input)
})

describe('Rainlog', () => {
  it('should have two loggers', () => {
    const count = Object.keys(log.get).length
    expect(count).toEqual(2)
    expect(log.get.info).toBeDefined()
    expect(log.get.err).toBeDefined()
  })

  it('should let loggers be callable', () => {
    log.info('info')
    expect(output).toMatch('info')
    log.err('error')
    expect(output).toMatch('error')
  })

  it('should let file writers be callable', () => {
    log.$info('info')
    expect(output).toBeUndefined()
    log.$err('error')
    expect(output).toBeUndefined()
  })

  it('should let loggers instances be available', () => {
    expect(log.get.info).toBeDefined()
    expect(log.get.info.constructor).toEqual(Logger)
    expect(log.get.info.config.style).toEqual('green')
    expect(log.get.err).toBeDefined()
    expect(log.get.err.constructor).toEqual(Logger)
    expect(log.get.err.config.style).toEqual('red')
  })

  it('should add loggers', () => {
    log.add('warn', { quiet: true })
    expect(log.get.warn).toBeDefined()
    expect(log.get.warn.constructor).toEqual(Logger)
  })

  it('should crash if name is illegal', () => {
    try {
      log.add('add', { quiet: true })
    } catch (err) {
      expect(err.message).toEqual("'add' is not a legal name for loggers")
    }
  })

  it('should set config for all loggers', () => {
    expect(log.get.info.config.quiet).toBe(false)
    expect(log.get.err.config.quiet).toBe(false)
    log.set({ quiet: true })
    expect(log.get.info.config.quiet).toBe(true)
    expect(log.get.err.config.quiet).toBe(true)
  })
})