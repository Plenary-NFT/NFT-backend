const userRouter = require('express').Router()
const userController = require('../controllers/user')
const { jwtMiddleware } = require('../utils/jwt')


userRouter.post('/create-user', jwtMiddleware(["user", "admin"]), userController.createUser)

module.exports = userRouter