const mongoose = require('mongoose');
const groupSchema = mongoose.Schema({
    message:{
        type:String
    },
    rev:{
        type:String
    },
    sender:{
        type:String
    }
})
const group = mongoose.model('group', groupSchema);
module.exports=group