"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Search } from "lucide-react"; // Consistent with your icon set
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CoverageSkeleton from "@/Componets/Skeltons/CoverageSkeleton";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const FlyToMarker = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { duration: 2 });
    }
  }, [position, map]);
  return null;
};

const CoveragePage = () => {
  const [mapdata, setMapData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState(null);

  useEffect(() => {
    axios.get("/data/Map.json")
      .then((res) => {
        setMapData(res.data);
        setFilteredData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading map data:", err);
        setLoading(false);
      });
  }, []);

  // Handle live search filtering
  useEffect(() => {
    const results = mapdata.filter((item) =>
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, mapdata]);


  console.log(mapdata)

  if (loading) return <CoverageSkeleton />;

  return (
    <section className="w-full bg-[#f3f4f6] py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Search Bar Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-[#002B36]">
              We are available in {mapdata.length} districts
            </h2>
            <p className="text-gray-500">We deliver almost all over Bangladesh</p>
          </div>

          {/* Search Box Integration */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#C6EB71] transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search your district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#C6EB71] focus:border-transparent outline-none transition-all text-[#002B36] font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar List - Displays Filtered Results */}
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
                <div className="text-center py-10 text-gray-400 italic">
                  No districts found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3 h-[600px] rounded-[30px] overflow-hidden border border-gray-100 shadow-xl z-0">
            <MapContainer
              center={[23.685, 90.3563]}
              zoom={7}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {filteredData.map((item, index) => (
                <Marker
                  key={index}
                  position={[item.latitude, item.longitude]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold text-[#002B36]">{item.city}</h4>
                      <p className="text-xs text-gray-500 mb-2">Region: {item.region}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.covered_area.map((area, i) => (
                          <span key={i} className="bg-[#C6EB71]/20 text-[10px] px-2 py-0.5 rounded-full text-[#002B36] font-medium">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {activeLocation && <FlyToMarker position={activeLocation} />}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoveragePage;