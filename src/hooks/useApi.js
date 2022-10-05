import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const useApi = (url) => {
  const { authTokens } = useContext(AuthContext);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authTokens.token}`,
          },
        });
        setResponse(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [url]);
  return { response, loading, error };
};

export default useApi;
