'use client';

import React from 'react';
import Link from 'next/link';
import { PersonalInfo } from '@/data/portfolioData';
import { ArrowUp, Shield } from 'lucide-react';

interface FooterProps {
  personalInfo: PersonalInfo;
}

export const Footer: React.FC<FooterProps> = ({ personalInfo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-card)',
        padding: '36px 0'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              {personalInfo.name} <span className="gradient-heading">Portfolio</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginTop: '2px' }}>
              Built with Next.js & TypeScript <Link href="/admin/login" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>©</Link> {new Date().getFullYear()}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={scrollToTop}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 'var(--radius-full)', padding: '6px 12px' }}
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUpRight size={13} style={{ transform: 'rotate(0deg)' }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
