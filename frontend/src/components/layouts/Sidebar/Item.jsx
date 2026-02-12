const Item = ({ icon, label, isOpen, active, onClick }) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
      ${
        active
          ? "bg-cyan-600 text-white"
          : "text-slate-500 hover:bg-cyan-600 hover:text-white"
      } transition`}
      onClick={onClick}
    >
      <div className="min-w-[20px]">{icon}</div>
      {isOpen && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default Item;
