'use client';

import React, { useState, useEffect } from 'react';
import { PersonalInfo } from '@/data/portfolioData';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Code2,
  Cpu,
  Terminal as TerminalIcon,
  Zap,
  CheckCircle2,
  Award
} from 'lucide-react';

interface HeroProps {
  personalInfo: PersonalInfo;
  onOpenCLI?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ personalInfo, onOpenCLI }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = `npx introduce-developer --name "${personalInfo.name}" --title "${personalInfo.title}"`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        {/* Bento Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px'
          }}
          className="hero-bento-grid"
        >
          {/* TILE 1: Main Intro Linux Terminal Card (Span 8) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 8',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card-hover)'
            }}
          >
            {/* Linux Window Header */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red"></span>
                <span className="terminal-dot dot-yellow"></span>
                <span className="terminal-dot dot-green"></span>
              </div>
              <div className="terminal-title">
                <TerminalIcon size={14} color="var(--terminal-green)" />
                <span>manan@iitkgp-dev: ~/profile.sh</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)' }}>
                bash 5.2
              </div>
            </div>

            {/* Card Content Body */}
            <div style={{ padding: '36px' }}>
              {/* IIT Kharagpur JRF Special Highlight Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: 'var(--terminal-yellow)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  marginBottom: '16px'
                }}
              >
                <Award size={15} color="var(--terminal-yellow)" />
                <span>Junior Research Fellow (JRF) @ IIT Kharagpur</span>
              </div>

              {/* Header Status & Location Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                {personalInfo.isAvailable && (
                  <div className="status-pill">
                    <span className="status-dot-green"></span>
                    <span>Status: Available for Research & Dev Roles</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--terminal-cyan)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                    <MapPin size={15} color="var(--terminal-cyan)" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>

              {/* Linux Terminal Typing Prompt Line */}
              <div
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'var(--bg-terminal)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ color: 'var(--terminal-green)', fontWeight: 800 }}>manan@iitkgp:~$</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{typedText}</span>
                <span className="cursor-blink"></span>
              </div>

              {/* Title & Headline */}
              <h1
                style={{
                  fontSize: 'clamp(2.1rem, 4vw, 3.1rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '16px'
                }}
              >
                Junior Research Fellow <br />
                <span className="gradient-heading">{personalInfo.name}</span>
              </h1>

              {/* Bio summary */}
              <p
                style={{
                  fontSize: '1.025rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  maxWidth: '620px',
                  marginBottom: '32px'
                }}
              >
                {personalInfo.about}
              </p>

              {/* Action Buttons & Social Row */}
              <div
                className="hero-cta-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--border-card)'
                }}
              >
                <div className="hero-cta-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="#projects" className="btn btn-primary">
                    <span>Explore Code Projects</span>
                    <ArrowRight size={16} />
                  </a>

                  {onOpenCLI && (
                    <button onClick={onOpenCLI} className="btn btn-terminal">
                      <TerminalIcon size={16} />
                      <span>Launch CLI Mode</span>
                    </button>
                  )}

                  {personalInfo.resumeUrl && (
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {personalInfo.github && (
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terminal-cyan)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      aria-label="GitHub"
                      title="GitHub Profile"
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
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terminal-cyan)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      aria-label="LinkedIn"
                      title="LinkedIn Profile"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {personalInfo.email && (
                    <a
                      href={`mailto:${personalInfo.email}`}
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terminal-cyan)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      aria-label="Email"
                      title="Send Email"
                    >
                      <Mail size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* TILE 2: Neofetch System Info Bento Card (Span 4) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 4',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="bento-section-tag" style={{ margin: 0 }}>
                <Zap size={13} />
                <span>NEOFETCH STATS</span>
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
                  color: 'var(--terminal-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Code2 size={18} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '12px 0' }}>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-terminal)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)' }}>{personalInfo.overviewMetric1Value || '06+'}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{personalInfo.overviewMetric1Label || 'Projects'}</div>
              </div>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-terminal)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}>{personalInfo.overviewMetric2Value || '08+'}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{personalInfo.overviewMetric2Label || 'Tech Stack'}</div>
              </div>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-terminal)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--terminal-purple)', fontFamily: 'var(--font-mono)' }}>{personalInfo.overviewMetric3Value || '100%'}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{personalInfo.overviewMetric3Label || 'Type Safe'}</div>
              </div>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-terminal)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--terminal-yellow)', fontFamily: 'var(--font-mono)' }}>{personalInfo.overviewMetric4Value || '99+'}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{personalInfo.overviewMetric4Label || 'Performance'}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>
              $ echo &quot;{personalInfo.overviewSummary || 'Junior Research Fellow at IIT Kharagpur engineering scalable web systems & AI/ML models.'}&quot;
            </div>
          </div>

          {/* TILE 3: Engineering System Focus Bento Card (Span 4) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 4',
              padding: '26px',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Cpu size={18} color="var(--terminal-cyan)" />
              <h3 style={{ fontSize: '0.975rem', fontWeight: 800, letterSpacing: '-0.01em', fontFamily: 'var(--font-mono)' }}>
                /etc/research.conf
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)' }}>
              {[
                'IIT Kharagpur Research Fellow (JRF)',
                'MERN Stack Architecture & REST APIs',
                'TypeScript & End-to-End Type Safety',
                'Python & AI/ML Predictive Analytics'
              ].map((item, idx) => (
                <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="var(--terminal-green)" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TILE 4: Tech Stack Command Line Bento Card (Span 8) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 8',
              padding: '26px',
              backgroundColor: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--terminal-green)', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                $ npm list --depth=0
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Production Engineering Stack
              </h3>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '480px' }}>
              {['React.js', 'Next.js 14', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'FastAPI', 'Tailwind', 'Docker', 'Git'].map((tool, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--bg-terminal)',
                    color: 'var(--terminal-cyan)',
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
          .hero-cta-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-cta-buttons {
            width: 100% !important;
            flex-direction: column !important;
          }
          .hero-cta-buttons a, .hero-cta-buttons button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
