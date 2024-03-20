// Import mongoose package
const mongoose = require('mongoose');

// Use mongoose's connect method to create a connection to the database
mongoose.connect(process.env.ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection successful'))
.catch((err) => console.error('MongoDB connection error: ', err));