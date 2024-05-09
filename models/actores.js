'use strict'

const mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ActorSchema=Schema({
    id_actor:Number,
    nombre:String,
    fecha_nacimiento:String,
    pais_nacimiento:String,
    peliculas:Array,
    genero_peliculas:Array
});


module.exports=mongoose.model('actores',ActorSchema);
