const Donor = require('../models/donor.model')
const Donations = require('../models/donations.model')

async function getAllDonors(req, res) {
    try {
        const donor = await Donor.findAll({ paranoid: false })
        if (donor) {
            return res.status(200).json(donor)
        } else {
            return res.status(404).send('No Donors found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneDonor(req, res) {
    try {
        const donor = await Donor.findByPk(req.params.id)
        if (donor) {
            return res.status(200).json(donor)
        } else {
            return res.status(404).send('Donor not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createDonor(req, res) {
    try {
        const donor = await Donor.create(req.body)
        return res.status(200).json({ message: 'Donor created', donor: donor })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateDonor(req, res) {
    try {
        const [donorExist, donor] = await Donor.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (donorExist !== 0) {
            return res.status(200).json({ message: 'Donor updated', donor: donor })
        } else {
            return res.status(404).send('Donor not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteDonor(req, res) {
    try {
        const donor = await Donor.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (donor) {
            return res.status(200).json('Donor deleted')
        } else {
            return res.status(404).send('Donor not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getDonorDonations(req, res) {
    try {
        const donor = await Donor.findOne({
            where: {
                memberId: req.params.id
            }
        })
        const donations = await Donations.findAll({
            where: {
                donorId: donor.id
            }
        })

        if (donations) {
            return res.status(200).json(donations)
        } else {
            console.log('entrra')
            return res.status(404).send('No Donations found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = {
    getAllDonors,
    deleteDonor,
    updateDonor,
    createDonor,
    getOneDonor,
    getDonorDonations
}