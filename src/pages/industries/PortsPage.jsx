import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FleetAssessmentForm from '../../components/FleetAssessmentForm';
import useRuntime from '../../utils/useRuntime';

import IndustryHero from './IndustryHero';
import Terminal from './ports/Terminal';
import GoElectric from './ports/GoElectric';
import Proof from './ports/Proof';

// Industries / Ports and container terminals. The first industry page; the others follow its template.
// The page is about what a port or terminal operator gains; deployments and numbers live in one place (Proof).
// Hero benefits: swap under 7 minutes vs about an hour (slides 15, 17); less land per truck (slide 17);
// scheduled swaps and 24x7 service (slide 16, energyinmotion.in). Night fleet picture: Creative Assets.
const SCENES = [
  {
    name: 'At the quay', href: '#terminal',
    img: 'assets/img/ind/i-ports.webp', w: 1100, h: 1467, pos: '38% 60%',
    lab: 'At the quay', n: 'Keeps pace', proof: 'A swap in under 7 minutes, not an hour on a charger, keeps trucks in step with the cranes.',
  },
  {
    name: 'In the yard', href: '#terminal',
    img: 'assets/img/ind/i-ports-wide.webp', w: 1800, h: 1200, pos: '34% 60%',
    lab: 'In the yard', n: 'Less land', proof: 'A swap station serves more trucks on less ground than a charging bay for each one.',
  },
  {
    name: 'On the CFS run', href: '#terminal',
    img: 'assets/img/ind/i-ports-night.webp', w: 1200, h: 1600, pos: '50% 72%',
    lab: 'On the CFS run', n: 'Every shift', proof: 'Scheduled swaps and a 24x7 service team keep trucks on the CFS and ICD runs, round the clock.',
  },
];

export default function PortsPage() {
  useRuntime(['assets/js/inner.js']);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header current="industries" onDark />
      <main id="main">
        <IndustryHero
          crumb={['Industries', 'Ports and container terminals']}
          words={['Quay.', 'Yard.', 'CFS.']}
          em="Running electric."
          sub="Container work is short, heavy and constant: quay to yard, yard to CFS, CFS to ICD, all day. Here is what changes for your terminal when it runs on EIM."
          cta2={{ label: 'See it in your terminal', href: '#terminal' }}
          scenes={SCENES}
        />
        <Terminal />
        <GoElectric />
        <Proof />
        <FleetAssessmentForm
          title={<>Run a port fleet? <em>Let's plan the switch.</em></>}
          lede="Tell us your terminal, your moves and your shifts. Our team will come back with the trucks, the station and the cost per kilometre for your operation."
        />
      </main>
      <Footer />
    </>
  );
}
