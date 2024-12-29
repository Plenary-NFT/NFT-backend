const bcryptjs = require('bcryptjs')
const User = require('../models/Users')
const { generateToken } = require('../utils/jwt')

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
    
        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }
    
        const isPasswordValid = await bcryptjs.compare(password, user.password)
    
        if(!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const token = generateToken(user)
    
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        })
    } catch (error) {
        console.log("Error trying to log in")
        next(error)
    }
   
}

module.exports = {
    login,
}