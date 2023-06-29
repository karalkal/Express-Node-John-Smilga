const Product = require('../models/product')


const getAllProductsStatic = async (req, res) => {
    // throw new Error(`Testing if async errors are raised at ${req.url}... Works!`)
    // const products = await Product.find({})                      // find all, no filtering criteria
    // const products = await Product.find({ featured: true })
    const products = await Product.find({}).sort('-name price')
    res.status(200).json({ products, numberHits: products.length })
}

const getAllProducts = async (req, res) => {
    // find directly from querystring, e.g. GET {{URL}}/products?featured=false&company=ikea
    // const products = await Product.find(req.query)
    // res.status(200).json({ products, numberHits: products.length })
    // NOT A GOOD IDEA TO PASS WHOLE QUERY OBJECT, BETTER IMPLEMENT FILTERING LIKE BELOW

    // destructure data from querystring object
    const { featured, company, name, sort, fields, numericFilters } = req.query;

    //set up new object to store properties if present in querystring
    const queryObject = {};

    if (featured) { queryObject.featured = featured === 'true' ? true : false }

    if (company) { queryObject.company = company }

    // See MondoDB Query and Projection Operators 
    if (name) {
        /*To use $regex, use one of the following syntaxes:
       { <field>: { $regex: /pattern/, $options: '<options>' } }
       { <field>: { $regex: 'pattern', $options: '<options>' } }
       { <field>: { $regex: /pattern/<options> } }
         */
        queryObject.name = { $regex: name, $options: 'i' }
        // regex pattern will be value of property 'name' from querystring, i.e. if name=oo will match 'wooden'
        // opt i - Case insensitive
    }

    if (numericFilters) {                           //example: {{URL}}/products?numericFilters=price>100,rating>=4.8
        const operatorMap = { '>': '$gt', '>=': '$gte', '=': '$eq', '<': '$lt', '<=': '$lte', };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
                // e.g. queryObject: { price: { '$gt': 100 }, rating: { '$gte': 4.8 } }
            }
        })
    }

    // first declare the result then sort it or manipulate it if additional fields in querystring
    console.log("queryObject:", queryObject)
    let result = Product.find(queryObject)

    //      SORTING
    if (sort) {                                         //example: //{{URL}}/products?featured=false&company=ikea&name=oo&sort=-name, price
        const sortList = sort.split(',').join(' ')      // if sorting by more values querystring will be like &sort=name, -price
        console.log("sortList:", sortList)
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    //      SELECT specific columns
    if (fields) {                                       //example (will disply item names only): {{URL}}/products?featured=false&company=ikea&name=oo&sort=-name, price&fields=name
        const fieldsList = fields.split(',').join(' ')
        console.log("fieldsList:", fieldsList)
        result = result.select(fieldsList);
    }

    //      PAGINATION
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result       // NOW await result from DB
    res.status(200).json({ numberHits: products.length, products, })
};

module.exports = {
    getAllProductsStatic,
    getAllProducts
}