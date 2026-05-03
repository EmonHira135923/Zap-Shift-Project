import { useState, useEffect } from "react";
import axios from "axios";

const useLocations = () => {
  const [allStates, setAllStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resState, resDistrict] = await Promise.all([
          axios.get("/data/bdstate.json"),
          axios.get("/data/bddistrict.json"),
        ]);
        setAllStates(resState.data);
        setAllDistricts(resDistrict.data);
      } catch (err) {
        console.error("Location fetching failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // বিভাগ অনুযায়ী জেলা ফিল্টার করার ফাংশন
  const getDistrictsByState = (stateId) => {
    if (!stateId) return [];
    return allDistricts.filter((d) => d.stateId === parseInt(stateId));
  };

  return { allStates, allDistricts, getDistrictsByState, loading };
};

export default useLocations;