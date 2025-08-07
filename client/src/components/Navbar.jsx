import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, useEffect, useRef } from "react";
import { UIContext } from "../contexts/UIContext";
import { 
  FaHome, 
  FaUserFriends, 
  FaBell, 
  FaBriefcase, 
  FaSearch, 
  FaUser, 
  FaPlus, 
  FaSignOutAlt,
  FaEnvelope,
  FaComments,
  FaCog,
  FaBookmark,
  FaGlobe
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { RiEarthFill } from "react-icons/ri";
import SearchResults from "./SearchResults";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { userData, logoutUser, searchHistory, addToSearchHistory } = useContext(AuthContext);
  const { hideNav } = useContext(UIContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationCount] = useState(3); // Mock data
  const [messagesCount] = useState(2); // Mock data
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search results and profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`sticky top-0 z-50 px-4 py-2 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md border-b border-gray-200" 
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo & Search */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="text-2xl font-bold text-[#0A66C2] hover:opacity-90 transition-opacity"
          >
            LINKEDLITE
          </Link>
          
          {/* Search Bar */}
          <div className="relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearch}>
              <div className="flex items-center bg-[#EDF3F8] hover:bg-[#e1e9f1] transition-colors rounded-md px-3 py-1.5 w-60">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none w-full placeholder-gray-500"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                />
              </div>
            </form>
            
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <SearchResults 
                    query={searchQuery} 
                    history={searchHistory} 
                    onSelect={() => setShowSearchResults(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Middle: Navigation Icons (Visible when logged in) */}
        {!hideNav && (
          <div className="flex space-x-1 md:space-x-4 lg:space-x-6">
            <NavIcon 
              icon={<FaHome size={20} />} 
              text="Home" 
              active={isActive('/')}
              onClick={() => navigate("/")} 
            />
            <NavIcon 
              icon={<FaUserFriends size={20} />} 
              text="Network" 
              active={location.pathname.includes('/network')}
              onClick={() => navigate("/network")} 
            />
            <NavIcon 
              icon={<FaBriefcase size={20} />} 
              text="Jobs" 
              active={location.pathname.includes('/jobs')}
              onClick={() => navigate("/jobs")} 
            />
            <NavIcon 
              icon={
                <div className="relative">
                  <FaBell size={20} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {notificationCount}
                    </span>
                  )}
                </div>
              } 
              text="Notifications" 
              onClick={() => navigate("/notifications")} 
            />
            <NavIcon 
              icon={
                <div className="relative">
                  <FaComments size={20} />
                  {messagesCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {messagesCount}
                    </span>
                  )}
                </div>
              } 
              text="Messages" 
              onClick={() => navigate("/messages")} 
            />
          </div>
        )}

        {/* Right: Auth/Profile Controls */}
        <div className="flex items-center space-x-4">
          {!hideNav ? (
            <>
              {/* Create Post Button */}
              <div className="relative group">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 text-gray-600 hover:text-[#0A66C2] transition-colors"
                  onClick={() => navigate("/create")}
                >
                  <div className="bg-[#0A66C2] text-white p-1 rounded-sm">
                    <FaPlus size={14} />
                  </div>
                  <span className="hidden md:inline font-medium">Create</span>
                </motion.button>
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1"
                  onClick={toggleProfileMenu}
                >
                  {userData?.avatar ? (
                    <img 
                      src={userData.avatar} 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                      alt={userData.name} 
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
                      <FaUser className="text-gray-600" />
                    </div>
                  )}
                  <span className="hidden md:inline text-sm font-medium text-gray-700">Me</span>
                </motion.button>
                
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-200"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-start space-x-3">
                          {userData?.avatar ? (
                            <img 
                              src={userData.avatar} 
                              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                              alt={userData.name} 
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
                              <FaUser className="text-gray-600 text-xl" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{userData?.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[150px]">
                              {userData?.headline || "LinkSphere Member"}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/profile/${userData?._id}`} 
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <FaUser className="mr-3 text-gray-500" />
                        <span>View Profile</span>
                      </Link>
                      
                      <Link 
                        to="/saved" 
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <FaBookmark className="mr-3 text-gray-500" />
                        <span>Saved Items</span>
                      </Link>
                      
                      <Link 
                        to="/settings" 
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <FaCog className="mr-3 text-gray-500" />
                        <span>Settings</span>
                      </Link>
                      
                      <Link 
                        to="/language" 
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <FaGlobe className="mr-3 text-gray-500" />
                        <span>Language</span>
                      </Link>
                      
                      <div className="border-t border-gray-100 mt-1">
                        <button
                          onClick={logoutUser}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <FaSignOutAlt className="mr-3 text-gray-500" /> 
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex space-x-3">
              <Link 
                to="/login" 
                className="text-[#0A66C2] font-medium px-4 py-1.5 rounded-full hover:bg-[#E2F0FE] transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-[#0A66C2] hover:bg-[#004182] text-white font-medium px-4 py-1.5 rounded-full transition-colors shadow-md"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Reusable Nav Icon Component
function NavIcon({ icon, text, active = false, onClick }) {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center p-2 group relative`}
    >
      <div className={`p-1 rounded-md transition-colors ${
        active 
          ? "text-[#0A66C2]" 
          : "text-gray-500 group-hover:text-[#0A66C2]"
      }`}>
        {icon}
      </div>
      <span className={`text-xs mt-1 transition-colors ${
        active 
          ? "text-[#0A66C2] font-medium" 
          : "text-gray-500 group-hover:text-[#0A66C2]"
      }`}>
        {text}
      </span>
      
      {active && (
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0A66C2] rounded-t"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}