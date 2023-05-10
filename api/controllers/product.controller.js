const Product = require('../models/product.model')


async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll()
        if (products) {
            return res.status(200).json(products)
        } else {
            return res.status(404).send('No products found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

async function getOneProduct(req, res) {
    try {
        const product = await Product.findByPk(req.params.productId)
        if (product) {
            return res.status(200).json(product)
        } else {
            return res.status(404).send('Product not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

async function updateProduct(req, res) {
    try {
        const [product] = await Product.update(req.body, {
            where: {
                id: req.params.productId,
            }
        })
        if (product) {
            return res.status(200).send('Product updated')
        } else {
            return res.status(404).send('Product not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

async function createProduct(req, res) {
    try {
        const product = await Product.create(req.body)
        if (product) {
            return res.status(200).json({ message: 'Product created', product: product })

        } else {
            return res.status(404).send('Cannot create product')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await Product.destroy({
            where: {
                id: req.params.productId
            }
        })
        if (product) {
            return res.status(200).json('Product deleted')
        } else {
            return res.status(400).send('Product not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}


module.exports = {
    getAllProducts,
    getOneProduct,
    updateProduct,
    createProduct,
    deleteProduct
}