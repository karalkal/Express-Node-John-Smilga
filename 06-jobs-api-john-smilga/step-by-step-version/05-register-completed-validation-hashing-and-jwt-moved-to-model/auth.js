const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    // password is hashed in model using bcrypt and mongoose pre() method
    // see: https://mongoosejs.com/docs/middleware.html#pre

    const user = await User.create({ ...req.body })

    // createJWT() in model, the method is "attached" as a property to user
    const token = user.createJWT()
    res.status(StatusCodes.CREATED)
        .json({ user: { name: user.name }, token }) // can send more data if necessary, i.e. name in order to say "Hi, username, you are a ####"
}

const login = async (req, res) => {
    res.send(`Login User with ${JSON.stringify(req.body)}`)
}


module.exports = {
    register,
    login,
}