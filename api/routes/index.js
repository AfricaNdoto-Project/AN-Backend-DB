const router = require('express').Router()


router.use('/member', require('./member.route'))
router.use('/event', require('./event.route'))
router.use('/event_category', require('./event_category.route'))
router.use('/product', require('./product.route'))

router.use('/equipment', require('./equipment.route'))
router.use('/professional', require('./professional.route'))
router.use('/project', require('./project.route'))

router.use('/donor', require('./donor.route'))
router.use('/volunteer', require('./volunteer.route'))
router.use('/donations', require('./donations.route'))



router.use('/auth', require('./auth.route'))
//Here the routes

module.exports = router