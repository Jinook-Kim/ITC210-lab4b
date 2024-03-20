var mongoose = require('mongoose'); // Replaced import mongoose from 'mongoose';

// Define the schema
var UserSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true
    }
}, { collection: 'Users' }); // Tell the schema constructor which collection your users should be stored in

// Create the model from the schema
var User = mongoose.model('User', UserSchema);

// Export the model
module.exports = User;