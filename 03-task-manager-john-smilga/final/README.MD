## Project Setup

In order to run the project, setup .env and set MONGO_URI variable equal to DB connection string.  
In order to avoid port collisions, in the source code port value is 5000.

---

## Mongo DB

- <https://www.mongodb.com/atlas>
- create cluster
- set database user
- set network access - at development allow from anywhere  
**But in production things will be different, depending on where the app is hosted.**
- set connection string:  
```mongodb+srv://kalinkaraliev:<password>@nodeexpressprojects.1drc1ve.mongodb.net/?retryWrites=true&w=majority```  
**Or full code:**

```javascript
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kalinkaraliev:<password>@nodeexpressprojects.1drc1ve.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
```

- databases > add my own data > 'collection' is like  table in SQL > 'documents' are table entries  
**... but actually DB set up and management will be done by Mongoose, including creating new DB(just type name after mongodb.net/)**  

---

## Mongoose  

In this project we use Mongoose instead of mongo's native driver to connect our server (our app) to our DB (NoSQL).  
`npm i mongoose`  

## Sequence of app implementation

1. Initial setup

- create controllers, initially send()-ing some test value -  
`const getAllTasks = (req, res) => {
    res.send(`${req.method} all tasks`)
}`
- create routes utilizing these methods - `router.get('/', getAllTasks)`
- in app.js - `app.use(express.json())`

---

2. In app we trigger start function which will `try { await connectDB(process.env.MONGO_URI)...`
connectDB itself looks like this:  

```
const connectDB = (url) => {
    //returns a Promise
    return mongoose.connect(url)
}
```

If successful we spin up our server, if not we catch and console log the error.  

---

3. We create our DB schema which is a representation of what our documents/ entries will look like, including some validation. If additional k-v pairs are submitted they will be omitted, only name and completed are valid k-v pairs.

```javascript
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})
```

---

4. Then `module.exports = mongoose.model('Task', TaskSchema)`

The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, the model **Task** is for the **tasks** collection in the database.

---

5. ... and the model can be used in controllers with mongoose-specific model methods such as `const task = await Task.findById(taskId)`.
findOne() will find an object with an _id of whatever we pass from our params

##### NB Special attention to

```
const task = await Task.findOneAndUpdate(
            { _id: taskId },
            req.body,
            {                   // 3rd param is options, Validators are in Model!
                new: true,      // return updated json
                runValidators: true
            })
```

---

6. After testing with Postman - `app.use(express.static('./public'))`  

**At this stage all core functionality is working.
The below are just improvements to make the code more abstract and lean.**

---

7. notFound is actually a 404 route - if the url don't match we just respond with 404 message. Same could be achived with:  
`
app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});
`

---

8. asyncWrapper:

All controllers have try catch blocks like so:

```javascript
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
```

To make our code leaner and more abstract we wrap all the async functions with asyncWrapper:

```javascript
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}
```

The wrapper accepts an anonymous function and returns a function which will deal with our async request when called.  
The controllers can be simplified now:

```javascript
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})
```

9. errorHandlerMiddleware:
Firtsly, just set it to:  
`return res.status(500).json({ msg: 'Something went wrong, try again later' })
which will be called by next() in asyncWrapper
`

Then for 404 responses we create instances of CustomAPIError which inherits from Error:

```javascript
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}
```

... like this:  
`if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404))
    }`
    
This will trigger in the first outcome of errorHandlerMiddleware, if the error is CustomAPIError, if not - send generic response:

```javascript
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: 'Something went wrong, try again later' })
}
```