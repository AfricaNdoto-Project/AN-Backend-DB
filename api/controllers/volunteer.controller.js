const Project = require('../models/project.model')
const Volunteer = require('../models/volunteer.model')


async function getAllVolunteer(req, res) {
    try {
        const volunteer = await Volunteer.findAll({ paranoid: false })
        if (volunteer) {
            return res.status(200).json(volunteer)
        } else {
            return res.status(404).send('No Volunteers found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneVolunteer(req, res) {
    try {
        const volunteer = await Volunteer.findByPk(req.params.id)
        if (volunteer) {
            return res.status(200).json(volunteer)
        } else {
            return res.status(404).send('Volunteer not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createVolunteer(req, res) {
    try {
        const volunteer = await Volunteer.create(req.body)
        return res.status(200).json({ message: 'Volunteer created', volunteer: volunteer })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateVolunteer(req, res) {
    try {
        const [volunteerExist, volunteer] = await Volunteer.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (volunteerExist !== 0) {
            return res.status(200).json({ message: 'Volunteer updated', volunteer: volunteer })
        } else {
            return res.status(404).send('Volunteer not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteVolunteer(req, res) {
    try {
        const volunteer = await Volunteer.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (volunteer) {
            return res.status(200).json('Volunteer deleted')
        } else {
            return res.status(404).send('Volunteer not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getMyProjects(req, res) {
    try {
        const volunteer = await Volunteer.findByPk(res.locals.member.id)

        const projects = await Project.findAll({
            where: {
                
            }
        })
        if (volunteer) {
            return res.status(200).json(volunteer)
        } else {
            return res.status(404).send('No Volunteers found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = {
    getAllVolunteer,
    deleteVolunteer,
    updateVolunteer,
    createVolunteer,
    getOneVolunteer,
    getMyProjects
}