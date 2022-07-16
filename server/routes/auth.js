// PATH : server/routes/auth.js

import express from "express";
import mongoose from "mongoose"
import '../models/user.js'
const router = express.Router();
import bcryptjs from 'bcryptjs'
const User=mongoose.model("User");


router.get('/', (req,res)=>{
    res.send("hello from routes/auth.js")
});

router.post('/SignUp',(req,res)=>{

    const{name,email,password}=req.body;
    if(!name||!email||!password){

       return res.status(422).json({error:"Please Enter All The Details"});
    }
    
    User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
               return res.status(422).json({error:"User already Exists with this email"});
            }

            bcryptjs.hash(password,12)
            .then(hashedpassword=>{

                
            const user = new User({
                name:name,
                email:email,
                password:hashedpassword
            })
            user.save()
                .then(user=>{
                    res.json({message:"User Registered Successfully in The Database"})
                })
                .catch(err=>{
                    console.log(err)
                })

            })
        })
        .catch(err=>{
            console.log(err)
        })
});


export default router;


