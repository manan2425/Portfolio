'use client';

import React from 'react';
import { Achievement } from '@/data/portfolioData';
import { Trophy, Award, Medal, Star, Sparkles } from 'lucide-react';

interface AchievementsProps {
  achievements?: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) return null;

  const getAchievementIcon = (idx: number) => {
    switch (idx % 4) {
      case 0: return <Trophy size={22} color="#D97706" />;
      case 1: return <Award size={22} color="var(--accent-blue)" />;
      case 2: return <Medal size={22} color="#10B981" />;
      default: return <Star size={22} color="#8B5CF6" />;
    }
  };

  return (
    <section id="achievements" className="section-spacing" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-card)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span className="bento-section-tag">
            <Trophy size={13} />
            <span>HONORS & RECOGNITION</span>
          </span>
          <h2 className="section-title">
            Hackathon & Technical <span className="gradient-heading">Achievements</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Awards, hackathon wins, and recognition earned across national tech competitions and student organizations.
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
                backgroundColor: 'var(--bg-card-subtle)',
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
                      backgroundColor: idx === 0 ? 'rgba(245, 158, 11, 0.12)' : 'var(--accent-blue-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${idx === 0 ? 'rgba(245, 158, 11, 0.25)' : 'var(--border-card)'}`
                    }}
                  >
                    {getAchievementIcon(idx)}
                  </div>

                  {item.badge && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: idx === 0 ? '#F59E0B' : 'var(--accent-blue)',
                        color: '#FFFFFF',
                        letterSpacing: '0.02em',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Event Name */}
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                  {item.event} {item.period ? `• ${item.period}` : ''}
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3, marginBottom: '12px' }}>
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
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-card)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    color: 'var(--text-main)'
                  }}
                >
                  <Sparkles size={15} color="#D97706" style={{ flexShrink: 0 }} />
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
