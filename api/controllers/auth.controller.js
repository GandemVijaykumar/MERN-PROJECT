const User = require("../models/user.model.js");
const bcryptjs=require('bcryptjs');
const errorhandler = require("../utils/error.js");
const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password,10);
    const newUser= new User({username,email,password:hashedpassword});
    try{
        await newUser.save();
        res.status(201).json("user sucessfully created");
    }
    catch(error){
        res.status(500).json(error.message);
    }
    next(error);
    
}

module.exports=signup;
