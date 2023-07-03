const mongoose=require("mongoose")

const employeeSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    department:String,
    salary:Number,
    userID:String
    
})

const Employeemodel=mongoose.model("employee",employeeSchema)

module.exports={Employeemodel}