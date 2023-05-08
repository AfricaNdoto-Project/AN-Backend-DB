const Member = require('../models/member.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Proffesional = require('../models/professional.model')

const signUp = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const findMember = await Member.findOne({
            where:
            {
                idNumber: req.body.idNumber
            }
        })
        if (findMember) {
            return res.status(500).send('Error: Member already exists')
        }
        if (req.body.role === 'admin') {
            return res.status(500).json('You can\'t declare yourself as an admin')
        }
        const member = await Member.create(req.body)
        if (req.body.role === 'donor' || req.body.role === 'volunteer_donor') {
                await member.createDonor()
        }
        if (req.body.role === 'volunteer' || req.body.role === 'volunteer_donor') {
            const profession = req.body.profession;
            const professional = await Proffesional.findAll({
                where: {
                    name: profession
                }
            })
            await member.createVolunteer({
                memberId: member.id,
                professionalId: professional[0].id
            })
        }
        return res.status(200).json(member)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error: Cannot create member')
    }
}

const login = async (req, res) => {
    try {
        const member = await Member.findOne({
            where:
            {
                email: req.body.email
            }
        })
        if (!member) {
            return res.status(500).send('Error: Empty mail or password')
        }
        bcrypt.compare(req.body.password, member.password, (err, result) => {
            if (!result) {
                return res.status(403).send('Error: Empty mail or password')
            }
            const token = jwt.sign({ email: member.email }, 'secret', { expiresIn: '7h' })
            const role =  member.role
            return res.status(200).json({ token, role })
        })
    }
    catch (err) {
        console.error(err)
    }
}


module.exports = {
    signUp,
    login
}