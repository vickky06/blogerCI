const mongoose = require('mongoose');
const User = mongoose.model('User');
// require mongoos

module.exports = () =>{
    return new User({}).save();
}