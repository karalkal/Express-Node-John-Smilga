const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { UnauthenticatedError } = require('../errors')

const auth = (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization
    console.log("authHeader in middleware:\n", authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Invalid authentication.')
    }

    const token = authHeader.split(' ')[1]      // get token excl. Bearer

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // we set payload in createJWT() method, see model
        console.log("payload in middleware:\n", payload)
        // attach user to req
        req.user = {
            userId: payload.userId,
            name: payload.name
        }

        next()

    } catch (error) {
        throw new UnauthenticatedError('Invalid credentials.')
    }
}


module.exports = auth