const userRouter = require('express').Router()
const userController = require('../controllers/user')

userRouter.post('/create-user', userController.createUser)

module.exports = userRouter