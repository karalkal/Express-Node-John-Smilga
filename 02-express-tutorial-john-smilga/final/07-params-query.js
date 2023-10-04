const express = require('express')
const app = express()
const { products } = require('../data')

app.get('/', (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>')
})

// http://localhost:5000/api/products
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product
    return { id, name, image }
  })

  res.json(newProducts)
})

// or in short
app.get('/api/productsShort', (req, res) => {
  res.json(products.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.image
  })
  ))
})

app.get('/api/products/:productID', (req, res) => {
  console.log(req.params)
  const { productID } = req.params

  const singleProduct = products.find(product => product.id === Number(productID))
  if (!singleProduct) {
    return res.status(404).send('Product Does Not Exist')
  }
  return res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params)
  res.send(`Params in this request: ${JSON.stringify(req.params)}`)
})

// http://localhost:5000/api/v1/query?huj=huj
app.get('/api/v1/query', (req, res) => {
  console.log(req.query)

  //http://localhost:5000/api/v1/query?key=value
  const { search, limit } = req.query
  console.log(search, limit)

  let sortedProducts = [...products]

  // http://localhost:5000/api/v1/query?search=sofa&limit=3
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.includes(search) // use includes here, not starts with as in original
    })
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ sucess: true, data: [] })
  }
  res.status(200).json(sortedProducts)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
