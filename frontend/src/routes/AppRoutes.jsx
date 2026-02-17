import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../components/layouts/Layout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import useAuth from "../hooks/useAuth";
import FullScreenLoader from "../components/FullScreenLoader";
import MainLayout from "../components/layouts/MainLayout";
import Dashboard from "../pages/dashboard/Dashboard";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <Routes>
      <Route path="/auth" element={<Layout />}>
        <Route element={<GuestRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
