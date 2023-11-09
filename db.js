const mongoose= require("mongoose")


const connection = mongoose.connect("mongodb+srv://gaurav:gauravraj@cluster0.390kn1i.mongodb.net/URL_Shortener?retryWrites=true&w=majority")


module.exports={connection}