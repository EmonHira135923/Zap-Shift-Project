import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCompleteDelivery = () => {
  const {
    data: completeDelivery = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["complete-delivery"],
    queryFn: async () => {
      const res = await axios.get("/api/parcels/complete-delivery-status");
      return res.data;
    },
  });

  return [completeDelivery, isLoading, refetch];
};

export default useCompleteDelivery;