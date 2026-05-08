import useAuth from "./useAuth";
import { axiosPrivate } from "../api/api.js";
import { useEffect } from "react";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }

                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;

                if (
                    error?.response?.status === 403 &&
                    !prevRequest?.sent
                ) {
                    prevRequest.sent = true;

                    const response = await axios.get('/refresh', {
                        withCredentials: true
                    });

                    const newAccessToken = response.data.accessToken;

                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth]);

    return axiosPrivate;
};

export default useAxiosPrivate;