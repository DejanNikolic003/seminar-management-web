import { GraduationCap, Loader } from "lucide-react";

const ButtonWithIcon = ({ children, icon, onClick, loading }) => {
  return (
    <button
      type="button"
      className={`font-medium uppercase leading- w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-2 rounded-lg transition duration-200 cursor-pointer flex items-center ${loading ? "justify-center" : "justify-between"}`}
      onClick={onClick}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {children}
          <div className="w-5 h-5 inline-block mr-2">{icon}</div>
        </>
      )}
    </button>
  );
};

export default ButtonWithIcon;
