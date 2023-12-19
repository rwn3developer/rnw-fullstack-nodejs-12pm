const fs = require('fs');

const handleRequest = (req,res) => {
    let pageName = "";
    switch(req.url){
        case '/':
            pageName = './index.html'
        break;

        case '/home':
            pageName = './home.html'
        break;

        case '/about':
            pageName = './about.html'
        break;
    }
    fs.readFile(pageName,(err,record)=>{
        if(!err){
            res.end(record)
        }
       
    })
}

module.exports = {handleRequest}