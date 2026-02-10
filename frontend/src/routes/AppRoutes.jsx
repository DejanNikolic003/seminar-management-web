import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
        </Routes>
    )
};

export default AppRoutes;