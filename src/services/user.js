const User = require('../models/Users')
const bcryptjs = require('bcryptjs')

const createUser = async (userdata) => {
    try {
        hashedPassword = await bcryptjs.hash(userdata.password, 10)
        userdata.password = hashedPassword
        const user = new User(userdata)
        await user.save()
        return user
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser,
}