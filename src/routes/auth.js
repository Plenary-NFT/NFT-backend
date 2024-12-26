const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authUser')

authRouter.post('/login', authController.login)

module.exports = authRouter