const { DataTypes } = require('sequelize')
const { connection } = require('../../database')


const Event = connection.define(
    'event',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'Please, don\'t leave the field empty'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please, add a brief description of the event'
                }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                     msg: 'Provide an address where arrange the event'
                }
            }
        }, 
        start_date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Add a date to start for the event'
                }
                
            }
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please, add the end date for the event'
                }
            }
        },
    }
)


module.exports = Event