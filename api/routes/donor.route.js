const router = require('express').Router()

const {
    getAllDonors,
    deleteDonor,
    updateDonor,
    createDonor,
    getOneDonor,
    getDonorDonations,
    getOneDonorByMemberId
} = require('../controllers/donor.controller')

const {
    checkAuth,
    checkAdmin 
} = require('../middlewares/auth')

//Admin
router.get('/', checkAuth, checkAdmin, getAllDonors)
router.get('/donations/:id', checkAuth, checkAdmin, getDonorDonations)

router.get('/:id', checkAuth, checkAdmin, getOneDonor)
router.get('/getDonorByMemberId/:memberId', checkAuth, getOneDonorByMemberId)
router.post('/', checkAuth, checkAdmin, createDonor)
router.put('/:id', checkAuth, checkAdmin, updateDonor)
router.delete('/:id', checkAuth, checkAdmin, deleteDonor)


module.exports = router
