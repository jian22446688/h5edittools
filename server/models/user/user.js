var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    created_time: {
        type: Date,
        default: new Date(),
    },
    updated_time: {
        type: Date,
        default: new Date(),
    }
})
var user = mongoose.model('user', userSchema);
module.exports = user;
