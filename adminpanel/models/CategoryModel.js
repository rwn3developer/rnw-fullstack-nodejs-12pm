const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    category : {
        type : String,
        required : true,
    },
    status : {
        type : Number,
        default : 1
    }
})

const user = mongoose.model('category',userSchema);
module.exports = user;