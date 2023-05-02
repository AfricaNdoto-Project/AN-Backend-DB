const Project = require('../models/project.model')
const Volunteer = require('../models/volunteer.model')
const Professional = require('../models/professional.model')
const Equipment = require('../models/equipment.model')
const Donor = require('../models/donor.model')
const Donations = require('../models/donations.model')




async function getAllProjects(req, res) {
    try {
        const projects = await Project.findAll({ paranoid: false })
        if (projects) {
            return res.status(200).json(projects)
        } else {
            return res.status(404).send('No projects found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneProject(req, res) {
    try {
        const project = await Project.findByPk(req.params.id)
        if (project) {
            return res.status(200).json(project)
        } else {
            return res.status(404).send('Project not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createProject(req, res) {
    try {
        const project = await Project.create(req.body)
        const volunteer = await Volunteer.findByPk(req.body.volunteerId)
        const equipment = await Equipment.create({
            name: req.body.equipmentName,
            description: req.body.equipmentDescription,
            cost: req.body.equipmentCost
        })
        const professional = await Professional.findOne({
            where: {
                name: req.body.profession
            }
        })
        await project.addVolunteer(volunteer)
        await project.addProfessional(professional)
        await project.addEquipment(equipment)
        return res.status(200).json({ message: 'Project created', project: project })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateProject(req, res) {
    try {
        const [projectExist, project] = await Project.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (projectExist !== 0) {
            return res.status(200).json({ message: 'Project updated', project: project })
        } else {
            return res.status(404).send('Project not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteProject(req, res) {
    try {
        const project = await Project.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (project) {
            return res.status(200).json('Project deleted')
        } else {
            return res.status(404).send('Project not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getMyDonations(req, res) {
    try {
        const donor = await Donor.findOne({
            where: {
                memberId: res.locals.member.id
            }
        })
        const donations = await Donations.findAll({
            where: {
                donorId: donor.id
            }
        })
        const myDonations = {
            name: res.locals.member.name,
            donations: donations
        }
        if (donations) {
            return res.status(200).json(myDonations)
        } else {
            return res.status(404).send('No Donations found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = {
    getAllProjects,
    getOneProject,
    createProject,
    updateProject,
    deleteProject,
    getMyDonations
}