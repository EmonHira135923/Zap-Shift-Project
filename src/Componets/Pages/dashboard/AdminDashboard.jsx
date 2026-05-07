import useParcels from "@/Componets/utils/Hooks/useParcels";
import useRiders from "@/Componets/utils/Hooks/useRiders";
import useUsers from "@/Componets/utils/Hooks/useUsers";
import React from "react";

const AdminDashboard = ({ user }) => {
  const { data: usersData } = useUsers(user, "", 1);
  const { data: parcelsData } = useParcels(user?.email, "", 1);
  const { data: ridersData } = useRiders({ email: user?.email });

  const stats = [
    {
      label: "Total Users",
      count: usersData?.total || 0,
      color: "bg-blue-500",
    },
    {
      label: "Total Parcels",
      count: parcelsData?.total || 0,
      color: "bg-[#98B42C]",
    },
    {
      label: "Active Riders",
      count: ridersData?.total || 0,
      color: "bg-[#002B36]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm"
        >
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
            {stat.label}
          </p>
          <h2 className="text-4xl font-black text-[#002B36]">{stat.count}</h2>
        </div>
      ))}
      {/* এখানে আপনি অ্যাডমিনের গ্রাফ বা চার্ট এড করতে পারেন */}
    </div>
  );
};

export default AdminDashboard;
