const router = require('express').Router()

const {
    getAllEvents,
    getOneEvent,
    updateEvent,
    createEvent,
    deleteEvent 
} = require('../controllers/event.controller')

const {
    checkAuth,
    checkAdmin 
} = require('../middlewares/auth')

router.get('/', getAllEvents)
router.get('/:eventId', getOneEvent)
router.post('/', checkAuth, checkAdmin, createEvent)
router.put('/:eventId', checkAuth, checkAdmin, updateEvent)
router.delete('/:eventId', checkAuth, checkAdmin, deleteEvent)

module.exports = router
