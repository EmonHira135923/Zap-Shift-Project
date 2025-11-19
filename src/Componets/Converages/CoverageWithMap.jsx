import React, { useState, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import "../../../node_modules/leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const CoverageWithMap = () => {
  const position = [23.685, 90.356]; // Bangladesh center
  const countrydata = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Filter districts based on search
  const filteredDistricts = useMemo(() => {
    if (!searchTerm) return countrydata;
    return countrydata.filter((area) =>
      area.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countrydata, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic is handled by filteredDistricts
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    // You could also center the map on the selected district here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              We are available in 64 districts
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Delivering quality service across all districts of Bangladesh
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <div className="flex-1">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search for a district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold whitespace-nowrap"
              >
                Search District
              </button>
            </form>

            {/* District List */}
            {searchTerm && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-h-60 overflow-y-auto">
                {filteredDistricts.length > 0 ? (
                  <div className="p-2">
                    {filteredDistricts.map((district, index) => (
                      <button
                        key={index}
                        onClick={() => handleDistrictClick(district)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-md transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium text-gray-800">
                          {district.district}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No districts found matching "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              We deliver almost all over Bangladesh
            </h2>
            <p className="text-gray-600 mt-1">
              Click on any marker to see district details
            </p>
          </div>

          {/* Responsive Map Container */}
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
            <MapContainer
              className="w-full h-full rounded-b-xl"
              center={position}
              zoom={7}
              scrollWheelZoom={true}
              style={{ minHeight: "400px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredDistricts.map((area, index) => (
                <Marker
                  key={index}
                  position={[area.latitude, area.longitude]}
                  eventHandlers={{
                    click: () => setSelectedDistrict(area),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <strong className="text-lg text-blue-600">
                        {area.district}
                      </strong>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">
                          📍 Latitude: {area.latitude}
                        </p>
                        <p className="text-sm text-gray-600">
                          📍 Longitude: {area.longitude}
                        </p>
                      </div>
                      <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                        <p className="text-sm text-green-700 font-medium">
                          ✅ Service Available
                        </p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Selected District Info */}
        {selectedDistrict && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-800">
                  {selectedDistrict.district}
                </h3>
                <p className="text-blue-600 mt-1">
                  Service coverage confirmed in this district
                </p>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">64</div>
            <div className="text-gray-600 mt-1">Districts Covered</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-gray-600 mt-1">Bangladesh Coverage</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-gray-600 mt-1">Service Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverageWithMap;
