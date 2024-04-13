const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connect = require('./models/connected')
const app = express();
const Group = require('./models/group')
const user = require('./models/user')
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
app.set('view engine', 'ejs');
io.on("connection", (socket) => {
    
    socket.on('create group', async (msg)=>{
        const group= await Group.create({
            name:msg.groupname
        })
    })
    socket.on('joining room', async (data)=>{
        socket.join(data.msg)
    })
    
    socket.on('new_msg', async (data)=>{
        io.to(data.roomid).emit('joined room', {msg:data.msg, user:data.user})
        
        let gro=await Group.findByIdAndUpdate(
            data.roomid,
            { $push: { info:data.user + '-' + data.msg} }, {new:true}
        )
        
        
    })

    // io.to(a).emit('joined room', {ok:'joined the room'})


    
   
});
app.get('/:roomid/:user' ,  async (req,res) =>{
    const group = await Group.findById(req.params.roomid);
    const arrayofmessage = group.info
   
    res.render('index', {roomid:req.params.roomid , user:req.params.user, arrayinfo:arrayofmessage});
   
   

})
app.get('/creategroup', (req,res)=>{
    res.render('group' , {groupname:Group})
    
})

httpServer.listen(6001, async ()=>{
    console.log('listening to port 6001');
    await connect();
    console.log('mongodb is connected');
});