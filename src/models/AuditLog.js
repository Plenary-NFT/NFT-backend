const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: ['login', 'purchase', 'sell', 'withdrawal', 'update'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String, // A brief description of the action (e.g., "User bought NFT with ID 123")
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: Object, // Optional extra information about the action
        default: {}
    }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
