import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { UIContext } from "../contexts/UIContext";

export default function Navbar() {
  const {userData, logoutUser } = useContext(AuthContext);
  const {hideNav} = useContext(UIContext); 
 
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        LinkSphere
      </Link>

      <div className="space-x-4">
        {!hideNav ? (
          <>
            <Link to="/create" className="text-blue-500 font-medium">
              Create Post
            </Link>
            <Link to={`/profile/${userData?._id}`} className="text-gray-700">
              My Profile
            </Link>
            <button
              onClick={logoutUser}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
