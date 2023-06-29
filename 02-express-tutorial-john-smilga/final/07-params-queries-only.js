const express = require('express')
const app = express()
//MIND THE URLs
const { products } = require('../data')


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
