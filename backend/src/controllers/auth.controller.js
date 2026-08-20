import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
  const {fullName,email,password}=req.body;
  
  try{
    // hash the password
    if(!fullName || !email || !password){ 
      return res.status(400).json({message:"Please fill all the fields"});
    }
    if(password.length<6){
      return res.status(400).json({message:"Password must be at least 6 characters long"});
    }
    const user = await User.findOne({email});
      if(user){
        return res.status(400).json({message:"User Email already exists"});


      }
      const salt = await bcrypt.genSalt(10);  
      const hashedPassword = await bcrypt.hash(password, salt);

      const   newUser = new User({
        fullname: fullName,
        email,
        password:hashedPassword
      })
      if(newUser){
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email, 
          profilePic: newUser.profilePic,
        });
        
      }else{
         res.status(400).json({message:"Invalid user data"});

      }
  }catch(error){
    console.log("error in signup controller",error.message);
    res.status(500).json({message:"Server error"}); 

  
}
};

export const login = async (req, res) => {
  const {email,password}=req.body;  
  try{
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(400).json({message:"Invalid email or password"});
    } 


    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email, 
      profilePic: user.profilePic,
    });

  }catch(error){
    console.log("error in login controller",error.message);
    res.status(500).json({message:"Server error"});  
  }
};

export const logout = async (req, res) => {
  try{
  res.cookie("jwt","",{maxAge:0});
  res.status(200).json({message:"Logged out successfully"});
 }catch(error){
  console.log("error in logout controller",error.message);
  res.status(500).json({message:"Server error"});  
 }  
};


export const updateProfile = async (req, res) => {
  
}
