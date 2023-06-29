// 1. check for username and password in post request
// 2. if exist create new JWT, else raise error
// 3. send back to front-end
// 4. setup authentication so only requests with JWT can access the dasboard

const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

// Fake login/register
const login = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)

    // Normally validation via mongoose validation / Joi, here we check in the controller
    if (!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    //get userId - just for demo, normally provided by DB!!!!
    const id = new Date().getDate()

    // TOKEN IS BEING CREATED BELOW
    // keep payload small, better experience for user
    // Bit difficult to spot but does not work without .env file and JWT_SECRET value
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

    console.log(token)
    res.status(200).json({ msg: 'user created', token })
}

// this will be out "protected data"
const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

module.exports = {
    login,
    dashboard,
}
