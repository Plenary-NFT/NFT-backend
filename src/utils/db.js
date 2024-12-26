const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const mongoUri = process.env.MONGODB_URI

const db_connection = async () => {
    try {
        await mongoose.connect(mongoUri)
        console.log("Connected to mongodb successfully")
    } catch (error) {
        console.log('there was an error connecting to mongodb', error.message)
        process.exit(1)
    }
}

module.exports = db_connection