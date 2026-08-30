'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PersonalInfo } from '@/data/portfolioData';
import { Menu, X, ArrowUpRight, Terminal, GitBranch, Monitor, Cpu, Sparkles } from 'lucide-react';

interface NavbarProps {
  personalInfo: PersonalInfo;
  viewMode?: 'gui' | 'cli';
  onToggleViewMode?: (mode: 'gui' | 'cli') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ personalInfo, viewMode = 'gui', onToggleViewMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          width: 'calc(100% - 32px)',
          padding: '10px 22px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-card-hover)',
          boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.6)' : 'var(--shadow-bento)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.25s ease'
        }}
      >
        {/* Linux Terminal Brand Prompt */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              boxShadow: '0 0 12px rgba(6, 182, 212, 0.2)'
            }}
          >
            <Terminal size={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.925rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', fontFamily: 'var(--font-mono)' }}>
              manan@dev:<span style={{ color: 'var(--terminal-green)' }}>~</span>$
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--terminal-cyan)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              {personalInfo.name}
            </span>
          </div>
        </Link>

        {/* Git Branch & Status Pill (Desktop) */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="desktop-nav">
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onToggleViewMode && (
            <button
              onClick={() => onToggleViewMode(viewMode === 'gui' ? 'cli' : 'gui')}
              className="btn btn-secondary btn-sm"
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

          <a href="#contact" className="btn btn-primary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
            <span>Connect</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-main)' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '16px',
            right: '16px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-card-hover)',
            padding: '20px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'var(--text-main)',
                fontWeight: 700,
                fontSize: '0.95rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 861px) {
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
