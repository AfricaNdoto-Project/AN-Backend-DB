const Equipment = require('../models/equipment.model')


async function getAllEquipments(req, res) {
    try {
        const equipments = await Equipment.findAll({ paranoid: false })

        if (equipments) {
            return res.status(200).json(equipments)
        } else {
            return res.status(404).send('No equipments found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneEquipment(req, res) {
    try {
        const equipment = await Equipment.findByPk(req.params.id)
        if (equipment) {
            return res.status(200).json(equipment)
        } else {
            return res.status(404).send('Equipment not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createEquipment(req, res) {
    try {
        const equipment = await Equipment.create(req.body)
        return res.status(200).json({ message: 'Equipment created', equipment: equipment })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateEquipment(req, res) {
    try {
        const [equipmentExist, equipment] = await Equipment.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (equipmentExist !== 0) {
            return res.status(200).json({ message: 'Equipment updated', equipment: equipment })
        } else {
            return res.status(404).send('Equipment not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteEquipment(req, res) {
    try {
        const equipment = await Equipment.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (equipment) {
            return res.status(200).json('Equipment deleted')
        } else {
            return res.status(404).send('Equipment not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
    getAllEquipments,
    getOneEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment
}