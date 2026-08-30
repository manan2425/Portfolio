'use client';

import React, { useState } from 'react';
import { Experience as ExperienceType } from '@/data/portfolioData';
import { Briefcase, Calendar, CheckCircle2, Award, Users, Clock, Building2, GitCommit, GitBranch, Terminal } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Work & Internships' | 'College Leadership'>('All');
  const [activeYear, setActiveYear] = useState<string>('All');

  const getPrimaryYear = (period: string): string => {
    const match = period.match(/\b(202[3-9])\b/g);
    if (match && match.length > 0) {
      return match[match.length - 1];
    }
    return '2024';
  };

  const getMonthScore = (period: string): number => {
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

  const filteredExperience = experience.filter((item) => {
    const matchesCat =
      activeCategory === 'All' ||
      (activeCategory === 'Work & Internships' && item.category === 'Work & Internships') ||
      (activeCategory === 'College Leadership' && item.category === 'College Leadership');

    const itemYear = getPrimaryYear(item.period);
    const matchesYear = activeYear === 'All' || itemYear === activeYear;

    return matchesCat && matchesYear;
  });

  const availableYears = Array.from(
    new Set(experience.map((item) => getPrimaryYear(item.period)))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <section id="experience" className="section-spacing" style={{ backgroundColor: 'var(--bg-app)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '36px' }}>
          <span className="bento-section-tag">
            <GitBranch size={14} color="var(--terminal-cyan)" />
            <span>$ git log --graph --oneline --all</span>
          </span>
          <h2 className="section-title">
            Career & <span className="gradient-heading">Leadership Log</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Chronological engineering milestones, industrial internships, and leadership chapter terms.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto 40px auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginRight: '4px' }}>
              Category:
            </span>
            {[
              { id: 'All', label: 'All Roles', count: experience.length, icon: Briefcase },
              { id: 'Work & Internships', label: 'Work & Internships', count: experience.filter((e) => e.category === 'Work & Internships').length, icon: Award },
              { id: 'College Leadership', label: 'College Leadership', count: experience.filter((e) => e.category === 'College Leadership').length, icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    border: isActive ? '1px solid var(--terminal-cyan)' : '1px solid var(--border-card)',
                    backgroundColor: isActive ? 'rgba(6, 182, 212, 0.2)' : 'var(--bg-card)',
                    color: isActive ? 'var(--terminal-cyan)' : 'var(--text-muted)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={14} color={isActive ? 'var(--terminal-cyan)' : 'currentColor'} />
                  <span>{tab.label}</span>
                  <span
                    style={{
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      backgroundColor: isActive ? 'rgba(6, 182, 212, 0.3)' : 'var(--border-card)',
                      color: isActive ? '#FFFFFF' : 'var(--text-muted)'
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Year Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginRight: '4px' }}>
              Year:
            </span>
            <button
              onClick={() => setActiveYear('All')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                border: activeYear === 'All' ? '1px solid var(--terminal-green)' : '1px solid var(--border-card)',
                backgroundColor: activeYear === 'All' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-card)',
                color: activeYear === 'All' ? 'var(--terminal-green)' : 'var(--text-main)',
                transition: 'all 0.15s ease'
              }}
            >
              All Years
            </button>

            {availableYears.map((yr) => (
              <button
                key={yr}
                onClick={() => setActiveYear(yr)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  border: activeYear === yr ? '1px solid var(--terminal-green)' : '1px solid var(--border-card)',
                  backgroundColor: activeYear === yr ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-card)',
                  color: activeYear === yr ? 'var(--terminal-green)' : 'var(--text-main)',
                  transition: 'all 0.15s ease'
                }}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Year-Wise Git Log Timeline */}
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', paddingLeft: '28px' }}>
          {/* Main Spine */}
          <div
            style={{
              position: 'absolute',
              left: '9px',
              top: '24px',
              bottom: '24px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--terminal-cyan) 0%, var(--terminal-green) 50%, rgba(16, 185, 129, 0.2) 100%)'
            }}
          />

          {availableYears.map((yearStr) => {
            const yearItems = filteredExperience
              .filter((item) => getPrimaryYear(item.period) === yearStr)
              .sort((a, b) => getMonthScore(b.period) - getMonthScore(a.period));

            if (yearItems.length === 0) return null;

            return (
              <div key={yearStr} style={{ marginBottom: '44px', position: 'relative' }}>
                {/* Year Marker Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '20px',
                    marginLeft: '-28px',
                    position: 'sticky',
                    top: '80px',
                    zIndex: 10,
                    backgroundColor: 'rgba(11, 15, 25, 0.95)',
                    padding: '8px 0',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-app)',
                      border: '3px solid var(--terminal-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 10px rgba(6, 182, 212, 0.4)',
                      flexShrink: 0
                    }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--terminal-cyan)' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)' }}>
                      release/{yearStr}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        padding: '2px 10px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-card)'
                      }}
                    >
                      {yearItems.length} commits
                    </span>
                  </div>
                </div>

                {/* Timeline Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {yearItems.map((item, idx) => {
                    const isWork = item.category === 'Work & Internships';

                    return (
                      <div
                        key={item.id || `${yearStr}-${idx}`}
                        className="bento-card"
                        style={{
                          padding: '24px',
                          backgroundColor: 'var(--bg-card)',
                          position: 'relative',
                          borderLeft: `4px solid ${isWork ? 'var(--terminal-cyan)' : 'var(--terminal-yellow)'}`,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)', lineHeight: 1.3 }}>
                                {item.role}
                              </h3>
                              {item.category && (
                                <span
                                  style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    fontFamily: 'var(--font-mono)',
                                    padding: '3px 9px',
                                    borderRadius: 'var(--radius-full)',
                                    backgroundColor: isWork ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                    color: isWork ? 'var(--terminal-cyan)' : 'var(--terminal-yellow)',
                                    border: `1px solid ${isWork ? 'rgba(6, 182, 212, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                                  }}
                                >
                                  {item.category}
                                </span>
                              )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}>
                              <Building2 size={14} style={{ flexShrink: 0 }} />
                              <span>{item.company}</span>
                            </div>
                          </div>

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

                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
                          {item.description}
                        </p>

                        {item.achievements && item.achievements.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '12px', borderTop: '1px solid var(--border-card)' }}>
                            {item.achievements.map((ach, achIdx) => (
                              <div key={achIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.825rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                                <CheckCircle2 size={14} color={isWork ? 'var(--terminal-cyan)' : 'var(--terminal-yellow)'} style={{ flexShrink: 0, marginTop: '2px' }} />
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
