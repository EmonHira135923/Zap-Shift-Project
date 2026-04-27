export const NavSkeleton = () => (
  <div className="flex items-center gap-3 animate-pulse">
    {/* Sign In button skeleton */}
    <div className="hidden md:block w-24 h-10 bg-gray-200 rounded-xl"></div>
    {/* Be a rider button skeleton */}
    <div className="hidden md:block w-32 h-10 bg-gray-200 rounded-xl"></div>
    {/* Mobile menu icon skeleton */}
    <div className="lg:hidden w-10 h-10 bg-gray-200 rounded-lg"></div>
  </div>
);