export const AllRidersTableSkeleton = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <tr key={i} className="animate-pulse border-b border-gray-100">
        <td className="py-4 px-4">
          <div className="h-4 bg-gray-200 rounded w-10"></div>
        </td>
        <td className="py-4 px-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </td>
        <td className="py-4 px-4">
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </td>
        <td className="py-4 px-4">
          <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
        </td>
        <td className="py-4 px-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </td>
        <td className="py-4 px-4">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </td>
        <td className="py-4 px-4">
          <div className="flex justify-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
          </div>
        </td>
      </tr>
    ))}
  </>
);
