/** @format */
import User from "../models/user.model.js";
export const signup = async (req, res) => {
  const {fullName,email,password}=req.body;
  
  try{
    // hash the password
    if(password.length<6){
      return res.status(400).json({message:"Password must be at least 6 characters long"});
    }
    const user = await User.findOne({email});
      if(user){
        return res.status(400).json({message:"User Email already exists"});
      }
  }catch(error){

  
}
};

export const login = (req, res) => {

  res.send("Login page");

};

export const logout = (req, res) => {

  res.send("Logout page");
};
