import { useEffect } from "react";
import useSubjects from "../../../hooks/useSubjects";
import Loader from "../../../components/Loader";
import SubjectCard from "../../../components/SubjectCard";
import { BookOpen } from "lucide-react";
const Subjects = () => {
    const { subjects, loading, fetchSubjects } = useSubjects();

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <>
        <h2 className="mt-6 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <BookOpen size={20} />
        Predmeti
      </h2>
      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjects.map((subject, index) => (
              <SubjectCard key={subject.id} subject={subject} colorIndex={index} />
            ))}
          </div>
        )}
      </div>
        </>
    )
};

export default Subjects;