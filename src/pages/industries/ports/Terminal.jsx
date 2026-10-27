import React from 'react';

// "EIM in your terminal": a plan of a container terminal, drawn only with straight lines, with trucks
// circling quay → yard → swap station → gate. Each zone lights up as its benefit is read.
// Benefits, from the sources: swap under 7 minutes, charge about an hour (slides 15, 17, 19); 55 t, 2,500 Nm,
// ADAS, 360° camera, AC suspended cab (slides 19, 20); 100 e-tractors a day per station, less land per truck,
// even grid load, renewable power (slides 15, 16, 17); 24x7 team, mobile vans, porta-cabin workshops
// (energyinmotion.in); swap scheduling, live monitoring, API (slide 16).
const ZONES = [
  {
    name: 'At the quay',
    title: <>Keeps pace with the cranes. <em>Not with a charger.</em></>,
    text: 'Quay-to-yard moves are short and never stop. A swap in under 7 minutes, instead of about an hour on a charger, keeps every truck in the cycle instead of waiting for it.',
    chips: ['55 t gross combination weight', '2,500 Nm peak torque'],
  },
  {
    name: 'In the yard',
    title: <>Eyes all around. <em>In the tightest lanes.</em></>,
    text: 'ADAS with forward collision and lane departure warning, a 360-degree camera, and an air-conditioned, suspended cab for the driver working the stacks all shift.',
    chips: ['360-degree camera', 'ADAS'],
  },
  {
    name: 'At the swap station',
    title: <>One station. <em>The whole fleet.</em></>,
    text: 'One swap station can keep up to 100 e-tractors a day moving. It needs less land for every truck it serves than a charging yard, puts an even load on your power supply, and its packs are charged with as much renewable power as we can source.',
    chips: ['Up to 100 e-tractors a day', 'Even load on the grid'],
  },
  {
    name: 'At the workshop',
    title: <>Service, around the clock. <em>Vans that come to you.</em></>,
    text: 'Our service team works 24x7, with mobile service vans and porta-cabin workshops equipped with specialised tools and spare parts.',
    chips: ['24x7 service team', 'Mobile service vans'],
  },
  {
    name: 'Through the gate',
    title: <>Runs to the CFS and ICD. <em>Planned around the shift.</em></>,
    text: 'Our software schedules every swap and charge, tracks each truck live and connects to your own systems through an API, so the runs out of the gate fit the shift, not the battery.',
    chips: ['Swap scheduling', 'API to your systems'],
  },
];

const STACKS = [];
[190, 262, 334, 406].forEach((y) => { for (let c = 0; c < 6; c += 1) STACKS.push([70 + c * 112, y]); });
const CRANES = [160, 300, 440, 580];
// zone highlight boxes and the corner where each zone's number tag sits
const ZBOX = [[40, 482, 740, 136], [56, 178, 690, 282], [846, 288, 240, 154], [886, 468, 160, 82], [1060, 8, 132, 202]];

function Plan() {
  return (
    <svg className="tm__svg" viewBox="0 0 1200 720" role="img" aria-label="Illustration: a container terminal with a quay and cranes, a container yard, an EIM swap station, a workshop and a gate leading to the CFS and ICD, with e-trucks circling between them">
      <defs>
        <pattern id="tmSea" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(27.5)">
          <line x1="0" y1="0" x2="0" y2="22" className="tm-hatch" />
        </pattern>
      </defs>

      <rect x="0" y="620" width="1200" height="100" fill="url(#tmSea)" />
      <rect className="tm-ship" x="100" y="640" width="640" height="56" />
      <text className="tm-lab tm-lab--soft" x="700" y="676" textAnchor="end">Vessel</text>
      <line className="tm-edge" x1="20" y1="620" x2="1180" y2="620" />

      {ZBOX.map(([x, y, w, h], i) => <rect key={'z' + i} className="tm-zone" data-z={i} x={x} y={y} width={w} height={h} />)}

      {STACKS.map(([x, y]) => <rect key={x + '-' + y} className="tm-stack" x={x} y={y} width="96" height="46" />)}
      <text className="tm-lab tm-lab--soft" x="70" y="476">Container yard</text>

      {CRANES.map((x) => (
        <g key={x} className="tm-crane">
          <rect x={x - 18} y="500" width="36" height="150" />
          <line x1={x - 18} y1="560" x2={x + 18} y2="560" />
        </g>
      ))}
      <text className="tm-lab tm-lab--soft" x="640" y="604">Quay</text>

      <path id="tmRoute" className="tm-route" d="M120 488 H800 V365 H1110 V170 H40 V488 Z" />

      <g className="tm-station">
        <rect x="860" y="300" width="210" height="130" />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} className="tm-rack" x={878 + i * 38} y="318" width="24" height="38" />)}
        <text className="tm-lab tm-lab--teal" x="878" y="412">Swap station</text>
      </g>

      <g className="tm-shop">
        <rect x="900" y="480" width="130" height="58" />
        <text className="tm-lab" x="912" y="515">Workshop</text>
      </g>

      <g className="tm-gate">
        <line className="tm-road" x1="1110" y1="150" x2="1188" y2="0" />
        <line className="tm-road" x1="1146" y1="150" x2="1200" y2="46" />
        <rect x="1086" y="150" width="10" height="40" />
        <rect x="1150" y="150" width="10" height="40" />
        <text className="tm-lab" x="1050" y="112" textAnchor="end">To CFS and ICD</text>
        <line className="tm-road tm-road--thin" x1="1056" y1="106" x2="1102" y2="106" />
      </g>

      {[0, 1, 2].map((i) => (
        <g key={'t' + i} className="tm-truck" data-t={i}><polygon points="-18,-8 14,-8 18,8 -14,8" /></g>
      ))}

      {ZBOX.map(([x, y], i) => (
        <g key={'g' + i} className="tm-tag" data-z={i} transform={`translate(${x + 8} ${y + 8})`}>
          <polygon points="8,0 44,0 36,26 0,26" />
          <text x="22" y="18" textAnchor="middle">{String(i + 1).padStart(2, '0')}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Terminal() {
  return (
    <section className="tm sec" id="terminal" aria-labelledby="tm-h">
      <div className="wrap shead">
        <h2 className="h2" id="tm-h">EIM in your terminal. <em>Zone by zone.</em></h2>
        <p className="lede">What changes when your container moves run on our e-tractors, swap stations and service, from the quay to the gate.</p>
      </div>
      <div className="wrap tm__grid">
        <div className="tm__stage">
          <Plan />
          <p className="tm__note">Illustration of a container terminal, not to scale.</p>
        </div>
        <ol className="tm__steps">
          {ZONES.map((z, i) => (
            <li className="tmz" key={z.name} data-z={i}>
              <p className="chap__n">{String(i + 1).padStart(2, '0')}<span>{z.name}</span></p>
              <h3 className="tmz__h">{z.title}</h3>
              <p className="tmz__p">{z.text}</p>
              <ul className="tmz__chips">{z.chips.map((c) => <li key={c}>{c}</li>)}</ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
