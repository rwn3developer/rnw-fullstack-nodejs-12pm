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

const editexsubCategory = async(req,res) => {
    try{
        let id = req.query.id;
        let category = await CategoryModel.find({});
        let subcategory = await SubcategoryModel.find({});
        let exsubcat = await ExsubcategoryModel.findById(id).populate("categoryId").populate("subcategoryId");
        
    
        return res.render('exsubcategory/edit_exsubcategory',{
            category,
            subcategory,
            exsubcat
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateexsubCategory = async(req,res) => {
    try{
       let up = await ExsubcategoryModel.findByIdAndUpdate(req.body.id,{
            categoryId : req.body.category,
            subcategoryId : req.body.subcategory,
            exsubcategory : req.body.exsubcategory
       })
       if(up){
            return res.redirect('/exsubcategory')
       }
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteexsubCategory = async(req,res) => {
    try{
        let id = req.query.id;
        let de = await ExsubcategoryModel.findByIdAndDelete(id);
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    exsubcategory,addexsubcategory,postexsubCategory,
    editexsubCategory,updateexsubCategory,deleteexsubCategory
}