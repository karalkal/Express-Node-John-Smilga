// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')

// a function from the imported module is EXECUTED as soon as we require it
require('./07-mind-grenade')

sayHi('****')
sayHi(names.john)
sayHi(names.peter)

// OR destructurejohn and peter upon import
const { john, peter } = require('./04-names')
sayHi('****')
sayHi(john)
sayHi(peter)

console.log(data)

// console.log(require)


