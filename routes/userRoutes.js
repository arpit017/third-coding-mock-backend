const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {Usermodel}=require("../models/Usermodel")
require('dotenv').config()

const userRouter=express.Router()



userRouter.get("/",async(req,res)=>{
    const users=await Usermodel.find()
    res.send(users)

})

userRouter.post("/signup",async(req,res)=>{
   const {email,password,confirm_password}=req.body
   const hash = bcrypt.hashSync(password, 3)


   const new_user=new Usermodel({
    email,
    password:hash,
    confirm_password:hash
   })
await new_user.save()
res.send("user added")

})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await Usermodel.findOne({email:email})
    if(!user){
        return res.send("Invalid_Credentials")
    }
    const hash=user.password
    const result=bcrypt.compareSync(password, hash)
    if(result){
        var token = jwt.sign({ userID:user._id }, process.env.SECRET_KEY);
        res.send({msg:"logged_in",token:token})

    }else{
        res.send("Invalid_Credentials")
    }
})

module.exports={userRouter}