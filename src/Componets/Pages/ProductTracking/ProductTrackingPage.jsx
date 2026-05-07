"use client";
import useProductTracking from "@/Componets/utils/Hooks/useProductTrucking";
import React from "react";
import { useParams } from "next/navigation";
import {
  LuBox,
  LuCircleCheck,
  LuClock,
  LuMapPin,
  LuPackage,
  LuChevronRight,
  LuInfo,
  LuActivity
} from "react-icons/lu";
import { TrackingSkeleton } from "@/Componets/Skeltons/TrackingSkeleton";

const ProductTrackingPage = () => {
  const params = useParams();
  const id = params.id || params.trackingId; 
  const { trackingLogs, isLoading, isError } = useProductTracking(id);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return <LuCircleCheck size={18} />;
      case "pending-pickup": return <LuClock size={18} />;
      case "on-the-way": return <LuBox size={18} />;
      case "picked-up": return <LuPackage size={18} />;
      default: return <LuInfo size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] py-6 md:py-12 px-2 md:px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Breadcrumb - Compact */}
        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest mb-4 ml-1">
          <span className="text-[#475467]">Public</span>
          <LuChevronRight size={8} className="text-[#98A2B3]" />
          <span className="text-[#101828]">Tracking</span>
        </div>

        {/* Header Section: Reduced Padding & Height */}
        <div className="bg-[#001D24] rounded-2xl md:rounded-[2rem] p-5 md:p-8 mb-5 text-white shadow-lg relative overflow-hidden border-b-4 border-[#98B42C]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full mb-3">
              <LuActivity size={12} className="text-[#C6EB71] animate-pulse" />
              <p className="text-[#C6EB71] text-[8px] font-black uppercase tracking-wider">Live Status</p>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black mb-2 tracking-tight text-white leading-none">
              Parcel <span className="text-[#C6EB71]">Status</span>
            </h1>
            
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 inline-flex mt-1">
              <LuMapPin size={12} className="text-[#C6EB71]" />
              <span className="text-[10px] md:text-xs font-black tracking-widest text-white uppercase truncate max-w-[150px]">
                #{id || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Card: Compact Spacing */}
        <div className="bg-white border border-gray-100 rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-md relative">
          
          <div className="mb-6 flex items-center justify-between border-b border-gray-50 pb-4">
             <h2 className="text-sm md:text-lg font-black text-[#101828] uppercase tracking-tighter">
                Delivery <span className="text-[#98B42C]">Timeline</span>
             </h2>
             <div className="px-2 py-0.5 bg-[#101828] rounded-md text-[8px] font-black text-[#C6EB71] uppercase">
                {trackingLogs.length} Steps
             </div>
          </div>

          {isLoading ? (
            <TrackingSkeleton />
          ) : isError ? (
            <div className="text-center py-10 text-[#101828] font-black text-xs uppercase tracking-widest">
              Error Loading Data
            </div>
          ) : (
            <div className="relative">
              {trackingLogs.length > 0 ? (
                <div className="space-y-0">
                  {trackingLogs.map((log, index) => {
                    const isLatest = index === 0;
                    return (
                      <div key={log._id?.$oid || index} className="flex gap-4 md:gap-6 group">
                        
                        {/* Timeline Path: Thinner and Shorter */}
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all z-10 ${
                            isLatest 
                              ? "bg-[#101828] text-[#C6EB71] shadow-md" 
                              : "bg-gray-100 text-[#475467] border border-gray-200"
                          }`}>
                            {getStatusIcon(log.status)}
                          </div>
                          
                          {index !== trackingLogs.length - 1 && (
                            <div className={`w-0.5 h-10 md:h-12 my-1 transition-all ${
                               isLatest ? "bg-[#98B42C]" : "bg-gray-200"
                            }`} />
                          )}
                        </div>

                        {/* Event Details: Tightened Text */}
                        <div className="flex-1 pb-4 md:pb-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-1">
                            <div>
                              <h3 className={`text-xs md:text-sm font-black uppercase tracking-tight ${
                                isLatest ? "text-[#101828]" : "text-[#344054]"
                              }`}>
                                {log.status.replace(/-/g, " ")}
                              </h3>
                              <p className={`text-[11px] md:text-xs mt-1 leading-snug font-bold ${
                                isLatest ? "text-[#1D2939]" : "text-[#667085]"
                              }`}>
                                {log.details}
                              </p>
                            </div>
                            
                            <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 shrink-0">
                               <div className={`text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${
                                 isLatest 
                                  ? "bg-[#98B42C] text-[#101828]" 
                                  : "bg-[#F9FAFB] text-[#344054] border border-gray-200"
                               }`}>
                                 {new Date(log.createdAt?.$date || log.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short'
                                 })}
                               </div>
                               <div className={`text-[8px] font-black mt-1 uppercase ${isLatest ? "text-[#101828]" : "text-[#98A2B3]"}`}>
                                  {new Date(log.createdAt?.$date || log.createdAt).toLocaleTimeString('en-US', {
                                    hour: '2-digit', minute: '2-digit', hour12: true
                                  })}
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 text-[#101828] font-black uppercase text-[10px]">
                  No Updates
                </div>
              )}
            </div>
          )}
        </div>
        
        <p className="mt-8 text-center text-[#98A2B3] text-[8px] font-black uppercase tracking-[0.3em]">
          ZapShift Logistics
        </p>
      </div>
    </div>
  );
};

export default ProductTrackingPage;