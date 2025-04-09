import { useState, useEffect } from "react";
import { publicAccountAPI } from "../api/accountApi";

export function usePreferredCusisineList() {
  const [preferredCuisineList, setPreferredCuisineList] = useState([]);

  const getPreferredCuisineList = () => {
    publicAccountAPI.get("preferredCuisine_list/").then((response) => {
      // console.log(response);
      // console.log(response.data);
      const preferredCuisines = response.data.map(
        (preferredCuisine) => preferredCuisine.cuisine
      );
      setPreferredCuisineList(preferredCuisines);
    });
  };

  useEffect(() => {
    getPreferredCuisineList();
  }, []);

  return preferredCuisineList;
}
