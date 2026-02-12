import { LogOut } from "lucide-react";
import Item from "./Item";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/auth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Footer = ({ isOpen }) => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await logout();
      console.log(response);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuth({});
      navigate("/auth/login");
    }
  };

  return (
    <div>
      <div className="line w-full h-px bg-slate-200"></div>
      <div
        className={`py-2
  ${isOpen ? "px-2" : "flex justify-center"}`}
      >
        <Item
          icon={<LogOut />}
          label="Odjava"
          isOpen={isOpen}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Footer;
