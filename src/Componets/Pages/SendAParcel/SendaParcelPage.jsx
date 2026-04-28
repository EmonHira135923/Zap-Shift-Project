"use client";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import axios from "axios";
import { data } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SendaParcelPage = () => {
  const [allStates, setAllStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempFormData, setTempFormData] = useState(null);
  const [finalCost, setFinalCost] = useState(0);
  const {user} = useAuth();


  console.log("user",user)

  // React Hook Form Initialization
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

  // Watchers for filtering
  const watchedSenderRegion = watch("senderRegion");
  const watchedReceiverRegion = watch("receiverRegion");

  const [filteredSenderDistricts, setFilteredSenderDistricts] = useState([]);
  const [filteredReceiverDistricts, setFilteredReceiverDistricts] = useState(
    [],
  );

  // ডাটা ফেচ করা
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resState = await axios.get("/data/bdstate.json");
        const resDistrict = await axios.get("/data/bddistrict.json");
        // যেহেতু Axios সরাসরি ডাটা দেয়, .json() করার দরকার নেই
        setAllStates(resState.data);
        setAllDistricts(resDistrict.data);
        // console.log("district and region data",resState.data,resDistrict.data);
      } catch (err) {
        console.error("Data fetching failed:", err);
      }
    };
    fetchData();
  }, []);

  // console.log("district and region",allStates,allDistricts);

  // Sender District Filtering
  useEffect(() => {
    if (watchedSenderRegion) {
      const filtered = allDistricts.filter(
        (d) => d.stateId === parseInt(watchedSenderRegion),
      );
      setFilteredSenderDistricts(filtered);
      setValue("senderDistrict", ""); // রিজিয়ন চেঞ্জ হলে জেলা রিসেট হবে
    }
  }, [watchedSenderRegion, allDistricts, setValue]);

  // Receiver District Filtering
  useEffect(() => {
    if (watchedReceiverRegion) {
      const filtered = allDistricts.filter(
        (d) => d.stateId === parseInt(watchedReceiverRegion),
      );
      setFilteredReceiverDistricts(filtered);
      setValue("receiverDistrict", ""); // রিজিয়ন চেঞ্জ হলে জেলা রিসেট হবে
    }
  }, [watchedReceiverRegion, allDistricts, setValue]);

  // বাটনে ক্লিক করলে আগে এই ফাংশনটি কল হবে
  const onSubmit = (data) => {
    const isDocument = data.parcelType === "Document";
    const isDistrict = data.senderDistrict === data.receiverDistrict;
    let isWeight = parseFloat(data.parcelWeight) || 0;

    const baseCost = isDocument
      ? isDistrict
        ? 60
        : 80
      : isDistrict
        ? 110
        : 150;
    let coast = baseCost;

    if (!isDocument && isWeight > 3) {
      const extraWeight = isWeight - 3;
      const extraCharge = isDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
      coast += extraCharge;
    }

    setFinalCost(coast); // খরচ সেভ করা
    setTempFormData(data); // ফরম ডাটা সেভ করা
    setIsModalOpen(true); // মডাল ওপেন করা
  };

  // মডালে 'Confirm' বাটনে ক্লিক করলে এটি কল হবে
  const handleFinalSubmit = () => {
    // ফর্মের ডাটার সাথে শুধু ক্যালকুলেট করা কস্ট যোগ করে পাঠানো হচ্ছে
    const finalData = {
      ...tempFormData,
      cost: finalCost,
    };

    console.log("Submitting to API:", finalData);

    // আপনার API কল
    axios
      .post("/api/parcels", finalData)
      .then((res) => {
        console.log("response", res);
        if (res.data.message.insertedId) {
          toast.success(`Booking Confirmed! Total: ৳${finalCost}`);
          setIsModalOpen(false);
          reset();
        }
      })
      .catch((err) => {
        console.error("Error submitting:", err);
        toast.error("Submission failed!");
      });
  };

  const inputClass =
    "w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-400 text-sm transition-all";
  const labelClass = "block text-sm font-bold text-[#002B36] mb-2";
  const errorClass = "text-red-500 text-[10px] mt-1 font-semibold";

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Parcel Type & Basic Info */}
          <div className="space-y-6">
            <div className="flex gap-8 items-center border-b border-gray-50 pb-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  value="Document"
                  {...register("parcelType")}
                  className="w-5 h-5 accent-[#C6EB71]"
                />
                <span className="text-sm font-bold text-[#002B36] group-hover:text-black">
                  Document
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  value="Non-Document"
                  {...register("parcelType")}
                  className="w-5 h-5 accent-[#C6EB71]"
                />
                <span className="text-sm font-bold text-[#002B36] group-hover:text-black">
                  Non-Document
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Parcel Name</label>
                <input
                  {...register("parcelName", { required: "Name is required" })}
                  type="text"
                  placeholder="Parcel Name"
                  className={inputClass}
                />
                {errors.parcelName && (
                  <p className={errorClass}>{errors.parcelName.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Parcel Weight (KG)</label>
                <input
                  {...register("parcelWeight", {
                    required: "Weight is required",
                  })}
                  type="number"
                  placeholder="Parcel Weight (KG)"
                  className={inputClass}
                />
                {errors.parcelWeight && (
                  <p className={errorClass}>{errors.parcelWeight.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Sender Details */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-[#002B36] border-b pb-2">
                Sender Details
              </h3>
              <div>
                <label className={labelClass}>Sender Name</label>
                <input
                  {...register("senderName", {
                    required: "Sender name required",
                  })}
                  type="text"
                  placeholder="Sender Name"
                  defaultValue={user?.name}
                  readOnly
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Sender Email</label>
                <input
                  {...register("senderEmail", {
                    required: "Sender email required",
                  })}
                  type="email"
                  placeholder="Sender Email"
                  defaultValue={user?.email}
                  readOnly
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Sender Address</label>
                <input
                  {...register("senderAddress", {
                    required: "Address required",
                  })}
                  type="text"
                  placeholder="Full Address"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Sender Phone No</label>
                <input
                  {...register("senderPhone", { required: "Phone required" })}
                  type="tel"
                  placeholder="01XXX XXXXXX"
                  defaultValue={user?.phone}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Sender Region</label>
                  <select
                    {...register("senderRegion", { required: true })}
                    className={inputClass}
                  >
                    <option value="">Select Region</option>
                    {allStates.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Sender District</label>
                  <select
                    {...register("senderDistrict", { required: true })}
                    className={inputClass}
                    disabled={!watchedSenderRegion}
                  >
                    <option value="">Select District</option>
                    {filteredSenderDistricts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Pickup Instruction</label>
                <textarea
                  {...register("pickupInstruction")}
                  placeholder="Any specific instruction for pickup?"
                  className={`${inputClass} h-28 resize-none`}
                ></textarea>
              </div>
            </div>

            {/* Receiver Details */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-[#002B36] border-b pb-2">
                Receiver Details
              </h3>
              <div>
                <label className={labelClass}>Receiver Name</label>
                <input
                  {...register("receiverName", {
                    required: "Receiver name required",
                  })}
                  type="text"
                  placeholder="Receiver Name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Receiver Email</label>
                <input
                  {...register("receiverEmail", {
                    required: "Receiver email required",
                  })}
                  type="email"
                  placeholder="Receiver Email"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Receiver Address</label>
                <input
                  {...register("receiverAddress", {
                    required: "Address required",
                  })}
                  type="text"
                  placeholder="Full Address"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Receiver Contact No</label>
                <input
                  {...register("receiverPhone", {
                    required: "Contact required",
                  })}
                  type="tel"
                  placeholder="01XXX XXXXXX"
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Receiver Region</label>
                  <select
                    {...register("receiverRegion", { required: true })}
                    className={inputClass}
                  >
                    <option value="">Select Region</option>
                    {allStates.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Receiver District</label>
                  <select
                    {...register("receiverDistrict", { required: true })}
                    className={inputClass}
                    disabled={!watchedReceiverRegion}
                  >
                    <option value="">Select District</option>
                    {filteredReceiverDistricts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Delivery Instruction</label>
                <textarea
                  {...register("deliveryInstruction")}
                  placeholder="Any specific instruction for delivery?"
                  className={`${inputClass} h-28 resize-none`}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-100">
            <div className="bg-lime-50 p-4 rounded-xl inline-block">
              <p className="text-xs font-bold text-[#002B36]">
                <span className="text-lime-600 mr-2">●</span>
                PickUp Time 4pm-7pm Approx.
              </p>
            </div>
            <button
              type="submit"
              className="bg-[#C6EB71] hover:bg-[#b5da56] text-[#002B36] font-extrabold py-4 px-10 rounded-2xl shadow-lg shadow-lime-100 transition-all transform active:scale-95"
            >
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
        {/* Confirmation Modal */}
        {isModalOpen && (
          <dialog
            open
            className="modal modal-bottom sm:modal-middle bg-black/50"
          >
            <div className="modal-box bg-white">
              <h3 className="font-bold text-xl text-[#002B36]">
                Confirm Your Booking
              </h3>
              <div className="py-6 space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Parcel Name:</strong> {tempFormData?.parcelName}
                </p>
                <p>
                  <strong>Total Weight:</strong> {tempFormData?.parcelWeight} KG
                </p>
                <p>
                  <strong>Delivery Charge:</strong>{" "}
                  <span className="text-lime-600 font-bold text-lg">
                    ৳{finalCost}
                  </span>
                </p>
                <div className="divider"></div>
                <label className="flex items-center gap-2 cursor-pointer mt-4">
                  <input
                    type="checkbox"
                    required
                    className="checkbox checkbox-sm checkbox-success"
                  />
                  <span>I agree to the terms and conditions of ZapShift.</span>
                </label>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn bg-[#C6EB71] border-none text-[#002B36] hover:bg-lime-500"
                  onClick={handleFinalSubmit}
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </section>
  );
};

export default SendaParcelPage;
