import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
  UserIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const {
    sendLoginOtp,
    handleLoginSubmit,
    otpSent,
    isLoading,
    error,
    serverMsg
  } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  // Professional workspace illustration
  const authImage = "https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4581.jpg?w=826&t=st=1712923440~exp=1712924040~hmac=6c4d7bdee5a5c06d7c52c3a4f6a7f8a4a0a3d4a8b0d3d7e4e4d0d4a4a3a4d4";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLoginSubmit(formData);
    // Redirect to profile if already has headline/skills
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    await sendLoginOtp(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
      >
        {/* Left Image Section */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#0A66C2] to-[#004182] p-10">
          <div className="text-white">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-4"
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg mb-8"
            >
              Continue your professional journey with LinkedLite
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-2 rounded-full mt-1">
                  <BriefcaseIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Career Opportunities</h3>
                  <p className="text-blue-100">Discover new roles and career paths</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-2 rounded-full mt-1">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Professional Network</h3>
                  <p className="text-blue-100">Connect with colleagues and industry leaders</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-2 rounded-full mt-1">
                  <LockClosedIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure Access</h3>
                  <p className="text-blue-100">Protected with OTP authentication</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            src={authImage}
            alt="Professional Networking"
            className="w-full object-contain"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              Sign in to LinkedLite
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500"
            >
              Grow your professional network
            </motion.p>
            
            <div className="flex justify-center my-6">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  !otpSent ? "bg-[#0A66C2] text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  1
                </div>
                <div className={`h-1 w-16 ${otpSent ? "bg-[#0A66C2]" : "bg-gray-300"}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  otpSent ? "bg-[#0A66C2] text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  2
                </div>
              </div>
            </div>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {(error || serverMsg) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`p-3 rounded-lg border ${
                  error ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"
                }`}
              >
                <p className={`text-sm font-medium ${
                  error ? "text-red-600" : "text-blue-600"
                }`}>
                  {error || serverMsg}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="relative group">
                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors" />
                <input
                  name="email"
                  type="email"
                  placeholder="Work email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                  disabled={isLoading || otpSent}
                />
              </div>

              {!otpSent && (
                <div className="relative group">
                  <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors" />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>
              )}

              {otpSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="relative group">
                    <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors" />
                    <input
                      name="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      required
                      maxLength={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all text-center text-xl tracking-widest"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="text-center text-sm text-gray-500 mt-6">
                    Didn't receive the code? 
                    <button 
                      type="button"
                      onClick={handleSendOTP}
                      className="text-[#0A66C2] hover:underline ml-1 flex items-center justify-center gap-1"
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                      Resend OTP
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#0A66C2] rounded focus:ring-[#0A66C2] border-gray-300"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#0A66C2] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {otpSent ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    isLoading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    isLoading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {isLoading ? "Sending OTP..." : "Continue with OTP"}
                </motion.button>
              )}
            </motion.div>
          </motion.form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              New to LinkedLite?{" "}
              <Link
                to="/register"
                className="text-[#0A66C2] font-medium hover:underline"
              >
                Join now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;