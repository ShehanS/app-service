const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true
    }, 

    userId:{
        type: mongoose.ObjectId,
        required: true
    },
    logged:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('logins', userSchema);