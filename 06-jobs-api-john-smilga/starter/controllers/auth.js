const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    // password is hashed in model using bcrypt and mongoose pre() method
    // see: https://mongoosejs.com/docs/middleware.html#pre

    const user = await User.create({ ...req.body })
    console.log("User to register:", user)

    // createJWT() in model, the method is "attached" as a property to user
    const token = user.createJWT()
    res.status(StatusCodes.CREATED)
        .json({ user: { name: user.name }, token }) // can send more data if required, e.g. name in order to say "Hi, username, you are a ####"
}

const login = async (req, res) => {
    // res.send(`Login User with ${JSON.stringify(req.body)}`)

    // get passoword from request, then pass it to bcrypt.compare() method
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password.')
    }

    const user = await User.findOne({ email })
    console.log("User to login:", user)

    if (!user) {
        throw new UnauthenticatedError('Invalid credentials.')
    }

    //compare passwords with await bcrypt.compare() method
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials.')
    }

    // if no error is thrown, get token
    const token = user.createJWT()
    res.status(StatusCodes.OK)
        .json({ user: { name: user.name }, token })
}


module.exports = {
    register,
    login,
}