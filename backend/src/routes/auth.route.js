import express from "express";  


const router = express.Router();    

router.post("/signup", (req, res) => {
  res.send("Signup page");
}); 

router.post("/login", (req, res) => {
  res.send("Login page");
}); 

router.post("/logout", (req, res) => {
  res.send("Logout page");
}); 
export default router;  