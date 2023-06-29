const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log(`user hit url "${req.url}" with "${req.method}" method`)
    res.send('Home Page')
})

app.get('/about', (req, res) => {
    console.log(`user hit url "${req.url}" with "${req.method}" method`)
    res.send('About Page')
})

app.all('*', (req, res) => {
    console.log(`user hit url "${req.url}" with "${req.method}" method`)
    res.status(404)
        .send('<h1>resource not found</h1>')
})

app.listen(5000, () => console.log('app listening on port 5000'))


// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen