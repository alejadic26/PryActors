'use strict'
const express=require('express');
const app=express();
var bodyParser=require('body-parser');

const routes=require('./routes/api')
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json({
    parameterLimit:1000000,
    limit:'70mb',
    extended:false
}));

//Errores de json
app.use((error,req,res,next)=>{
    if(error instanceof SyntaxError && error.status===400 && 'body' in error){
        return res.status(400).send({status:400, message:error.message});
    }
    next();
});

app.use('',routes);

//exportamos
module.exports=app;