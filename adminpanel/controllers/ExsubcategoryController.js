const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');
const ExsubcategoryModel = require('../models/ExsubcategoryModel');



const exsubcategory = async(req,res) => { 
    try{
        let exsubcategory = await ExsubcategoryModel.find({}).populate('categoryId').populate('subcategoryId');
        console.log(exsubcategory);
        return res.render('exsubcategory/exsubcategory',{
            exsubcategory
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const addexsubcategory = async(req,res) => {
    try{
        let category = await CategoryModel.find({});
        let subcategory = await SubcategoryModel.find({});

        return res.render('exsubcategory/exaddsubcategory',{
            category,
            subcategory
        });
    }catch(err){
        console.log(err);
        return false;
    }
    
}

const postexsubCategory = async(req,res) => {
    try{
        let exsubcatregory = await ExsubcategoryModel.create({
            categoryId : req.body.category,
            subcategoryId  : req.body.subcategory,
            exsubcategory : req.body.exsubcategory
        })
        req.flash('success',"Subcategory successfully add!");
        return res.redirect('addexsubcategory');
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    exsubcategory,addexsubcategory,postexsubCategory
}