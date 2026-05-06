import { Navigate } from "react-router-dom";
// import  from "../hooks/useAuth.jsx";
import useAuth from "../hooks/useAuth";

const GuestRoute = ({ children }) => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (auth?.user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;