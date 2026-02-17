import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";
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

        // const responseIntercept = axiosPrivate.interceptors.response.use(
        //     response => response,
        //     error => {
        //         const prevRequest = error?.config;
        //     }
        // );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);  
        }

    }, [auth]);

    return axiosPrivate;
};

export default useAxiosPrivate;