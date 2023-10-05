const express = require('express')
const app = express()
let { people } = require('../data')

// static assets
app.use(express.static('../methods-public'))

// parse form data
app.use(express.urlencoded({ extended: false }))

// parse json
app.use(express.json())

/* POST with HTML FORM */
//does not write data, just a basic example for passing data from form
//need middleware to parse that incoming data into the req.body
app.post('/login', (req, res) => {
    console.log(req.method, '\n', req.body)
    const { firstName } = req.body
    if (firstName) {
        return res.status(200).send(`Welcome ${firstName}`)
    }
    res.status(401).send('Please Provide Credentials')
})

/* All CRUD via Postman and POST with JS FORM*/
app.get('/api/people', (req, res) => {
    // res.send(people)
    res.status(200).json({
        success: true,
        data: people
    })
})

app.post('/api/people', (req, res) => {
    // View req data in browser dev tools 
    // Depending on the form used, axios adds Content-Type:
    // Content-Type: text/html VS application/json
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, person: name })
})

// John has demoed how Postman works, essentially will do the same as above when a request with json body is received
app.post('/api/postman/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, data: [...people, name] })
})

app.put('/api/people/:id', (req, res) => {
    //param contains the id, req body - the update data itself
    const { id } = req.params
    const { name } = req.body
    const person = people.find((person) => person.id === Number(id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name  // name is coming from req.body
        }
        return person
    })
    // does not change actual data, just updates and returns { people } = require('./data')
    res.status(200).json({ success: true, data: newPeople })
})

app.delete('/api/people/:id', (req, res) => {
    // console.log(req.params)
    // from req.params get the id - const { id } = req.params
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${req.params.id}` })
    }
    const newPeople = people.filter(person => person.id !== Number(req.params.id)
    )
    // not persising data, just return amended array
    return res.status(200).json({ success: true, data: newPeople })
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
