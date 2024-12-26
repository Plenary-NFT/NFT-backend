const express = require('express')
const dotenv = require('dotenv')
const db_connection = require('./src/utils/db')
const userRouter = require('./src/routes/user')
const authRouter = require('./src/routes/auth')
const bodyParser = require('body-parser')

dotenv.config()

PORT = process.env.PORT

const app = express()

db_connection()

app.use(bodyParser.json({limit: '50mb'}))

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(PORT, ()=> {
    console.log(`App is listening on port ${PORT}`)
})