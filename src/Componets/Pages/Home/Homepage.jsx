import React from "react";
import HeroSlider from "./HeroSlider";
import HowItWorks from "./HowItWorks";
import OurServices from "./OurServices";
import PartnerMarquee from "./PartnerMarquee";
import Testimonials from "./Testimonials";
import MerchantCTA from "./MerchantCTA";
import FAQSection from "./FAQSection";

const Homepage = () => {
  return (
    <div>
      <HeroSlider />
      <HowItWorks />
      <OurServices />
      <PartnerMarquee />
      <MerchantCTA />
      <Testimonials />
      <FAQSection />
    </div>
  );
};

export default Homepage;
