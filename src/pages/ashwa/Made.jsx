import React from 'react';

// Where the truck comes from. Foton exclusivity: slide 9. Homologation in a record 7 months, 282 and 350 kWh:
// energyinmotion.in events. Talegaon assembly plant, June 2026: slide 13 and the website's news.
// Foton award: energyinmotion.in, Awards & Recognition.
const FACTS = [
  { when: 'Foton', t: 'Six years of exclusive rights', d: 'to assemble, market and distribute Foton commercial vehicles above 18 tonnes in India, with co-branding and localisation.' },
  { when: 'July 2025', t: 'Homologated in a record 7 months', d: 'ARAI certified ASHWA as India’s first heavy-duty, battery-swappable 55-tonne electric tractor. The 350 kWh model followed in July 2026.' },
  { when: 'June 2026', t: 'Assembled at Talegaon, Pune', d: 'Our electric heavy commercial vehicle complex at Talegaon is where ASHWA is put together.' },
  { when: '2026', t: 'Foton’s Pioneer in New Energy Promotion', d: 'awarded to us at Foton’s Global Partner’s Conference.' },
];

export default function Made() {
  return (
    <section className="made sec sec--mist" aria-labelledby="made-h">
      <div className="wrap made__grid">
        {/* Placeholder until EIM supplies a photograph of the Talegaon plant */}
        <figure className="made__img made__img--ph" data-placeholder>
          <figcaption>Talegaon photo placeholder</figcaption>
        </figure>
        <div className="made__copy">
          <h2 className="h2" id="made-h">Built with Foton. <em>Assembled in India.</em></h2>
          <ol className="made__facts" data-stagger>
            {FACTS.map((f) => (
              <li key={f.t}>
                <span className="made__when">{f.when}</span>
                <p><b>{f.t}</b> {f.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
