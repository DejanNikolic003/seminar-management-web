const Input = ({ type, placeholder, icon, value, onChange }) => {
  return (
    <div
      className={`flex items-center border border-slate-200 rounded-lg mb-2 p-2`}
    >
      <div className="w-6 h-6 text-slate-500">{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="ml-2 w-full outline-none text-slate-500 text-sm"
      />
    </div>
  );
};

export default Input;
