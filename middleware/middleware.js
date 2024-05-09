'use strict'
require('dotenv').config();
var middleware ={
    actorprotectorUrl:function(req,res,next){
        console.log("Hola desde mi middleware");
        next();
    }
};



module.exports=middleware;


