const Donations = require('../models/donations.model')
const Donor = require('../models/donor.model')
const Project = require('../models/project.model')
const Product = require('../models/product.model')


async function getAllDonations(req, res) {
    try {
        const donation = await Donations.findAll({ paranoid: false })
        if (donation) {
            return res.status(200).json(donation)
        } else {
            return res.status(404).send('No Donations found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneDonation(req, res) {
    try {
        const donation = await Donations.findByPk(req.params.id)
        if (donation) {
            return res.status(200).json(donation)
        } else {
            return res.status(404).send('Donation not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createDonation(req, res) {
    try {
        const donor = await Donor.findOne({
            where: {
                memberId: res.locals.member.id
            }
        })
        const donation = await Donations.create({
            amount: req.body.amount,
            type: req.body.type,
            donorId: donor.id
        })
        const project = await Project.findOne({
            where: {
                id: req.body.projectId
            }
        })
        const product = await Product.findOne({
            where: {
                name: req.body.name
            }
        })
        await donation.addProject(project)
        await product.addDonation(donation)
        return res.status(200).json({ message: 'Donation created', donation: donation })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateDonation(req, res) {
    try {
        const [donationExist, donation] = await Donations.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (donationExist !== 0) {
            return res.status(200).json({ message: 'Donation updated', donation })
        } else {
            return res.status(404).send('Donation not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteDonation(req, res) {
    try {
        const donation = await Donations.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (donation) {
            return res.status(200).json('Donation deleted')
        } else {
            return res.status(404).send('Donation not found')
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
    getAllDonations,
    deleteDonation,
    updateDonation,
    createDonation,
    getOneDonation,
    getMyDonations
}
