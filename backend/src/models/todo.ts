import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    
    text:{
        require:true,
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

export default mongoose.model("Todos",todoSchema);