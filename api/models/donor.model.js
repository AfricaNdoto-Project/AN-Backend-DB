const { DataTypes } = require('sequelize')
const { connection } = require('../../database')


const Donor = connection.define(
	'donor',
	{
		bank_account: {
			type: DataTypes.STRING,
			allowNull: true,
           
            
		}
    }
)


module.exports = Donor


