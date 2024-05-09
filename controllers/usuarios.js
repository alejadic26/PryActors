'use strict'
const {validationResult}=require('express-validator');
const bcrypt=require('bcrypt');
var Usuarios=require('../models/usuarios');
const { usuarios } = require('./welcome');

var controllerus={

    //usuarios
    usuarioslist: function(req,res){
        Usuarios.find({})
        .then(usuarios=>{
            return res.status(200).send({
                status:200,
                mensaje:"Usuarios Listados",
                data:usuarios
            });
        })
        .catch(error=>{
           // console.log(error);
            return res.status(500).send({
                status:500,
                mensaje:"Error detectado"
            });
        });
        
    },
    usuario: function(req,res){
        var paramsus=req.params;
        var iduser=paramsus.iduser;
        Usuarios.findOne({iduser:parseInt(iduser)})
        .then(usuarios=>{
      
            return res.status(200).send({
                status:200,
                mensaje:"Información de Usuario",
                data:usuarios
            });
        })
        .catch(error=>{
            //console.log(error);
            return res.status(500).send({
                status:500,
                mensaje:"Error detectado"
            });
        });
    },
    crearusuario:function(req,res){
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({status:400, errors:errors.array()});
        }
        var data=req.body;
        //usuario exiatente
        Usuarios.findOne({iduser:data.iduser})
        .then(usuarios=>{
            if(usuarios){
                return res.status(400).send({
                    status:400,
                    mensaje:"Usuario ya existente"
                });
            }
            
            //cryp pass
            const saltRounds=10;
            bcrypt.genSalt(saltRounds,function(error,salt){
                bcrypt.hash(data.password,salt,function(error,hash){
                    var create_usuario=new Usuarios();
                    create_usuario.iduser=data.iduser,
                    create_usuario.usuario=data.usuario;
                    create_usuario.password=hash;
                    create_usuario.email=data.email;
                    create_usuario.save()
                    .then( (result)=>{ 
                        return res.status(200).send({
                        status:200,
                        mensaje:"Usuario almacenado",
                        data:result
                    });
                })
                .catch(error=>{
                   // console.log(error);
                    return res.status(500).send({
                    status:500,
                    mensaje:"Error detectado"
                });
            });

                });
            });


               
        })
        .catch(error=>{
            //console.log(error);
            return res.status(500).send({
                status:500,
                mensaje:"Error detectado"
            });
        });
        
        
    },
    actualizar_usuario:function(req,res){
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({status:400, errors:errors.array()});
        }
        var params=req.params;
        var iduser=params.iduser;
        var data=req.body;

        //cryp pass
        const saltRounds=10;
        bcrypt.genSalt(saltRounds,function(error,salt){
            bcrypt.hash(data.password,salt,function(error,hash){
                var updateuser={
                    iduser:data.iduser,
                    usuario:data.usuario,
                    password:hash,
                    email:data.email
                }
                Usuarios.findOneAndUpdate({iduser:parseInt(iduser)},updateuser)
                .then(usuarios=>{
                    if(!usuarios){
                        return res.status(200).send({
                            status:200,
                            mensaje:"Usuario no encontrado",
                        });
                    }
                  
                    return res.status(200).send({
                        status:200,
                        mensaje:"Usuario Actualizado",
                       
                    });
                })
                .catch(error=>{
                   // console.log(error);
                    return res.status(500).send({
                        status:500,
                        mensaje:"Error detectado"
                    });
                });
            });
        });
        
    },
    eliminar_usuario:function(req,res){
        var params=req.params;
        var iduser=params.iduser;
        Usuarios.findOneAndDelete({iduser:parseInt(iduser)})
        .then(usuarios=>{
            if(!usuarios){
                return res.status(200).send({
                    status:200,
                    mensaje:"Usuario no encontrado",
                });
            }
            return res.status(200).send({
                status:200,
                mensaje:"Usuario Eliminado",
               
            });
        })
        .catch(error=>{
          //  console.log(error);
            return res.status(500).send({
                status:500,
                mensaje:"Error detectado"
            });
        });
    }
};

module.exports=controllerus;