import React from "react";
import { FiAlertCircle, FiMapPin, FiPackage } from "react-icons/fi";
import DeliveryAssignTableSkeleton from "../Skeltons/DeliveryAssignTableSkeleton";
import AssignDeliveryButton from "../buttons/AssignDeliveryButton";

const DeliveryAssignTable = ({ parcels, isLoading, error }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase">
                Index
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase">
                Parcel
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase">
                Receiver
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase">
                Address
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase">
                Status
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase text-right">
                Cost
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <DeliveryAssignTableSkeleton />
            ) : error ? (
              <tr>
                <td colSpan="7" className="px-6 py-24 text-center">
                  <FiAlertCircle
                    size={40}
                    className="mx-auto text-red-300 mb-4"
                  />
                  <p className="text-red-500 font-bold">
                    Could not load parcels.
                  </p>
                </td>
              </tr>
            ) : parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-5 text-sm font-bold text-gray-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#C6EB71]/30 flex items-center justify-center text-[#002B36]">
                        <FiPackage />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {parcel.parcelName}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold">
                          {parcel.trackingId}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-gray-700">
                      {parcel.receiverName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {parcel.receiverPhone}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2 text-xs text-gray-500">
                      <FiMapPin className="mt-0.5" />
                      <div>
                        <p>{parcel.receiverDistrict}</p>
                        <p className="text-gray-400">
                          {parcel.receiverAddress}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase">
                      {parcel.DeliveryStatus}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right text-sm font-black text-[#98B42C]">
                    ${parcel.cost}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <AssignDeliveryButton parcel={parcel} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-24 text-center">
                  <FiAlertCircle
                    size={40}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <p className="text-gray-400 font-bold">
                    No assigned delivery found.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryAssignTable;
