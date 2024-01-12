const UserModel = require('../models/UserModel');

const axios = require('axios');

const fs = require('fs');

const viewRecord = async(req,res) => {
    try{
        let record = await UserModel.find({});
        return res.render('index',{
            record
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const add = (req,res) => {
    return res.render('add');
}

const insertData = async(req,res) => {
   try{
        const {name,phone}  = req.body;

        if(!name || !phone ){
            console.log("All field is required");
            return false
        }

        let userAdd = await UserModel.create({
            name,phone,image : req.file.path
        })
        if(userAdd){
            console.log("User successfully Add"); 
            return res.redirect('/');
        }else{
            console.log("something wrong");
            return false;
        }
   }catch(err){
        console.log(err);
        return false;
   }
}

const deleteData = async(req,res) => {
    try{
        let deleterecord = await UserModel.findById(req.query.id);
       fs.unlinkSync(deleterecord.image);
       let d = await UserModel.findByIdAndDelete(req.query.id);
       console.log("record deleted");
       return res.redirect('/');
    }catch(err){
        console.log(err);
        return false;
    }
}

const editData = async(req,res) => {
    try{
        let id=  req.query.id;
        let single = await UserModel.findById(id);
        return res.render('edit',{single});
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateRecord = async(req,res) => {
    try{
        if(req.file){
            let old = await UserModel.findById(req.body.id);
            fs.unlinkSync(old.image);
            let up = await UserModel.findByIdAndUpdate(req.body.id,{
                name : req.body.name,
                phone : req.body.phone,
                image : req.file.path
            });
            if(up){
                console.log("record update");
                return res.redirect('/');
            }
        }else{
            let old = await UserModel.findById(req.body.id);
            let up = await UserModel.findByIdAndUpdate(req.body.id,{
                name : req.body.name,
                phone : req.body.phone,
                image : old.image
            });
            if(up){
                console.log("record update");
                return res.redirect('/');
            }
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const apicalling = async(req,res) => {
    try{
        let {data} = await axios.get(`https://decoraevnt.online/api/category?providedPassword=Decora957438`);
        console.log(data);
        return res.render('apipage',{
            data
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const themedata = async(req,res) => {
    try{
        let idd = req.query.id;
        //using for loop perfect work
        // let {data} = await axios.get(`https://decoraevnt.online/api/category?providedPassword=Decora957438`);
        // let result = [];
        // for(let i=0;i<data.length;i++){
        //     for(j=0;j<data[i].themes.length;j++){
        //         if(data[i].themes[j].categoryId == idd){
        //             result.push(data[i].themes[j]);
        //         }
        //     }
        // }
        // return res.render('themepage',{
        //     themerecord :result
            
        // })
         //using for loop perfect work


         //using map method
         let {data} = await axios.get(`https://decoraevnt.online/api/category?providedPassword=Decora957438`);
         let result = [];
         let all = data.map((val)=>{
            let themedata = val.themes.map((item)=>{
                if(item.categoryId == idd){
                    result.push(item);
                }
            })
         })
         return res.render('themepage',{
                themerecord :result    
        })


       
       
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports ={
    viewRecord,
    add,
    insertData,
    apicalling,
    themedata,
    deleteData,
    editData,
    updateRecord
}