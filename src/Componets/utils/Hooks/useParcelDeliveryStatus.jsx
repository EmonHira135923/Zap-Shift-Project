"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useParcelStats = () => {
  const {
    data: stats,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["admin-parcel-stats"],
    queryFn: async () => {
      const res = await axios.get("/api/parcels/delivery-status");
      
      // Drilling down: res.data.total is the array from your JSON
      const target = res.data?.total?.[0];

      return {
        delivery: target?.deliveryStats || [],
        payment: target?.paymentStats || [],
      };
    },
    initialData: { delivery: [], payment: [] }
  });

  return { stats, isLoading, isError, refetch, error };
};

export default useParcelStats;