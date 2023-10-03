const express = require('express')
const app = express()

// edited: displaying message on FE as well
app.get('/', (req, res) => {
    console.log(`user hit url "${req.url}" with "${req.method}" method`)
    res.send(`<h1>Home Page</h1>
    <p>user hit url "<b>${req.url}</b>" with "<b>${req.method}</b>" method</p>`)
})

app.get('/about', (req, res) => {
    console.log(`user hit url "${req.url}" with "${req.method}" method`)
    res.send(`<h1>About Page</h1>
    <p>user hit url "<b>${req.url}</b>" with "<b>${req.method}</b>" method</p>`)
})

app.all('*', (req, res) => {
    console.log(`user hit url "${req.url}" with "${req.method}" method`)
    res.status(404)
        .send(`<h1>resource not found</h1>
        <p>user hit url "<b>${req.url}</b>" with "<b>${req.method}</b>" method</p>`)
})

app.listen(5000, () => console.log('app listening on port 5000'))


// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen