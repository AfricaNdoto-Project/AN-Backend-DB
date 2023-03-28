const { DataTypes } = require('sequelize')
const { connection } = require('../../database')

const Donations = connection.define(
	'donations',
	{
		amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        type: {
            type: DataTypes.ENUM('punctual', 'anual', 'monthly', 'purchase'),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Type cannot be empty'
                }
            }
        },
        createdAt: {
            type: DataTypes.STRING,
            defaultValue: function () {
                return new Date()
            }
		},
    }
)



module.exports = Donations