import { useState, useCallback } from "react";
import axiosInstance from "./aixosInstance";

export default function useUpdate(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.put(endpoint, payload);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { loading, error, updateData };
}
