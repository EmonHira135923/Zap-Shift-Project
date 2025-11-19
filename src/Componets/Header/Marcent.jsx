import React from "react";
import bannerimgbg from "../../assets/be-a-merchant-bg.png";
import locationimg from "../../assets/location-merchant.png";
import { NavLink } from "react-router";

const Marcent = () => {
  return (
    <div
      className="min-h-[600px] bg-cover bg-center bg-no-repeat py-16 px-4
      bg-[#03373D] rounded-2xl"
      style={{ backgroundImage: `url(${bannerimgbg})` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content Section */}
          <div className="flex-1 text-white space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Merchant and Customer Satisfaction is Our First Priority
            </h2>
            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink
                to=""
                className="btn bg-info text-secondary rounded-2xl px-8 py-4 text-lg font-semibold hover:bg-opacity-90 transition duration-300 text-center"
              >
                Become a Merchant
              </NavLink>
              <NavLink
                to=""
                className="btn text-info border-2 border-info bg-transparent rounded-2xl px-8 py-4 text-lg font-semibold hover:bg-info hover:text-secondary transition duration-300 text-center"
              >
                Earn with ZapShift Courier
              </NavLink>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src={locationimg}
              alt="location map"
              className="max-w-md w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marcent;
