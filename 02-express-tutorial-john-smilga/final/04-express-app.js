/*
This is the original file, plus some comments
It won't work from this location because the routes to the files cannot be resolved from here
In the original exercise the html and the public are at the same level
The copy should be working though, locating the index and static from external/root dir
*/

const express = require('express')
const path = require('path')
const app = express()

// created folder specifically for the static files but can read them from main app folder too
// app.use(express.static('./navbar-app'))
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})

app.all('*', (req, res) => {
    res.status(404).send("Ain't gonna happen")
})

app.listen(5000, () => console.log('server listening on port 5000'))
