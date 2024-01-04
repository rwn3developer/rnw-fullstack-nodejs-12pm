const express = require('express');

const port = 8000;

const app = express();

const fs = require('fs');

app.set('view engine','ejs');

const multer = require('multer');

const db = require('./config/db');

const User = require('./models/userModel');

app.use(express.urlencoded());

const path = require('path');

app.use('/uploads',express.static(path.join('uploads')))

//file upload by multer
const fileUpload = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'uploads');
    },
    filename : (req,file,cb) => {
        cb(null, file.originalname);
    }
})
const imageUpload = multer({storage : fileUpload}).single('avatar');
//file upload by multer end

//route , http request , url
app.get('/',(req,res)=>{
    User.find({})
    .then((record)=>{
        return res.render('index',{record});
    }).catch((err)=>{
        console.log(err);
        return false;
    })
   
})

app.get('/add',(req,res)=>{
    return res.render('form');
})

app.post('/addRecord',imageUpload,(req,res)=>{
    const {name,email,password,gender,hobby,city,phone} = req.body;
    if(!name || !email || !password || !gender || !hobby || !city || !phone || !req.file ){
        console.log("All field are required");
        return res.redirect('back');
    }
    User.create({
        name,email,password,gender,hobby,city,phone,
        image : req.file.path
    }).then((success)=>{
        console.log("User successfully insert");
        return res.redirect('/')
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.get('/deleteRecord',(req,res)=>{
    let id = req.query.id;
    //image unlink
    User.findById(id)
    .then((oldRecord)=>{
        fs.unlinkSync(oldRecord.image);
    }).catch((err)=>{
        console.log(err);
        return false;
    })
    //mongodb record delete
    User.findByIdAndDelete(id)
    .then((success)=>{
        console.log("User delete");
        return res.redirect('back');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.get('/editRecord',(req,res)=>{ 
    let id = req.query.id;
    User.findById(id)
    .then((single)=>{
       return res.render('edit',{
            single
       })
    }).catch((err)=>{
        console.log(err);
        return false;
    }) 
})

app.post('/updateRecord',imageUpload,(req,res)=>{
    let id = req.body.editid;
        if(req.file){
            User.findById(id)
            .then((oldRecord)=>{
                fs.unlinkSync(oldRecord.image)
            }).catch((err)=>{
                console.log(err);
                return false;
            })

            User.findByIdAndUpdate(id,{
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                gender : req.body.gender,
                hobby : req.body.hobby,
                city : req.body.city,
                phone : req.body.phone,
                image : req.file.path
            }).then((success)=>{
                console.log("successfully edit");
                return res.redirect('/');
            }).catch((err)=>{
                console.log(err);
                return false
            })
        }else{
            User.findById(id)
            .then((oldRecord)=>{
                User.findByIdAndUpdate(id,{
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    gender : req.body.gender,
                    hobby : req.body.hobby,
                    city : req.body.city,
                    phone : req.body.phone,
                    image : oldRecord.image
                }).then((success)=>{
                    console.log("successfully edit");
                    return res.redirect('/');
                }).catch((err)=>{
                    console.log(err);
                    return false
                })
            }).catch((err)=>{
                console.log(err);
                return false;
            })
        }
})



//server created
app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is  start on port :- ${port}`);

})