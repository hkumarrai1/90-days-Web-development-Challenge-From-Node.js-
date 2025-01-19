import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("User not authenticated. Redirecting to /login");
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log(
      `User role (${user.role}) not allowed. Redirecting to /dashboard`
    );
    return <Navigate to="/dashboard" />;
  }

  console.log("User authenticated and role allowed. Rendering children.");
  return <Outlet />;
};

export default ProtectedRoute;
