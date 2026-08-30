'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/data/portfolioData';
import { X, ExternalLink, Github, CheckCircle2, Layers, Zap, Info, ShieldCheck, Terminal, FileCode } from 'lucide-react';

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
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '0',
          position: 'relative',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-card-hover)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Linux Terminal / IDE Header */}
        <div className="terminal-header" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
          <div className="terminal-dots">
            <span className="terminal-dot dot-red" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="terminal-dot dot-yellow"></span>
            <span className="terminal-dot dot-green"></span>
          </div>
          <div className="terminal-title">
            <FileCode size={13} color="var(--terminal-cyan)" />
            <span>cat ~/projects/{project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/README.md</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
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
          {/* Header Title Metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
                  color: 'var(--terminal-cyan)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  display: 'inline-block',
                  marginBottom: '8px'
                }}
              >
                [{project.category.toUpperCase()}] REPO SPECS
              </span>
              <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.85rem)', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                {project.title}
              </h2>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {project.liveUrl && project.liveUrl !== '#' && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                  <span>Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)' }}>
                  <Github size={14} />
                  <span>Code</span>
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
                backgroundColor: 'var(--bg-terminal)',
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
              { id: 'overview', label: 'README.md', icon: Info },
              { id: 'features', label: 'Key Accomplishments', icon: Zap },
              { id: 'stack', label: 'package.json', icon: Layers },
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
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                    color: isActive ? 'var(--terminal-cyan)' : 'var(--text-muted)'
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.975rem', marginBottom: '20px' }}>
                {project.longDescription || project.description}
              </p>

              <div
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-terminal)',
                  border: '1px solid var(--border-card)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--terminal-green)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--terminal-green)" />
                  <span>Architecture & Reliability</span>
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  Architected with modular full-stack services, type-safe API boundaries, and low-latency rendering performance.
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
                        backgroundColor: 'var(--bg-terminal)',
                        border: '1px solid var(--border-card)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      <CheckCircle2 size={18} color="var(--terminal-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>No features documented yet.</p>
              )}
            </div>
          )}

          {/* TAB 3: STACK */}
          {activeTab === 'stack' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
                {project.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-terminal)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--terminal-cyan)',
                      fontWeight: 700,
                      fontSize: '0.825rem',
                      fontFamily: 'var(--font-mono)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Layers size={14} color="var(--terminal-green)" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
