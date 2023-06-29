const express = require('express')
const app = express()

const tasks = require('./routes/tasks')

const connectDB = require('./db/connect')
require('dotenv').config()      //get access to .env variables, i.e. URI

//errors
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

// start server, ONLY if connected to DB
const port = process.env.PORT || 3000       // for deployment we will require env variable
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)      //invoke connectDB (in db/connect.js) with this url
        app.listen(port, console.log(`Server listening on port ${port}...`))
    } catch (err) {
        console.log(err.message)
        // console.log(err)
    }
}

start()



