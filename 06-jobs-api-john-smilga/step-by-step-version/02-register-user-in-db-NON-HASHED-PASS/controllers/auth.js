const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    // res.send(`Register User with ${JSON.stringify(req.body)}`)    

    // mongoose is performing validation but custom validation like below might be required
    // const { name, email, password } = req.body
    // if (!name || !email || !password) {
    //     throw new BadRequestError('Missing name OR email OR password.')
    // }

    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send(`Login User with ${JSON.stringify(req.body)}`)
}


module.exports = {
    register,
    login,
}