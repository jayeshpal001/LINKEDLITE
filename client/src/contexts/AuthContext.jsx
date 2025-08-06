import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axiosInstance from "../api/api";
import { UIContext } from "./UIContext";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
   const [error, setError] = useState("");
  const { setHideNav } = useContext(UIContext);
  
 useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
    localStorage.removeItem("user");
  }
}, []);


  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData)); 
    }
  }, [userData])
  
  

  const sendRegisterOtp = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log(res.data);
      setOtpSent(true);
      alert(res.data.message);
      setUserData(res.data.user)
      setServerMsg("OTP sent to your email.");

    } catch (err) {
      console.error(err.response?.data?.message);
      setServerMsg(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/register/verify-otp", formData);
      console.log(res.data.user);
      
      setServerMsg("Registration successful!");
       setUserData(res.data.user)
      alert("Registration Successful");
      setOtpSent(false); 
      navigate('/login');
    } catch (err) {
      console.error(err.response.data.message);
      
      setServerMsg(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const sendLoginOtp = async (formData) => {
  setIsLoading(true);
  try {
    const response = await axiosInstance.post('/users/login', {
     email: formData.email, 
     password: formData.password,
    });
    setOtpSent(true)
    console.log('Please enter otp: ', response.data.user);
     setUserData(response.data.user)
    alert(response.data.message);
    setError("");
  } catch (error) {
    console.error('Login error:', error.response?.data?.message);
    setError(error.response?.data?.message || 'Invalid email or password');
  } finally {
    setIsLoading(false);
  }
};

const handleLoginSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/login/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });

      console.log("Login successful:", response.data.user);
      setUserData(response.data.user)
      setHideNav(false);
      alert(response.data.message);
      navigate(`/profile/${response.data.user._id}`);
      setError("");
    } catch (error) {
      console.error("Login error:", error.response?.data?.message);
      setError(error.response?.data?.message || "Invalid email or otp");
    } finally {
      setIsLoading(false);
    }
  };

  

  const logoutUser = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      try {
      const res=  await axiosInstance.get("/users/logout");
        console.log(res.data);
        setUserData(null);
        localStorage.removeItem("user");
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been successfully logged out!",
          timer: 1500,
          showConfirmButton: false,
        });
        setHideNav(true);
        navigate("/login");
      } catch (err) {
        console.error("Logout failed:", err);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "Something went wrong. Please try again!",
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        logoutUser,
        otpSent,
        sendRegisterOtp,
        handleRegisterSubmit,
        isLoading,
        serverMsg,
        error, 
        sendLoginOtp, 
        handleLoginSubmit
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
