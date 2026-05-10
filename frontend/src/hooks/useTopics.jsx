import useAxiosPrivate from "./useAxiosPrivate";

const useTopics = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetchTopicsBySubject = async (subjectId) => {
        try {
            const { data: response } = await axiosPrivate.get(`/topics/subject/${subjectId}`);
            return response.topics;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom dohvatanja tema!";
            throw new Error(message);
        }
    };

    const createTopic = async (subjectId, name, description) => {
        try {
            const { data: response } = await axiosPrivate.post("/topics", {
                subject_id: Number(subjectId),
                name,
                description,
            });

            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom dodavanja teme!";
            throw new Error(message);
        }
    };

    const updateTopic = async (topicId, name, description) => {
        try {
            const { data: response } = await axiosPrivate.put(`/topics/${topicId}`, {
                name,
                description,
            });

            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom izmene teme!";
            throw new Error(message);
        }
    };

    const deleteTopic = async (topicId) => {
        try {
            const { data: response } = await axiosPrivate.delete(`/topics/${topicId}`);
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom brisanja teme!";
            throw new Error(message);
        }
    };

    const reserveTopic = async (topicId, subjectId) => {
        try {
            const { data: response } = await axiosPrivate.post(`/topics/${topicId}/reserve`, {
                subject_id: Number(subjectId),
            });
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom rezervacije teme!";
            throw new Error(message);
        }
    };

    return {
        fetchTopicsBySubject,
        createTopic,
        updateTopic,
        deleteTopic,
        reserveTopic,
    };
};

export default useTopics;
