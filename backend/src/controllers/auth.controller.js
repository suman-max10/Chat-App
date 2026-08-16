/** @format */

export const signup = (req, res) => {
  const {fullName,email,password}=req.body;
  
  try{
    // hash the password

  }catch(error){

  
}
};

export const login = (req, res) => {

  res.send("Login page");

};

export const logout = (req, res) => {

  res.send("Logout page");
};
