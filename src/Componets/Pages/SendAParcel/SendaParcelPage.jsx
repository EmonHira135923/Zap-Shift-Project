"use client";
import SendAParcelForm from "@/Componets/forms/SendAParcelForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SendaParcelPage = () => {
  const router = useRouter();
  const [allStates, setAllStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempFormData, setTempFormData] = useState(null);
  const [finalCost, setFinalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ১. রিজিয়ন এবং জেলা ডাটা ফেচ করা
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resState, resDistrict] = await Promise.all([
          axios.get("/data/bdstate.json"),
          axios.get("/data/bddistrict.json"),
        ]);
        setAllStates(resState.data);
        setAllDistricts(resDistrict.data);
      } catch (err) {
        console.error("Data fetching failed:", err);
      }
    };
    fetchData();
  }, []);

  // ২. ফর্ম সাবমিট হলে কস্ট ক্যালকুলেশন এবং মডাল ওপেন
  const handleProceedToConfirm = (data) => {
    const isDocument = data.parcelType === "Document";
    const isDistrict = data.senderDistrict === data.receiverDistrict;
    let weight = parseFloat(data.parcelWeight) || 0;

    // ডেলিভারি চার্জ লজিক
    const baseCost = isDocument
      ? isDistrict
        ? 60
        : 80
      : isDistrict
        ? 110
        : 150;
    let totalCharge = baseCost;

    if (!isDocument && weight > 3) {
      const extraWeight = weight - 3;
      totalCharge += isDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
    }

    setFinalCost(totalCharge);
    setTempFormData(data);
    setIsModalOpen(true);
  };

  // ৩. মডাল থেকে ফাইনাল কনফার্মেশন এবং এপিআই কল
  const handleFinalSubmit = async (resetForm) => {
    setIsSubmitting(true);
    try {
      const finalData = {
        ...tempFormData,
        cost: finalCost,
      };

      const res = await axios.post("/api/parcels", finalData);

      if (res.data.message.insertedId) {
        toast.success(`Booking Confirmed! Total: ৳${finalCost}`);
        setIsModalOpen(false);
        resetForm(); // চাইল্ড ফর্ম রিসেট হবে
        router.push("/dashboard/parcels")
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Submission failed! Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#002B36] mb-2">
            Send A Parcel
          </h1>
          <p className="text-gray-400 font-medium">
            Enter your parcel details to proceed
          </p>
        </div>

        {/* ফর্ম কম্পোনেন্ট */}
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
