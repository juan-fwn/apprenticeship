import { useState, useCallback } from "react";

const token = "df7ba0e57e5998b3482646f2dded6d32";

const baseUrl = "https://api.themoviedb.org/3";

const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}${requestConfig.path}?api_key=${token}`, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useRequest;
