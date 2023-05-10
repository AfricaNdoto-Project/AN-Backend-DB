const { DataTypes } = require('sequelize')
const { connection } = require('../../database')


const Project = connection.define(
	'project',
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
		target: {
			type: DataTypes.STRING,
			allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Target cannot be empty'
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
        objective: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Objective cannot be empty'
                }
            }
        },
        budget: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Objective cannot be empty'
                }
            }
        },
        collect: {
            type: DataTypes.DECIMAL,
        },
        deadline: {
			type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Deadline cannot be empty'
                }
            }
        },
        status: {
            type: DataTypes.ENUM('acepted', 'denied', 'draft')
        }
    },
)


module.exports = Project