'use client';

import React from 'react';
import { Skill } from '@/data/portfolioData';
import { Cpu, Code2, Server, Database, Wrench, Terminal, TerminalSquare } from 'lucide-react';

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
      case 'Frontend': return <Code2 size={16} color="var(--terminal-cyan)" />;
      case 'Backend': return <Server size={16} color="var(--terminal-green)" />;
      case 'Databases & Cloud': return <Database size={16} color="var(--terminal-purple)" />;
      default: return <Wrench size={16} color="var(--terminal-yellow)" />;
    }
  };

  return (
    <section id="skills" className="section-spacing" style={{ backgroundColor: 'var(--bg-app)', borderTop: '1px solid var(--border-card)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span className="bento-section-tag">
            <TerminalSquare size={14} color="var(--terminal-green)" />
            <span>$ apt list --installed --skills</span>
          </span>
          <h2 className="section-title">
            Tech Stack & <span className="gradient-heading">Competencies</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Production frameworks, programming languages, databases, and developer tools.
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
                style={{ padding: '24px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card-hover)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-card)' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-terminal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-card)'
                    }}
                  >
                    {getIcon(cat)}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                    {cat}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {catSkills.map((skill) => {
                    const filledBars = Math.floor(skill.level / 10);
                    const emptyBars = 10 - filledBars;
                    return (
                      <div
                        key={skill.id}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-terminal)',
                          border: '1px solid var(--border-card)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                            {skill.name}
                          </span>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              fontFamily: 'var(--font-mono)',
                              color: 'var(--terminal-cyan)'
                            }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        {/* Terminal Progress Bar */}
                        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)', letterSpacing: '1px' }}>
                          [{'█'.repeat(filledBars) + '░'.repeat(emptyBars)}]
                        </div>
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
