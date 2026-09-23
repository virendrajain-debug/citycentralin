import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import { getRoute, consumePendingSection, scrollToSection } from './lib/router';
import Hero from './components/Hero';
import BrandStatement from './components/BrandStatement';
import Metrics from './components/Metrics';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Marquee from './components/Marquee';
import SelectedWork from './components/SelectedWork';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import './styles/global.css';

function App() {
  const [route, setRoute] = useState(getRoute());
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (route !== 'home') return;
    const pending = consumePendingSection();
    if (pending) {
      const t = window.setTimeout(() => scrollToSection(pending), 150);
      return () => window.clearTimeout(t);
    }
  }, [route]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      <div className="grid-bg" />
      <CustomCursor />
      <Navbar />

      {route === 'about' ? (
        <main>
          <AboutPage />
        </main>
      ) : (
        <main>
          <Hero />
          <BrandStatement />
          <Metrics />
          <About />
          <WhyChooseUs />
          <Services />
          <Marquee />
          <SelectedWork />
          <Process />
          <Pricing />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </main>
      )}

      <Footer />
      <FloatingActions />
    </>
  );
}

export default App;
