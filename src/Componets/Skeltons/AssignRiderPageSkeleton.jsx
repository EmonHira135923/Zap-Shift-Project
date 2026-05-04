const AssignRiderPageSkeleton = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <tr key={i} className="animate-pulse">
        <td className="px-6 py-6">
          <div className="space-y-2">
            <div className="h-4 w-36 bg-gray-200 rounded"></div>
            <div className="h-3 w-20 bg-gray-100 rounded"></div>
          </div>
        </td>
        <td className="px-6 py-6">
          <div className="h-4 w-12 bg-gray-100 rounded mx-auto"></div>
        </td>
        <td className="px-6 py-6">
          <div className="h-4 w-16 bg-gray-100 rounded mx-auto"></div>
        </td>
        <td className="px-6 py-6">
          <div className="h-6 w-24 bg-amber-50 rounded-md mx-auto"></div>
        </td>
        <td className="px-6 py-6">
          <div className="h-9 w-28 bg-gray-200 rounded-xl ml-auto"></div>
        </td>
      </tr>
    ))}
  </>
);

export default AssignRiderPageSkeleton;
