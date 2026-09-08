import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/landing/Hero";
import Navbar from "../components/layout/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("")

const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()){
      newErrors.email = "Email is required";
    }else if (!/\S+@\S+\.\S+/.test(formData.email)){
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()){
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!validateForm()){
      return;
    }

    console.log("Data Submitted Successfully", formData); 

    try{
      setErrors({});
      setSuccessMessage("");
      setIsLoading(true); 
      await loginUser(formData);
      setSuccessMessage("User Logged in successfully!");
    } catch (error) {
      console.error("Error logging in user:", error);  
      setErrors({ apiError: error.response?.data?.message || "An error occurred while logging in." });
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <AuthLayout>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Sign in to continue to ResuIQ
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
          {errors.apiError && (
            <p className="text-red-500 text-sm">{errors.apiError}</p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging..." : "Log in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-violet-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
