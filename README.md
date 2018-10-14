# Rainlog Node.js Logger with Color support

This versatile logger is an advanced ```console.log``` for your applications. It uses the built in ```util.format``` to make it easy to output strings and objects (no more need for JSON.stringify), and also have the excellent [colors](https://github.com/Marak/colors.js) library built in.

You can also log to file by setting it up in the configuration.

### INSTALL
```npm i rainlog``` or ```yarn add rainlog```

### USAGE
```javascript
const Rainlog = require('rainlog')
const log = new Rainlog()

// Write to console.log
log.p('hello world')

// Colored output
// See the 'colors' module for all available colors
log.p('hello world'.green)
log.p('hello world'.rainbow)

// Write formatted text
log.p('%s %d %o', 'hello', 2020, { world: 'amazing' })
// Output: hello 2020 { world: 'amazing' }

// Use the 'f' function to write only to file
log.f('hello')

// Create multiple logs if you want
access = new Rainlog()
access.p('user accessed')

error = new Rainlog()
error.p('error!')
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
Pass the config to the constructor or use the 'set' function to configure your logger.
```javascript
// Pass config to constructor
const log = new Rainlog({
  // When quiet is true there will be no output to console
  quiet: process.env.NODE_ENV === 'production',
  // Set the file option to a file name to also write to file
  file: false
})

// Use the set function to configure your logger
const log = new Rainlog()
log.set({ file: 'log.txt' })
```

### LICENSE
MIT Licensed. Enjoy!
