'use strict'
require('dotenv').config();
const mongoose=require('mongoose');


const app=require('./app');
const port=3000;

mongoose.Promise=global.Promise;
//mongoose.connect("mongodb+srv://alejaciale:s2ta0N2e6Jcu4uqe@cluster0.byd5nzi.mongodb.net/cine")
mongoose.connect(process.env.MONGOURL)
        .then(()=>{
            console.log("conoxeion exitosa");
            var server= app.listen(port,()=>{
                console.log("servidor ejecutando exitosamente en: "+port);
            });
            server.timeout=120000;
        })
        .catch(err=>console.log(err));
/*app.get("/",(req, res)=>{
    console.log("get ejecutaando en raiz");
    res.send("hola funciono");
});
*/
