const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    console.log(req.method, '\n', req.body)
    const { firstName } = req.body
    if (firstName) {
        return res.status(200).send(`Welcome ${firstName}`)
    }

    res.status(401).send('Please Provide Credentials')
})

module.exports = router