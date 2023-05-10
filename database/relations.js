//Add models here, for example:

const Member = require('../api/models/member.model')
const Event = require('../api/models/event.model')
const EventCategory = require('../api/models/event_category.model')
const Product = require('../api/models/product.model')

//const User = require('./models/user')
const Equipment = require('../api/models/equipment.model')
const Professional = require('../api/models/professional.model')
const Project = require('../api/models/project.model')


const Donor = require('../api/models/donor.model')
const Volunteer = require('../api/models/volunteer.model')
const Donations = require('../api/models/donations.model')



function addRelationsToModels() {
	try {
        // Event_category_id
		EventCategory.hasMany(Event)
		Event.belongsTo(EventCategory)

		//Donation_Product
		Product.hasMany(Donations)
		Donations.belongsTo(Product)

		//Members_Doners
		Member.hasOne(Donor)
		Donor.belongsTo(Member)

		//Members_Volunteers
		Member.hasOne(Volunteer)
		Volunteer.belongsTo(Member)

		//Donors_donations
		Donor.hasMany(Donations)
		Donations.belongsTo(Donor)


		// Volunteers_Professionals
		Professional.hasMany(Volunteer)
		Volunteer.belongsTo(Professional)

		//Volunteer_Event
		Volunteer.belongsToMany(Event, {
			through: 'volunteer_event'
		})
		Event.belongsToMany(Volunteer, {
			through: 'volunteer_event'
		})

		//Volunteer_Project
		Volunteer.belongsToMany(Project, {
			through: 'volunteer_project'
		})
		Project.belongsToMany(Volunteer, {
			through: 'volunteer_project'
		})

		//Donations_Projects
		Project.belongsToMany(Donations, {
			through: 'donations_projects'
		})
		Donations.belongsToMany(Project, {
			through: 'donations_projects'
		})

		//Professionals_Projects
		Project.belongsToMany(Professional, {
			through: 'professional_projects'
		})
		Professional.belongsToMany(Project, {
			through: 'professional_projects'
		})

		//Projects_Equipments
		Project.belongsToMany(Equipment, {
			through: 'equipment_projects'
		})
		Equipment.belongsToMany(Project, {
			through: 'equipment_projects'
		})
		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels