const User = require('../models/User')

const register = async (req, res) => {
    res.send(`Regsiter User with ${JSON.stringify(req.body)}`)    
}

const login = async (req, res) => {
    res.send(`Login User with ${JSON.stringify(req.body)}`)
}


module.exports = {
    register,
    login,
}