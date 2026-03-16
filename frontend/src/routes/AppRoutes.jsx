import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth">
                <Route path="login" element={<Login  />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;