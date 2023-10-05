const mongoose = require('mongoose')

// const connectionString = `mongodb+srv://........mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority`
// now moved to .env

const connectDB = (url) => {
    //returns a Promise
    return mongoose.connect(url)
}

/* With the code below we can trigger mongoose.connect from app.js by just importing it there.
But this doesn't make sense because if we are not connected all the rest of our logic, incl. startign the server is pointless.
It is better to write a function returning mongoose.connect and only if connection succeeds, continue. 
mongoose
    .connect(connectionString)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err))
*/

module.exports = connectDB

