const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const events=require("./public/assets/events")
const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const knex= require('knex')
const knexConfig = require("./knexfile");
const messages = [];

const database=knex(knexConfig);

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/public",
});

 app.engine("hbs", hbs.engine);
 app.set('views', "./public");
 app.set("view engine", "hbs");

// ESCUCHANDO EN PUERTO 8080
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
});
server.on("error", error => console.log(`Error: ${error}`))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index");
});
    


socketServer.on("connection", async (socket) => {
  console.log("Nuevo client conectado");
  socketServer.emit("INIT", "Bienvenido al WebSocket", messages);
   socketServer.emit(
     "productos_registrados",
   await database('productos').select()),
  socketServer.emit(
    events.UPDATE_MESSAGES,
   "Bienvenido al WebSocket",
   await database('mensajes').select(),
         
       );
       
  
    //    socket.on("POST_MESSAGE", async (msg)=>{
    //     let aDate = new Date; 
    //     const _msg = {...msg, date: aDate.toGMTString()};
    //     messages.push(_msg);
    //     socketServer.sockets.emit("NEW_MESSAGE", _msg);
    //     try{
    //         const _resultado = await databaseChat('ecommerce').insert(_msg);
    //     }
    //     catch (err) {
    //         res.send(err)
    //     }
    // });
       socket.on(events.POST_MESSAGE, async (msg) => {
        let fecha=new Date;
         const _msg = {
           ...msg, 
           date: fecha.toGMTString()
         };
         messages.push(_msg);
         await database ('mensajes').insert(_msg)
       });
  
       socket.on(events.POST_PRODUCTS, async (prod) => {
         const _prod = {
           ...prod
         };
         await database('productos').insert(_prod)
       });
      });

   
  

    