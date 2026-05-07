"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProductTracking = (trackingId) => {
  const {
    data: trackingLogs = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      if (!trackingId) return [];
      const res = await axios.get(`/api/trackings/${trackingId}/logs`);
    //   console.log("search", res.data);
      return res.data.data; // API থেকে আসা লগের অ্যারে
    },
    enabled: !!trackingId, // trackingId থাকলেই কেবল কুয়েরি রান হবে
    staleTime: 1000 * 60 * 5, // ৫ মিনিট পর্যন্ত ডেটা ফ্রেশ থাকবে
  });

//   console.log("trakcig", trackingLogs);

  return { trackingLogs, isLoading, isError, refetch, error };
};

export default useProductTracking;
