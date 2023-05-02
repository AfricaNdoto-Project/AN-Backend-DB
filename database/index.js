const { Sequelize } = require('sequelize')

// Connect to PostgreSQL creating a new sequelize instance
const connection = new Sequelize(process.env.DIALECT+'://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME,{
    dialect: process.env.DIALECT,
    port: process.env.DB_PORT,
    logging:false

})

async function checkConnection() {
	try {
		await connection.authenticate()
		console.log('Connection to DB has been established successfully.')
	} catch (error) {
		throw error
	}
}

async function syncModels(value) {
	const state = {
		alter: { alter: true },
		force: { force: true },
	}
	try {
		await connection.sync(state[value] || '')
		console.log(`All models were synchronized successfully using sync(${JSON.stringify(state[value]) || ''}).`)
	} catch (error) {
		throw error
	}
}


module.exports = { connection, checkConnection, syncModels }
