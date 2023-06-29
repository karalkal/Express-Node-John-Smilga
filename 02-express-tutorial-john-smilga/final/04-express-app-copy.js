const express = require('express')
const app = express()
const path = require('path')


app.use(express.static('../public'))

//get our resource from a different directory
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../navbar-app', 'index.html'))
})

app.all('*', (req, res) => {
    res.status(404).send("Ain't gonna happen")
})

app.listen(5000, () => console.log('server listening on port 5000'))