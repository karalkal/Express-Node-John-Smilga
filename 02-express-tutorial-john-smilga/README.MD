#### This readme is related to the Express Intro section of Node and Express Tutorial by John Smilga

#### It summarizes briefly the contents of these micro-projects

#### But first and foremost: Eternal gratitude to the Man and to Free Code Camp for making this tutorial available  
  
# Contents of `/final` folder

1. http-basics - using **http** module to send responses to requests to `http://localhost:5000/` or `http://localhost:5000/about`
2. http-app - using **http** module to import and serve resources (html, css...)
3. express-basics - intro
4. express-app -  **res.sendFile()**
5. all-static - since index.html is a static file too we can omit `app.get('/', (req, res) => {
    res.sendFile(path.resolve......etc.` and just serve index.html.
6. basic-json  
**res.json()** and **res.send()** are identical when an object or array is passed, but res.json() will also convert non-objects, such as null and undefined, which are not valid JSON.   res.json() ends up as a res.send() in the end.
7. params-query  

- at **'/api/products'** response will contain mapped data for all original products (description will be omitted)  
- at **'/api/products/:productID'** response wil be single json or 404  
- at **'/api/products/:productID/reviews/:reviewID'** response will be the two params in req. (Just a demo)  
- at **'api/v1/query?key=value'** depending on the k/v we take action - searching, slicing etc.

8. middleware-basic - logger in each route
9. middleware-use() - app.use([logger, authorize])
authorize will trigger next only if `req.query.user === "pesho"`,
i.e. if req is like `http://localhost:5000/?user=pesho`
10. middleware-options - 3rd party middleware, e.g morgan
11. methods - POST using html and js forms (rendered as static assets)  
In order to pass the incoming data from our form to our req object we need to parse it first:  
.urlencoded()  for traditional form
Express.urlencoded() expects request data to be sent encoded in the URL, usually in strings or arrays:
`.../Name=Pikachu&Type=Banana&Number+In+Stable=12`
.json()  for JS form
Express.json() expects request data to be sent in JSON format, which often resembles a simple JS object:  
`{"Name": "Pikachu", "Type": "Banana", "Number In Stable": 12}`  

- **traditional HTML form** (in index.html)
The form will redirect to /login upon submission:
`<form action="/login" method="POST">`  
Whetever we have as **name will become the key** in our formData for the input value (in original it was name="name" - a bit unclear):  
`<input type="text" name="firstName" id="name" autocomplete="false" />`  
**BUT need middleware to parse that incoming data into the req.body**:  
`app.use(express.urlencoded({ extended: false }))`
Or basically our req.body will be:  
`{ firstName: 'kkkk' }`

- **JS form** (in javascript.html)
