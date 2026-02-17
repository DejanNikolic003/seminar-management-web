import {
  ChevronsLeftRight,
  GraduationCap,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import Item from "./Item";
import Footer from "./Footer";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <aside
      className={`${isOpen ? "w-64" : "w-18"} relative bg-white border-r border-slate-200 h-screen transition-all duration-300 flex flex-col shadow-xs`}
    >
      <div className="flex items-center justify-between px-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
    absolute top-3 -right-3
    w-6 h-6 rounded-full
    bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200
    flex items-center justify-center
    text-gray-400 hover:text-cyan-500
    hover:bg-cyan-500
    transition cursor-pointer
  `}
        >
          <ChevronsLeftRight size={16} />
        </button>
      </div>

      <div className="flex flex-col justify-center items-center py-4 gap-2">
        <div className="border border-slate-200 bg-cyan-500 rounded-full flex items-center justify-center p-2">
          <GraduationCap size={isOpen ? 28 : 18} className="text-white" />
        </div>
        <p
          className={`text-center text-slate-500 text-sm leading-relaxed ${!isOpen ? "hidden" : ""}`}
        >
          Upravljanje seminarskim radovima
        </p>
      </div>
      <div className="line w-full h-px bg-slate-200"></div>
      <div className="border-slate-200 flex-1 flex flex-col justify-between">
        <nav>
          <NavLink to="/">
            {({ isActive }) => (
              <Item 
                icon={<Home />}
                label="Početna"
                isOpen={isOpen}
                active={isActive}
              />
            )}
          </NavLink>
        </nav>

        <Footer isOpen={isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
