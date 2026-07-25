'use client';

import React from 'react';
import { Experience as ExperienceType } from '@/data/portfolioData';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" className="section-spacing">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span className="bento-section-tag">
            <Briefcase size={13} />
            <span>MILESTONES & HISTORY</span>
          </span>
          <h2 className="section-title">
            Professional <span className="gradient-heading">Work Experience</span>
          </h2>
        </div>

        {/* Bento Timeline Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '880px', margin: '0 auto' }}>
          {experience.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bento-card"
              style={{ padding: '28px', backgroundColor: '#FFFFFF' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {item.role}
                  </h3>
                  <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--accent-blue)', marginTop: '2px' }}>
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
