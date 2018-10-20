![Rainlog logo](https://s3.amazonaws.com/7ino/1539491283_rainlog-logo.png)

# Rainlog Node.js Logger with Color support

This versatile logger is an advanced ```console.log``` for your applications. It uses the built in ```util.format``` to make it easy to output strings and objects (no more need for JSON.stringify), and also has the excellent [chalk](https://github.com/chalk/chalk) library built in.

You can also log to file by setting it up in the configuration.

### INSTALL
```npm i rainlog``` or ```yarn add rainlog```

### USAGE
By default 2 loggers are included: *info* and *err*. You can add extra loggers as you please.
```javascript
const Rainlog = require('rainlog')
const log = new Rainlog()

// Write to console.log using the 'info' logger
log.info('hello world')

// Write to console.log using the 'error' logger
log.err('hello world')

// Update config for a single logger
log.get.err.set({ file: 'error.txt' })

// Update config for all loggers
log.set({ quiet: true })

// Reset config for a single logger
log.get.info.reset()

// Reset config for all loggers
log.reset()

// Write formatted text
log.info('%s %d %o', 'hello', 2020, { world: 'amazing' })
// Output: hello 2020 { world: 'amazing' }

// Use the $ function to write to file
log.$info('hello')

// Add a logger to the existing log, pass name and config
// The new logger is instantly available as 'log.warn'
log.add('warn', { quiet: true })
log.warn('this logger is on fire')

// Create multiple logs if you want
access = new Rainlog()
access.info('user accessed')
access.err('user not found')
```

### FORMATTING
Here are the formatting options, taken from the [Node.js docs](https://nodejs.org/api/util.html#util_util_format_format_args):
```
%s - String.
%d - Number (integer or floating point value) or BigInt.
%i - Integer or BigInt.
%f - Floating point value.
%j - JSON. Replaced with the string '[Circular]' if the argument contains circular references.
%o - Object. A string representation of an object with generic JavaScript object formatting. Similar to util.inspect() with options { showHidden: true, showProxy: true }. This will show the full object including non-enumerable properties and proxies.
%O - Object. A string representation of an object with generic JavaScript object formatting. Similar to util.inspect() without options. This will show the full object not including non-enumerable properties and proxies.
%% - single percent sign ('%'). This does not consume an argument.
```

### CONFIGURATION
Use the 'set' function to configure your logger. Files are not written to by default.
```javascript
// The default configuration looks like this for all loggers
{
  // When quiet is true there will be no output to console
  quiet: process.env.NODE_ENV === 'production',

  // Set the file option to a file name to also write to file
  file: false,

  // Set colors and modifers, see the 'chalk' module for options
  style: 'green.bold.underline'
}

// Create the Rainlog instance
const log = new Rainlog()

// Optionally pass the config to the constructor
const log = new Rainlog({ quiet: true })

// Use the set function to configure your logger
log.get.info.set({ file: 'info.txt' })
log.get.err.set({ file: 'error.txt' })
```

### LICENSE
MIT Licensed. Enjoy!
