const express = require('express')
const app = express()

//originally was at same levet
// const { products, people } = require('./data')

const { products, people } = require('../data')

app.get('/', (req, res) => {
    res.json(people)
})

app.get('/products', (req, res) => {
    res.send(products)
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
