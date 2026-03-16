import { GraduationCap } from "lucide-react";

const FullScreenLoader = () => {
  return (
    <div className="flex-col w-full flex items-center justify-center h-screen">
      <div className="w-22 h-22 border-2 text-cyan-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-cyan-400 rounded-full">
        <GraduationCap className="animate-ping" />
      </div>
    </div>
  );
};

export default FullScreenLoader;
