import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import BuildWith from '@/components/BuildWith';
import Testimonials from '@/components/Testimonials';
import Budget from '@/components/Budget';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <TopBar />
      <Hero />
      <Projects />
      <BuildWith />
      <Testimonials />
      <Budget />
      <Contact />
      <Footer />
    </>
  );
}
