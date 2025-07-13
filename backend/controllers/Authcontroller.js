const UserModel = require("../models/User");
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');

const signup = async(req,res) =>{
    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if (user){
            return res.status(409)
            .json({message:'User is already exist, you can login', success:false});
        }
        const newUser = new UserModel({name,email,password});
        newUser.password = await bcrypt.hash(password,10);
        await newUser.save();
        res.status(201).json({message:"SignUp Succesfully",
            success:true
        }) 
    }catch(err){
        res.status(500).json({message:"Internal Server error",
            success:false   
    })
    }
}


const login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        const errormsg = 'Auth failed email or password is wrong'
        if (!user){
            return res.status(403)
            .json({message: errormsg , success:false});
        }
        const isPassEqual = await bcrypt.compare(password ,user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({message: errormsg , success:false});
        }
        const jwtToken = jwt.sign(
            {email: user.email,_id:user._id},
            process.env.JWT_secret,
            {expiresIn:'24h'}
        )
        res.status(200).json({message:"login Succesfully",
            success:true,
            jwtToken,
            email,
            name:user.name
        }) 
    }catch(err){
        console.log("Login Err:",err);
        res.status(500).json({message:"Internal Server error",
            success:false   
    })
    }
}

module.exports ={
    signup,
    login
}