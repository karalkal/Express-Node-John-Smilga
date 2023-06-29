const express = require('express')
const app = express()

//  req => middleware => res

// If we require same functionality in a few routes, 
// we create dedicated function and use it as middleware (logger in this case)
// express AUTOMATICALLY PASSES req, res, next to our middleware function
// ALWAYS pass next(), otherwise app is stuck here

const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log("Method:", method, "\nURL: ", url, "\nYear: ", time)

  // res.send('Testing')  // program would just stop here
  next()  // IS CRUCIAL
}

app.get('/', logger, (req, res) => {
  res.send('Home page')
})

app.get('/about', logger, (req, res) => {
  res.send('About page')
})

app.listen(5000, () =>
  console.log('Server active on port 5000')
)