import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const apiUrl = url;
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log("Error fetching data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    error,
    data,
  };
};

export default useFetch;
