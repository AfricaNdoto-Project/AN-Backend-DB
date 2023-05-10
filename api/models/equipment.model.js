const { DataTypes } = require('sequelize')
const { connection } = require('../../database')


const Equipment = connection.define(
	'equipment',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Name cannot be empty'
                }
            }
		},
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Description cannot be empty'
                }
            }
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Cost cannot be empty'
                }
            }
        }
    },
    {createdAt: false },
    {updatedAt: false}
)


module.exports = Equipment