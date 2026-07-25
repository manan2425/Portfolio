'use client';

import React from 'react';
import { Skill } from '@/data/portfolioData';
import { Cpu, Code2, Server, Database, Wrench, ShieldCheck } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const categories: Array<Skill['category']> = [
    'Frontend',
    'Backend',
    'Databases & Cloud',
    'Tools & Others'
  ];

  const getIcon = (cat: Skill['category']) => {
    switch (cat) {
      case 'Frontend': return <Code2 size={18} color="var(--accent-blue)" />;
      case 'Backend': return <Server size={18} color="var(--accent-blue)" />;
      case 'Databases & Cloud': return <Database size={18} color="var(--accent-blue)" />;
      default: return <Wrench size={18} color="var(--accent-blue)" />;
    }
  };

  return (
    <section id="skills" className="section-spacing" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-card)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span className="bento-section-tag">
            <Cpu size={13} />
            <span>TECHNICAL CAPABILITIES</span>
          </span>
          <h2 className="section-title">
            Engineering Stack & <span className="gradient-heading">Skills</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Production tools and frameworks used to architect high-speed web apps and backend services.
          </p>
        </div>

        {/* Bento Grid Skills Tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {categories.map((cat) => {
            const catSkills = skills.filter(s => s.category === cat);
            if (catSkills.length === 0) return null;

            return (
              <div
                key={cat}
                className="bento-card"
                style={{ padding: '24px', backgroundColor: 'var(--bg-card-subtle)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-card)' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--accent-blue-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getIcon(cat)}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {cat}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {catSkills.map((skill) => (
                    <div
                      key={skill.id}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--accent-blue-light)',
                          color: 'var(--accent-blue)'
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
