require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
// import DB connection
const connectDB = require('./db/connect');
//import routes
const productsRouter = require('./routes/products');
//import error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');


//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
app.use('/api/v1/products', productsRouter);

//middleware
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorMiddleware);

//connect to to DB, if successful start server
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        console.log('Connection to DB established.');
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}.`));
    } catch (error) {
        console.log(error);
    }
}

start();


app.listen();