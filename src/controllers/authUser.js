const bcryptjs = require('bcryptjs')
const User = require('../models/Users')
const { generateToken } = require('../utils/jwt')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

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

const verifyGoogleToken = (token) => {
    try {
        const ticket = client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        return payload
    } catch (error) {
        throw new Error("Invalid Google token")
    }   
}

const googleSignIn = async (req, res) => {
    try {
        const { token } = req.body
        const googlePayload = verifyGoogleToken(token)

        const { email, name, sub: googleId } = googlePayload

        let user = await User.findOne({ email })
        if(!user) {
            const userData = {
                name,
                email,
                googleId,
                phone: '',
                walletAddress: ''
            }

            await User.create(userData)
        } else if(!user.googleId) {
            user.googleId = googleId
            await user.save()
        }

        const jwtToken = generateToken(user)
        return res.status(200).json({ token: jwtToken, user })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }


}


module.exports = {
    login,
    googleSignIn,
}