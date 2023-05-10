const router = require('express').Router()

const {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct 
} = require('../controllers/product.controller')

const {
    checkAuth,
    checkAdmin 
} = require('../middlewares/auth')


router.get('/', getAllProducts)
router.get('/:productId', getOneProduct)
router.post('/', checkAuth, checkAdmin, createProduct)
router.put('/:productId', checkAuth, checkAdmin, updateProduct)
router.delete('/:productId', checkAuth, checkAdmin, deleteProduct)

module.exports = router
