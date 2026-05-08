import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSubjects from "../../hooks/useSubjects";
import Info from "./components/Info";
import Divider from "../../components/Divider";
import ButtonWithIcon from "../../components/ButtonWithIcon";
import Input from "../../components/Input";
import Alert from "../../components/Alert";
import useAuth from "../../hooks/useAuth";
import { Mail, Plus, X } from "lucide-react";

const Subject = () => {
    const { id } = useParams();
    const { fetchSubject, enrollStudentByEmail } = useSubjects();
    const { hasRole } = useAuth();
    const [subject, setSubject] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
       const loadSubject = async () => {
        try {
            const result = await fetchSubject(id);
            setSubject(result);
            // setTopics(subjectData.topics || []);
        } catch (error) {
            console.error(error);
        }
       };

       loadSubject();
    }, [id]);

    const closeModal = () => {
        setIsModalOpen(false);
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

        setLoading(true);
        try {
            const response = await enrollStudentByEmail(id, email);
            setSuccess(response.message || "Student je uspešno dodat u učionicu.");
            setEmail("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Info name={subject?.name} code={subject?.code} professor={subject?.professor?.first_name + " " + subject?.professor?.last_name} />
            {(hasRole("PROFESSOR") || hasRole("ADMIN")) && (
                <div className="mb-4 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600"
                    >
                        <Plus size={16} />
                        Dodaj učenika
                    </button>
                </div>
            )}
            <Divider />

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">Dodavanje učenika</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {error && <Alert type="error">{error}</Alert>}
                        {success && <Alert>{success}</Alert>}

                        <form onSubmit={handleEnrollStudent}>
                            <Input
                                type="email"
                                placeholder="Email studenta"
                                icon={<Mail />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <ButtonWithIcon icon={<Plus />} onClick={handleEnrollStudent} loading={loading}>
                                Dodaj studenta
                            </ButtonWithIcon>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
export default Subject;