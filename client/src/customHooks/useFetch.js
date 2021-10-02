import { useState, useCallback } from 'react';

export const useCallApi = ({ apiFunction = () => {} }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatchApiCall = useCallback(
    async (...params) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...params);
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { dispatchApiCall, data, loading, error };
};
