const http = require('http')
const { readFileSync } = require('fs')

//get all files
// AND careful with the routes, Eugene
const homePage = readFileSync('../navbar-app/index.html')
const homeStyles = readFileSync('../navbar-app/styles.css')
const homeImage = readFileSync('../navbar-app/logo.svg')
const homeLogic = readFileSync('../navbar-app/browser-app.js')

const server = http.createServer((req, res) => {
    let url = req.url
    let method = req.method
    console.log(method, url)

    //about page
    if (method === 'GET' && url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(homePage)
        res.end()
    }

    //styles
    else if (method === 'GET' && url === '/styles.css') {
        res.writeHead(200, { 'content-type': 'text/css' })
        res.write(homeStyles)
        res.end()
    }

    //logo image
    else if (method === 'GET' && url === '/logo.svg') {
        res.writeHead(200, { 'content-type': 'image/svg+xml' })
        res.write(homeImage)
        res.end()
    }

    //logic
    else if (method === 'GET' && url === '/browser-app.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' })
        res.write(homeLogic)
        res.end()
    }

    //about page
    else if (method === 'GET' && url === '/about') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>ABOUT page</h1>')
        res.end()
    }
    
    else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('<h1>Resource not found</h1>')
        res.end()
    }
})

server.listen(5000)
