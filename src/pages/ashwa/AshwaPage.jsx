import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FleetAssessmentForm from '../../components/FleetAssessmentForm';
import useRuntime from '../../utils/useRuntime';
import { url, PAGES } from '../../paths';

import Hero from './Hero';
import Explore from './Explore';
import Specs from './Specs';
import BuiltFor from './BuiltFor';
import Made from './Made';
import Care from './Care';

// Solutions / ASHWA e-tractor
// Sources: EIM Corporate Presentation (Jun 26), slides 9, 13, 15, 19, 20, 30, 32;
// energyinmotion.in (ARAI homologation, Talegaon plant, Foton award, after-sales, 500-vehicle MoU, testimonials).
// After-sales has no standalone page: the website carries three lines on it, so it lives here with the truck.
export default function AshwaPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="solutions" />
      <main id="main">
        <Hero />
        <Explore />
        <Specs />
        <BuiltFor />
        <Made />
        <Care />
        <FleetAssessmentForm
          title={<>Put ASHWA on your routes. <em>We'll run the numbers.</em></>}
          lede={<>Tell us your loads and routes. Our team will come back with the trucks, the swap plan and the cost per kilometre, on <a className="link" href={url(PAGES.maitryi)}>Maitryi</a>.</>}
        />
      </main>
      <Footer />
    </>
  );
}
