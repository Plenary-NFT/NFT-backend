const express = require('express')
const dotenv = require('dotenv')
const db_connection = require('./src/utils/db')
const userRouter = require('./src/routes/user')
const authRouter = require('./src/routes/auth')
const NFTListingRouter = require('./src/routes/ntfListingRoutes')
const TransactionRouter = require('./src/routes/Transactions')
const MarketplaceConfigRouter = require('./src/routes/marketplaceConfigRoutes')
const bodyParser = require('body-parser')

dotenv.config()

PORT = process.env.PORT

const app = express()

db_connection()

app.use(bodyParser.json({limit: '50mb'}))

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/nft', NFTListingRouter)
app.use('/transaction', TransactionRouter)
app.use('/marketplaceConfig', MarketplaceConfigRouter)

app.listen(PORT, ()=> {
    console.log(`App is listening on port ${PORT}`)
})