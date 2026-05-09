import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCompletePaidandParcelDelivery = () => {
  const {
    data: stats = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["complete-paid-delivery-status"],
    queryFn: async () => {
      const res = await axios.get("/api/parcels/Complete-paid-delivery-status");
      // This returns the 'data' object from your API response
      return res.data?.data || {};
    },
  });

  return [stats, isLoading, refetch];
};

export default useCompletePaidandParcelDelivery;