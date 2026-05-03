import Parceldetailspage from "@/Componets/Pages/dashboard/Parcel/Parceldetailspage";
import axios from "axios";
import React from "react";
import { cookies } from "next/headers";

// Dynamic Metadata Generator
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const nextAuthToken =
      cookieStore.get("next-auth.session-token")?.value ||
      cookieStore.get("__Secure-next-auth.session-token")?.value;

    const token = accessToken || nextAuthToken;

    const baseUrl = process.env.NEXT_AUTH_URL;

    const res = await axios.get(`${baseUrl}/api/parcels/${id}`, {
      headers: {
        Cookie: token
          ? accessToken
            ? `accessToken=${accessToken}`
            : `next-auth.session-token=${nextAuthToken}`
          : "",
      },
    });

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