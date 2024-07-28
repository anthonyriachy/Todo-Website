import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    userId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        required:true,
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
 
})

export default mongoose.model("Todo",todoSchema);