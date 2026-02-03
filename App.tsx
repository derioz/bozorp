import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import GallerySection from './components/GallerySection';
import ActivitiesSection from './components/ActivitiesSection';
import RulesSection from './components/RulesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <AboutSection />
        <FeaturesSection />
        <GallerySection />
        <ActivitiesSection />
        <RulesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;