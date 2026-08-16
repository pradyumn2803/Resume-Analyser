import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import { useState } from "react";
import { register} from "../services/authService";
import {useNavigate} from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()){
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()){
      newErrors.email = "Email is required";
    }else if (!/\S+@\S+\.\S+/.test(formData.email)){
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()){
      newErrors.password = "Password is required";
    }else if (formData.password.length < 6){
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()){
      newErrors.confirmPassword = "Confirm Password is required";
    }else if (formData.confirmPassword !== formData.password){
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!validateForm()){
      return;
    }

    console.log("Form submitted successfully", formData); 

    try{
      setErrors({});
      setSuccessMessage("");
      setIsLoading(true); 
      const data = await register(formData);
      console.log("User registered successfully:", data);
      setSuccessMessage("User registered successfully! Redirecting to login...");
      navigate("/login", { state: { message: "User registered successfully! Redirecting to login..." } });
    } catch (error) {
      console.error("Error registering user:", error);  
      setErrors({ apiError: error.response?.data?.message || "An error occurred while registering." });
    } finally {
      setIsLoading(false); 
    }
  }
  
  const handleChange = (e) => {
    setFormData((prev) =>({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  return (
    <AuthLayout>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Join ResuIQ and start improving your resume today.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input label="Full Name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange}/>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          <Input label="Email" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <Input
            label="Password"
            type="password"
            name="password" 
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"  
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          {errors.apiError && <p className="text-red-500 text-sm">{errors.apiError}</p>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
