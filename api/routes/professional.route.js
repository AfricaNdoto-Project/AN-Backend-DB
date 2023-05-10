const router = require('express').Router()

const {
    getAllProfessionals,
    getOneProfessional,
    createProfessional,
    updateProfessional,
    deleteProfessional 
} = require('../controllers/professional.controller')

const {
    checkAuth,
    checkAdmin 
} = require('../middlewares/auth')

router.get('/selectProffesion', getAllProfessionals)
router.get('/', checkAuth, checkAdmin, getAllProfessionals)
router.get('/:id', checkAuth, checkAdmin, getOneProfessional)
router.post('/', checkAuth, createProfessional)
router.put('/:id', checkAuth, checkAdmin, updateProfessional)
router.delete('/:id', checkAuth, checkAdmin, deleteProfessional)

module.exports = router
