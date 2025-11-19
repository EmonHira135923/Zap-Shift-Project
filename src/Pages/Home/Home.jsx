import React from "react";
import Hero from "../../Componets/Header/Hero";
import HowItWorks from "../../Componets/Header/HowItWorks";
import Services from "../../Componets/Header/Services";
import LogoSlide from "../../Componets/Header/LogoSlide";
import Delivary from "../../Componets/Header/Delivary";
import Marcent from "../../Componets/Header/Marcent";
import CustomerReview from "../../Componets/Header/CustomerReview";
import PostureProFAQ from "../../Componets/Header/PostureProFAQ";

const ReviewPromise = fetch("reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Services />
      <LogoSlide />
      <Delivary />
      <Marcent />
      <CustomerReview ReviewPromise={ReviewPromise} />
      <PostureProFAQ />
    </div>
  );
};

export default Home;
