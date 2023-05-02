const router = require('express').Router()

const {
    getAllVolunteer,
    deleteVolunteer,
    updateVolunteer,
    createVolunteer,
    getOneVolunteer,
    getMyProjects } = require('../controllers/volunteer.controller')

const { checkAuth, checkAdmin, checkVolunteer } = require('../middlewares/auth')
//Volunteer all projects
router.get('/myProjects', checkAuth, checkVolunteer, getMyProjects)


//Admin
router.get('/', checkAuth, checkAdmin, getAllVolunteer)
router.get('/:id', checkAuth, checkVolunteer, getOneVolunteer)
router.post('/', checkAuth, checkAdmin, createVolunteer)
router.put('/:id', checkAuth, checkVolunteer, updateVolunteer)
router.delete('/:id', checkAuth, checkVolunteer, deleteVolunteer)

module.exports = router
