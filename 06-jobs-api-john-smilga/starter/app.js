require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// import routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
// import error handlers
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// import user auth (to be used for all jobs routes)
const authenticateUser = require('./middleware/authentication')
//import DB connection
const connectDB = require('./db/connect')


app.use(express.json())
// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000

//connect to DB and start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("Connected to DB...")
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
