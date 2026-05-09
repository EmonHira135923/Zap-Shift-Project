"use client";
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import useParcelStats from "@/Componets/utils/Hooks/useParcelDeliveryStatus";
import useParcels from "@/Componets/utils/Hooks/useParcels";
import useRiders from "@/Componets/utils/Hooks/useRiders";
import useUsers from "@/Componets/utils/Hooks/useUsers";
import usePayments from "@/Componets/utils/Hooks/usePayments";

const COLORS = ["#98B42C", "#002B36", "#0088FE", "#FFBB28", "#FF8042"];

// Default user to empty object to prevent destructuring errors
const AdminDashboard = ({ user = {} }) => {
  // 1. Data Fetching
  const { data: usersData } = useUsers(user, "", 1);
  const { data: parcelsData } = useParcels(user?.email, "", 1);
  const { data: ridersData } = useRiders({ email: user?.email });
  const { data: paymentsData } = usePayments(user?.email, "", 1);
  const { stats, isLoading: statsLoading } = useParcelStats();

  // 2. Logic
  const totalRevenue = paymentsData?.payments?.reduce((acc, curr) => acc + (curr.price || 0), 0) || 0;

  const summaryStats = [
    { label: "Total Users", count: usersData?.total || 0, color: "text-blue-500" },
    { label: "Total Parcels", count: parcelsData?.total || 0, color: "text-[#98B42C]" },
    { label: "Active Riders", count: ridersData?.total || 0, color: "text-[#002B36]" },
    { label: "Total Revenue", count: `$${totalRevenue.toFixed(2)}`, color: "text-orange-600" },
  ];

  if (statsLoading) return <div className="p-10 text-center font-bold">Loading Analytics...</div>;

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h2 className={`text-3xl font-black ${stat.color}`}>{stat.count}</h2>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Delivery Chart */}
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-[#002B36] mb-6">Delivery Status</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.delivery || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="status" tick={{ fontSize: 10, fontWeight: "bold" }} />
                <YAxis />
                <Tooltip contentStyle={{ borderRadius: "15px", border: "none" }} />
                <Bar dataKey="count" fill="#98B42C" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Chart */}
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-[#002B36] mb-6">Payment Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.payment || []}
                  cx="50%" cy="50%"
                  innerRadius={70} outerRadius={100}
                  paddingAngle={8}
                  dataKey="count" nameKey="status"
                >
                  {(stats?.payment || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;