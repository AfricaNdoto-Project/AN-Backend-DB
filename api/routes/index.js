const router = require('express').Router()


router.use('/member', require('./member.route'))
router.use('/donor', require('./donor.route'))
router.use('/volunteer', require('./volunteer.route'))
router.use('/donations', require('./donations.route'))

//Here the routes

module.exports = router