const http = require('http')

const server = http.createServer((req, res) => {
  let url = req.url
  let method = req.method
  // console.log(method, url)

  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>HOME page</h1>')
    res.end()
    // same as above
    // res.end('<h1>home page</h1>')
  }
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
