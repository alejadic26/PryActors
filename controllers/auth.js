'use strict'
var jwt=require("jsonwebtoken");
const {validationResult}=require('express-validator');
const bcrypt=require('bcrypt');
var Usuarios=require('../models/usuarios');
var Sessions=require('../models/accesstoken');
const { usuario } = require("./usuarios");
const { hash } = require("bcrypt");
require('dotenv').config();
var controller={
    login_user:function(req,res){
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({status:400, errors:errors.array()});
        }
        var data=req.body;
        Usuarios.findOne({email:data.email})
        .then(usuarios=>{
            //bcrypt
            bcrypt.compare(data.password,usuarios.password,function(error,result){
                if(result){
                    const privatekey= process.env.KEY
                 const payload={
                     user:usuarios
                 }
              
                 let acces_token=jwt.sign(payload,privatekey,{
                     expiresIn:'1d'
                 });
 
                 let today=new Date().toISOString();
                 let updatesession={
                     user: usuarios.email,
                     key:acces_token,
                     creationDate:today,
                     expirationDate:'1d',
                     active:true
                 }
                 Sessions.findOneAndUpdate({user:usuarios.email},updatesession,{upsert:true,new:true})
                  .then(session=>{
                         if(!session){
                             return res.status(401).send({
                                 status:401,
                                 mensaje:"Usuario no encontrado",
                             });
                         }
                         return res.status(200).send({
                         status:200,
                         mensaje:"Login correcto",
                         token:acces_token
                         });
                     })
                     .catch(error=>{
                     console.log(error);
                         return res.status(500).send({
                             status:500,
                             mensaje:"Error detectado"
                         });
                     });
  
             }else{
                 return res.status(401).send({
                     status:401,
                     mensaje:"Datos no validos"
                 });
             }
             
            });

            
        })
        .catch(error=>{
            console.log(error);
            return res.status(401).send({
                status:401,
                mensaje:"Datos no validos"
            });
        });

    },

    logout:function(req,res){

        const token=req.headers['x-cine-access-token'];
    
       Sessions.findOneAndDelete({usuario:req.decoded.email,key:token})
        .then(session=>{
            if(!session){
                
                return res.status(200).send({
                    status:200,
                    mensaje:"Token no valido",
                });
            }
            return res.status(200).send({
                status:200,
                mensaje:"Sesion Finalizada"
               
            });
        })
        .catch(error=>{
          //  console.log(error);
            return res.status(500).send({
                status:500,
                mensaje:"Token invalido"
            });
        });
    }
}

module.exports=controller;