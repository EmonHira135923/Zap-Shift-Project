import React from "react";
import { FiCheck, FiX, FiTrash2 } from "react-icons/fi";
const RiderButton = ({ rider }) => {
//   console.log(rider);
  return (
    <div>
      <div className="flex justify-center gap-2">
        <button
          title="Accept"
          className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
        >
          <FiCheck size={18} />
        </button>
        <button
          title="Reject"
          className="p-2 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all"
        >
          <FiX size={18} />
        </button>
        <button
          title="Delete"
          className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default RiderButton;
