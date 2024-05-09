'use strict'
const express=require('express');
const {body}=require('express-validator');
const api=express.Router();
var middleware=require('../middleware/middleware');
var middlewareus=require('../middleware/middlewareus');

var ActoresConroller=require('../controllers/actores');
var UsuariosConroller=require('../controllers/usuarios');
var AuthConroller=require('../controllers/auth');
//login

api.get("/login",middlewareus.usuarioprotectorUrl,UsuariosConroller.usuarioslist);

api.post("/login",[
    body("password").not().isEmpty(),
    body("email").not().isEmpty()
    ],AuthConroller.login_user);

    api.post("/usuario",middlewareus.usuarioprotectorUrl,[
        body("iduser").not().isEmpty(),
        body("usuario").not().isEmpty(),
        body("password").not().isEmpty(),
        body("email").not().isEmpty()
    ],UsuariosConroller.crearusuario);


    api.put("/usuario/:iduser",middlewareus.usuarioprotectorUrl,[
        body("iduser").not().isEmpty(),
        body("usuario").not().isEmpty(),
        body("password").not().isEmpty(),
        body("email").not().isEmpty()
    ],UsuariosConroller.actualizar_usuario);


    api.delete("/usuario/:iduser",middlewareus.usuarioprotectorUrl,UsuariosConroller.eliminar_usuario);

api.post('/logout',middlewareus.usuarioprotectorUrl,AuthConroller.logout);



/*api.get("/usuario/:iduser",UsuariosConroller.usuario);

*/


//Actores
api.get("/actor",middlewareus.usuarioprotectorUrl,ActoresConroller.actorlist);

api.get("/actor/:id_actor",middlewareus.usuarioprotectorUrl,ActoresConroller.actor);

api.post("/actor",middlewareus.usuarioprotectorUrl,[
    body("id_actor").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("fecha_nacimiento").not().isEmpty(),
    body("pais_nacimiento").not().isEmpty(),
    body("fecha_nacimiento").not().isEmpty()
],ActoresConroller.crearactor);

api.put("/actor/:id_actor",middlewareus.usuarioprotectorUrl,[
    body("id_actor").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("fecha_nacimiento").not().isEmpty(),
    body("pais_nacimiento").not().isEmpty(),
    body("fecha_nacimiento").not().isEmpty()
],ActoresConroller.actualizar_actor);

api.delete("/actor/:id_actor",middlewareus.usuarioprotectorUrl,ActoresConroller.eliminar_actor);




module.exports=api;

