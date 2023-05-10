const Professional = require('../models/professional.model')


async function getAllProfessionals(req, res) {
    try {
        const professionals = await Professional.findAll({ paranoid: false })

        if (professionals) {
            return res.status(200).json(professionals)
        } else {
            return res.status(404).send('No professionals found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneProfessional(req, res) {
    try {
        const professional = await Professional.findByPk(req.params.id)
        if (professional) {
            return res.status(200).json(professional)
        } else {
            return res.status(404).send('Professional not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createProfessional(req, res) {
    try {
        const professional = await Professional.create(req.body)
        return res.status(200).json({ message: 'Professional created', professional: professional })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateProfessional(req, res) {
    try {
        const [professionalExist, professional] = await Professional.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (professionalExist !== 0) {
            return res.status(200).json({ message: 'Professional updated', professional: professional })
        } else {
            return res.status(404).send('Professional not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteProfessional(req, res) {
    try {
        const professional = await Professional.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (professional) {
            return res.status(200).json('Professional deleted')
        } else {
            return res.status(404).send('Professional not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
    getAllProfessionals,
    getOneProfessional,
    createProfessional,
    updateProfessional,
    deleteProfessional
}