"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRiders = (email, search, page) => {
  return useQuery({
    queryKey: ["riders", email, search, page],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(
        `/api/riders?search=${search}&page=${page}`
      );
      return res.data;
    },
  });
};

export default useRiders;