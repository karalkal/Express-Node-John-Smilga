const express = require('express')
const app = express()

// view previous example, here logger middleware is moved to separate file
const logger = require('./middleware/loggerMiddleware')
const authorize = require('./middleware/authMiddleware')

//  req => middleware => res

app.use([logger, authorize])
// Will invoke the middleware in any of the routes
// order matters, only routes after will use it
// api/home/about/products

app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})
app.get('/api/items', (req, res) => {
  console.log(req.user)
  res.send('Items')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
