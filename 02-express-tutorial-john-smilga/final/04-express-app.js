const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('./navbar-app'))

// The res.sendFile() function basically transfers the file at the given path 
// and it sets the Content-Type response HTTP header field based on the filename extension. 
// By convention these files will reside in a folder named "/static"
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})

app.all('*', (req, res) => {
    res.status(404).send("Ain't gonna happen")
})

app.listen(5000, () => console.log('server listening on port 5000'))
