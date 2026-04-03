'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import { useEffect } from 'react';

// Dynamic import for 3D scene (client-only, heavy)
const SpaceScene = dynamic(() => import('@/components/SpaceScene'), {
  ssr: false,
});

export default function Home() {
  // Console easter egg
  useEffect(() => {
    console.log(`
    %c
    ░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄░░░░░
    ░░░░▄▀░░░░░░░░░░░░░░░▀▄░░░░
    ░░░▄▀░░░░░░░░░░░░░░░░░░▀▄░░
    ░░▄▀░░░░░░░░░░░░░░░░░░░░▀▄░
    ░▄▀░░░░░░░░░░░░░▄▄░░░░░░░▀▄
    ▄▀░░░▄▄░░░░░▄▄▄▄█▀░░░░░░░░▀
    █░░░▀█▀░░░▀▀▀▀░░░░░░░░░░░░█
    █░░░░█░░░░░░░░░░░░░░░░░░░░█
    ▀▄░░░▀░░░░░░░░░▀▀▀▀▄░░░░▄▀
    ░▀▄░░░░░░░░░░░░░░░░░░░░▄▀░
    ░░▀▄░░░░▀▀▀▀▀▀▀▀▀▄▄░░░▄▀░░
    ░░░▀▄░░░░░░░░░░░░░░░░▄▀░░░
    ░░░░▀▄░░░░░░░░░░░░░▄▀░░░░
    ░░░░░░▀▀▀▀▀▀▀▀▀▀▀▀▀░░░░░░

    Such portfolio. Very code. Wow.
    `, 'color: #CCFF00; font-family: monospace;');
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <SpaceScene />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
