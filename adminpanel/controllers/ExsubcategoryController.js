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
        let exsubcat = await ExsubcategoryModel.find({}).populate("categoryId").populate("subcategoryId");
        
        let ans = exsubcat.filter((ex)=>{
            console.log(ex.categoryId.category == "mobile");
        })

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

module.exports = {
    exsubcategory,addexsubcategory,postexsubCategory,
    editexsubCategory
}