"use client";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const Cancepage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-red-500">Payment Cancelled</h1>
      <button 
        onClick={() => router.push("/dashboard/parcels")} 
        className="mt-4 text-blue-600 underline"
      >
        Try Again
      </button>
    </div>
  );
};

export default Cancepage;