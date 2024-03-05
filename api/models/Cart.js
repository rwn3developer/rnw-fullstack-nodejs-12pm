const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    subcategory : {
        type : String,
        required : true,
    },
    subcatId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subcategory"
    }
})

const cart = mongoose.model('cart',cartSchema);
module.exports = cart;