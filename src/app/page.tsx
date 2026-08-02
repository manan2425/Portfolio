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
    // Clear stale cached local storage if it has outdated data
    if (typeof window !== 'undefined') {
      const savedLocalData = localStorage.getItem('portfolio_custom_data');
      if (savedLocalData) {
        try {
          const parsed = JSON.parse(savedLocalData);
          if (!parsed.experience || parsed.experience.length < initialPortfolioData.experience.length) {
            localStorage.removeItem('portfolio_custom_data');
          }
        } catch (e) {
          localStorage.removeItem('portfolio_custom_data');
        }
      }
    }

    // Fetch live data from API route
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.personalInfo) {
          // If server data has experience & achievements, use it directly
          if (resData.experience && resData.experience.length >= initialPortfolioData.experience.length) {
            setData(resData);
          } else {
            setData({
              ...initialPortfolioData,
              ...resData,
              experience: initialPortfolioData.experience,
              achievements: initialPortfolioData.achievements
            });
          }
        }
      })
      .catch((err) => {
        console.log('Using initial portfolio data fallback:', err);
        setData(initialPortfolioData);
      });
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar personalInfo={data.personalInfo} />
      <Hero personalInfo={data.personalInfo} />
      <Projects projects={data.projects} onSelectProject={(p) => setSelectedProject(p)} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience && data.experience.length > 0 ? data.experience : initialPortfolioData.experience} />
      <Achievements achievements={data.achievements && data.achievements.length > 0 ? data.achievements : initialPortfolioData.achievements} />
      <Contact personalInfo={data.personalInfo} />
      <Footer personalInfo={data.personalInfo} />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
