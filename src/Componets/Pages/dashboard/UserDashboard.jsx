import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useCompletePaidandParcelDelivery from "@/Componets/utils/Hooks/useCompletePaidandParcelDelivery";
import useParcels from "@/Componets/utils/Hooks/useParcels";
import usePayments from "@/Componets/utils/Hooks/usePayments";

const UserDashboard = ({ user }) => {
  // --- Original Hooks ---
  const { data: myParcels } = useParcels(user?.email, "", 1);
  const { data: myPayments } = usePayments(user?.email, "", 1);

  // Destructuring the array from your custom hook
  const [stats, isLoading] = useCompletePaidandParcelDelivery();

  // --- Chart Data Preparation ---
  const paymentData = [
    { name: "Paid", value: stats?.paid || 0, color: "#C6EB71" },
    { name: "Unpaid", value: stats?.unpaid || 0, color: "#FF6B6B" },
  ];

  const deliveryData = [
    { name: "Delivered", value: stats?.delivered || 0, color: "#002B36" },
    { name: "Pending", value: stats?.pending || 0, color: "#F39C12" },
  ];

  return (
    <div className="space-y-6">
      {/* --- Your Original Metric Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-[#C6EB71] border-2">
          <p className="text-gray-400 text-xs font-black uppercase mb-1">
            My Orders
          </p>
          <h2 className="text-3xl font-black text-[#002B36]">
            {myParcels?.total || 0} Parcels
          </h2>
          <button className="mt-4 text-[10px] font-black uppercase bg-[#002B36] text-[#C6EB71] px-4 py-2 rounded-full">
            Track Parcel
          </button>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
          <p className="text-gray-400 text-xs font-black uppercase mb-1">
            Expenses
          </p>
          <h2 className="text-3xl font-black text-[#002B36]">
            {myPayments?.total || 0} Payments
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Total transactions made via Stripe
          </p>
        </div>
      </div>

      {/* --- Pie Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Chart */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-[#002B36] mb-6 text-center">
            Payment Status
          </h3>
          <div className="h-[300px] w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                Loading...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "1rem",
                      border: "none",
                      boxShadow: "10px 10px 20px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Delivery Chart */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-[#002B36] mb-6 text-center">
            Delivery Progress
          </h3>
          <div className="h-[300px] w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                Loading...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deliveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "1rem",
                      border: "none",
                      boxShadow: "10px 10px 20px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
