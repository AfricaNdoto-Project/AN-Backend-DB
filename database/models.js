//Add models here, for example:
//const User = require('./models/user')
const Member = require('../api/models/member.model')
const Donor = require('../api/models/donor.model')
const Volunteer = require('../api/models/volunteer.model')
const Donations = require('../api/models/donations.model')




function addRelationsToModels() {
	try {
        
		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels