const getAllProductsStatic = async (req, res) => {
    // throw new Error(`Testing async errors at ${req.url}... Works!`)
    res.status(200).json({ msg: "products testing route" })
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: "products route" })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}