const mongoose = require('mongoose')

// const connectionString = `mongodb+srv://kk:<PASSWORD>@cluster0.b9bkbyt.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority`
// now moved to .env

const connectDB = (url) => {
    //returning a Promise
    return mongoose.connect(url)
}

module.exports = connectDB

