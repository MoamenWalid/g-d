import React from "react";
import { Routes, Route } from "react-router";
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
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { BlogsPage } from "./pages/BlogsPage";
import { BlogPage } from "./pages/BlogPage";
import { PoliciesPage } from "./pages/PoliciesPage";

export default function App() {
  return (
    <div style={{ fontFamily: "'Cairo', sans-serif", background: "#F8F9FC" }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
        <Route path="/info" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPage />} />
        <Route path="/policies" element={<PoliciesPage />} />
      </Routes>
    </div>
  );
}
