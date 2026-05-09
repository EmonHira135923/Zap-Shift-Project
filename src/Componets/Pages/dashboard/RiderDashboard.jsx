import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import useAssigndelivery from "@/Componets/utils/Hooks/useAssigndelivery";
import useCompleteDelivery from "@/Componets/utils/Hooks/useCompleteDelivery";
import useDeliveryParcel from "@/Componets/utils/Hooks/useDeliveryParcel";

const RiderDashboard = ({ user }) => {
  // --- Your Original Hooks ---
  const { data: assigned } = useAssigndelivery({ riderEmail: user?.email });
  const { data: completed } = useDeliveryParcel({ riderEmail: user?.email });
  
  // Destructuring the array returned by your custom useCompleteDelivery hook
  const [completeStats, isLoading] = useCompleteDelivery();

  // --- Data Transformation for Pie Chart ---
  const chartData = [
    {
      name: 'Picked Up',
      value: completeStats?.total?.pickedUpStats?.[0]?.totalPickedUp || 0,
      color: '#C6EB71' // Lime Green
    },
    {
      name: 'Completed',
      value: completeStats?.total?.completeDeliveryStats?.[0]?.totalCompleted || 0,
      color: '#002B36' // Dark Teal
    },
    {
      name: 'Delivered',
      value: completeStats?.total?.deliveredStats?.[0]?.totalDelivered || 0,
      color: '#22C55E' // Success Green
    }
  ].filter(item => item.value > 0); // Only show segments with data

  return (
    <div className="space-y-6">
      {/* --- Your Original Grid Code (Unchanged) --- */}
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

      {/* --- Pie Chart Section --- */}
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-[#002B36] mb-2">Delivery Distribution</h3>
        <p className="text-gray-400 text-sm mb-6">Proportional breakdown of parcel status</p>
        
        <div className="h-[350px] w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-400">Loading chart...</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}   // Makes it a Donut Chart (set to 0 for a solid Pie)
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;