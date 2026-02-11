import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const GuestRoute = () => {
  const { auth } = useAuth();

  if (auth?.user && auth?.accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
