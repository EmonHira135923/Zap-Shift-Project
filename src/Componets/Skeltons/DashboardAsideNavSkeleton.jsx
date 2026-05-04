const DashboardAsideNavSkeleton = ({ collapsed }) => (
  <div className="space-y-4 animate-pulse px-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-3 py-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        {!collapsed && <div className="h-4 bg-gray-200 rounded w-24"></div>}
      </div>
    ))}
  </div>
);

export default DashboardAsideNavSkeleton;
