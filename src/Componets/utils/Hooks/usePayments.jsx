"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePayments = (email, search, page) => {
  return useQuery({
    queryKey: ["payments", email, search, page],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(
        `/api/payment-success?email=${email}&search=${search}&page=${page}`,
      );
      return res.data;
    },
  });
};

export default usePayments;
