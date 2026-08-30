'use client';

import React from 'react';
import { Achievement } from '@/data/portfolioData';
import { Trophy, Award, Medal, Star, Sparkles, Terminal } from 'lucide-react';

interface AchievementsProps {
  achievements?: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) return null;

  const getAchievementIcon = (idx: number) => {
    switch (idx % 4) {
      case 0: return <Trophy size={22} color="var(--terminal-yellow)" />;
      case 1: return <Award size={22} color="var(--terminal-cyan)" />;
      case 2: return <Medal size={22} color="var(--terminal-green)" />;
      default: return <Star size={22} color="var(--terminal-purple)" />;
    }
  };

  return (
    <section id="achievements" className="section-spacing" style={{ backgroundColor: 'var(--bg-app)', borderTop: '1px solid var(--border-card)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span className="bento-section-tag">
            <Trophy size={14} color="var(--terminal-yellow)" />
            <span>$ ./run_benchmarks.sh --trophies</span>
          </span>
          <h2 className="section-title">
            Hackathon & Technical <span className="gradient-heading">Achievements</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Awards, hackathon podium finishes, and institutional honors.
          </p>
        </div>

        {/* Achievements Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {achievements.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bento-card"
              style={{
                padding: '28px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card-hover)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                {/* Header row with Icon & Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-terminal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-card)'
                    }}
                  >
                    {getAchievementIcon(idx)}
                  </div>

                  {item.badge && (
                    <span
                      style={{
                        fontSize: '0.725rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: idx === 0 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                        color: idx === 0 ? 'var(--terminal-yellow)' : 'var(--terminal-cyan)',
                        border: `1px solid ${idx === 0 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(6, 182, 212, 0.4)'}`
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Event Name */}
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--terminal-cyan)', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  {item.event} {item.period ? `• ${item.period}` : ''}
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3, marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {item.description}
                </p>
              </div>

              {/* Prize details */}
              {item.prize && (
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-terminal)',
                    border: '1px solid var(--border-card)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--terminal-green)'
                  }}
                >
                  <Sparkles size={14} color="var(--terminal-yellow)" style={{ flexShrink: 0 }} />
                  <span>{item.prize}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
