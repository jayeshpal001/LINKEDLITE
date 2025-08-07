import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../contexts/PostContext";
import { motion } from "framer-motion";
import { 
  PencilIcon, 
  PhotoIcon, 
  VideoCameraIcon, 
  DocumentIcon, 
  XMarkIcon 
} from "@heroicons/react/24/outline";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const { createPost } = useContext(PostContext);
  const navigate = useNavigate();

  const MAX_CHARS = 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !mediaFile) return;
    
    setIsLoading(true);
    try {
      await createPost(content, mediaFile);
      navigate("/");
    } catch (error) {
      alert("Failed to create post");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMediaFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeMedia = () => {
    setMediaPreview(null);
    setMediaFile(null);
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setContent(value);
      setCharCount(value.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A66C2] to-[#004182] p-5 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <PencilIcon className="w-6 h-6" />
                Create a Post
              </h2>
              <button 
                onClick={() => navigate("/")}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <p className="mt-1 opacity-80">Share your thoughts with your network</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <textarea
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all resize-none"
                placeholder="What would you like to talk about?"
                value={content}
                onChange={handleContentChange}
              />
              <div className="flex justify-between mt-2">
                <div className="text-sm text-gray-500">
                  {charCount}/{MAX_CHARS} characters
                </div>
                <div className="text-sm text-gray-500">
                  {charCount > 0 && (
                    <span className={charCount > MAX_CHARS * 0.8 ? "text-orange-500" : "text-green-500"}>
                      {Math.ceil(charCount / (MAX_CHARS / 100))}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Media Preview */}
            {mediaPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="relative mb-6 rounded-lg overflow-hidden"
              >
                <div className="absolute top-3 right-3 bg-black/50 rounded-full p-1.5 z-10">
                  <button 
                    type="button"
                    onClick={removeMedia}
                    className="text-white hover:text-gray-200"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                {mediaFile.type.startsWith("image/") ? (
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center">
                    <DocumentIcon className="w-16 h-16 text-gray-400" />
                    <p className="mt-2 text-gray-500 font-medium">{mediaFile.name}</p>
                    <p className="text-sm text-gray-400">
                      {Math.round(mediaFile.size / 1024)} KB
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Media Options */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 pb-2">
              <div className="flex gap-3">
                <label className="cursor-pointer text-gray-500 hover:text-[#0A66C2] transition-colors">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleMediaChange}
                  />
                  <div className="flex flex-col items-center">
                    <PhotoIcon className="w-8 h-8" />
                    <span className="text-xs mt-1">Photo</span>
                  </div>
                </label>
                
                <label className="cursor-pointer text-gray-500 hover:text-[#0A66C2] transition-colors">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="video/*" 
                    onChange={handleMediaChange}
                  />
                  <div className="flex flex-col items-center">
                    <VideoCameraIcon className="w-8 h-8" />
                    <span className="text-xs mt-1">Video</span>
                  </div>
                </label>
                
                <label className="cursor-pointer text-gray-500 hover:text-[#0A66C2] transition-colors">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.txt" 
                    onChange={handleMediaChange}
                  />
                  <div className="flex flex-col items-center">
                    <DocumentIcon className="w-8 h-8" />
                    <span className="text-xs mt-1">Document</span>
                  </div>
                </label>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading || (!content.trim() && !mediaFile)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  isLoading || (!content.trim() && !mediaFile)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md hover:shadow-lg"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </span>
                ) : (
                  "Post"
                )}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
        >
          <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0A66C2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Posting Tips
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              <span>Share industry insights and trends</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              <span>Ask thoughtful questions to engage your network</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              <span>Celebrate achievements and milestones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              <span>Share valuable resources and articles</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}