import Link from "next/link";
import React from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const UsersButton = ({ user }) => {
  console.log(user);
  return (
    <div>
      <div className="flex justify-end gap-2">
        <Link
          href={`/dashboard/users/${user?._id}`}
          className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
          title="View"
        >
          <FaEye size={14} />
        </Link>
        <Link
          href={`/dashboard/update-users/${user?._id}`}
          className="p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors"
          title="Edit"
        >
          <FaEdit size={14} />
        </Link>
        <button
          className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
          title="Delete"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    </div>
  );
};

export default UsersButton;
