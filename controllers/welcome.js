'use strict'

var controller={
    welcome: function(req,res){
        console.log("get ejecuta desde raíz");
        res.send("mi primer endpoint");
    },
    actores: function(req,res){
        res.send("mi listado de actores");
    },
    actor: function(req,res){
        let cal1=20;
        let cal2=13;
        let final=(cal1+cal2)/2;
        console.log(final);
        return res.status(200).json({
            status:200,
            cal_final:final
        });
    },
    crear_actor:function(req,res){
        res.send("crear un actor");
    },
    actualizar_actor:function(req,res){
        res.send("actualizar un ator");
    },
    eliminar_actor:function(req,res){
        res.send("eliminar un actor");
    }
};


module.exports=controller;