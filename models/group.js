const mongoose = require('mongoose');
const groupSchema = mongoose.Schema({
    
    name:{
        type:String
    },
    info:{
        type:Array,
        default:[]
    }
})
const group = mongoose.model('group', groupSchema);
module.exports=group