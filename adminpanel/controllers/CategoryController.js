const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');
const ExsubcategoryModel = require('../models/ExsubcategoryModel');



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

const categoryDelete = async(req,res) => {
    try{
        await CategoryModel.findByIdAndDelete(req.query.id);
        await SubcategoryModel.deleteMany({categoryId : req.query.id});
        await ExsubcategoryModel.deleteMany({categoryId : req.query.id });
        req.flash('success',"Category successfully delete!");
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    category,addcategory,postCategory,categoryDelete
}