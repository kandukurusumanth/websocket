const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connect = require('./models/connected')
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
app.set('view engine', 'ejs');
io.on("connection", (socket) => {

    socket.on('joining room', (msg)=>{
        
        socket.join(msg.roomid)
        
        
       
        
    })
    
    socket.on('new_msg', (data)=>{
        io.to(data.roomid).emit('joined room', {msg:data.msg})        
    })

    // io.to(a).emit('joined room', {ok:'joined the room'})


    
   
});
app.get('/:roomid/:user' ,  (req,res) =>{
    
    res.render('index', {roomid:req.params.roomid , user:req.params.user});
   
   

})
httpServer.listen(4000, async ()=>{
    console.log('listening to port 4000');
    await connect();
    console.log('mongodb is connected');
});