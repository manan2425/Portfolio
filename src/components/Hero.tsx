'use client';

import React from 'react';
import { PersonalInfo } from '@/data/portfolioData';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Sparkles, Code2, Cpu, Terminal, Zap } from 'lucide-react';

interface HeroProps {
  personalInfo: PersonalInfo;
}

export const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        {/* Hero Bento Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px'
          }}
          className="hero-bento-grid"
        >
          {/* TILE 1: Main Intro Hero Card (Span 8) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 8',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)'
            }}
          >
            <div>
              {/* Header Status Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                {personalInfo.isAvailable && (
                  <div className="status-pill">
                    <span className="status-dot-green"></span>
                    <span>Available for New Projects</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    <MapPin size={15} color="var(--accent-blue)" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>

              {/* Title & Headline */}
              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '16px'
                }}
              >
                Hi, I'm <span className="gradient-heading">{personalInfo.name}</span>.
                <br />
                <span style={{ fontSize: '0.85em', color: 'var(--text-main)' }}>{personalInfo.title}</span>
              </h1>

              {/* Bio summary */}
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '600px',
                  marginBottom: '32px'
                }}
              >
                {personalInfo.about}
              </p>
            </div>

            {/* CTAs & Social Row */}
            <div
              className="hero-cta-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-card)'
              }}
            >
              <div className="hero-cta-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="#projects" className="btn btn-primary">
                  <span>Explore Projects</span>
                  <ArrowRight size={16} />
                </a>

                {personalInfo.resumeUrl && personalInfo.resumeUrl !== '#' && (
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <Download size={16} />
                    <span>CV / Resume</span>
                  </a>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    aria-label="Email"
                  >
                    <Mail size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* TILE 2: Key Metrics Bento Card (Span 4) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 4',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span className="bento-section-tag" style={{ margin: 0 }}>
                <Zap size={13} />
                <span>OVERVIEW</span>
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--accent-blue-light)',
                  color: 'var(--accent-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Code2 size={18} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{personalInfo.overviewMetric1Value || '04+'}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{personalInfo.overviewMetric1Label || 'Projects'}</div>
              </div>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{personalInfo.overviewMetric2Value || '08+'}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{personalInfo.overviewMetric2Label || 'Tech Stack'}</div>
              </div>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{personalInfo.overviewMetric3Value || '100%'}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{personalInfo.overviewMetric3Label || 'Type Safe'}</div>
              </div>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{personalInfo.overviewMetric4Value || '99+'}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{personalInfo.overviewMetric4Label || 'Performance'}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {personalInfo.overviewSummary || 'Specialized in engineering full-stack platforms with modern App Router architecture.'}
            </div>
          </div>

          {/* TILE 3: Engineering Focus Bento Card (Span 4) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 4',
              padding: '28px',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Cpu size={18} color="var(--accent-blue)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em' }}>Core Architecture Focus</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Next.js 15 App Router & Server Components',
                'TypeScript & End-to-End Type Safety',
                'FastAPI / Python AI & ML Integration',
                'Responsive Design Tokens & Glassmorphism'
              ].map((item, idx) => (
                <li key={idx} style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-blue)' }}></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TILE 4: Tech Stack Ticker Bento Card (Span 8) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 8',
              padding: '28px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--accent-blue)', textTransform: 'uppercase', marginBottom: '4px' }}>
                DEVELOPER TOOLKIT
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Production Engineering Stack
              </h3>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '480px' }}>
              {['Next.js 15', 'React 19', 'TypeScript', 'Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Docker', 'CSS Modules'].map((tool, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--bg-card-subtle)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-card)'
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          :global(.hero-bento-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.hero-bento-grid > div) {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 640px) {
          :global(.hero-bento-grid > div) {
            padding: 24px !important;
          }
          .hero-cta-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-cta-buttons {
            width: 100% !important;
            flex-direction: column !important;
          }
          .hero-cta-buttons a {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
