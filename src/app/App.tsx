import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { HowItWorks } from "./components/HowItWorks";
import { Portfolio } from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Pricing } from "./components/Pricing";
import { Partners } from "./components/Partners";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div style={{ fontFamily: "'Cairo', sans-serif", background: "#F8F9FC" }}>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <Portfolio />
      <Testimonials />
      <WhyChooseUs />
      <Pricing />
      <Partners />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
