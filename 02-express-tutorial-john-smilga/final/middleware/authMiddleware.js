const authorize = (req, res, next) => {

    console.log('authorize middleware active')

    const { user } = req.query
    if (user === "pesho") {
        // http://localhost:5000/?user=pesho
        //create property user, attach it to req object
        req.user = { name: "Pesho", id: 8 }
        console.log(`${req.user.name} is now authorized`)
        next()
    }
    else {
        res.status(401).send('Unauthorized')
    }

}

module.exports = authorize