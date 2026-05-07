"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDeliveryParcel = ({
  riderEmail,
  search = "",
  page = 1,
  enabled = true,
}) => {
  return useQuery({
    queryKey: ["completed-deliveries", riderEmail, search, page],
    enabled: !!riderEmail && enabled,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("riderEmail", riderEmail);
      params.append("DeliveryStatus", "delivered");
      params.append("paymentStatus", "paid");
      params.append("page", String(page));

      if (search) params.append("search", search);

      const res = await axios.get(`/api/parcels/rider?${params.toString()}`);
      return res.data;
    },
  });
};

export default useDeliveryParcel;