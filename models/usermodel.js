const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
         type:String,
         required:true,
    }
});

module.exports = mongoose.model("user",userSchema);