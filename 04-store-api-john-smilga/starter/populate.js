// In this project we populate our remote DB with data from local file containg an array of products

require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected, ready to upload data')

        await Product.deleteMany()
        console.log('DB wiped.')

        await Product.create(jsonProducts)
        console.log('Data uploaded to DB!')

        process.exit(0)     // 0 - success, 1 - error

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()

