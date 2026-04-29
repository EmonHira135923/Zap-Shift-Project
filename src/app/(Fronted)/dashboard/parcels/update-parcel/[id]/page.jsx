import Updateparcelpage from '@/Componets/Pages/dashboard/Parcel/Updateparcelpage';
import React from 'react';
import { ObjectId } from "mongodb";
import { getParcels } from '@/app/(Backend)/lib/dbConnect';

export async function generateMetadata({ params }) {
  const { id } = await params;
  let parcelName = "Parcel";

  try {
    const parcelCollection = await getParcels();
    const parcel = await parcelCollection.findOne({ _id: new ObjectId(id) });
    
    if (parcel && parcel.parcelName) {
      parcelName = parcel.parcelName;
    }
  } catch (error) {
    // Error hole default "Parcel" thakbe
  }

  return {
    title: `${parcelName} | Update | ZapShift`,
    description: `Edit and update details for ${parcelName}. Manage your delivery efficiently with ZapShift courier service.`,
  };
}

const UpdateParcel = async ({ params }) => {
  return (
    <div>
      <Updateparcelpage />
    </div>
  );
};

export default UpdateParcel;