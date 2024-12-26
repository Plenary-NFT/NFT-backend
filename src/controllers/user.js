const userService = require('../services/user')

const createUser = async (req, res, next) => {
    try {
        const userdata = req.body
        const user = await userService.createUser(userdata)

        if(user) {  
            res.status(201).json({message: "User Created Successfully", data: user})
        } else {
            res.status(400).json({ message: "Error Creating User" })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

module.exports = {
    createUser,
}

