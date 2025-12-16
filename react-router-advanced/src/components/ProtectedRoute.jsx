// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
