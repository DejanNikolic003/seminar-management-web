import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useSubjects = () => {
  const axiosPrivate = useAxiosPrivate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const { data: res } = await axiosPrivate.get("/subjects");
      if (res?.status === "success" && Array.isArray(res.data)) {
        setSubjects(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { subjects, loading, fetchSubjects };
};

export default useSubjects;
