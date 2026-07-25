'use client';

import React, { useState, useEffect } from 'react';
import { PortfolioData, Project, initialPortfolioData } from '@/data/portfolioData';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { ProjectModal } from '@/components/ProjectModal';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // 1. Check local storage persistence for instant updates
    const savedLocalData = typeof window !== 'undefined' ? localStorage.getItem('portfolio_custom_data') : null;
    if (savedLocalData) {
      try {
        const parsedLocal = JSON.parse(savedLocalData);
        if (parsedLocal && parsedLocal.personalInfo) {
          setData(parsedLocal);
        }
      } catch (e) {
        console.error('Error parsing local portfolio data:', e);
      }
    }

    // 2. Fetch live data from API route
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.personalInfo) {
          if (savedLocalData) {
            try {
              const parsedLocal = JSON.parse(savedLocalData);
              setData({
                ...resData,
                ...parsedLocal,
                personalInfo: {
                  ...resData.personalInfo,
                  ...parsedLocal.personalInfo
                }
              });
              return;
            } catch (e) {}
          }
          setData(resData);
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
      <Projects projects={data.projects} onSelectProject={(p) => setSelectedProject(p)} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Contact personalInfo={data.personalInfo} />
      <Footer personalInfo={data.personalInfo} />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
