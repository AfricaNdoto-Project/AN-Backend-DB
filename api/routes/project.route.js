const router = require('express').Router()

const {
    getAllProjects,
    getOneProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectByVolunteer,
    getProjectsInformation
} = require('../controllers/project.controller')

const {
    checkAuth,
    checkAdmin,
    checkVolunteer 
} = require('../middlewares/auth')




router.get('/byVolunteer',checkAuth, getProjectByVolunteer)


router.get('/projectInformation', getProjectsInformation)

router.get('/', getAllProjects)
router.get('/:id', getOneProject)

router.get('/', checkAuth, checkAdmin, getAllProjects)
router.get('/:id', checkAuth, getOneProject)

router.post('/', checkAuth, checkVolunteer, createProject)
router.put('/:id', checkAuth, checkAdmin, updateProject)
router.delete('/:id', checkAuth, checkAdmin, deleteProject)

module.exports = router
