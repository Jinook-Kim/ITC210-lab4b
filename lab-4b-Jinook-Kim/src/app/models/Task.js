var mongoose = require('mongoose'); // Replaced import mongoose from 'mongoose';

// Define the schema
var TaskSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    Text: {
        type: String,
        required: true
    },
    Done: {
        type: Boolean,
        default: false
    },
    Date: {
        type: String,
        required: true
    }
}, { collection: 'Tasks' }); // Tell the schema constructor which collection your tasks should be stored in

// Create the model from the schema
var Task = mongoose.model('Task', TaskSchema);

// Export the model
module.exports = Task;