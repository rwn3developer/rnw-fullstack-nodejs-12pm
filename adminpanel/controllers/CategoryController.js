const CategoryModel = require('../models/CategoryModel');

const category = async(req,res) => {
    try{
        let category = await CategoryModel.find({});
        return res.render('category/category',{
            category
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const addcategory = (req,res) => {
    return res.render('category/addcategory');
}

const postCategory = async(req,res) => {
    try{
        let catregory = await CategoryModel.create({
            category : req.body.category
        })
        req.flash('success',"Category successfully add!");
        return res.redirect('addcategory');
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    category,addcategory,postCategory
}