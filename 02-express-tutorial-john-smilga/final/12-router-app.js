const express = require('express')
const app = express()

// MIND THE LINKS!
const people = require('./12-routes/people')
const auth = require('./12-routes/auth')

// in order to use html forms for POST @localhost
app.use(express.static('../methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json (send as json to FE)
app.use(express.json())


app.use('/api/people', people)
app.use('/login', auth)

app.listen(3000, () => {
    console.log('Server is listening on port 3000....')
})
