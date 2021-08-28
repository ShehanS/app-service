const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
        default: 'not-set'

    },
    created: {
        type: Date,
        default: Date.now
    },
    profileStatus:{
        type: Boolean,
        default: false
    },
    firstName:{
        type: String,
        default: 'not-set'
    },
    middleName:{
        type: String,
        default: 'not-set'
    },
    lastName:{
        type: String,
        default: 'not-set'
    },
    address1: {
        type: String,
        default: 'not-set'
    },
    address2: {
        type: String,
        default: 'not-set'
    },
    city: {
        type: String,
        default: 'not-set'
    },
    country: {
        type: String,
        default: 'not-set'
    },
    school: {
        type: String,
        default: 'not-set'
    },
    stream: {
        type: String,
        default: 'not-set'
    },
    subjects: {
        type: []
    },
    contact: {
        type: String,
        default: 'not-set'
    },
    identityNumber: {
        type: String,
        default: 'not-set'
    },
    profileImage:{
        type: String
    },
    updated:{
        type:Number,
        default: Date.now
    }
    
});

module.exports = mongoose.model('User', userSchema);