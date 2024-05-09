'use strict'
var jwt=require("jsonwebtoken");
require('dotenv').config();
var Sessions=require('../models/accesstoken');
var middlewareus ={
    usuarioprotectorUrl:function(req,res,next){
        console.log("desde mi middleware de user para autenticar");
        const token=req.headers['x-cine-access-token'];
        //console.log(token);
        if(token){
            jwt.verify(token,process.env.KEY, (error,decoded)=>{
                if(error){
                    return res.status(401).send({
                        status:401,
                        mensaje:"Token no valido"
                    });
                }else{
                    req.decoded=decoded;

                    Sessions.findOne({user:req.decoded.user.email,key:token,active:true})
                        .then(session=>{
                            
                            if(!session){
                                return res.status(401).send({
                                    status:401,
                                    mensaje:"Session no encontrada",
                                });
                            }
                            next();
                        })
                        .catch(error=>{
                            //console.log(error);
                            return res.status(500).send({
                                status:500,
                                mensaje:"Error detectado"
                            });
                        });


                    ///

                    
                }
            });
        }else{
            return res.status(401).send({
                status:401,
                mensaje:"Datos no validos"
            });
        }
       
    }
};

module.exports=middlewareus;


