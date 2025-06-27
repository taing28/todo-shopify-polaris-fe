import { useState, useCallback } from "react";
import axiosInstance from "./aixosInstance";

export default function useDelete(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.delete(endpoint);
      console.log('Deleted Data:', res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { loading, error, deleteData };
}
