import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { auth, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!auth?.user) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />;
    }

    return <Outlet />
};

export default ProtectedRoute;