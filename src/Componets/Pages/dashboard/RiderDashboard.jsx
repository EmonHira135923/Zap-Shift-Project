import useAssigndelivery from "@/Componets/utils/Hooks/useAssigndelivery";
import useDeliveryParcel from "@/Componets/utils/Hooks/useDeliveryParcel";
import React from "react";

const RiderDashboard = ({ user }) => {
  const { data: assigned } = useAssigndelivery({ riderEmail: user?.email });
  const { data: completed } = useDeliveryParcel({ riderEmail: user?.email });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#002B36] p-8 rounded-[2rem] text-white">
        <p className="text-[#C6EB71] text-xs font-black uppercase mb-1">
          Current Task
        </p>
        <h2 className="text-3xl font-black">{assigned?.total || 0} Assigned</h2>
        <p className="text-gray-400 text-sm mt-2">
          Parcels pending for pickup/delivery
        </p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
        <p className="text-gray-400 text-xs font-black uppercase mb-1">
          Success
        </p>
        <h2 className="text-3xl font-black text-[#002B36]">
          {completed?.total || 0} Delivered
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Total successful deliveries completed
        </p>
      </div>
    </div>
  );
};

export default RiderDashboard;
