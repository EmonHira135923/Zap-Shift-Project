import Parceldetailspage from "@/Componets/Pages/dashboard/Parcel/Parceldetailspage";
import axios from "axios";
import React from "react";

// Dynamic Metadata Generator
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_AUTH_URL;
    const res = await axios.get(`${baseUrl}/api/parcels/${id}`);
    const parcel = res.data.result;

    return {
      title: `${parcel?.parcelName || "Parcel"} Details | ZapShift`,
      description: `Viewing details for ${parcel?.parcelName} on ZapShift.`,
    };
  } catch (error) {
    console.error("Metadata Error:", error.message);
    return { title: "Parcel Details | ZapShift" };
  }
}

const ParcelDetails = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <Parceldetailspage id={id} />
    </div>
  );
};

export default ParcelDetails;