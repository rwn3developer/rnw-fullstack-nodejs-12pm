const SubcategoryModel = require('../models/SubcategoryModel');
const CategoryModel = require('../models/CategoryModel');
const ExcategoryModel = require('../models/ExsubcategoryModel');

const product = async(req,res) => {
    try{
        let category = await CategoryModel.find({});
        return res.render('product/addproduct',{
            category
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

//ajax
const productWiseFilter = async(req,res) => { 
    try{
        try{
            let id = req.query.id;
            let subcat = await ExcategoryModel.find({}).populate("subcategoryId").populate("categoryId");
            let fil = subcat.filter((val)=>{
                return val.subcategoryId._id == id;
            })
            return res.json({
                subcategory : fil
            })
        }catch(err){
            console.log(err);
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    productWiseFilter,product
}