import useParcels from '@/Componets/utils/Hooks/useParcels';
import usePayments from '@/Componets/utils/Hooks/usePayments';
import React from 'react';

const UserDashboard = ({ user }) => {
  const { data: myParcels } = useParcels(user?.email, "", 1);
  const { data: myPayments } = usePayments(user?.email, "", 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-8 rounded-[2rem] border border-[#C6EB71] border-2">
        <p className="text-gray-400 text-xs font-black uppercase mb-1">My Orders</p>
        <h2 className="text-3xl font-black text-[#002B36]">{myParcels?.total || 0} Parcels</h2>
        <button className="mt-4 text-[10px] font-black uppercase bg-[#002B36] text-[#C6EB71] px-4 py-2 rounded-full">
          Track Parcel
        </button>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
        <p className="text-gray-400 text-xs font-black uppercase mb-1">Expenses</p>
        <h2 className="text-3xl font-black text-[#002B36]">{myPayments?.total || 0} Payments</h2>
        <p className="text-gray-400 text-sm mt-2">Total transactions made via Stripe</p>
      </div>
    </div>
  );
};

export default UserDashboard;