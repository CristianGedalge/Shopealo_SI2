import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "./Spinner";

export const ProtectdRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useContext(AuthContext);
  const location = useLocation();

  if (isAuthenticated === null || userRole === null) return <Spinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};
