import { User } from "lucide-react";
import { GRADIENT_COLORS } from "../constants/colors";

const SubjectCard = ({ subject, colorIndex = 0 }) => {
  const bannerColor = GRADIENT_COLORS[colorIndex % GRADIENT_COLORS.length];
  const teacherName = subject?.teacher
    ? `${subject.teacher.firstName} ${subject.teacher.lastName}`
    : "";
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-200 cursor-pointer">
      <div className={`${bannerColor} flex items-end p-3`}>
        <span className="text-white/90 text-sm font-medium truncate max-w-full">
          {subject.name}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {subject.code}
        </p>
        <div className="mt-2 flex items-center gap-2 text-slate-600">
          <User size={14} className="text-slate-400 shrink-0" />
          <span className="text-sm truncate">{teacherName}</span>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
