'use client';

import React, { useState, useEffect } from 'react';
import { PersonalInfo } from '@/data/portfolioData';
import { Menu, X, ArrowUpRight, Terminal, GitBranch, Monitor, Clock, Sparkles } from 'lucide-react';

interface NavbarProps {
  personalInfo: PersonalInfo;
  viewMode?: 'gui' | 'cli';
  onToggleViewMode?: (mode: 'gui' | 'cli') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ personalInfo, viewMode = 'gui', onToggleViewMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time ticking clock
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Stack', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        zIndex: 900,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        className="bento-glass"
        style={{
          maxWidth: '1120px',
          width: 'calc(100% - 24px)',
          padding: '10px 18px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-card-hover)',
          boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.7)' : 'var(--shadow-bento)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.25s ease'
        }}
      >
        {/* Linux Terminal Brand Prompt */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid var(--terminal-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--terminal-cyan)',
              boxShadow: '0 0 12px rgba(6, 182, 212, 0.2)',
              flexShrink: 0
            }}
          >
            <Terminal size={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', fontFamily: 'var(--font-mono)' }}>
              manan@iitkgp:<span style={{ color: 'var(--terminal-green)' }}>~</span>$
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--terminal-cyan)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              {personalInfo.name} • JRF @ IIT Kharagpur
            </span>
          </div>
        </a>

        {/* Real-time Ticking Clock & Git Branch Pill (Desktop) */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              fontSize: '0.75rem',
              color: 'var(--terminal-cyan)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}
          >
            <Clock size={12} color="var(--terminal-cyan)" />
            <span>{currentTime || 'Real-Time'}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '0.75rem',
              color: 'var(--terminal-green)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}
          >
            <GitBranch size={13} />
            <span>git:(main) ✚</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '22px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                textDecoration: 'none',
                color: 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terminal-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions & View Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {onToggleViewMode && (
            <button
              onClick={() => onToggleViewMode(viewMode === 'gui' ? 'cli' : 'gui')}
              className="btn btn-secondary btn-sm desktop-nav"
              style={{
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                borderColor: 'var(--border-card-hover)',
                backgroundColor: viewMode === 'cli' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-card-subtle)',
                color: viewMode === 'cli' ? 'var(--terminal-green)' : 'var(--terminal-cyan)'
              }}
              title="Switch UI Mode"
            >
              {viewMode === 'cli' ? <Monitor size={14} /> : <Terminal size={14} />}
              <span>{viewMode === 'cli' ? 'GUI View' : 'CLI Terminal'}</span>
            </button>
          )}

          <a href="#contact" className="btn btn-primary btn-sm desktop-nav" style={{ borderRadius: 'var(--radius-full)' }}>
            <span>Connect</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger-btn"
            style={{
              background: 'var(--bg-terminal)',
              border: '1px solid var(--border-card-hover)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              padding: '7px 10px',
              color: 'var(--terminal-cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span style={{ fontSize: '0.75rem' }}>MENU</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '74px',
            left: '12px',
            right: '12px',
            backgroundColor: '#0d1322',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-card-hover)',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Header Info Pill inside Mobile Menu */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)' }}>
              <Clock size={13} color="var(--terminal-cyan)" />
              <span>{currentTime}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}>
              <GitBranch size={13} />
              <span>git:(main)</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{link.name}</span>
                <ArrowUpRight size={16} color="var(--terminal-cyan)" />
              </a>
            ))}
          </div>

          {/* Mobile Actions Row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--border-card)' }}>
            {onToggleViewMode && (
              <button
                onClick={() => {
                  onToggleViewMode(viewMode === 'gui' ? 'cli' : 'gui');
                  setMobileMenuOpen(false);
                }}
                className="btn btn-secondary"
                style={{
                  justifyContent: 'center',
                  width: '100%',
                  fontFamily: 'var(--font-mono)',
                  borderColor: 'var(--border-card-hover)',
                  backgroundColor: viewMode === 'cli' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-terminal)',
                  color: viewMode === 'cli' ? 'var(--terminal-green)' : 'var(--terminal-cyan)'
                }}
              >
                {viewMode === 'cli' ? <Monitor size={16} /> : <Terminal size={16} />}
                <span>{viewMode === 'cli' ? 'Switch to GUI View' : 'Switch to CLI Terminal'}</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ justifyContent: 'center', width: '100%' }}
            >
              <span>Connect / Contact</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
        @media (min-width: 881px) {
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
