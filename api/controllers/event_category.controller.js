const EventCategory = require('../models/event_category.model')


async function getAllCategories(req, res) {
    try {
        const categories = await EventCategory.findAll()
        if (categories) {
            return res.status(200).json(categories)
        } else {
            return res.status(404).send('No categories found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}


async function getOneCategory(req, res) {
    try {
        const category = await EventCategory.findByPk(req.params.categoryId)
        if (category) {
            return res.status(200).json(category)
        } else {
            return res.status(404).send('Category not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

async function updateCategory(req, res) {
    try {
        const [category] = await EventCategory.update(req.body, {
            where: {
                id: req.params.categoryId,
            }
        })
        if (category) {
            return res.status(200).send('Category updated')
        } else {
            return res.status(404).send('Category not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}


async function createCategory(req, res) {
    try {
        const category = await EventCategory.create(req.body)
        if (category) {
            return res.status(200).json({ message: 'Category created', category: category })
        } else {
            return res.status(404).send('Cannot create category')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}


async function deleteCategory(req, res) {
    try {
        const category = await EventCategory.destroy({
            where: {
                id: req.params.categoryId
            }
        })
        if (category) {
            return res.status(200).json('Category deleted')
        } else {
            return res.status(400).send('Category not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}


module.exports = {
    getAllCategories,
    getOneCategory,
    updateCategory,
    createCategory,
    deleteCategory
}