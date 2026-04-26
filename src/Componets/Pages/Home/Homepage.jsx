import React from "react";
import HeroSlider from "./HeroSlider";
import HowItWorks from "./HowItWorks";
import OurServices from "./OurServices";
import PartnerMarquee from "./PartnerMarquee";

const Homepage = () => {
  return (
    <div>
      <HeroSlider />
      <HowItWorks />
      <OurServices />
      <PartnerMarquee />
    </div>
  );
};

export default Homepage;
