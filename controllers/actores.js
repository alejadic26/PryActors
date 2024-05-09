'use strict'
const {validationResult}=require('express-validator');
var Actores=require('../models/actores');
const { actores } = require('./welcome');

var controller={
    actorlist: function(req,res){
        Actores.find({})
        .then(actores=>{
            //console.log(actores);
            return res.status(200).send({
                status:200,
                mensaje:"Actores Listados",
                data:actores
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
    actor: function(req,res){
        var params=req.params;
        var id_actor=params.id_actor;
        Actores.findOne({id_actor:parseInt(id_actor)})
        .then(actores=>{
      
            return res.status(200).send({
                status:200,
                mensaje:"Información de Actor",
                data:actores
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
    crearactor:function(req,res){
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({status:400, errors:errors.array()});
        }
        var data=req.body;
        //usuario exiatente
        Actores.findOne({id_actor:data.id_actor})
        .then(actores=>{
            if(actores){
                return res.status(400).send({
                    status:400,
                    mensaje:"Actor ya existente"
                });
         
            }
            var create_actor=new Actores();
        create_actor.id_actor=data.id_actor,
        create_actor.nombre=data.nombre;
        create_actor.fecha_nacimiento=data.fecha_nacimiento;
        create_actor.pais_nacimiento=data.pais_nacimiento;
        create_actor.peliculas=data.peliculas;
        create_actor.genero_peliculas=data.genero_peliculas;
        create_actor.save()
            .then( (result)=>{ 
                return res.status(200).send({
                status:200,
                mensaje:"Actor almacenado",
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
        })
        .catch(error=>{
            //console.log(error);
            return res.status(500).send({
                status:500,
                mensaje:"Error detectado"
            });
        });
        
        
    },
    actualizar_actor:function(req,res){
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({status:400, errors:errors.array()});
        }
        var params=req.params;
        var id_actor=params.id_actor;
        var data=req.body;
        var updateactor={
            id_actor:data.id_actor,
            nombre:data.nombre,
            fecha_nacimiento:data.fecha_nacimiento,
            pais_nacimiento:data.pais_nacimiento,
            peliculas:data.peliculas,
            genero_peliculas:data.genero_peliculas
        }
        Actores.findOneAndUpdate({id_actor:parseInt(id_actor)},updateactor)
        .then(actores=>{
            if(!actores){
                return res.status(200).send({
                    status:200,
                    mensaje:"Actor no encontrado",
                });
            }
          
            return res.status(200).send({
                status:200,
                mensaje:"Actor Actualizado",
               
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
    eliminar_actor:function(req,res){
        var params=req.params;
        var id_actor=params.id_actor;
        Actores.findOneAndDelete({id_actor:parseInt(id_actor)})
        .then(actores=>{
            if(!actores){
                return res.status(200).send({
                    status:200,
                    mensaje:"Actor no encontrado",
                });
            }
            return res.status(200).send({
                status:200,
                mensaje:"Actor Eliminado",
               
            });
        })
        .catch(error=>{
            //console.log(error);
            return res.status(500).send({
                status:500,
                mensaje:"Error detectado"
            });
        });
    }
};

module.exports=controller;