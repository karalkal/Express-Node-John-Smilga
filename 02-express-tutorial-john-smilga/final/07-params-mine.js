//just an experiment, see the original version for cleaner code

const app = require('express')()    //alternative use

// original won't work here
// const { products, people } = require('../data'), therefore do this:
const path = require('path')
const { products, people } = require(path.resolve(__dirname, '../data.js'))
console.log("Yoppy!!! ", path.resolve(__dirname, '../data.js'))

// concatenate both arrays, ids are now mixed up, some duplicated...
const combinedJson = products.concat(people)


app.get('/', (req, res) => {
    res.json(combinedJson)
})
// get only data with specific properties, i.e. id and name, which in our case are present in bot arrays
app.get('/mapped', (req, res) => {
    let result = combinedJson.map(item => (item.id, item.name))
    res.json(result)
})
//since our data is now mixed get all with specific "id"
app.get('/filtered/:id', (req, res) => {
    let result = combinedJson.filter(item => item.id === Number(req.params.id))
    res.json(result)
})
//get only first found element with "id"
app.get('/find/:id', (req, res) => {
    let result = combinedJson.find(item => item.id === Number(req.params.id))
    res.json(result)
})

app.get('/whatever/:anything', (req, res) => {
    console.log(req.params)
    let seqNo = req.params.anything
    let found = combinedJson[seqNo]
    console.log(found)

    if (found) {
        res.status(200).json(found)
    }else{
        res.status(404).send('F*** **F')
    }
})

app.listen(5000, () => console.log("Yo man!"))
