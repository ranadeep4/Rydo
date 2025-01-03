const mongoose = require('mongoose')

function connectToDb(){
    // Connect to MongoDB
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
        console.log('Connected to MongoDB');
    }).catch(err => console.error('Could not connect to MongoDB:', err))
}

module.exports = connectToDb;