'use client';

import React, { useState, useEffect } from 'react';
import { PortfolioData, Project, initialPortfolioData } from '@/data/portfolioData';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { ProjectModal } from '@/components/ProjectModal';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Achievements } from '@/components/Achievements';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // 1. Instant render from local storage cache
    if (typeof window !== 'undefined') {
      const savedLocalData = localStorage.getItem('portfolio_custom_data');
      if (savedLocalData) {
        try {
          const parsed = JSON.parse(savedLocalData);
          if (parsed && parsed.personalInfo) {
            setData(parsed);
          }
        } catch (e) {}
      }
    }

    // 2. Fetch authoritative live data from API route (data/store.json)
    fetch(`/api/admin/data?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.personalInfo) {
          setData(resData);
          if (typeof window !== 'undefined') {
            localStorage.setItem('portfolio_custom_data', JSON.stringify(resData));
          }
        }
      })
      .catch((err) => {
        console.log('Using initial portfolio data fallback:', err);
      });
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar personalInfo={data.personalInfo} />
      <Hero personalInfo={data.personalInfo} />
      <Projects projects={data.projects || []} onSelectProject={(p) => setSelectedProject(p)} />
      <Skills skills={data.skills || []} />
      <Experience experience={data.experience || []} />
      <Achievements achievements={data.achievements || []} />
      <Contact personalInfo={data.personalInfo} />
      <Footer personalInfo={data.personalInfo} />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
