import { AllParcelsCardSkeleton } from "./AllParcelsCardSkeleton";

const AllParcelsPageSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <AllParcelsCardSkeleton />
    <AllParcelsCardSkeleton />
    <AllParcelsCardSkeleton />
  </div>
);

export default AllParcelsPageSkeleton;
