import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-2">
      <Outlet />
    </div>
  );
};

export default Layout;
