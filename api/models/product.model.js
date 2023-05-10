const { DataTypes } = require('sequelize')
const { connection } = require('../../database')


const Product = connection.define(
    'product',
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
                    msg: 'Please, add a brief description of the product'
                }
                
            }
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Add a price to your product'
                }
                
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Add a category to your product'
                }
                
            }
        },
        stock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    { createdAt: false },
    { updatedAt: false }
)


module.exports = Product