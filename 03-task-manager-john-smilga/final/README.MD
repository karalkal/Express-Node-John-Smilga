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
    // Connect the client to the server	(optional starting in v4.7)
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

## Sequence of actions to create app

1. In app we trigger start function which will `try { await connectDB(process.env.MONGO_URI)...` If successful we spin up our server, if not we catch and console log the error.
2. We create our DB schema which is a representation of what our documents/ entries will look like:

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

3. Then ` module.exports = mongoose.model('Task', TaskSchema)`

The first argument is the singular name of the collection your model is for. 
Mongoose automatically looks for the plural, lowercased version of your model name. 
Thus, for the example below, the model **Task** is for the **tasks** collection in the database.

4. ... and the model can be used in controllers with mongoose methods such as `const task = await Task.findById(taskId)`


