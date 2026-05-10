import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const TopicsList = ({
    topics,
    seminarsByTopicId,
    isProfessorOrAdmin,
    isStudent,
    auth,
    actionLoadingTopicId,
    subjectId,
    onEditTopic,
    onDeleteTopic,
    onReserveTopic,
}) => {
    if (topics.length === 0) {
        return (
            <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                Trenutno nema dostupnih tema.
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {topics.map((topic) => {
                const occupiedSeminar = seminarsByTopicId[topic.id];
                const isOccupied = !!occupiedSeminar;
                const reservedByMe = occupiedSeminar?.user_id === auth?.user?.id;

                return (
                    <div key={topic.id} className="rounded-lg border border-slate-200 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h4 className="font-medium text-slate-800">{topic.name}</h4>
                                {topic.description && (
                                    <p className="mt-1 text-sm text-slate-600">{topic.description}</p>
                                )}
                                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                                    {isOccupied
                                        ? "Zauzeta"
                                        : "Slobodna"}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    to={`/subjects/${subjectId}/topics/${topic.id}`}
                                    className="rounded-md border border-cyan-200 px-2 py-1 text-xs text-cyan-700 hover:bg-cyan-50"
                                >
                                    Otvori
                                </Link>

                                {isProfessorOrAdmin && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => onEditTopic(topic)}
                                            className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                                        >
                                            <Pencil size={14} />
                                            Izmeni
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDeleteTopic(topic.id)}
                                            disabled={actionLoadingTopicId === topic.id}
                                            className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-60"
                                        >
                                            <Trash2 size={14} />
                                            Obriši
                                        </button>
                                    </>
                                )}

                                {isStudent && (
                                    <button
                                        type="button"
                                        onClick={() => onReserveTopic(topic.id)}
                                        disabled={isOccupied || actionLoadingTopicId === topic.id}
                                        className="rounded-md bg-cyan-500 px-3 py-1 text-xs font-medium text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                                    >
                                        Rezerviši
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TopicsList;
