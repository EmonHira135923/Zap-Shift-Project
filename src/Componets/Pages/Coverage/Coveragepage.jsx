"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import CoveragePageSkeleton from "@/Componets/Skeltons/CoveragePageSkeleton";
import CoverageMapSkeleton from "@/Componets/Skeltons/CoverageMapSkeleton";

// ম্যাপ কম্পোনেন্টকে ডাইনামিকালি ইম্পোর্ট করা হচ্ছে (SSR বন্ধ রাখা হয়েছে)
const MapComponent = dynamic(() => import("@/Componets/Map/MapComponent"), {
  ssr: false,
  loading: () => <CoverageMapSkeleton />,
});

const CoveragePage = () => {
  const [mapdata, setMapData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState(null);

  useEffect(() => {
    axios.get("/data/Map.json")
      .then((res) => {
        setMapData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading map data:", err);
        setLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    return mapdata.filter((item) =>
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mapdata, searchTerm]);

  if (loading) return <CoveragePageSkeleton />;

  return (
    <section className="w-full bg-[#f3f4f6] py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-[#002B36]">
              We are available in {mapdata.length} districts
            </h2>
            <p className="text-gray-500">We deliver almost all over Bangladesh</p>
          </div>

          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#C6EB71]">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search your district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#C6EB71] outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar List */}
          <div className="lg:col-span-1 bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 max-h-[600px] overflow-y-auto">
            <h3 className="font-bold text-[#002B36] mb-4 border-b pb-2 flex justify-between items-center">
              Districts 
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                {filteredData.length} found
              </span>
            </h3>
            <div className="space-y-2">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveLocation([item.latitude, item.longitude])}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      activeLocation && activeLocation[0] === item.latitude
                        ? "bg-[#C6EB71] text-black font-bold shadow-md transform scale-[1.02]"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.district}</span>
                      {activeLocation && activeLocation[0] === item.latitude && (
                         <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 italic">No districts found</div>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-3 h-[600px] rounded-[30px] overflow-hidden border border-gray-100 shadow-xl relative z-0">
            <MapComponent filteredData={filteredData} activeLocation={activeLocation} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoveragePage;
