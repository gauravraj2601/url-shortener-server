const mongoose= require("mongoose")

const urlSchema=mongoose.Schema({
    url:{type:String, required:true, unique:true},
    customUrl:{type:String},
    expiryDate:{type:Date},
    visits:{type:Number,default:0},
    id:{require:true, type:String}
})

const UrlModel= mongoose.model("url",urlSchema)

module.exports={UrlModel}
