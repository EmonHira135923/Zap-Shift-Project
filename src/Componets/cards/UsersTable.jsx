import React from "react";
import Image from "next/image";
import AllUsersTableRowSkeleton from "../Skeltons/AllUsersTableRowSkeleton";
import UsersButton from "../buttons/UsersButton";

const UsersTable = ({
  users,
  isLoading,
  currentPage = 1,
  itemsPerPage = 10,
}) => {
  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
      {/* Wrapper for responsiveness */}
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-gray-50/50 border-b border-slate-100">
            <tr className="text-[10px] uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <AllUsersTableRowSkeleton key={i} />
                ))
              : users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-lg text-slate-400 font-medium">
                      {String(
                        (currentPage - 1) * itemsPerPage + index + 1,
                      ).padStart(2, "0")}
                    </td>

                    {/* Image, Name, and Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10">
                          <Image
                            // If user.image is empty or null, use a fallback placeholder
                            src={
                              user.image ||
                              "https://i.ibb.co/TBPXQQ0F/users.png"
                            }
                            alt={user.name || "User profile"}
                            fill
                            className="rounded-lg object-cover bg-slate-100"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 leading-none">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          user.role === "admin"
                            ? "bg-purple-50 text-purple-600 border-purple-100"
                            : "bg-blue-50 text-blue-600 border-blue-100"
                        }`}
                      >
                        {user.role?.toUpperCase()}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <UsersButton
                        user={user}
                        isDisabled={user.role === "rider"}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
