"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRiders = ({
  email,
  search = "",
  page = 1,
  workStatus = "",
  status = "",
  district = "",
  enabled = true,
}) => {
  return useQuery({
    queryKey: ["riders", email, search, page, workStatus, status, district],
    enabled: !!email && enabled,
    queryFn: async () => {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (page) params.append("page", page);
      if (workStatus) params.append("workStatus", workStatus);
      if (status) params.append("status", status);
      if (district) params.append("district", district);

      const res = await axios.get(`/api/riders?${params.toString()}`);
      return res.data;
    },
  });
};

export default useRiders;