"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const Updateparcelpage = () => {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [liveCost, setLiveCost] = useState(0);
  const [tempData, setTempData] = useState({});

  const {
    data: parcel,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axios.get(`/api/parcels/${id}`);
      return res.data.result;
    },
    enabled: !!id,
  });

  const calculateLiveCost = (weight, pType, sDist, rDist) => {
    let cost = 0;
    const isWithinCity = sDist === rDist;
    const w = parseFloat(weight || 0);
    if (pType === "Document") {
      cost = isWithinCity ? 60 : 80;
    } else {
      if (w <= 3) {
        cost = isWithinCity ? 110 : 150;
      } else {
        const basePrice = isWithinCity ? 110 : 150;
        cost = basePrice + (w - 3) * 40;
        if (!isWithinCity) cost += 40;
      }
    }
    return cost;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const weight = form.parcelWeight.value;
    const currentCost = calculateLiveCost(
      weight,
      parcel?.parcelType,
      parcel?.senderDistrict,
      parcel?.receiverDistrict,
    );

    setLiveCost(currentCost);
    setTempData({
      parcelName: form.parcelName.value,
      parcelWeight: weight,
      receiverName: form.receiverName.value,
      receiverEmail: form.receiverEmail.value, // FIX: was missing
      receiverPhone: form.receiverPhone.value,
      receiverAddress: form.receiverAddress.value,
      pickupInstruction: form.pickupInstruction.value,
      deliveryInstruction: form.deliveryInstruction.value,
      cost: currentCost,
    });

    document.getElementById("confirm_modal").showModal();
  };

  const handleConfirmUpdate = async () => {
    try {
      const res = await axios.patch(`/api/parcels/${id}`, tempData);
      if (res.data.success) {
        toast.success("Parcel Updated Successfully!");
        queryClient.invalidateQueries(["parcels"]);
        refetch();
        document.getElementById("confirm_modal").close();
        router.push("/dashboard/parcels");
      }
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  if (isLoading)
    return (
      <div className="p-20 text-center font-bold text-[#1e3a8a]">
        Loading Parcel Data...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-10 bg-[#f8fafc] min-h-screen">
      <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2 font-sans">
          Update A Parcel
        </h1>
        <p className="text-gray-400 mb-10">
          Modify your parcel details to proceed
        </p>

        <form
          id="updateForm"
          onSubmit={handleFormSubmit}
          className="space-y-12"
        >
          {/* Top Row: Type, Name & Weight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-control">
              <label className="label font-bold text-gray-500 uppercase text-[10px]">
                Parcel Type
              </label>
              <input
                value={parcel?.parcelType}
                readOnly
                className="input w-full h-14 bg-gray-50 rounded-xl text-gray-400 border-none cursor-not-allowed"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-gray-600 uppercase text-[10px]">
                Parcel Name
              </label>
              <input
                name="parcelName"
                defaultValue={parcel?.parcelName}
                className="input input-bordered w-full h-14 rounded-xl bg-[#eef2ff] border-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-gray-600 uppercase text-[10px]">
                Parcel Weight (KG)
              </label>
              <input
                name="parcelWeight"
                type="number"
                step="any"
                defaultValue={parcel?.parcelWeight}
                className="input input-bordered w-full h-14 rounded-xl bg-[#eef2ff] border-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">
            {/* --- Sender Section (read-only) --- */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold border-b-2 border-[#1e3a8a] pb-2 mb-6 text-[#1e3a8a]">
                Sender Details
              </h2>
              <input
                value={parcel?.senderName || ""}
                readOnly
                placeholder="Sender Name"
                className="input w-full h-12 bg-gray-50 rounded-lg text-gray-400 border-none"
              />
              <input
                value={parcel?.senderEmail || ""}
                readOnly
                placeholder="Sender Email"
                className="input w-full h-12 bg-gray-50 rounded-lg text-gray-400 border-none"
              />
              <input
                value={parcel?.senderPhone || ""}
                readOnly
                placeholder="Sender Phone"
                className="input w-full h-12 bg-gray-50 rounded-lg text-gray-400 border-none"
              />

              {/* FIX: was showing senderDistrict twice — now shows city + district */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-400 border border-gray-100">
                  {parcel?.senderCity || parcel?.senderDistrict}
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-400 border border-gray-100">
                  {parcel?.senderDistrict}
                </div>
              </div>

              <div className="form-control pt-2">
                <label className="label font-bold text-gray-500 text-[10px]">
                  Pickup Instruction
                </label>
                <textarea
                  name="pickupInstruction"
                  defaultValue={parcel?.pickupInstruction}
                  className="textarea w-full bg-[#eef2ff] rounded-lg min-h-[80px] border-none"
                />
              </div>
            </div>

            {/* --- Receiver Section (editable) --- */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold border-b-2 border-[#1e3a8a] pb-2 mb-6 text-[#1e3a8a]">
                Receiver Details
              </h2>
              <input
                name="receiverName"
                defaultValue={parcel?.receiverName}
                placeholder="Receiver Name"
                className="input w-full h-12 bg-[#eef2ff] rounded-lg border-none focus:ring-2 focus:ring-blue-100"
                required
              />
              {/* FIX: receiverEmail was missing entirely */}
              <input
                name="receiverEmail"
                defaultValue={parcel?.receiverEmail}
                placeholder="Receiver Email"
                type="email"
                className="input w-full h-12 bg-[#eef2ff] rounded-lg border-none focus:ring-2 focus:ring-blue-100"
                required
              />
              <input
                name="receiverPhone"
                defaultValue={parcel?.receiverPhone}
                placeholder="Receiver Phone"
                className="input w-full h-12 bg-[#eef2ff] rounded-lg border-none focus:ring-2 focus:ring-blue-100"
                required
              />

              {/* FIX: was showing receiverDistrict twice — now shows city + district */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-500 border border-gray-100">
                  {parcel?.receiverCity || parcel?.receiverDistrict}
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-500 border border-gray-100">
                  {parcel?.receiverDistrict}
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-gray-600 text-[10px]">
                  Receiver Address
                </label>
                <textarea
                  name="receiverAddress"
                  defaultValue={parcel?.receiverAddress}
                  className="textarea w-full bg-[#eef2ff] rounded-lg min-h-[80px] border-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-bold text-gray-600 text-[10px]">
                  Delivery Instruction
                </label>
                <textarea
                  name="deliveryInstruction"
                  defaultValue={parcel?.deliveryInstruction}
                  className="textarea w-full bg-[#eef2ff] rounded-lg min-h-[80px] border-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-10">
            <button
              type="submit"
              className="btn bg-[#D4F06D] hover:bg-[#c2df5d] border-none text-[#1e3a8a] px-16 h-16 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all"
            >
              Proceed to Confirm Update
            </button>
          </div>
        </form>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      <dialog id="confirm_modal" className="modal modal-middle">
        <div className="modal-box max-w-[450px] bg-white rounded-[2.5rem] p-10 shadow-2xl border-none overflow-hidden">
          <h2 className="text-[26px] font-bold text-[#0f4c5c] mb-8 leading-tight text-center sm:text-left">
            Confirm Your Booking
          </h2>

          <div className="space-y-5">
            <ModalRow
              label="Parcel Name"
              value={tempData.parcelName || "N/A"}
            />
            <ModalRow label="Weight" value={`${tempData.parcelWeight} KG`} />
            <ModalRow label="Receiver" value={tempData.receiverName || "N/A"} />
            <ModalRow label="From" value={parcel?.senderDistrict} />
            <ModalRow label="To" value={parcel?.receiverDistrict} />

            <div className="border-t border-dashed border-gray-200 my-6" />

            <div className="flex justify-between items-center">
              <span className="text-[17px] font-bold text-gray-700">
                Total Delivery Charge:
              </span>
              <div className="flex items-center gap-1 text-[#65a30d]">
                <span className="text-2xl font-bold">৳</span>
                <span className="text-4xl font-black">{liveCost}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <form method="dialog" className="flex-1">
              <button className="w-full h-14 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </form>

            <button
              onClick={handleConfirmUpdate}
              className="flex-[1.5] h-14 bg-[#D4F06D] hover:bg-[#c2df5d] text-[#1e3a8a] font-black text-lg rounded-2xl shadow-lg shadow-lime-100 transition-all active:scale-95"
            >
              Confirm & Submit
            </button>
          </div>
        </div>

        <form
          method="dialog"
          className="modal-backdrop bg-black/20 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

const ModalRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-[15px]">
    <span className="text-gray-500 font-medium">{label}:</span>
    <span className="text-[#1e3a8a] font-bold">{value}</span>
  </div>
);

export default Updateparcelpage;
