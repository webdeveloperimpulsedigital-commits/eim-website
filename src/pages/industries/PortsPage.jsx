import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FleetAssessmentForm from '../../components/FleetAssessmentForm';
import useRuntime from '../../utils/useRuntime';

import PortsHero from './ports/PortsHero';
import Pace from './ports/Pace';
import Jnpa from './ports/Jnpa';

// Industries / Ports and container terminals. Short on purpose: what EIM means for a port, then the proof at JNPA.
// Sources: energyinmotion.in (with its press releases) and the corporate deck, nothing else. Pictures: Creative
// Assets and the website. Ecosystem material (swap vs charge, how to go electric) lives on its own pages.
export default function PortsPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="industries" onDark />
      <main id="main">
        <PortsHero />
        <Pace />
        <Jnpa />
        <FleetAssessmentForm
          title={<>Run a port fleet? <em>Let's plan the switch.</em></>}
          lede="Tell us your terminal, your moves and your shifts. Our team will come back with the trucks, the station and the cost per kilometre for your operation."
        />
      </main>
      <Footer />
    </>
  );
}
