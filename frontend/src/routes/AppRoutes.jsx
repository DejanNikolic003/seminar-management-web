import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Subject from "../pages/subject/Subject.jsx";
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
            <Route element={<MainLayout />}>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/subjects/:id" element={<Subject />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;