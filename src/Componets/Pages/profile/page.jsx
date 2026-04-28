"use client";
import useAuth from '@/Componets/utils/Hooks/useAuth';
import React from 'react';
import Image from 'next/image';
import Profileedit from '@/Componets/buttons/Profileedit';
import Loading from './Loading';

const Profilepage = () => {
    const { user,loading } = useAuth();

    if(loading) return <Loading/>

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-10">
            {/* --- TOP PROFILE CARD --- */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    {/* Image Circle */}
                    <div className="relative h-28 w-28 rounded-full border-[6px] border-[#D4F06D] shadow-xl overflow-hidden bg-gray-50">
                        {user?.image ? (
                            <Image fill src={user.image} alt="User Profile" className="object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-3xl font-black text-gray-300">
                                {user?.name?.charAt(0) || "Z"}
                            </div>
                        )}
                    </div>
                    {/* User Info */}
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 leading-tight">{user?.name || "Zap User"}</h1>
                        <p className="text-[11px] font-black text-[#8da13d] uppercase tracking-[0.3em] mt-1.5 flex items-center justify-center sm:justify-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#D4F06D] animate-pulse"></span>
                            {user?.role || "Member"}
                        </p>
                    </div>
                </div>

                {/* Edit Button - Design Only */}
                <Profileedit user={user}/>
            </div>

            {/* --- INFORMATION DETAILS GRID --- */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between bg-[#f9fbf2]/40">
                    <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">Account Details</h2>
                    <span className="text-[10px] font-bold text-gray-300">USER ID: {user?._id?.slice(-8).toUpperCase() || "NEW-ZAP"}</span>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    {/* Item */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                        <p className="text-[15px] font-bold text-gray-800">{user?.name || "N/A"}</p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                        <p className="text-[15px] font-bold text-gray-800">{user?.email || "N/A"}</p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                        <p className="text-[15px] font-bold text-gray-800">{user?.phone || "Not Linked"}</p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Authentication</label>
                        <p className="text-[15px] font-bold text-gray-800 capitalize">{user?.provider || "Direct"}</p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Member Since</label>
                        <p className="text-[15px] font-bold text-gray-800">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently Joined"}
                        </p>
                    </div>
                </div>
            </div>

            {/* --- ZAPSHIFT STATUS BANNER --- */}
            <div className="bg-black rounded-[32px] p-8 flex items-center justify-between text-white relative overflow-hidden group">
                {/* Decorative background element */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#D4F06D] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                
                <div className="flex items-center gap-5 relative z-10">
                    <div className="h-12 w-12 bg-[#D4F06D] rounded-2xl flex items-center justify-center rotate-3">
                         <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21a3.745 3.745 0 01-3.127-1.593 3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3a3.745 3.745 0 013.127 1.593 3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-lg font-black tracking-tight leading-none">ZapShift Verified</h4>
                        <p className="text-[10px] text-gray-400 mt-1.5 font-bold uppercase tracking-widest">Active Courier Account</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profilepage;