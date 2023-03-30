const Member = require('../models/member.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Donor = require('../models/donor.model')
const Volunteer = require('../models/volunteer.model')
const Proffesional = require('../models/professional.model')


const signUp = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        if(req.body.role === 'admin'){
            return res.status(500).json('Ande vas primo')
        }
        const member = await Member.create(req.body)
        if (req.body.role === 'donor') {
            await member.createDonor()
        }
        if (req.body.role === 'volunteer') {
            const profession = req.body.profession;
            const professional = await Proffesional.findAll({
                where: {
                    name: profession
                }
            })
            await member.createVolunteer({
                memberId: member.id, 
                professionalId: professional[0].id
            });
        }
        return res.status(200).json(member)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error: Cannot create member')
    }
}


const login = async (req, res) => {
    try {
        const member = await Member.findOne({where: 
            {email: req.body.email
            }})
        if (!member) {
            return res.status(500).send('Error: Empty mail or password')
        }

        bcrypt.compare(req.body.password, member.password, (err, result) => {
            if(!result) {
                return res.status(403).send('Error: Empty mail or password')
            }
            const token = jwt.sign({ email: member.email }, 'secret', {expiresIn: '7h'})
            return res.status(200).json({ token })
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