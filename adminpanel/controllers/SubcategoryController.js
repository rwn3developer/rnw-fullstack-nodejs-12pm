const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');
const ExsubcategoryModel = require('../models/ExsubcategoryModel');


const subcategory = async(req,res) => { 
    try{
        let subcategory = await SubcategoryModel.find({}).populate('categoryId');

        // let lookupCategory = await CategoryModel.aggregate([
        //     {
        //         $lookup : {
        //             from : "subcategories",
        //             localField : "_id",
        //             foreignField : "categoryId",
        //             as : "subcategory"
        //         }
        //     }
        // ])

        // console.log(lookupCategory);

        res.render('subcategory/subcategory',{
            subcategory
        });

    }catch(err){
        console.log(err);
        return false;
    }
}

const addsubcategory = async(req,res) => {
    try{
        let category = await CategoryModel.find({status : {$eq : 1}});
        return res.render('subcategory/addsubcategory',{
            category
        });
    }catch(err){
        console.log(err);
        return false;
    }
    
}

const postsubCategory = async(req,res) => {
    try{
        let catregory = await SubcategoryModel.create({
            categoryId : req.body.category,
            subcategory  : req.body.subcategory
        })
        req.flash('success',"Subcategory successfully add!");
        return res.redirect('addsubcategory');
    }catch(err){
        console.log(err);
        return false;
    }
}

const subcategoryDelete = async(req,res) => {
    try{
        await SubcategoryModel.findByIdAndDelete(req.query.id);
        await ExsubcategoryModel.deleteMany({subcategoryId : req.query.id });
        req.flash('success',"Category successfully delete!");
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return false;
    }
}

const subcategoryEdit = async(req,res) => {
    try{
        let category = await CategoryModel.find({});
        let subcategorySingle = await SubcategoryModel.findById(req.query.id).populate("categoryId");
        console.log(subcategorySingle);
        return res.render('subcategory/edit_subcategory',{
            category,subcategorySingle
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateSubCategory = async(req,res) => {
    try{
        let up = await SubcategoryModel.findByIdAndUpdate(req.body.id,{
            categoryId : req.body.category,
            subcategory : req.body.subcategory
        })
        req.flash('success', "subcategory edit")
        return res.redirect('/subcategory')
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    subcategory,addsubcategory,postsubCategory,subcategoryDelete,subcategoryEdit,updateSubCategory
}