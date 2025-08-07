import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  MapPinIcon ,
  PencilIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    headline: "",
    bio: "",
    skills: "",
    location: ""
  });

  const [formStep, setFormStep] = useState(1);
  const [skillsInput, setSkillsInput] = useState("");
  
  const {
    otpSent,
    isLoading,
    error,
    serverMsg,
    sendRegisterOtp,
    handleRegisterSubmit,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
  };

  const addSkill = () => {
    if (skillsInput.trim() && !formData.skills.includes(skillsInput)) {
      const newSkills = formData.skills 
        ? `${formData.skills}, ${skillsInput.trim()}`
        : skillsInput.trim();
      setFormData({ ...formData, skills: newSkills });
      setSkillsInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const skillsArray = formData.skills.split(', ').filter(skill => skill !== skillToRemove);
    setFormData({ ...formData, skills: skillsArray.join(', ') });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    await sendRegisterOtp(formData);
    setFormStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleRegisterSubmit(formData);
    if (success) {
      navigate('/login');
    }
  };

  // Professional networking illustration
  const authImage = "https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg";

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
              Join LinkedLite
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg mb-8"
            >
              The professional network for career growth
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-2 rounded-full mt-1">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Build Your Profile</h3>
                  <p className="text-blue-100">Showcase your skills and experience</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-2 rounded-full mt-1">
                  <BriefcaseIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Find Opportunities</h3>
                  <p className="text-blue-100">Connect with employers and colleagues</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-2 rounded-full mt-1">
                  <AcademicCapIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Grow Your Career</h3>
                  <p className="text-blue-100">Access learning resources and insights</p>
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
              Create your account
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500"
            >
              Start building your professional network
            </motion.p>
            
            <div className="flex justify-center my-6">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  formStep === 1 ? "bg-[#0A66C2] text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  1
                </div>
                <div className={`h-1 w-16 ${formStep >= 2 ? "bg-[#0A66C2]" : "bg-gray-300"}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  formStep === 2 ? "bg-[#0A66C2] text-white" : formStep > 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {formStep > 2 ? "✓" : "2"}
                </div>
              </div>
            </div>
          </div>

          <motion.form 
            onSubmit={formStep === 1 ? handleSendOTP : handleSubmit}
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

            {formStep === 1 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="relative group">
                  <UserIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>

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
                    disabled={isLoading}
                  />
                </div>

                <div className="relative group">
                  <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors" />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password (min 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>

                <div className="relative group">
                  <BriefcaseIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors" />
                  <input
                    name="headline"
                    type="text"
                    placeholder="Professional headline (e.g., 'Software Engineer')"
                    value={formData.headline}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>

                <div className="relative group">
                  <MapPinIcon  className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors" />
                  <input
                    name="location"
                    type="text"
                    placeholder="Location (e.g., 'San Francisco, CA')"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>

                <div className="relative group">
                  <PencilIcon className="w-5 h-5 absolute left-3 top-4 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors" />
                  <textarea
                    name="bio"
                    placeholder="Professional bio (max 250 characters)"
                    value={formData.bio}
                    onChange={handleChange}
                    maxLength={250}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all resize-none"
                    disabled={isLoading}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.bio.length}/250
                  </div>
                </div>

                <div className="relative group">
                  <AcademicCapIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors" />
                  <div className="w-full pl-10 pr-4">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Add skills (e.g., 'JavaScript, React')"
                        value={skillsInput}
                        onChange={handleSkillsChange}
                        className="w-full py-3 border border-gray-200 rounded-l-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="bg-[#0A66C2] text-white px-4 rounded-r-lg hover:bg-[#004182] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    
                    {formData.skills && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.skills.split(', ').map((skill, index) => (
                          <span 
                            key={index} 
                            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                            <button 
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-blue-600 hover:text-blue-900"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="text-center py-4">
                  <GlobeAltIcon className="w-16 h-16 text-[#0A66C2] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Verify Your Email</h3>
                  <p className="text-gray-600 mt-2">
                    We've sent a 6-digit verification code to <br />
                    <span className="font-medium">{formData.email}</span>
                  </p>
                </div>
                
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
                    className="text-[#0A66C2] hover:underline ml-1"
                  >
                    Resend OTP
                  </button>
                </div>
              </motion.div>
            )}

            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="terms"
                required
                disabled={isLoading}
                className="h-4 w-4 text-[#0A66C2] rounded focus:ring-[#0A66C2] border-gray-300"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-[#0A66C2] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#0A66C2] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {formStep === 1 ? (
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
                  {isLoading ? "Sending OTP..." : "Continue to Verification"}
                </motion.button>
              ) : (
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
                  {isLoading ? "Completing registration..." : "Complete Registration"}
                </motion.button>
              )}
            </motion.div>
          </motion.form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Already on LinkedLite?{" "}
              <Link
                to="/login"
                className="text-[#0A66C2] font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}