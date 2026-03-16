const Item = ({ icon, label, isOpen, active, onClick = () => {} }) => {
  return (
    <div className={`py-2 ${isOpen ? "px-2" : "flex justify-center" }`}>
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
        ${
          active
            ? "bg-cyan-500 text-white"
            : "text-slate-500 hover:bg-cyan-500 hover:text-white"
        } transition`}
        onClick={onClick}
      >
        <div className="min-w-[20px]">{icon}</div>
        {isOpen && <span className="text-sm">{label}</span>}
      </div>
    </div>
  );
};

export default Item;
