import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />
      <div className="flex-1 p-3 m-4 rounded-sm overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
