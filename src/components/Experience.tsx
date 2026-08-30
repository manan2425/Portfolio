'use client';

import React, { useState } from 'react';
import { Experience as ExperienceType } from '@/data/portfolioData';
import { Briefcase, Calendar, CheckCircle2, Award, Users, Building2, Sparkles, Terminal, Code2, ArrowRight } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const [activeTab, setActiveTab] = useState<'work' | 'leadership'>('work');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const getPrimaryYear = (period: string): string => {
    if (period.includes('Present')) return '2026';
    const match = period.match(/\b(202[3-9])\b/g);
    if (match && match.length > 0) {
      return match[match.length - 1];
    }
    return '2024';
  };

  const getMonthScore = (period: string): number => {
    if (period.includes('Present')) return 99;
    const months: Record<string, number> = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
      jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
    };
    const parts = period.toLowerCase().split(/[-–—]/);
    const endPart = parts[parts.length - 1] || parts[0];
    for (const [m, num] of Object.entries(months)) {
      if (endPart.includes(m)) return num;
    }
    return 6;
  };

  // Filter work vs leadership
  const workExperience = experience.filter(
    (e) => !e.category || e.category === 'Work & Internships'
  );
  const leadershipExperience = experience.filter(
    (e) => e.category === 'College Leadership'
  );

  const currentList = activeTab === 'work' ? workExperience : leadershipExperience;

  // Filter by year if selected
  const filteredList = currentList.filter((item) => {
    if (selectedYear === 'All') return true;
    return getPrimaryYear(item.period) === selectedYear;
  });

  const availableYears = Array.from(
    new Set(currentList.map((item) => getPrimaryYear(item.period)))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <section id="experience" className="section-spacing" style={{ backgroundColor: 'var(--bg-app)', borderTop: '1px solid var(--border-card)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '36px', textAlign: 'center' }}>
          <span className="bento-section-tag">
            <Terminal size={14} color="var(--terminal-cyan)" />
            <span>$ cat /var/log/career_history.matrix</span>
          </span>
          <h2 className="section-title">
            Career & <span className="gradient-heading">Leadership Log</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '8px auto 0 auto' }}>
            Research fellowships, engineering internships, and institutional leadership roles.
          </p>
        </div>

        {/* Dual Primary Tabs: Work & Research vs College Leadership */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 32px auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            padding: '6px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-card-hover)',
            boxShadow: 'var(--shadow-bento)'
          }}
        >
          <button
            onClick={() => {
              setActiveTab('work');
              setSelectedYear('All');
            }}
            style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: activeTab === 'work' ? 'var(--terminal-cyan)' : 'transparent',
              color: activeTab === 'work' ? '#000000' : 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.875rem',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: activeTab === 'work' ? '0 4px 16px rgba(6, 182, 212, 0.35)' : 'none'
            }}
          >
            <Briefcase size={16} />
            <span>Work & Research ({workExperience.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('leadership');
              setSelectedYear('All');
            }}
            style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: activeTab === 'leadership' ? 'var(--terminal-cyan)' : 'transparent',
              color: activeTab === 'leadership' ? '#000000' : 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.875rem',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: activeTab === 'leadership' ? '0 4px 16px rgba(6, 182, 212, 0.35)' : 'none'
            }}
          >
            <Users size={16} />
            <span>Leadership Roles ({leadershipExperience.length})</span>
          </button>
        </div>

        {/* Year Filter Bar */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto 36px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}
        >
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginRight: '6px' }}>
            Filter Year:
          </span>
          <button
            onClick={() => setSelectedYear('All')}
            style={{
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              border: selectedYear === 'All' ? '1px solid var(--terminal-green)' : '1px solid var(--border-card)',
              backgroundColor: selectedYear === 'All' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-card)',
              color: selectedYear === 'All' ? 'var(--terminal-green)' : 'var(--text-muted)',
              transition: 'all 0.15s ease'
            }}
          >
            All Years
          </button>

          {availableYears.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              style={{
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                border: selectedYear === yr ? '1px solid var(--terminal-green)' : '1px solid var(--border-card)',
                backgroundColor: selectedYear === yr ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-card)',
                color: selectedYear === yr ? 'var(--terminal-green)' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Matrix Grid of Experience Cards */}
        <div
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
            gap: '24px'
          }}
          className="experience-matrix-grid"
        >
          {filteredList
            .sort((a, b) => {
              const yearDiff = parseInt(getPrimaryYear(b.period)) - parseInt(getPrimaryYear(a.period));
              if (yearDiff !== 0) return yearDiff;
              return getMonthScore(b.period) - getMonthScore(a.period);
            })
            .map((item, idx) => {
              const isIITKgp = item.company.includes('IIT Kharagpur') || item.id === 'exp-jrf';

              return (
                <div
                  key={item.id || idx}
                  className="bento-card"
                  style={{
                    padding: '28px',
                    backgroundColor: isIITKgp ? '#151f33' : 'var(--bg-card)',
                    border: isIITKgp ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid var(--border-card-hover)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: isIITKgp ? '0 0 30px rgba(245, 158, 11, 0.18)' : 'var(--shadow-bento)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div>
                    {/* Header Pill & Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                      <span
                        style={{
                          fontSize: '0.725rem',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: isIITKgp ? 'rgba(245, 158, 11, 0.2)' : 'rgba(6, 182, 212, 0.15)',
                          color: isIITKgp ? 'var(--terminal-yellow)' : 'var(--terminal-cyan)',
                          border: `1px solid ${isIITKgp ? 'rgba(245, 158, 11, 0.4)' : 'rgba(6, 182, 212, 0.3)'}`
                        }}
                      >
                        {isIITKgp ? '★ FEATURED RESEARCH ROLE' : item.category || 'POSITION'}
                      </span>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          backgroundColor: 'var(--bg-terminal)',
                          color: 'var(--text-main)',
                          border: '1px solid var(--border-card)'
                        }}
                      >
                        <Calendar size={12} color="var(--terminal-cyan)" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Role Title */}
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--text-main)',
                        fontFamily: 'var(--font-mono)',
                        marginBottom: '8px',
                        lineHeight: 1.3
                      }}
                    >
                      {item.role}
                    </h3>

                    {/* Institution / Company */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.925rem',
                        fontWeight: 700,
                        color: isIITKgp ? 'var(--terminal-yellow)' : 'var(--terminal-cyan)',
                        fontFamily: 'var(--font-mono)',
                        marginBottom: '16px'
                      }}
                    >
                      <Building2 size={16} style={{ flexShrink: 0 }} />
                      <span>{item.company}</span>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Accomplishments Bullet Points */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        paddingTop: '16px',
                        borderTop: '1px solid var(--border-card)'
                      }}
                    >
                      {item.achievements.map((ach, achIdx) => (
                        <div key={achIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.825rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                          <CheckCircle2 size={14} color={isIITKgp ? 'var(--terminal-yellow)' : 'var(--terminal-green)'} style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.experience-matrix-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
