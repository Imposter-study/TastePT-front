import { useState, useEffect } from "react";
import { publicAccountAPI } from "../api/accountApi";

export function usePreferredCusisineList() {
  const [preferredCuisineList, setPreferredCuisineList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPreferredCuisineList = () => {
    publicAccountAPI.get("preferredCuisine_list/").then((response) => {
      // console.log(response);
      // console.log(response.data);
      const preferredCuisines = response.data.map(
        (preferredCuisine) => preferredCuisine.cuisine
      );
      setPreferredCuisineList(preferredCuisines);
      setLoading(false)
    });
  };

  useEffect(() => {
    getPreferredCuisineList();
  }, []);

  return {preferredCuisineList, loading};
}
