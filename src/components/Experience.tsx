'use client';

import React, { useState } from 'react';
import { Experience as ExperienceType } from '@/data/portfolioData';
import { Briefcase, Calendar, CheckCircle2, Award, Users, Clock, Building2, ChevronRight } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Work & Internships' | 'College Leadership'>('All');
  const [activeYear, setActiveYear] = useState<string>('All');

  // Helper to extract the primary/end year from period string (e.g., "Jan 2026 – May 2026" -> "2026")
  const getPrimaryYear = (period: string): string => {
    const match = period.match(/\b(202[3-9])\b/g);
    if (match && match.length > 0) {
      return match[match.length - 1]; // Latest year in string
    }
    return '2024';
  };

  // Helper score for month-wise sorting within a year (higher = more recent month)
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

  // Filter items by category & year
  const filteredExperience = experience.filter((item) => {
    const matchesCat =
      activeCategory === 'All' ||
      (activeCategory === 'Work & Internships' && item.category === 'Work & Internships') ||
      (activeCategory === 'College Leadership' && item.category === 'College Leadership');

    const itemYear = getPrimaryYear(item.period);
    const matchesYear = activeYear === 'All' || itemYear === activeYear;

    return matchesCat && matchesYear;
  });

  // Extract all distinct years in reverse chronological order (2026 -> 2025 -> 2024...)
  const availableYears = Array.from(
    new Set(experience.map((item) => getPrimaryYear(item.period)))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <section id="experience" className="section-spacing">
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '36px', textAlign: 'left' }}>
          <span className="bento-section-tag">
            <Clock size={13} />
            <span>CHRONOLOGICAL MILESTONES & TIMELINE</span>
          </span>
          <h2 className="section-title">
            Experience & <span className="gradient-heading">College Leadership</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Year-wise and month-wise timeline of engineering internships, student chapter leadership roles, and institutional responsibilities.
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
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '4px' }}>
              Filter:
            </span>
            {[
              { id: 'All', label: 'All Roles', count: experience.length, icon: Briefcase },
              { id: 'Work & Internships', label: 'Work & Internships', count: experience.filter((e) => e.category === 'Work & Internships').length, icon: Award },
              { id: 'College Leadership', label: 'College Leadership & Chapters', count: experience.filter((e) => e.category === 'College Leadership').length, icon: Users }
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
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: isActive ? '1px solid var(--accent-blue)' : '1px solid var(--border-card)',
                    backgroundColor: isActive ? 'var(--accent-blue-light)' : '#FFFFFF',
                    color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.12)' : 'none'
                  }}
                >
                  <Icon size={14} color={isActive ? 'var(--accent-blue)' : 'currentColor'} />
                  <span>{tab.label}</span>
                  <span
                    style={{
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      backgroundColor: isActive ? 'var(--accent-blue)' : 'var(--bg-card-subtle)',
                      color: isActive ? '#FFFFFF' : 'var(--text-muted)'
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Year Quick Navigation Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '4px' }}>
              Year:
            </span>
            <button
              onClick={() => setActiveYear('All')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: activeYear === 'All' ? '1px solid var(--accent-blue)' : '1px solid var(--border-card)',
                backgroundColor: activeYear === 'All' ? 'var(--accent-blue)' : 'var(--bg-card-subtle)',
                color: activeYear === 'All' ? '#FFFFFF' : 'var(--text-main)',
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
                  cursor: 'pointer',
                  border: activeYear === yr ? '1px solid var(--accent-blue)' : '1px solid var(--border-card)',
                  backgroundColor: activeYear === yr ? 'var(--accent-blue)' : 'var(--bg-card-subtle)',
                  color: activeYear === yr ? '#FFFFFF' : 'var(--text-main)',
                  transition: 'all 0.15s ease'
                }}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Year-Wise Timeline Container */}
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', paddingLeft: '28px' }}>
          {/* Main Vertical Timeline Spine */}
          <div
            style={{
              position: 'absolute',
              left: '9px',
              top: '24px',
              bottom: '24px',
              width: '3px',
              background: 'linear-gradient(180deg, var(--accent-blue) 0%, #93C5FD 75%, rgba(147, 197, 253, 0.2) 100%)',
              borderRadius: '3px'
            }}
          />

          {availableYears.map((yearStr) => {
            // Filter items for this year group
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
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: '8px 0',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  {/* Timeline Year Node Dot */}
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: yearStr === '2026' ? 'var(--accent-blue)' : '#FFFFFF',
                      border: '3px solid var(--accent-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 12px rgba(37, 99, 235, 0.35)',
                      flexShrink: 0
                    }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: yearStr === '2026' ? '#FFFFFF' : 'var(--accent-blue)' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                      {yearStr}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '2px 10px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--bg-card-subtle)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-card)'
                      }}
                    >
                      {yearItems.length} {yearItems.length === 1 ? 'Milestone' : 'Milestones'}
                    </span>
                  </div>
                </div>

                {/* Timeline Cards for this Year */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {yearItems.map((item, idx) => {
                    const isWork = item.category === 'Work & Internships';

                    return (
                      <div
                        key={item.id || `${yearStr}-${idx}`}
                        className="bento-card"
                        style={{
                          padding: '28px',
                          backgroundColor: '#FFFFFF',
                          position: 'relative',
                          borderLeft: `4px solid ${isWork ? 'var(--accent-blue)' : '#F59E0B'}`,
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                      >
                        {/* Period & Role Header */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3 }}>
                                {item.role}
                              </h3>
                              {item.category && (
                                <span
                                  style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    padding: '3px 10px',
                                    borderRadius: 'var(--radius-full)',
                                    backgroundColor: isWork ? 'var(--accent-blue-light)' : 'rgba(245, 158, 11, 0.12)',
                                    color: isWork ? 'var(--accent-blue)' : '#D97706',
                                    border: `1px solid ${isWork ? 'rgba(37, 99, 235, 0.2)' : 'rgba(245, 158, 11, 0.3)'}`
                                  }}
                                >
                                  {item.category}
                                </span>
                              )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.925rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                              <Building2 size={15} style={{ flexShrink: 0 }} />
                              <span>{item.company}</span>
                            </div>
                          </div>

                          {/* Month-wise Exact Period Badge */}
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '5px 14px',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.8rem',
                              fontWeight: 800,
                              backgroundColor: 'var(--bg-card-subtle)',
                              color: 'var(--text-main)',
                              border: '1px solid var(--border-card)',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                            }}
                          >
                            <Calendar size={13} color="var(--accent-blue)" />
                            <span>{item.period}</span>
                          </div>
                        </div>

                        {/* Summary description */}
                        <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                          {item.description}
                        </p>

                        {/* Bulleted Achievements */}
                        {item.achievements && item.achievements.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-card)' }}>
                            {item.achievements.map((ach, achIdx) => (
                              <div key={achIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                                <CheckCircle2 size={16} color={isWork ? 'var(--accent-blue)' : '#D97706'} style={{ flexShrink: 0, marginTop: '2px' }} />
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


