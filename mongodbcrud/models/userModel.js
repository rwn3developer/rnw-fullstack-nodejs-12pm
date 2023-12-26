const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
        required : true
    },
    images : {
        type : Array,
        required : true
    }
})

const user = mongoose.model('user',userSchema);
module.exports = user;