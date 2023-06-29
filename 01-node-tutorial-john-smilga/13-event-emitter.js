// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// on and emit methods
// order is important - first we listen, then we emit
// additional arguments
// built-in modules utilize it

//first param needs to match the event emitter name, in this case 'response'
customEmitter.on('response', (fName, lName, age) => {
  console.log(`First Name: ${fName}, Last Name: ${lName}, Age: ${age}`)
})

customEmitter.on('response', () => {
  console.log('some other logic here')
})

customEmitter.emit('response', 'kur', 'kurov', 34)
