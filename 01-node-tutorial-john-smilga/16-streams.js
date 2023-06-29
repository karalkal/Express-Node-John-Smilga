const { createReadStream } = require('fs')

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('./content/big.txt',
  {
    highWaterMark: 32768,
    encoding: 'utf8'
  })
// default 64kB, changed here to 32kB


stream.on('data', (result) => {
  console.log(result)
})
stream.on('error', (err) => console.log(err))
