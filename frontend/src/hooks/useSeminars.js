import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useSeminars = () => {
  const axiosPrivate = useAxiosPrivate();
  const [counts, setCounts] = useState({ PENDING: 0, APPROVED: 0, REJECTED: 0 });
  const [loading, setLoading] = useState(true);
  
  const fetchCounts = async () => {
    setLoading(true);
    try {
      const { data: res } = await axiosPrivate.get("/seminars/count");
      const result = { PENDING: 0, APPROVED: 0, REJECTED: 0 };
      if (res?.status === "success" && Array.isArray(res.data)) {
        res.data.forEach(({ type, count }) => {
          result[type] = count;
        });
      }
      setCounts(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  // const fetchCounts = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const { data: res } = await axiosPrivate.get("/seminars/count");
  //     const result = { PENDING: 0, APPROVED: 0, REJECTED: 0 };
  //     if (res?.status === "success" && Array.isArray(res.data)) {
  //       res.data.forEach(({ type, count }) => {
  //         result[type] = count;
  //       });
  //     }
  //     setCounts(result);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [axiosPrivate]);

  return { counts, loading, fetchCounts };
};

export default useSeminars;
