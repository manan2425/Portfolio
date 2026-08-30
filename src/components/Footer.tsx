'use client';

import React from 'react';
import Link from 'next/link';
import { PersonalInfo } from '@/data/portfolioData';
import { ArrowUp, Terminal } from 'lucide-react';

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
        backgroundColor: 'var(--bg-app)',
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
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', fontFamily: 'var(--font-mono)' }}>
              manan@dev:<span style={{ color: 'var(--terminal-green)' }}>~</span>$ echo &quot;Built by {personalInfo.name}&quot;
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
              Next.js 14 App Router • TypeScript • Tailwind/Vanilla CSS • <Link href="/admin/login" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>©</Link> {new Date().getFullYear()}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={scrollToTop}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px', fontFamily: 'var(--font-mono)' }}
              aria-label="Back to top"
            >
              <span>^ Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
