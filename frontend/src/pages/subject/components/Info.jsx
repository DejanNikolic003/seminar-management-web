import { User } from "lucide-react";

const Info = ({ name, code, professor }) => {
    return (
       <div className="flex items-center justify-between mb-2">
        <div className="flex items-baseline">
        <h2 className="font-semibold text-slate-800 leading-none">{name}</h2>
        <p className="text-xs font-light text-slate-500 uppercase tracking-wider bg-cyan-500 p-1 rounded ml-4 text-white">
            {code}
        </p>
        </div>
          <div className="flex items-center gap-2 text-slate-600">
            <User size={14} className="text-slate-400 shrink-0" />
            <span className="text-sm truncate">{professor}</span>
          </div>
        </div>  
    );
};

export default Info;