const mongoose = require('mongoose')

// Options before version mongoose 6.X.X
// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
// }

const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB
