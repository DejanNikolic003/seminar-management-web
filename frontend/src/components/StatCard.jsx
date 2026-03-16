import { COLOR_STYLES } from "../constants/colors";
import Loader from "./Loader";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "cyan",
  loading = false,
}) => {
  return (
    <div
      className={`relative bg-white border border-slate-200 rounded-xl p-4 ${loading ? "flex justify-center" : ""} shadow-xs hover:shadow-md transition`}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center gap-4 ">
          <div
            className={`border border-slate-200 ${COLOR_STYLES[color]} rounded-full flex items-center justify-center w-12 h-12`}
          >
            <Icon size={22} className="text-white" />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
              {title}
            </p>
            <p className="text-2xl font-semibold text-slate-900">{value}</p>
          </div>

          <Icon
            size={64}
            className="absolute right-4 text-slate-200 opacity-20"
          />
        </div>
      )}
    </div>
  );
};

export default StatCard;
