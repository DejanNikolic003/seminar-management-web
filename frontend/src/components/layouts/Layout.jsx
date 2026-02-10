import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 px-2 py-4">
      <Outlet />
    </div>
  );
};

export default Layout;
