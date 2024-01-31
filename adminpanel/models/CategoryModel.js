const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    category : {
        type : String,
        required : true,
    }
})

const user = mongoose.model('category',userSchema);
module.exports = user;