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

const category = mongoose.model('category',userSchema);

const subcategorySchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
    },
    subcategory : {
        type : String,
        required : true,
    }
})

const subcategory = mongoose.model('subcategory',subcategorySchema);

module.exports = {
    category,subcategory
};