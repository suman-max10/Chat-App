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

export const login = (req, res) => {

  res.send("Login page");

};

export const logout = (req, res) => {

  res.send("Logout page");
};
