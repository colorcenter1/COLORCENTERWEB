import { useState } from 'react';
import { Hero } from './components/hero/Hero';
import { MobileContact } from './components/layout/MobileContact';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { Advice } from './components/sections/Advice';
import { Faq } from './components/sections/Faq';
import { HowToBuy } from './components/sections/HowToBuy';
import { Location } from './components/sections/Location';
import { Products } from './components/sections/Products';
import { Testimonials } from './components/sections/Testimonials';
import { ColorSimulator } from './components/simulator/ColorSimulator';

export default function App() {
  const [isSimulatorActive, setIsSimulatorActive] = useState(false);
  const activateSimulator = () => setIsSimulatorActive(true);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <Hero onTryColors={activateSimulator} />
        <ColorSimulator isActive={isSimulatorActive} onActivate={activateSimulator} />
        <Products />
        <Advice />
        <HowToBuy />
        <Testimonials />
        <Faq />
        <Location />
      </main>
      <SiteFooter />
      <MobileContact />
    </>
  );
}
