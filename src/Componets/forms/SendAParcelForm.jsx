"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../utils/Hooks/useAuth";

const SendAParcelForm = ({
  allStates,
  allDistricts,
  onProceed,
  handleFinalSubmit,
  isSubmitting,
  isModalOpen,
  setIsModalOpen,
  finalCost,
  tempFormData,
}) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "Document",
      senderRegion: "",
      senderDistrict: "",
      receiverRegion: "",
      receiverDistrict: "",
    },
  });

  const watchedSenderRegion = watch("senderRegion");
  const watchedReceiverRegion = watch("receiverRegion");
  const [filteredSenderDistricts, setFilteredSenderDistricts] = useState([]);
  const [filteredReceiverDistricts, setFilteredReceiverDistricts] = useState([]);

  // জেলা ফিল্টারিং লজিক
  useEffect(() => {
    if (watchedSenderRegion) {
      setFilteredSenderDistricts(
        allDistricts.filter((d) => d.stateId === parseInt(watchedSenderRegion))
      );
      setValue("senderDistrict", "");
    }
  }, [watchedSenderRegion, allDistricts, setValue]);

  useEffect(() => {
    if (watchedReceiverRegion) {
      setFilteredReceiverDistricts(
        allDistricts.filter((d) => d.stateId === parseInt(watchedReceiverRegion))
      );
      setValue("receiverDistrict", "");
    }
  }, [watchedReceiverRegion, allDistricts, setValue]);

  const inputClass = "w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-400 text-sm transition-all";
  const labelClass = "block text-sm font-bold text-[#002B36] mb-2";
  const errorClass = "text-red-500 text-[10px] mt-1 font-semibold";

  return (
    <>
      <form onSubmit={handleSubmit(onProceed)} className="space-y-10">
        {/* ১. পার্সেল টাইপ (Document/Non-Document) */}
        <div className="flex gap-8 items-center border-b border-gray-50 pb-6">
          {["Document", "Non-Document"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                value={type}
                {...register("parcelType")}
                className="w-5 h-5 accent-[#C6EB71]"
              />
              <span className="text-sm font-bold text-[#002B36]">{type}</span>
            </label>
          ))}
        </div>

        {/* ২. বেসিক ইনফো (নাম ও ওজন) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Parcel Name</label>
            <input
              {...register("parcelName", { required: "Parcel name is required" })}
              placeholder="e.g. Mango, Documents"
              className={inputClass}
            />
            {errors.parcelName && <p className={errorClass}>{errors.parcelName.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Parcel Weight (KG)</label>
            <input
              type="number"
              step="0.1"
              {...register("parcelWeight", { required: "Weight is required" })}
              placeholder="0.5"
              className={inputClass}
            />
            {errors.parcelWeight && <p className={errorClass}>{errors.parcelWeight.message}</p>}
          </div>
        </div>

        {/* ৩. প্রেরক এবং প্রাপকের ডিটেইলস */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* প্রেরক (Sender) */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-[#002B36] border-b pb-2">Sender Details</h3>
            <input {...register("senderName")} defaultValue={user?.displayName || user?.name} readOnly className={`${inputClass} bg-gray-50`} />
            <input {...register("senderEmail")} defaultValue={user?.email} readOnly className={`${inputClass} bg-gray-50`} />
            
            <input 
              {...register("senderPhone", { required: "Sender phone is required" })} 
              placeholder="Sender Phone No" 
              defaultValue={user?.phone}
              className={inputClass} 
            />
            
            <input 
              {...register("senderAddress", { required: "Sender address is required" })} 
              placeholder="Full Pickup Address" 
              className={inputClass} 
            />

            <div className="grid grid-cols-2 gap-4">
              <select {...register("senderRegion", { required: true })} className={inputClass}>
                <option value="">Select Region</option>
                {allStates.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <select {...register("senderDistrict", { required: true })} disabled={!watchedSenderRegion} className={inputClass}>
                <option value="">Select District</option>
                {filteredSenderDistricts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            {/* Pickup Instruction (নতুন যোগ করা হয়েছে) */}
            <div>
              <label className={labelClass}>Pickup Instruction</label>
              <textarea 
                {...register("pickupInstruction")} 
                placeholder="Any special instruction for pickup?" 
                className={`${inputClass} h-24 resize-none`}
              />
            </div>
          </div>

          {/* প্রাপক (Receiver) */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-[#002B36] border-b pb-2">Receiver Details</h3>
            <input {...register("receiverName", { required: "Receiver name required" })} placeholder="Receiver Name" className={inputClass} />
            <input {...register("receiverEmail", { required: "Receiver email required" })} placeholder="Receiver Email" className={inputClass} />
            <input {...register("receiverPhone", { required: "Receiver phone required" })} placeholder="Receiver Phone" className={inputClass} />
            <input {...register("receiverAddress", { required: "Receiver address required" })} placeholder="Full Delivery Address" className={inputClass} />

            <div className="grid grid-cols-2 gap-4">
              <select {...register("receiverRegion", { required: true })} className={inputClass}>
                <option value="">Select Region</option>
                {allStates.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <select {...register("receiverDistrict", { required: true })} disabled={!watchedReceiverRegion} className={inputClass}>
                <option value="">Select District</option>
                {filteredReceiverDistricts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            {/* Delivery Instruction (নতুন যোগ করা হয়েছে) */}
            <div>
              <label className={labelClass}>Delivery Instruction</label>
              <textarea 
                {...register("deliveryInstruction")} 
                placeholder="Any special instruction for delivery?" 
                className={`${inputClass} h-24 resize-none`}
              />
            </div>
          </div>
        </div>

        {/* সাবমিট বাটন সেকশন */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-100">
          <div className="bg-lime-50 p-4 rounded-xl inline-block text-xs font-bold text-[#002B36]">
            <span className="text-lime-600 mr-2">●</span> PickUp Time 4pm-7pm Approx.
          </div>
          <button
            type="submit"
            className="bg-[#C6EB71] hover:bg-[#b5da56] text-[#002B36] font-extrabold py-4 px-10 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            Proceed to Confirm Booking
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle bg-black/50">
          <div className="modal-box bg-white max-w-md">
            <h3 className="font-bold text-xl text-[#002B36]">Confirm Your Booking</h3>
            <div className="py-6 space-y-3 text-sm text-gray-600 border-b border-gray-100">
              <p className="flex justify-between"><strong>Parcel Name:</strong> <span>{tempFormData?.parcelName}</span></p>
              <p className="flex justify-between"><strong>Weight:</strong> <span>{tempFormData?.parcelWeight} KG</span></p>
              <p className="flex justify-between"><strong>From:</strong> <span>{tempFormData?.senderDistrict}</span></p>
              <p className="flex justify-between"><strong>To:</strong> <span>{tempFormData?.receiverDistrict}</span></p>
              <div className="divider my-1"></div>
              <p className="flex justify-between items-center">
                <strong>Total Delivery Charge:</strong> 
                <span className="text-lime-600 font-bold text-xl">৳{finalCost}</span>
              </p>
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button
                className={`btn bg-[#C6EB71] border-none text-[#002B36] hover:bg-lime-500 px-8 ${isSubmitting ? "loading" : ""}`}
                onClick={() => handleFinalSubmit(reset)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default SendAParcelForm;