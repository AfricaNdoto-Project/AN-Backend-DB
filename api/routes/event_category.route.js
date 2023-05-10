const router = require('express').Router()

const {
    getAllCategories,
    getOneCategory,
    updateCategory,
    createCategory,
    deleteCategory 
} = require('../controllers/event_category.controller')

const {
    checkAuth,
    checkAdmin 
} = require('../middlewares/auth')


router.get('/', checkAuth, checkAdmin, getAllCategories)
router.get('/:categoryId', checkAuth, checkAdmin, getOneCategory)
router.post('/', checkAuth, checkAdmin, createCategory)
router.put('/:categoryId', checkAuth, checkAdmin, updateCategory)
router.delete('/:categoryId', checkAuth, checkAdmin, deleteCategory)

module.exports = router
