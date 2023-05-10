const router = require('express').Router()

const {
    getAllDonations,
    deleteDonation,
    updateDonation,
    createDonation,
    getOneDonation,
    getMyDonations,
} = require('../controllers/donations.controller')

const {
    checkAdmin,
    checkAuth,
    checkDonor 
} = require('../middlewares/auth')

//Donors
router.get('/myDonations', checkAuth, checkDonor, getMyDonations)


//Admin
router.get('/', checkAuth, checkAdmin, getAllDonations)

router.get('/:id', checkAuth, checkAdmin, getOneDonation)
router.post('/', checkAuth, checkDonor, createDonation)
router.put('/:id', checkAuth, checkAdmin, updateDonation)
router.delete('/:id', checkAuth, checkAdmin, deleteDonation)


module.exports = router
