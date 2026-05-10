import useAxiosPrivate from "./useAxiosPrivate";

const useSeminars = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetchSeminarsBySubject = async (subjectId) => {
        try {
            const { data: response } = await axiosPrivate.get(`/seminars?subject_id=${subjectId}`);
            return response.seminars;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom dohvatanja rezervacija!";
            throw new Error(message);
        }
    };

    const fetchSeminarByTopic = async (topicId) => {
        try {
            const { data: response } = await axiosPrivate.get(`/seminars/topic/${topicId}`);
            return response.seminar;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom dohvatanja seminarskog rada!";
            throw new Error(message);
        }
    };

    const uploadSeminarPaper = async (topicId, file) => {
        try {
            const { data: response } = await axiosPrivate.post(
                `/seminars/topic/${topicId}/upload`,
                { filePath: file },
            );
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom postavljanja seminarskog rada!";
            throw new Error(message);
        }
    };

    const updateSeminarStatus = async (seminarId, status) => {
        try {
            const { data: response } = await axiosPrivate.put(`/seminars/${seminarId}/status`, {
                status,
            });
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom promene statusa seminarskog rada!";
            throw new Error(message);
        }
    };

    return {
        fetchSeminarsBySubject,
        fetchSeminarByTopic,
        uploadSeminarPaper,
        updateSeminarStatus,
    };
};

export default useSeminars;
