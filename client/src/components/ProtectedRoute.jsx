import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


export default function ProtectedRoute({ children }) {
  const { userData } = useContext(AuthContext);

  if (!userData) return <Navigate to="/login" />;
  return children;
}
