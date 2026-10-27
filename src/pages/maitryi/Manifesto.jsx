import React from 'react';

// The reason in one paragraph. Words light up as the reader scrolls through them.
// "With its battery in the price": presentation slide 22 ("With Battery (other EV suppliers)").
// "The most critical part" and the worry about it: EIM meeting notes.
export default function Manifesto() {
  return (
    <section className="mani sec sec--dark" aria-labelledby="mani-h">
      <div className="wrap mani__in">
        <h2 className="mani__lbl" id="mani-h">Why we sell it this way</h2>
        <p className="mani__t">
          An electric truck usually comes with its battery in the price. The battery is the most critical part of the truck, the part that ages, and the part fleet owners worry about most. <em>So we took it out of the sale.</em>
        </p>
      </div>
    </section>
  );
}
