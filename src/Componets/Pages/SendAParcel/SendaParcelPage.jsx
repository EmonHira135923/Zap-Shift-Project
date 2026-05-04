"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import SendAParcelForm from "@/Componets/forms/SendAParcelForm";
import useLocations from "@/Componets/utils/Hooks/useLocations";
import SendAParcelPageSkeleton from "@/Componets/Skeltons/SendAParcelPageSkeleton";

const SendaParcelPage = () => {
  const router = useRouter();
  const { allStates, allDistricts, loading } = useLocations(); // হুক থেকে ডাটা নিন
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempFormData, setTempFormData] = useState(null);
  const [finalCost, setFinalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProceedToConfirm = (data) => {
    const isDocument = data.parcelType === "Document";
    const isDistrict = data.senderDistrict === data.receiverDistrict;
    let weight = parseFloat(data.parcelWeight) || 0;

    const baseCost = isDocument 
      ? (isDistrict ? 60 : 80) 
      : (isDistrict ? 110 : 150);
    
    let totalCharge = baseCost;
    if (!isDocument && weight > 3) {
      const extraWeight = weight - 3;
      totalCharge += isDistrict ? extraWeight * 40 : (extraWeight * 40 + 40);
    }

    setFinalCost(totalCharge);
    setTempFormData(data);
    setIsModalOpen(true);
  };

  const handleFinalSubmit = async (resetForm) => {
    setIsSubmitting(true);
    try {
      const finalData = { ...tempFormData, cost: finalCost };
      const res = await axios.post("/api/parcels", finalData);

      if (res.data.message.insertedId) {
        toast.success(`Booking Confirmed! Total: ৳${finalCost}`);
        setIsModalOpen(false);
        resetForm();
        router.push("/dashboard/parcels");
      }
    } catch (err) {
      toast.error("Submission failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <SendAParcelPageSkeleton />;

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#002B36] mb-2">Send A Parcel</h1>
          <p className="text-gray-400 font-medium">Enter your parcel details to proceed</p>
        </div>

        <SendAParcelForm
          allStates={allStates}
          allDistricts={allDistricts}
          onProceed={handleProceedToConfirm}
          handleFinalSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          finalCost={finalCost}
          tempFormData={tempFormData}
        />
      </div>
    </section>
  );
};

export default SendaParcelPage;
