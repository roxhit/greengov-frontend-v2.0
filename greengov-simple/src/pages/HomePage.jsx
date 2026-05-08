/*
  pages/HomePage.jsx — Home Page
  ================================
  A "page" component assembles multiple section components into one screen.
  It does NOT contain logic or styling itself — it just arranges pieces.

  FOLDER CONVENTION:
  - pages/     → full-screen views (one per route)
  - components/ → reusable UI pieces (used inside pages)
*/

import React from 'react';
import Navbar         from '../components/layout/Navbar';
import HeroSection    from '../components/home/HeroSection';
import StatsSection   from '../components/home/StatsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import ProgramsSection from '../components/home/ProgramsSection';
import RolesSection   from '../components/home/RolesSection';
import CTASection     from '../components/home/CTASection';
import Footer         from '../components/home/Footer';

const HomePage = () => (
  <>
    {/* Navbar stays fixed at the top — outside <main> so it overlays content */}
    <Navbar />

    {/* All page sections stacked vertically */}
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ProgramsSection />
      <RolesSection />
      <CTASection />
    </main>

    <Footer />
  </>
);

export default HomePage;
