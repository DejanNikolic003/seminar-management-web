const ButtonWithIcon = ({ children, icon}) => {
    return (
        <button type="button" className="font-medium uppercase leading- w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-2 rounded-lg transition duration-200 cursor-pointer flex items-center justify-between">
            {children}
            <div className="w-5 h-5 inline-block mr-2">
                {icon}
            </div>
        </button>
    )
};

export default ButtonWithIcon