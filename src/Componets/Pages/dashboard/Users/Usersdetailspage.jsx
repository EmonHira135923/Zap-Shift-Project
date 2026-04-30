import Image from "next/image";
import React from "react";
import { FaEnvelope, FaShieldAlt, FaSignInAlt, FaCalendarAlt } from "react-icons/fa";

const Usersdetailspage = ({ user }) => {
  if (!user) return null;

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen flex justify-center items-center font-sans">
      <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 max-w-sm w-full overflow-hidden">
        
        {/* Top Header Section with Gradient */}
        <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative">
           <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div className="relative w-28 h-28">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
                />
              </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 pb-10 px-8 text-center">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{user.name}</h1>
            <div className="flex items-center justify-center gap-1.5 mt-1 text-blue-600 font-bold text-[10px] uppercase tracking-[2px]">
              <FaShieldAlt size={10} />
              {user.role}
            </div>
          </div>

          <div className="space-y-4 text-left bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <InfoItem 
              icon={<FaEnvelope className="text-slate-400" />} 
              label="Email Address" 
              value={user.email} 
            />
            <InfoItem 
              icon={<FaSignInAlt className="text-slate-400" />} 
              label="Provider" 
              value={user.provider} 
            />
             <InfoItem 
              icon={<FaCalendarAlt className="text-slate-400" />} 
              label="Joined Date" 
              value={new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} 
            />
          </div>

          <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

// ছোট হেল্পার কম্পোনেন্ট
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none">{label}</p>
      <p className="text-sm font-semibold text-slate-700 mt-1 truncate max-w-[180px]">{value}</p>
    </div>
  </div>
);

export default Usersdetailspage;