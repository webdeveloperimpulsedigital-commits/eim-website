import React from 'react';
import InnerFaq from '../../components/InnerFaq';

// Maitryi FAQ. Sources: slides 9, 10, 15, 16, 17, 19; EIM (battery life of about seven years;
// Maitryi applies to every sale).
const QA = [
  {
    q: 'Is Maitryi a separate scheme?',
    a: 'No. Maitryi is how we sell every EIM e-tractor. Every truck leaves us without its battery, and every pack stays ours.',
  },
  {
    q: 'Who owns the battery?',
    a: 'We do. You buy the e-tractor without its pack. We provide the battery on a per-use or fixed-cost basis, and its warranty and functionality risk stay with us.',
  },
  {
    q: 'What exactly do I pay for?',
    a: 'The truck, once, without its battery, which takes 40% off the capital it takes to start. After that, you pay as you go for battery use and charging.',
  },
  {
    q: 'What happens when the battery wears out?',
    a: 'A pack reaches the end of its life at around seven years. We replace it. You never pay for a replacement battery.',
  },
  {
    q: 'Can I finance the truck?',
    a: 'Yes. Lenders already finance our e-tractors without the battery, on terms on par with diesel vehicle financing.',
  },
  {
    q: 'How long is a truck off the road for a swap?',
    a: 'Under 7 minutes. The swap is automated, and one station handles up to 100 e-tractors a day. Charging a pack on a fast charger takes about an hour.',
  },
  {
    q: 'What if my route has no swap station yet?',
    a: 'Tell us the route. Our stations also carry CCS2 DC fast chargers, and we plan to set up 100 swap stations by FY29 on the busiest freight corridors.',
  },
];

export default function Questions() {
  return <InnerFaq title={<>Before you sign. <em>What fleet owners ask us.</em></>} items={QA} mist />;
}
