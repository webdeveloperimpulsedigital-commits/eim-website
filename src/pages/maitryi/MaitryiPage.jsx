import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FleetAssessmentForm from '../../components/FleetAssessmentForm';
import useRuntime from '../../utils/useRuntime';

import Hero from './Hero';
import Manifesto from './Manifesto';
import BatteryLife from './BatteryLife';
import Versus from './Versus';
import Included from './Included';
import Voices from './Voices';
import Questions from './Questions';
import Explore from './Explore';

// Solutions / Maitryi model
// Sources: EIM Corporate Presentation (Jun 26), slides 7, 8, 9, 10, 14, 15, 16, 17, 19, 22, 23;
// energyinmotion.in (offerings, after-sales, testimonials); EIM meeting notes (battery life of about seven years).
export default function MaitryiPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="solutions" />
      <main id="main">
        <Hero />
        <Manifesto />
        <BatteryLife />
        <Versus />
        <Included />
        <Voices />
        <Questions />
        <Explore />
        <FleetAssessmentForm
          title={<>Your fleet, on Maitryi. <em>Let's work it out.</em></>}
          lede="Tell us about your trucks and routes. Our team will come back with what Maitryi looks like for your fleet: the trucks, the packs and the cost per kilometre."
          intent="maitryi"
        />
      </main>
      <Footer />
    </>
  );
}
