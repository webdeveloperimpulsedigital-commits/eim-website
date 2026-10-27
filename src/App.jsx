import React, { useState, useEffect } from 'react';

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
import ContactPage from './components/ContactPage';
import { url } from './paths';

export default function App() {
  const getIsContactPath = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.replace(/\/+$/, '');
    return path.endsWith('/contact-us') || path.endsWith('/contact');
  };

  const [currentPage] = useState(() => (getIsContactPath() ? 'contact' : 'home'));

  // If user navigates via browser Back / Forward between /contact-us and /, perform clean reload
  useEffect(() => {
    const handlePopState = () => {
      const isContact = getIsContactPath();
      if ((isContact && currentPage !== 'contact') || (!isContact && currentPage === 'contact')) {
        window.location.reload();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  // When landing on homepage with a hash (e.g. /#network or /#careers), scroll smoothly to it
  useEffect(() => {
    if (currentPage === 'home' && window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  // Load GSAP, ScrollTrigger, Lenis, and homepage interactions script on the homepage
  useEffect(() => {
    if (currentPage !== 'home') return;

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
      for (const p of scriptUrls) {
        if (isCancelled) break;
        const src = url(p);
        if (document.querySelector(`script[src="${src}"]`)) continue;
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
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
  }, [currentPage]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header isContactPage={currentPage === 'contact'} />
      <main id="main">
        {currentPage === 'contact' ? (
          <ContactPage />
        ) : (
          <>
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
          </>
        )}
      </main>
      <Footer isContactPage={currentPage === 'contact'} />
    </>
  );
}
