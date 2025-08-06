import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  LockClosedIcon,
  EnvelopeIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../contexts/AuthContext";


function Login() {
  const {sendLoginOtp, handleLoginSubmit, otpSent, isLoading, error} = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  // Using free online illustration from Freepik
  const authImage =
    "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=826&t=st=1712923440~exp=1712924040~hmac=6c4d7bdee5a5c06d7c52c3a4f6a7f8a4a0a3d4a8b0d3d7e4e4d0d4a4a3a4d4";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoginSubmit(formData); 
    
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    sendLoginOtp(formData); 
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:block relative w-1/2 bg-gradient-to-br from-blue-100 to-indigo-100">
          <img
            src={authImage}
            alt="Login Illustration"
            className="w-full h-full object-contain p-8"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-6">
            <div className="text-white space-y-3">
              <div className="flex items-center gap-3">
                <LockClosedIcon className="w-6 h-6 text-green-300" />
                <span className="font-medium">256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <AcademicCapIcon className="w-6 h-6 text-green-300" />
                <span className="font-medium">Access 1000+ Expert Mentors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome to Shopfinity
            </h1>
            <p className="text-gray-500">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>

              <div className="relative group">
                <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>

              {otpSent && (
                <div className="relative group">
                  <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    name="otp"
                    type="text"
                    placeholder="OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {otpSent ? (
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg"
                }`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg"
                }`}
              >
                {isLoading ? "Otp Sending..." : "Send OTP"}
              </button>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              New to CodePath?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Create free account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
