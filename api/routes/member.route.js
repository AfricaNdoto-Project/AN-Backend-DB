const router = require('express').Router()

const { getAllMembers,
    deleteMember,
    updateMember,
    createMember,
    getOneMember,
    getMyMember,
    updateMyMember,
    deleteMyMember,
    getMemberProjects
} = require('../controllers/member.controller')

const {
    checkAuth,
    checkAdmin
} = require('../middlewares/auth')



//Members
router.get('/profile', checkAuth, getMyMember)
router.put('/profile', checkAuth, updateMyMember)
router.delete('/profile', checkAuth, deleteMyMember)


//Member get all projects associated
router.get('/projects', checkAuth, getMemberProjects)


//Admin
router.get('/', checkAuth, checkAdmin, getAllMembers)
router.get('/:id', checkAuth, checkAdmin, getOneMember)
router.post('/', checkAuth, checkAdmin, createMember)
router.put('/:id', checkAuth, updateMember)
router.delete('/:id', checkAuth, deleteMember)

module.exports = router
