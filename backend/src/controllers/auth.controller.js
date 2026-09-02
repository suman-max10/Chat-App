import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const {fullName,email,password}=req.body;
  
  try{
    // i have used bcrypt for hashing the password before saving it to the database. This is a good practice for security reasons.
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
  try{
    const {profilePic}=req.body;
     const userId = req.user._id;

     if(!profilePic){
      return res.status(400).json({message:"Please provide a profile picture"});
     }


     const cloudinaryResult = await cloudinary.uploader.upload(profilePic)
     const updatedUser = await User.findByIdAndUpdate(
       userId,
       {profilePic: cloudinaryResult.secure_url},
       {new:true, runValidators:true}
     ).select("-password");

     res.status(200).json(updatedUser); 
  }catch(error){
    console.log("error in updateProfile controller",error.message);
    res.status(500).json({message:"Server error"});

  }
}


export const checkAuth = async (req, res) => {
  try{
   res.status(200).json(req.user);

  }catch(error){
    console.log("error in checkAuth controller",error.message);
    res.status(500).json({message:"Server error"});
  }
}
