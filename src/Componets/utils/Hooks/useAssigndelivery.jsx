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
  trackingId, // এখানে trackingId প্যারামিটার যোগ করুন
  search = "",
  page = 1,
  enabled = true,
}) => {
  return useQuery({
    // queryKey তে trackingId যোগ করুন যাতে এটি পরিবর্তন হলে ডাটা রি-ফেচ হয়
    queryKey: ["assigned-delivery", riderEmail, trackingId, search, page],

    enabled: !!riderEmail && enabled,

    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("riderEmail", riderEmail);
      params.append("DeliveryStatus", ASSIGNED_DELIVERY_STATUSES.join(","));
      params.append("paymentStatus", "paid");
      params.append("page", String(page));

      // যদি trackingId থাকে তবেই ফিল্টার হিসেবে পাঠাবে
      if (trackingId) {
        params.append("trackingId", trackingId);
      }

      if (search) {
        params.append("search", search);
      }

      const res = await axios.get(`/api/parcels/rider?${params.toString()}`);
      return res.data;
    },
  });
};

export default useAssigndelivery;
