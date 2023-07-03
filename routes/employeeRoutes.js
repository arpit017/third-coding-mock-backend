const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {Employeemodel}=require("../models/Employeemodel")

const employeeRouter=express.Router()



employeeRouter.get("/",async(req,res)=>{
    // const userID=req.userID

    // const query=req.query
    // query.userID=userID
    const {firstname}=req.query
    if(firstname){
        const employees=await Employeemodel.findOne({firstname:firstname})
        return res.send({msg:"success",employees:employees})
    }
    
    const{page}=req.query
    const spage=5
    
    

        const employees=await Employeemodel.find().skip( page > 0 ? ( ( page - 1 ) * spage ) : 0 ).limit(5)
    
    
    res.send({msg:"success",employees:employees})
})

employeeRouter.get("/:sort",async(req,res)=>{
    // const userID=req.userID

    const{page}=req.query
    const spage=5
    const {sort}=req.params
    
    console.log(sort)
        if(sort==1){
            const employees=await Employeemodel.find().skip( page > 0 ? ( ( page - 1 ) * spage ) : 0 ).limit(5).sort({salary:1})
            res.send({msg:"success",employees:employees})
        }else if(sort==-1){
            const employees=await Employeemodel.find().skip( page > 0 ? ( ( page - 1 ) * spage ) : 0 ).limit(5).sort({salary:-1})
            res.send({msg:"success",employees:employees})

        }
    
})



employeeRouter.post("/create",async(req,res)=>{
const{firstname,lastname,email,department,salary}=req.body
const userID=req.userID
const new_employee=new Employeemodel({
    firstname,
    lastname,
    email,
    department,
    salary,
    userID:userID
})

await new_employee.save()
res.send("employee added")

   
})

employeeRouter.put("/edit/:employeeID",async(req,res)=>{
    const updates=req.body
    const userID=req.userID
    const {employeeID}=req.params
    const result=await Employeemodel.findOneAndUpdate({_id:employeeID,userID:userID},updates)
    console.log(result)
    if(result){
        res.send("edited employee")
    }else{
        res.send("something went wrong in editing")
    }
})

employeeRouter.delete("/remove/:employeeID",async(req,res)=>{
    const {employeeID}=req.params
    const userID=req.userID
    const result=await Employeemodel.findOneAndDelete({_id:employeeID,userID:userID})
    console.log(result)
    if(result){
        res.send("edited deleted")
    }else{
        res.send("something went wrong in deleting")
    }
   
    
})




module.exports={employeeRouter}