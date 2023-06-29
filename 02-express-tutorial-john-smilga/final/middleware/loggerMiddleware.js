const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log("Method:", method, "\nURL: ", url, "\nYear: ", time)

    // res.send('Testing')  // program would just stop here
    next()  // IS CRUCIAL
}

module.exports = logger