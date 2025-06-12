const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.signUp = async (req,res)=>{
    try {
        //fetch data
         console.log(req.body); 
       const { name, email, password, phone } = req.body;

        //if user already exit
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exits",
            })
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password,10);

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error in hashing pasword",
            })
        }

        //create entry for user
        const user = await User.create({
            name,email,password:hashedPassword,phone
        })

        return res.status(200).json({
            success:true,
            message:"user created successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user cannot be registered,please try again later"
        })
        
    }
}

exports.login = async(req,res)=>{
    try {
        //fetch data
        const{email,password} = req.body;

          
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully"
            })
        }
        //check user exist or not
        let user = await User.findOne({email});

        //if not exist
        if(!user){
            return res.status(401).json({
                status:false,
                message:"Please SignUp First",
            })
        }
       
        //payload matlab to tum exact conent use krna chate ho token ke ander
        const payload = {
            email:user.email,
            id:user._id,
            phone:user.phone,
        };
        //validate password and generate a JWT Token
        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn:"2h",
                }
            )
            
            user = user.toObject();//user ko object me convert kra hai explicitly
            //user me nyi field bna di token ki usme token send kr diya
            user.token = token;
            //agar hmne response me password bhi send kr diya to hacker ko email and pass dono mil jaynge
            //user ke object me se pass htaya hai database me se nhi
            user.password = undefined;
            //isse passowrd undefined ho jata hai but password key tbhi bhi rhti hai
            //so best practice hai ki password key ko bhi hta do
           
            // const { password, ...userWithoutPassword } = user.toObject();
            // userWithoutPassword.token = token;

            //create cookie
            //3 chize pass krni pdti hai => 1- cookie ka naam ,2- cookie ka data, 3- kuch options
           const options = {
             expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              httpOnly: true,
               secure: true,         // true in production with HTTPS
               sameSite: "None",       // or "None" if using cross-origin (e.g., different domain or port)
             };

           res.cookie("token", token, options).status(200).json({
               success: true,
              token,
            //   user : userWithoutPassword,
            user,
             message: "User logged in successfully",
            });


            
        }else{
            return res.status(403).json({
                success:false,
                message:"Password Incorrect"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure",
        })
        
    }
}