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
    const { name, email, password } = req.body

    // ENCRYPT / HASH PASSWORD
    const salt = await bcrypt.genSalt(10)       //generate random bytes
    // console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    // console.log(hashedPassword)
    const tempUser = { name, email, password: hashedPassword }

    // CREATE USER
    const user = await User.create({ ...tempUser })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send(`Login User with ${JSON.stringify(req.body)}`)
}


module.exports = {
    register,
    login,
}