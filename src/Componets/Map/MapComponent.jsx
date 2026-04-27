"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// আইকন ফিক্স: সার্ভার সাইড রেন্ডারিংয়ে আইকন এরর এড়াতে
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// লোকেশন চেঞ্জ হলে ম্যাপ অ্যানিমেশন করার জন্য
const FlyToMarker = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { duration: 2 });
    }
  }, [position, map]);
  return null;
};

const MapComponent = ({ filteredData, activeLocation }) => {
  return (
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
  );
};

export default MapComponent;