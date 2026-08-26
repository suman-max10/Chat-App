/** @format */

import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {};

  const handelSubmit = (e) => {
    e.preventDefault();
  };

  return <div className='min-h-screen grid lg:grid-cols-2'>
    {/* {left side } */}
  </div>;
};

export default SignUpPage;
