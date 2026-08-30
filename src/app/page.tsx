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
import { InteractiveTerminal } from '@/components/InteractiveTerminal';

export default function Home() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'gui' | 'cli'>('gui');

  useEffect(() => {
    // Force scroll to top (Hero section) on page refresh/mount
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);

      // 1. Instant render from local storage cache
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

  const handleNavigateSection = (sectionId: string) => {
    setViewMode('gui');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <Navbar
        personalInfo={data.personalInfo}
        viewMode={viewMode}
        onToggleViewMode={(mode) => setViewMode(mode)}
      />

      {viewMode === 'cli' ? (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', flex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="bento-section-tag">FULL INTERACTIVE LINUX TERMINAL SESSION</span>
            <h1 className="section-title">Developer Bash Shell</h1>
            <p className="section-subtitle" style={{ margin: '8px auto 0 auto' }}>
              Type commands like <span style={{ color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}>neofetch</span>, <span style={{ color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)' }}>projects</span>, <span style={{ color: 'var(--terminal-yellow)', fontFamily: 'var(--font-mono)' }}>skills</span>, <span style={{ color: 'var(--terminal-purple)', fontFamily: 'var(--font-mono)' }}>contact</span>, or <span style={{ color: 'var(--terminal-prompt)', fontFamily: 'var(--font-mono)' }}>matrix</span>.
            </p>
          </div>
          <InteractiveTerminal data={data} onNavigateSection={handleNavigateSection} />
        </div>
      ) : (
        <>
          <Hero personalInfo={data.personalInfo} onOpenCLI={() => setViewMode('cli')} />

          {/* Embedded CLI Terminal Block */}
          <section style={{ padding: '20px 0 60px 0' }}>
            <div className="container">
              <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <span className="bento-section-tag">
                  Interactive Terminal Emulator
                </span>
              </div>
              <InteractiveTerminal data={data} onNavigateSection={handleNavigateSection} />
            </div>
          </section>

          <Projects projects={data.projects || []} onSelectProject={(p) => setSelectedProject(p)} />
          <Skills skills={data.skills || []} />
          <Experience experience={data.experience || []} />
          <Achievements achievements={data.achievements || []} />
          <Contact personalInfo={data.personalInfo} />
        </>
      )}

      <Footer personalInfo={data.personalInfo} />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
