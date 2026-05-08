import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSubjects from "../../hooks/useSubjects";
import Info from "./components/Info";
import Divider from "../../components/Divider";
import ButtonWithIcon from "../../components/ButtonWithIcon";
import Input from "../../components/Input";
import Alert from "../../components/Alert";
import useAuth from "../../hooks/useAuth";
import { BookOpenText, Mail, Pencil, Plus, Trash2, X } from "lucide-react";

const Subject = () => {
    const { id } = useParams();
    const {
        fetchSubject,
        enrollStudentByEmail,
        fetchTopicsBySubject,
        createTopic,
        updateTopic,
        deleteTopic,
        reserveTopic,
        fetchSeminarsBySubject,
    } = useSubjects();
    const { hasRole, auth } = useAuth();
    const [subject, setSubject] = useState(null); 
    const [topics, setTopics] = useState([]);
    const [seminars, setSeminars] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [enrollLoading, setEnrollLoading] = useState(false);

    const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
    const [editingTopicId, setEditingTopicId] = useState(null);
    const [topicName, setTopicName] = useState("");
    const [topicDescription, setTopicDescription] = useState("");
    const [topicLoading, setTopicLoading] = useState(false);
    const [actionLoadingTopicId, setActionLoadingTopicId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
       const loadSubject = async () => {
        setPageLoading(true);
        try {
            const [subjectResult, topicsResult, seminarsResult] = await Promise.all([
                fetchSubject(id),
                fetchTopicsBySubject(id),
                fetchSeminarsBySubject(id),
            ]);

            setSubject(subjectResult);
            setTopics(topicsResult);
            setSeminars(seminarsResult);
        } catch (error) {
            setError(error.message);
        } finally {
            setPageLoading(false);
        }
       };

       loadSubject();
    }, [id]);

    const isProfessorOrAdmin = hasRole("PROFESSOR") || hasRole("ADMIN");
    const isStudent = hasRole("STUDENT");

    const seminarsByTopicId = seminars.reduce((acc, seminar) => {
        acc[seminar.topic_id] = seminar;
        return acc;
    }, {});

    const closeStudentModal = () => {
        setIsStudentModalOpen(false);
        setEmail("");
        setError("");
        setSuccess("");
    };

    const handleEnrollStudent = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Email adresa je obavezna.");
            return;
        }

        setEnrollLoading(true);
        try {
            const response = await enrollStudentByEmail(id, email);
            setSuccess(response.message || "Student je uspešno dodat u učionicu.");
            setEmail("");
        } catch (err) {
            setError(err.message);
        } finally {
            setEnrollLoading(false);
        }
    };

    const openCreateTopicModal = () => {
        setEditingTopicId(null);
        setTopicName("");
        setTopicDescription("");
        setError("");
        setSuccess("");
        setIsTopicModalOpen(true);
    };

    const openEditTopicModal = (topic) => {
        setEditingTopicId(topic.id);
        setTopicName(topic.name);
        setTopicDescription(topic.description || "");
        setError("");
        setSuccess("");
        setIsTopicModalOpen(true);
    };

    const closeTopicModal = () => {
        setIsTopicModalOpen(false);
        setEditingTopicId(null);
        setTopicName("");
        setTopicDescription("");
    };

    const handleSaveTopic = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!topicName.trim()) {
            setError("Naziv teme je obavezan.");
            return;
        }

        setTopicLoading(true);
        try {
            const response = editingTopicId
                ? await updateTopic(editingTopicId, topicName.trim(), topicDescription.trim())
                : await createTopic(id, topicName.trim(), topicDescription.trim());

            setSuccess(response.message || "Tema je uspešno sačuvana.");
            const [topicsResult, seminarsResult] = await Promise.all([
                fetchTopicsBySubject(id),
                fetchSeminarsBySubject(id),
            ]);
            setTopics(topicsResult);
            setSeminars(seminarsResult);
            closeTopicModal();
        } catch (err) {
            setError(err.message);
        } finally {
            setTopicLoading(false);
        }
    };

    const handleDeleteTopic = async (topicId) => {
        setError("");
        setSuccess("");
        setActionLoadingTopicId(topicId);
        try {
            const response = await deleteTopic(topicId);
            setSuccess(response.message || "Tema je uspešno obrisana.");
            const [topicsResult, seminarsResult] = await Promise.all([
                fetchTopicsBySubject(id),
                fetchSeminarsBySubject(id),
            ]);
            setTopics(topicsResult);
            setSeminars(seminarsResult);
        } catch (err) {
            setError(err.message);
        } finally {
            setActionLoadingTopicId(null);
        }
    };

    const handleReserveTopic = async (topicId) => {
        setError("");
        setSuccess("");
        setActionLoadingTopicId(topicId);
        try {
            const response = await reserveTopic(topicId, id);
            setSuccess(response.message || "Tema je uspešno rezervisana.");
            const [topicsResult, seminarsResult] = await Promise.all([
                fetchTopicsBySubject(id),
                fetchSeminarsBySubject(id),
            ]);
            setTopics(topicsResult);
            setSeminars(seminarsResult);
        } catch (err) {
            setError(err.message);
        } finally {
            setActionLoadingTopicId(null);
        }
    };

    return (
        <>
            <Info name={subject?.name} code={subject?.code} professor={subject?.professor?.first_name + " " + subject?.professor?.last_name} />
            <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
                {isProfessorOrAdmin && (
                    <>
                        <button
                            type="button"
                            onClick={openCreateTopicModal}
                            className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                            <Plus size={16} />
                            Dodaj temu
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsStudentModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600"
                        >
                            <Plus size={16} />
                            Dodaj učenika
                        </button>
                    </>
                )}
            </div>
            <Divider />

            {error && <Alert type="error">{error}</Alert>}
            {success && <Alert>{success}</Alert>}

            <div className="mt-4">
                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-800">
                    <BookOpenText size={18} />
                    Teme seminarskih radova
                </h3>

                {pageLoading ? (
                    <p className="text-sm text-slate-500">Učitavanje tema...</p>
                ) : topics.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                        Trenutno nema dostupnih tema.
                    </p>
                ) : (
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
                                                    ? `Zauzeta${reservedByMe ? " (rezervisali ste vi)" : ""}`
                                                    : "Slobodna"}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {isProfessorOrAdmin && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditTopicModal(topic)}
                                                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                                                    >
                                                        <Pencil size={14} />
                                                        Izmeni
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteTopic(topic.id)}
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
                                                    onClick={() => handleReserveTopic(topic.id)}
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
                )}
            </div>

            {isStudentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">Dodavanje učenika</h3>
                            <button
                                type="button"
                                onClick={closeStudentModal}
                                className="rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleEnrollStudent}>
                            <Input
                                type="email"
                                placeholder="Email studenta"
                                icon={<Mail />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <ButtonWithIcon icon={<Plus />} onClick={handleEnrollStudent} loading={enrollLoading}>
                                Dodaj studenta
                            </ButtonWithIcon>
                        </form>
                    </div>
                </div>
            )}

            {isTopicModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">
                                {editingTopicId ? "Izmena teme" : "Dodavanje teme"}
                            </h3>
                            <button
                                type="button"
                                onClick={closeTopicModal}
                                className="rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveTopic}>
                            <Input
                                type="text"
                                placeholder="Naziv teme"
                                icon={<BookOpenText />}
                                value={topicName}
                                onChange={(e) => setTopicName(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Opis teme (opciono)"
                                icon={<Pencil />}
                                value={topicDescription}
                                onChange={(e) => setTopicDescription(e.target.value)}
                            />
                            <ButtonWithIcon icon={<Plus />} onClick={handleSaveTopic} loading={topicLoading}>
                                {editingTopicId ? "Sačuvaj izmene" : "Dodaj temu"}
                            </ButtonWithIcon>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
export default Subject;