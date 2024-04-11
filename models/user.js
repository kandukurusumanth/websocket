const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId
    },
    groups:{
        type:[mongoose.Schema.Types.ObjectId]
    }
})
const user = mongoose.model('user', userSchema);
module.exports={
    user
}