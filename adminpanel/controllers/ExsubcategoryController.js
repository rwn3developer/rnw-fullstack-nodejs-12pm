const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');
const ExsubcategoryModel = require('../models/ExsubcategoryModel');



const exsubcategory = async(req,res) => { 
    try{
        let subcategory = await SubcategoryModel.find({}).populate('categoryId');
        return res.render('exsubcategory/exsubcategory',{
            subcategory
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

const postrxsubCategory = async(req,res) => {
    try{
        let catregory = await SubcategoryModel.create({
            categoryId : req.body.category,
            subcategory  : req.body.subcategory
        })
        req.flash('success',"Subcategory successfully add!");
        return res.redirect('addexsubcategory');
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    exsubcategory,addexsubcategory,postrxsubCategory
}