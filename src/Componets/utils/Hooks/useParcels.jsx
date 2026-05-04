"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useParcels = (email, search, page) => {
  return useQuery({
    queryKey: ["parcels", email, search, page],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(
        `/api/parcels?email=${email}&search=${search}&page=${page}`
      );
      return res.data;
    },
  });
};

export default useParcels;