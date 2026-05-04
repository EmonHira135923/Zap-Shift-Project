"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAssignRider = (search, page, enabled, authKey) => {
  return useQuery({
    queryKey: ["parcels", "pending pickup", authKey, search, page],

    enabled,

    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        DeliveryStatus: "pending pickup",
        paymentStatus: "paid",
      });

      if (search) {
        params.set("search", search);
      }

      const res = await axios.get(`/api/parcels?${params.toString()}`);

      return res.data;
    },
  });
};

export default useAssignRider;
