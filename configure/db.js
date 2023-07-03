const mongoose=require("mongoose")

const connection =mongoose.connect("mongodb+srv://shuklaji9706:arpit123@cluster0.rbespco.mongodb.net/lastmockeva")

module.exports={connection}