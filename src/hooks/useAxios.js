import { useState, useEffect } from "react";

export function useAxios(endpoint, axiosAPI) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const get = () => {
    axiosAPI
      .get(`${endpoint}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.response.status);
        if (error.response.status === 404) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      });
  };

  useEffect(() => {
    get();
  }, [endpoint]);

  return { data, loading, notFound };
}
