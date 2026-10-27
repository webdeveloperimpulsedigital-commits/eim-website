import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FleetAssessmentForm from '../../components/FleetAssessmentForm';
import NetworkExplorer from '../../components/NetworkExplorer';
import InnerFaq from '../../components/InnerFaq';
import useRuntime from '../../utils/useRuntime';

import Hero from './Hero';
import Compare from './Compare';
import TwoWays from './TwoWays';

// Solutions / Swapping and charging (also the Network page: the menu's Network link lands on #network)
// Sources: EIM Corporate Presentation (Jun 26), slides 10, 15, 16, 17, 19; energyinmotion.in (events,
// HPCL partnership, Vitthal Wable's testimonial). The network module is the homepage's, reused as is:
// it is the same data, and this is now where the Network menu item points.
const QA = [
  {
    q: 'Can a truck that isn’t an ASHWA use your stations?',
    a: 'Yes, to charge. Our high-capacity CCS2 DC fast chargers charge any brand of commercial EV. Battery swapping is for EIM-Foton trucks.',
  },
  {
    q: 'How long does a swap take?',
    a: 'Under 7 minutes. The swap is automated, and one station keeps up to 100 e-tractors a day moving.',
  },
  {
    q: 'And a full charge?',
    a: 'About 60 minutes on a DC fast charger, from 20 to 100%.',
  },
  {
    q: 'Why swap at all, if I can charge?',
    a: 'A swap takes minutes, not an hour. A station swaps and charges at the same time instead of holding one truck per charging gun, needs less land for each truck it serves, and puts an even load on the grid.',
  },
  {
    q: 'Is the power green?',
    a: 'We charge with as much renewable energy as we can source, backed by Ravindra Energy. That helps your Scope 3 emissions compliance.',
  },
  {
    q: 'What if my route has no station yet?',
    a: 'Tell us the route. We plan to set up 100 swap stations by FY29 on the busiest corridors, and with HPCL we are setting up charging and swapping at retail outlets across India.',
  },
];

export default function SwapPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="solutions" />
      <main id="main">
        <Hero />
        <Compare />
        <TwoWays />
        <NetworkExplorer />
        <InnerFaq title={<>Before your first swap. <em>What fleet owners ask us.</em></>} items={QA} />
        <FleetAssessmentForm
          title={<>Tell us your route. <em>We'll show you the stations.</em></>}
          lede="What is open on it today, what is coming, and when. Our team will come back with a plan for swapping and charging your fleet."
          intent="site"
        />
      </main>
      <Footer />
    </>
  );
}
