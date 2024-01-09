const UserModel = require('../models/UserModel');

const axios = require('axios');

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

        if(!name || !phone){
            console.log("All field is required");
            return false
        }

        let userAdd = await UserModel.create({
            name,phone
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
        let {data} = await axios.get(`https://decoraevnt.online/api/category?providedPassword=Decora957438`);
        

        let result = [];
        for(let i=0;i<data.length;i++){
            for(j=0;j<data[i].themes.length;j++){
                if(data[i].themes[j].categoryId == idd){

                    result.push(data[i].themes[j]);
                    
                   
                }
            }
        }
        return res.render('themepage',{
            themerecord :result
            
        })

        // let theme = data.filter((val)=>{
        //     let a = val.themes.filter((item)=>{
        //         return item.categoryId == idd
        //     })
        //    return res.render('themepage',{
        //         themerecord : a
        //    })   
        // })
       
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
    themedata
}