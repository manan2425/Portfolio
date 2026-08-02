'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PersonalInfo } from '@/data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  personalInfo: PersonalInfo;
}

export const Navbar: React.FC<NavbarProps> = ({ personalInfo }) => {
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
          maxWidth: '1080px',
          width: 'calc(100% - 32px)',
          padding: '10px 20px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-card)',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.1)' : 'var(--shadow-bento)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.25s ease'
        }}
      >
        {/* Brand Monogram Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.9rem',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
            }}
          >
            M
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {personalInfo.name}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                textDecoration: 'none',
                color: 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.875rem',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="#contact" className="btn btn-primary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
            <span>Connect</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile menu toggle */}
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '16px',
            right: '16px',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-card)',
            padding: '20px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
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
                fontSize: '1rem'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hide-mobile {
            display: none;
          }
        }
        @media (min-width: 769px) {
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
