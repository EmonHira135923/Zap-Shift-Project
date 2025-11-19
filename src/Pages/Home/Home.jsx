import React from "react";
import Hero from "../../Componets/Header/Hero";
import HowItWorks from "../../Componets/Header/HowItWorks";
import Services from "../../Componets/Header/Services";
import LogoSlide from "../../Componets/Header/LogoSlide";
import Delivary from "../../Componets/Header/Delivary";
import Marcent from "../../Componets/Header/Marcent";

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Services />
      <LogoSlide />
      <Delivary />
      <Marcent />
    </div>
  );
};

export default Home;
