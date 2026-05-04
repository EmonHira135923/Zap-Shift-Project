const NavbarAuthSkeleton = () => (
  <div className="flex items-center gap-3 animate-pulse">
    <div className="hidden md:block w-24 h-10 bg-gray-200 rounded-xl"></div>
    <div className="w-10 h-10 md:w-32 md:h-10 bg-gray-200 rounded-full md:rounded-xl"></div>
  </div>
);

export default NavbarAuthSkeleton;
