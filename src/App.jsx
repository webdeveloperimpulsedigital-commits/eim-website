import React, { useEffect } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import ProofStrip from './components/ProofStrip';
import DieselCostCalculator from './components/DieselCostCalculator';
import ReliefManifesto from './components/ReliefManifesto';
import SwapSequence from './components/SwapSequence';
import MaitryiModel from './components/MaitryiModel';
import Ecosystem from './components/Ecosystem';
import Industries from './components/Industries';
import NetworkExplorer from './components/NetworkExplorer';
import TimelineProof from './components/TimelineProof';
import Backers from './components/Backers';
import FAQ from './components/FAQ';
import Careers from './components/Careers';
import FleetAssessmentForm from './components/FleetAssessmentForm';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const scriptUrls = [
      'assets/vendor/gsap.min.js',
      'assets/vendor/ScrollTrigger.min.js',
      'assets/vendor/SplitText.min.js',
      'assets/vendor/Flip.min.js',
      'assets/vendor/DrawSVGPlugin.min.js',
      'assets/vendor/CustomEase.min.js',
      'assets/vendor/motion.js',
      'assets/vendor/lenis.min.js',
      'assets/js/main.js',
    ];

    let isCancelled = false;

    const loadScriptsSequentially = async () => {
      for (const url of scriptUrls) {
        if (isCancelled) break;
        // Avoid duplicate script insertion
        if (document.querySelector(`script[src="${url}"]`)) continue;
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = url;
          script.async = false;
          script.onload = resolve;
          script.onerror = resolve;
          document.body.appendChild(script);
        });
      }
    };

    loadScriptsSequentially();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ProofStrip />
        <DieselCostCalculator />
        <ReliefManifesto />
        <SwapSequence />
        <MaitryiModel />
        <Ecosystem />
        <Industries />
        <NetworkExplorer />
        <TimelineProof />
        <Backers />
        <FAQ />
        <Careers />
        <FleetAssessmentForm />
      </main>
      <Footer />
    </>
  );
}
