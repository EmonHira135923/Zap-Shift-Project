"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ASSIGNED_DELIVERY_STATUSES = [
  "rider assigned",
  "Rider Arriving",
  "accepted",
  "picked up",
  // "delivered",
  "rejected",
];

const useAssigndelivery = ({
  riderEmail,
  search = "",
  page = 1,
  enabled = true,
}) => {
  return useQuery({
    queryKey: ["assigned-delivery", riderEmail, search, page],

    enabled: !!riderEmail && enabled,

    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("riderEmail", riderEmail);
      params.append("DeliveryStatus", ASSIGNED_DELIVERY_STATUSES.join(","));
      params.append("paymentStatus", "paid");
      params.append("page", String(page));

      if (search) {
        params.append("search", search);
      }

      const res = await axios.get(`/api/parcels/rider?${params.toString()}`);

      return res.data;
    },
  });
};

export default useAssigndelivery;
