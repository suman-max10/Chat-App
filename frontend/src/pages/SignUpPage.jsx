import {useState} from "react";
import { useAuthStore } from "../stores/useAuthStore";

const SignUpPage = () => {
   const [showPassword, setShowPassword] = useState(false);
   const[formData,setFormData] = useState({
    fullName: "",
    email: "",
    password : "",
   });

   const {signup,isSigningUp} = useAuthStore();

  return <div>SignUpPage</div>;
};

export default SignUpPage;
