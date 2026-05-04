"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = (currentUser, search, page) => {
  const query = useQuery({
    queryKey: ["users", currentUser?._id, search, page],
    enabled: !!currentUser,
    queryFn: async () => {
      const res = await axios.get(
        `/api/auth/register?search=${search}&page=${page}`
      );
      return res.data;
    },
  });

  return query;
};

export default useUsers;