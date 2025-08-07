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
  const [searchHistory, setSearchHistory] = useState([]);
  const { setHideNav } = useContext(UIContext);

  // Initialize user data and search history from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedHistory = localStorage.getItem("searchHistory");
      
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Error parsing localStorage data", e);
      localStorage.removeItem("user");
      localStorage.removeItem("searchHistory");
    }
  }, []);

  // Persist user data and search history to localStorage
  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [userData, searchHistory]);

  // Add to search history
  const addToSearchHistory = (query) => {
    if (!query.trim()) return;
    
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(q => q !== query)].slice(0, 5);
      return newHistory;
    });
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const sendRegisterOtp = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        bio: formData.bio, 
        headline: formData.headline || "", // LinkedIn-like profile field
        skills: formData.skills || []     // Skills array
      });
      
      setOtpSent(true);
      setUserData(res.data.user);
      setServerMsg("OTP sent to your email.");
      Swal.fire("Success", res.data.message, "success");
    } catch (err) {
      console.error(err.response?.data?.message);
      setServerMsg(err.response?.data?.message || "Failed to send OTP");
      Swal.fire("Error", err.response?.data?.message || "Registration failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/register/verify-otp", formData);
      console.log(res.data);
      
      setUserData(res.data.user);
      setServerMsg("Registration successful!");
      setOtpSent(false);
      
      // LinkedIn-like onboarding redirect
      if (!res.data.user.headline || !res.data.user.skills?.length) {
        navigate('/login');
      } else {
        navigate('/');
      }
      
      Swal.fire("Success", "Registration Successful", "success");
    } catch (err) {
      console.error(err.response.data.message);
      setServerMsg(err.response?.data?.message || "OTP verification failed");
      Swal.fire("Error", err.response?.data?.message || "Verification failed", "error");
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
      
      setOtpSent(true);
      setUserData(response.data.user);
      setError("");
      Swal.fire("Success", response.data.message, "success");
    } catch (error) {
      console.error('Login error:', error.response?.data?.message);
      setError(error.response?.data?.message || 'Invalid email or password');
      Swal.fire("Error", error.response?.data?.message || "Login failed", "error");
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

      setUserData(response.data.user);
      setHideNav(false);
      setError("");
      
      // LinkedIn-like post-login redirect
      if (response.data.user?.headline && response.data.user?.skills?.length) {
        navigate(`/profile/${response.data.user._id}`);
      } else {
        navigate(`/profile/${response.data.user._id}`);
      }
      
      Swal.fire("Success", response.data.message, "success");
    } catch (error) {
      console.error("Login error:", error.response?.data?.message);
      setError(error.response?.data?.message || "Invalid email or otp");
      Swal.fire("Error", error.response?.data?.message || "Verification failed", "error");
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
      confirmButtonColor: "#0A66C2", // LinkedIn blue
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.get("/users/logout");
        setUserData(null);
        localStorage.removeItem("user");
        setHideNav(true);
        
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been successfully logged out!",
          timer: 1500,
          showConfirmButton: false,
        });
        
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
        handleLoginSubmit,
        searchHistory,
        addToSearchHistory,
        clearSearchHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};