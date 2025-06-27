import { useCallback, useEffect, useState } from "react";
import axiosInstance from "./aixosInstance";

export default function useFetchApi(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(endpoint, params);
            setData(response?.data?.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
                setLoading(false);
        }
    }, [endpoint])

    useEffect(() => {
        fetchData();
        console.log('fetched');
    }, [fetchData, endpoint]);

    return { data, loading, setData };
}