const http = require('http');

const port = 8000;

const {handleRequest} = require('./ownmodule');

const server = http.createServer(handleRequest);

server.listen(port,(err)=>{
    if(err){
        console.log(`server is not start :- ${err}`);
        return false;
    }
    console.log(`server is  start on port :- ${port}`);
})


