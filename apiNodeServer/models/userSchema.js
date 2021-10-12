const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    _id : String,
    fullName : String,
    userName : String,
    password : String
})

module.exports = mongoose.model('users',userSchema);