'use client';

import React, { useState } from 'react';
import { Experience as ExperienceType } from '@/data/portfolioData';
import { Briefcase, Calendar, CheckCircle2, Award, Users } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Work & Internships' | 'College Leadership'>('All');

  const filteredExperience = experience.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Work & Internships') return item.category === 'Work & Internships';
    if (activeCategory === 'College Leadership') return item.category === 'College Leadership';
    return true;
  });

  return (
    <section id="experience" className="section-spacing">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'left' }}>
          <span className="bento-section-tag">
            <Briefcase size={13} />
            <span>MILESTONES & RESPONSIBILITIES</span>
          </span>
          <h2 className="section-title">
            Experience & <span className="gradient-heading">College Leadership</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Professional engineering internships, student chapter leadership roles, and institutional responsibilities.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '32px',
            maxWidth: '880px',
            margin: '0 auto 32px auto'
          }}
        >
          {[
            { id: 'All', label: 'All Roles', count: experience.length, icon: Briefcase },
            { id: 'Work & Internships', label: 'Work & Internships', count: experience.filter(e => e.category === 'Work & Internships').length, icon: Award },
            { id: 'College Leadership', label: 'College Leadership & Chapters', count: experience.filter(e => e.category === 'College Leadership').length, icon: Users }
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
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-blue)' : '1px solid var(--border-card)',
                  backgroundColor: isActive ? 'var(--accent-blue-light)' : '#FFFFFF',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.12)' : 'none'
                }}
              >
                <Icon size={15} color={isActive ? 'var(--accent-blue)' : 'currentColor'} />
                <span>{tab.label}</span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
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

        {/* Bento Timeline Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '880px', margin: '0 auto' }}>
          {filteredExperience.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bento-card"
              style={{ padding: '28px', backgroundColor: '#FFFFFF' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {item.role}
                    </h3>
                    {item.category && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: item.category === 'Work & Internships' ? 'var(--accent-blue-light)' : 'rgba(245, 158, 11, 0.12)',
                          color: item.category === 'Work & Internships' ? 'var(--accent-blue)' : '#D97706',
                          border: `1px solid ${item.category === 'Work & Internships' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(245, 158, 11, 0.3)'}`
                        }}
                      >
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                    {item.company}
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
                    fontWeight: 700,
                    backgroundColor: 'var(--bg-card-subtle)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-card)'
                  }}
                >
                  <Calendar size={13} />
                  <span>{item.period}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                {item.description}
              </p>

              {item.achievements && item.achievements.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {item.achievements.map((ach, achIdx) => (
                    <div key={achIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={16} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

