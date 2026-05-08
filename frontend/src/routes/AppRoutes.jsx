import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import MainLayout from "../components/layouts/MainLayout.jsx";

const AppRoutes = () => {

    return (
        <Routes>
            <Route
                path="/auth/login"
                element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                }
            />

            <Route
                path="/auth/register"
                element={
                    <GuestRoute>
                        <Register />
                    </GuestRoute>
                }
            />
{/* 
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route> */}
            <Route element={<MainLayout />}>
                <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
                />
            </Route>

        </Routes>
    );
};

export default AppRoutes;