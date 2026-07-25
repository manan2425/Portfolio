'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/data/portfolioData';
import { X, ExternalLink, Github, CheckCircle2, Layers, Zap, Info, ShieldCheck } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'stack'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="bento-card"
        style={{
          maxWidth: '760px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '0',
          position: 'relative',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser Header Bar */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: '#F1F5F9',
            borderBottom: '1px solid var(--border-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 600, fontFamily: 'monospace' }}>
              case-study://{project.title.toLowerCase().replace(/\s+/g, '-')}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Inner Body */}
        <div className="modal-inner-body" style={{ padding: '32px' }}>
          {/* Header Metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--accent-blue-light)',
                  color: 'var(--accent-blue)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'inline-block',
                  marginBottom: '8px'
                }}
              >
                {project.category.toUpperCase()} CASE STUDY
              </span>
              <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.85rem)', fontWeight: 800, color: 'var(--text-main)' }}>
                {project.title}
              </h2>
            </div>

            {/* Quick Live Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {project.liveUrl && project.liveUrl !== '#' && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                  <span>Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Image Banner */}
          {project.image && (
            <div
              className="modal-image-banner"
              style={{
                width: '100%',
                height: '260px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                marginBottom: '28px',
                position: 'relative',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-card)'
              }}
            >
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          {/* Modal Tab Controls */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '24px',
              borderBottom: '1px solid var(--border-card)',
              paddingBottom: '12px'
            }}
          >
            {[
              { id: 'overview', label: 'Overview', icon: Info },
              { id: 'features', label: 'Key Accomplishments', icon: Zap },
              { id: 'stack', label: 'Tech Stack', icon: Layers },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: isActive ? 'var(--accent-blue-light)' : 'transparent',
                    color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)'
                  }}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.025rem', marginBottom: '20px' }}>
                {project.longDescription || project.description}
              </p>

              <div
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-card)'
                }}
              >
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--accent-blue)" />
                  <span>Architecture & Reliability</span>
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  Built with modular component architecture, server-rendered components for low latency, and robust error boundary handling.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: FEATURES */}
          {activeTab === 'features' && (
            <div>
              {project.highlights && project.highlights.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-card-subtle)',
                        border: '1px solid var(--border-card)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                      }}
                    >
                      <CheckCircle2 size={18} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-main)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>No features documented yet.</p>
              )}
            </div>
          )}

          {/* TAB 3: STACK */}
          {activeTab === 'stack' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                {project.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--accent-blue-light)',
                      border: '1px solid var(--accent-blue-border)',
                      color: 'var(--accent-blue)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Layers size={15} />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .modal-overlay {
            padding: 12px !important;
          }
          :global(.modal-inner-body) {
            padding: 20px !important;
          }
          :global(.modal-image-banner) {
            height: 180px !important;
          }
        }
      `}</style>
    </div>
  );
};
