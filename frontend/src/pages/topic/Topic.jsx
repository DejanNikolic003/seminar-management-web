import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSubjects from "../../hooks/useSubjects";
import useTopics from "../../hooks/useTopics";
import useSeminars from "../../hooks/useSeminars";
import useAuth from "../../hooks/useAuth";
import Alert from "../../components/Alert";
import ButtonWithIcon from "../../components/ButtonWithIcon";
import Divider from "../../components/Divider";
import SeminarStatusBadge from "./components/SeminarStatusBadge";
import { FileUp, Save } from "lucide-react";

const SEMINAR_STATUSES = ["DRAFT", "SUBMITTED", "APPROVED", "DEFENDED"];

const Topic = () => {
    const { subjectId, topicId } = useParams();
    const { hasRole } = useAuth();
    const { fetchSubject } = useSubjects();
    const { fetchTopicsBySubject } = useTopics();
    const { fetchSeminarByTopic, uploadSeminarPaper, updateSeminarStatus } = useSeminars();

    const [subject, setSubject] = useState(null);
    const [topic, setTopic] = useState(null);
    const [seminar, setSeminar] = useState(null);
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("DRAFT");
    const [loading, setLoading] = useState(true);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const isStudent = hasRole("STUDENT");
    const isProfessorOrAdmin = hasRole("PROFESSOR") || hasRole("ADMIN");

    const loadData = async () => {
        setLoading(true);
        try {
            const subjectResult = await fetchSubject(subjectId);
            const topicsResult = await fetchTopicsBySubject(subjectId);
            const seminarResult = await fetchSeminarByTopic(topicId);
            const topicResult = topicsResult.find(currentTopic => currentTopic.id === Number(topicId));

            setSubject(subjectResult);
            setTopic(topicResult || null);
            setSeminar(seminarResult);
            setStatus(seminarResult?.status || "DRAFT");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [subjectId, topicId]);

    const handleUpload = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        console.log(file);

        if (!file) {
            setError("Fajl seminarskog rada je obavezan.");
            return;
        }

        setUploadLoading(true);
        try {
            const response = await uploadSeminarPaper(topicId, file);
            setSuccess(response.message || "Rad je uspešno postavljen.");
            setFile(null);
            await loadData();
        } catch (err) {
            setError(err.message);
        } finally {
            setUploadLoading(false);
        }
    };

    const handleStatusUpdate = async () => {
        if (!seminar?.id) return;

        setError("");
        setSuccess("");
        setStatusLoading(true);
        try {
            const response = await updateSeminarStatus(seminar.id, status);
            setSuccess(response.message || "Status je uspešno izmenjen.");
            await loadData();
        } catch (err) {
            setError(err.message);
        } finally {
            setStatusLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-slate-800">{topic?.name || "Tema"}</h2>
            <p className="mt-1 text-sm text-slate-500">
                {subject?.name} ({subject?.code})
            </p>
            {topic?.description && <p className="mt-3 text-sm text-slate-700">{topic.description}</p>}

            <Divider />

            {error && <Alert type="error">{error}</Alert>}
            {success && <Alert>{success}</Alert>}

            {loading ? (
                <p className="text-sm text-slate-500">Učitavanje...</p>
            ) : (
                <div className="space-y-4">
                    <div className="rounded-lg border border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600">Trenutni status seminarskog rada</p>
                            <SeminarStatusBadge status={seminar?.status || "DRAFT"} />
                        </div>
                        {!seminar && (
                            <p className="mt-2 text-sm text-slate-500">
                                Tema još nije rezervisana, pa ne postoji seminarski rad.
                            </p>
                        )}
                    </div>

                    {isStudent && (
                        <form onSubmit={handleUpload} className="rounded-lg border border-slate-200 p-4" encType="multipart/form-data">
                            <h3 className="mb-3 text-sm font-semibold text-slate-800">Postavi seminarski rad</h3>
                            <label className="mb-3 flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 p-2 text-sm text-slate-600 hover:bg-slate-50">
                                <FileUp size={16} />
                                <span>{file?.name || "Izaberite fajl seminarskog rada"}</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                            </label>
                            {seminar?.file_path && (
                                <a
                                    href={`${API_ORIGIN}${seminar.file_path}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mb-3 inline-block text-xs text-cyan-700 underline"
                                >
                                    Trenutno postavljen rad
                                </a>
                            )}
                            <ButtonWithIcon icon={<Save />} onClick={handleUpload} loading={uploadLoading}>
                                Sačuvaj rad
                            </ButtonWithIcon>
                        </form>
                    )}

                    {isProfessorOrAdmin && seminar && (
                        <div className="rounded-lg border border-slate-200 p-4">
                            <h3 className="mb-3 text-sm font-semibold text-slate-800">Promena statusa</h3>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mb-3 w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-700 outline-none"
                            >
                                {SEMINAR_STATUSES.map((statusOption) => (
                                    <option key={statusOption} value={statusOption}>
                                        {statusOption}
                                    </option>
                                ))}
                            </select>
                            <ButtonWithIcon icon={<Save />} onClick={handleStatusUpdate} loading={statusLoading}>
                                Izmeni status
                            </ButtonWithIcon>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Topic;
