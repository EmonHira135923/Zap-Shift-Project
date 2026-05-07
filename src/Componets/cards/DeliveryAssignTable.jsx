import React from "react";
import { FiAlertCircle, FiMapPin, FiPackage, FiPhone } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import DeliveryAssignTableSkeleton from "../Skeltons/DeliveryAssignTableSkeleton";
import AssignDeliveryButton from "../buttons/AssignDeliveryButton";
import AssignDeliveryButton2 from "../buttons/AssignDeliveryButton2";

const tableHeaders = [
  "Index",
  "Parcel",
  "Receiver",
  "Address",
  "Status",
  "Cost",
  "Action",
  "Others Action",
];

const formatStatus = (status) =>
  String(status || "Rider assigned")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getStatusStyle = (status) => {
  const normalizedStatus = String(status || "")
    .trim()
    .toLowerCase();

  if (normalizedStatus === "delivered") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }

  if (normalizedStatus === "accepted") {
    return "bg-lime-50 text-lime-700 ring-lime-100";
  }

  if (normalizedStatus === "picked up") {
    return "bg-sky-50 text-sky-700 ring-sky-100";
  }

  if (normalizedStatus === "rejected") {
    return "bg-red-50 text-red-600 ring-red-100";
  }

  if (normalizedStatus === "rider arriving") {
    return "bg-amber-50 text-amber-700 ring-amber-100";
  }

  return "bg-sky-50 text-sky-700 ring-sky-100";
};

const DeliveryAssignTable = ({
  parcels,
  isLoading,
  error,
  currentPage = 1,
  itemsPerPage = 10,
}) => {
  const safeParcels = Array.isArray(parcels) ? parcels : [];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto pb-2 [scrollbar-color:#CBD5E1_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-2">
        <table className="w-full min-w-[1320px] table-fixed text-left">
          <colgroup>
            <col className="w-[6%]" />
            <col className="w-[16%]" />
            <col className="w-[13%]" />
            <col className="w-[16%]" />
            <col className="w-[12%]" />
            <col className="w-[8%]" />
            <col className="w-[12%]" />
            <col className="w-[17%]" />
          </colgroup>

          <thead>
            <tr className="bg-slate-50">
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="border-b border-slate-200 px-6 py-4 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <DeliveryAssignTableSkeleton />
            ) : error ? (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="px-6 py-24 text-center"
                >
                  <FiAlertCircle
                    size={48}
                    className="mx-auto mb-4 text-red-200"
                  />
                  <p className="text-lg font-bold text-red-500">
                    Could not load parcels.
                  </p>
                </td>
              </tr>
            ) : safeParcels.length > 0 ? (
              safeParcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="group transition-colors hover:bg-lime-50/35"
                >
                  <td className="px-6 py-6">
                    <span className="text-sm font-black text-slate-300 transition-colors group-hover:text-slate-500">
                      {String(
                        (currentPage - 1) * itemsPerPage + index + 1,
                      ).padStart(2, "0")}
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C6EB71]/25 text-[#002B36] ring-1 ring-[#C6EB71]/30">
                        <FiPackage size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-[#002B36]">
                          {parcel.parcelName}
                        </p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          {parcel.trackingId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="whitespace-nowrap text-sm font-black text-slate-700">
                      {parcel.receiverName}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-slate-400">
                      <FiPhone size={10} />
                      <span className="text-[11px] font-semibold">
                        {parcel.receiverPhone}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex max-w-[260px] gap-2">
                      <FiMapPin
                        className="mt-1 shrink-0 text-slate-300"
                        size={14}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-600">
                          {parcel.receiverDistrict}
                        </p>
                        <p className="line-clamp-2 text-[11px] leading-5 text-slate-400">
                          {parcel.receiverAddress}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wide ring-1 ${getStatusStyle(
                        parcel.DeliveryStatus,
                      )}`}
                    >
                      {formatStatus(parcel.DeliveryStatus)}
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <span className="whitespace-nowrap text-base font-black text-[#79951D]">
                      ${parcel.cost}
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <AssignDeliveryButton parcel={parcel} />
                  </td>

                  <td className="px-6 py-6 text-right">
                    <AssignDeliveryButton2 parcel={parcel} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="px-6 py-28 text-center"
                >
                  <TbTruckDelivery
                    size={60}
                    className="mx-auto mb-4 text-slate-100"
                  />
                  <p className="text-xl font-black tracking-tight text-slate-400">
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
