import React from 'react';

export default function ProofStrip() {
  return (
    <section className="motion sec" id="in-motion" aria-labelledby="motion-h">
      <div className="wrap motion__grid">
        <h2 className="h2" id="motion-h">Already on the road. <em>Already in motion.</em></h2>
        <ul className="stats">
          <li className="stat"><b>No.<span className="count" data-to="2">2</span></b><span>in India for electric heavy-duty truck sales, November 2025</span></li>
          <li className="stat"><b>&lt;<span className="count" data-to="7">7</span><small>min</small></b><span>to swap a drained battery for a charged one</span></li>
          <li className="stat"><b><span className="count" data-to="55">55</span></b><span>swap station sites existing, upcoming and planned across India</span></li>
          <li className="stat"><b><span className="count" data-to="500">500</span></b><span>electric heavy commercial vehicles under a deployment MoU with Oil Field Warehouse and Radiance Green Mobility</span></li>
        </ul>
      </div>
      <div className="wrap">
        <ul className="logos" aria-label="Some of EIM's customers">
          <li><img src="assets/brands/ultratech.webp" style={{ '--h': '81px' }} alt="UltraTech Cement" /></li>
          <li><img src="assets/brands/jmbaxi.webp" style={{ '--h': '58px' }} alt="J M Baxi" /></li>
          <li><img src="assets/brands/adani.webp" style={{ '--h': '48px' }} alt="Adani" /></li>
          <li><img src="assets/brands/jsw.webp" style={{ '--h': '57px' }} alt="JSW" /></li>
          <li><img src="assets/brands/dalmia.webp" style={{ '--h': '57px' }} alt="Dalmia Bharat Cement" /></li>
          <li><img src="assets/brands/jklakshmi.webp" style={{ '--h': '73px' }} alt="JK Lakshmi Cement" /></li>
          <li><img src="assets/brands/dpa.webp" style={{ '--h': '72px' }} alt="Deendayal Port Authority, Kandla" /></li>
          <li><img src="assets/brands/vocpa.webp" style={{ '--h': '74px' }} alt="V.O. Chidambaranar Port Authority, Tuticorin" /></li>
          <li><img src="assets/brands/vpa.webp" style={{ '--h': '98px' }} alt="Visakhapatnam Port Authority" /></li>
        </ul>
      </div>
    </section>
  );
}
