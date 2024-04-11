const mongoose = require('mongoose');
const connect = async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatapp',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
    } catch (error) {
        
        console.log(error);
        throw error;
    }
}
module.exports=connect;