const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()
const jwtSecret = process.env.JWT_SECRET_TOKEN

const generateToken = (user) => {
    const payload = {
        email: user.email,
        id: user._id
    }

    return jwt.sign(payload, jwtSecret, { expiresIn: '60d' })
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret)
    } catch (error) {
        throw new Error("Invalid Token")
    }
}

const getCurrentUser = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization

        if(!bearerToken || !bearerToken.startsWith('Bearer ')){
            return res.status(401).json({ message: "Authorization token not found or token missing" })
        }   

        const token = bearerToken.split(' ')[1]
        const decodedToken = decodeToken(token)
        const email = decodedToken.email
        console.log(email)

        const objectId = new mongoose.Types.ObjectId(decodedToken.id)
        const user = await User.findById(objectId)
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        console.log(user)

        req.user = user
        next()
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getCurrentUser,
    generateToken,
}