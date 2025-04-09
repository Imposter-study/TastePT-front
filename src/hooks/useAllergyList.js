import { useState, useEffect } from "react";
import { publicAccountAPI } from "../api/accountApi";

export function useAllergyList() {
  const [allergyList, setAllergyList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllergyList = () => {
    publicAccountAPI.get("allergies_list/").then((response) => {
      // console.log(response);
      // console.log(response.data);
      const allergies = response.data.map((allergy) => allergy.ingredient);
      setAllergyList(allergies);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllergyList();
  }, []);

  return { allergyList, loading };
}
