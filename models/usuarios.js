'use strict'

const mongoose=require('mongoose');
var Schema=mongoose.Schema;


var UsuarioSchema=Schema({
    iduser:Number,
    usuario:String,
    password:String,
    email:String
});

module.exports=mongoose.model('usuarios',UsuarioSchema);