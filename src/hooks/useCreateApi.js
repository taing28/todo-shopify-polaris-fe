import { useState, useCallback } from "react";
import axiosInstance from "./aixosInstance";

export default function useCreate(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createData = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post(endpoint, payload);
      console.log('Created Data:', res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { loading, error, createData };
}
