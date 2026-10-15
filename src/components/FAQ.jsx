import React from 'react';

export default function FAQ() {
  const faqList = [
    {
      q: 'Who owns the battery?',
      a: 'EIM does. Under Maitryi you buy the e-tractor without the pack. EIM provides the battery on a per-use or fixed-cost basis and carries its warranty, functionality and ageing risk.',
    },
    {
      q: 'How long does a swap take?',
      a: 'Under 7 minutes from rolling in to driving out. A single swap station can serve up to 100 e-tractors a day.',
    },
    {
      q: 'Can I finance the truck?',
      a: 'Yes. Lenders are already financing EIM tractors without the battery, on terms on par with diesel vehicle financing.',
    },
    {
      q: 'What if there\'s no swap station on my route?',
      a: 'Tell us the route. EIM stations also carry CCS2 DC fast chargers that work with any brand, and the network is expanding corridor by corridor.',
    },
    {
      q: 'Who services the trucks?',
      a: 'Our after-sales team runs 24x7 across India, with mobile service vans and equipped workshops.',
    },
  ];

  return (
    <section className="faq sec" id="faq" aria-labelledby="faq-h">
      <div className="wrap faq__grid">
        <h2 className="h2" id="faq-h">
          Questions fleet owners ask us first.
        </h2>
        <div className="faq__list">
          {faqList.map((item, i) => (
            <details key={i}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
