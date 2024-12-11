const mongoose = require('mongoose')
const  requestSchema=new mongoose.Schema({
    userId: {
        type:String
    },
    description: {
        type: String,
        required: true
    },
    typeofrequest: {
        type: String,
        default:'view'
    },
   status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    to:{
       type:String,
       required:true
    },
    fileId:{
        type:String,
    }
})
const Requestmodel=mongoose.model('RequestModel',requestSchema)
module.exports=Requestmodel