const e = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: false},
    password: {type: String, required: false},
    walletAddress: {type: String, required: true, unique: true},
    role: { type: String, enum: ['admin', 'user'], required: true, default: 'user' },
    googleId: { type: String, required: false },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)

