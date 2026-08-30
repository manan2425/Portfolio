'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/data/portfolioData';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Sparkles,
  Star,
  Search,
  LayoutGrid,
  List,
  Zap,
  X,
  Lock,
  Eye,
  SlidersHorizontal,
  Terminal,
  FolderGit2,
  Code2
} from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Full Stack', 'Frontend', 'AI/ML', 'Mobile'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="section-spacing" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="bento-section-tag">
            <FolderGit2 size={14} color="var(--terminal-cyan)" />
            <span>$ ls /var/www/projects --all</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <h2 className="section-title">
                Software & <span className="gradient-heading">Engineering Projects</span>
              </h2>
              <p className="section-subtitle" style={{ marginTop: '10px' }}>
                Production web platforms, machine learning algorithms, and full-stack software repositories.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-card-hover)',
                boxShadow: 'var(--shadow-bento)'
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'grid' ? 'var(--terminal-cyan)' : 'transparent',
                  color: viewMode === 'grid' ? '#000000' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.2s ease'
                }}
              >
                <LayoutGrid size={14} />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'list' ? 'var(--terminal-cyan)' : 'transparent',
                  color: viewMode === 'list' ? '#000000' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.2s ease'
                }}
              >
                <List size={14} />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div
          className="project-filter-bar"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '36px',
            padding: '16px 24px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-card-hover)',
            boxShadow: 'var(--shadow-bento)'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-mono)',
                marginRight: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <SlidersHorizontal size={13} /> Filter:
            </span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--terminal-cyan)' : 'transparent',
                    backgroundColor: isActive ? 'rgba(6, 182, 212, 0.2)' : 'var(--bg-terminal)',
                    color: isActive ? 'var(--terminal-cyan)' : 'var(--text-main)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isActive ? 'rgba(6, 182, 212, 0.3)' : 'var(--border-card)',
                      color: isActive ? '#FFFFFF' : 'var(--text-subtle)'
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="project-search-box" style={{ position: 'relative', width: '280px', flexShrink: 0 }}>
            <Search
              size={15}
              color="var(--terminal-cyan)"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="grep 'keyword'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '38px',
                paddingRight: searchQuery ? '36px' : '16px',
                paddingTop: '9px',
                paddingBottom: '9px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-terminal)',
                border: '1px solid var(--border-card)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-subtle)',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', padding: '0 4px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Status: <strong style={{ color: 'var(--terminal-green)' }}>{filteredProjects.length}</strong> items listed
          </span>
          {(activeCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--terminal-cyan)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div
            className="bento-card"
            style={{
              padding: '64px 24px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <Search size={32} color="var(--terminal-cyan)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
              0 items returned for query
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 20px auto', fontFamily: 'var(--font-mono)' }}>
              No repositories match &quot;{searchQuery}&quot;. Try adjusting your search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && filteredProjects.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '28px'
            }}
            className="projects-bento-grid"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bento-card project-card-item"
                style={{
                  gridColumn: 'span 1',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-card-hover)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Browser/Terminal Header Bar */}
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red"></span>
                    <span className="terminal-dot dot-yellow"></span>
                    <span className="terminal-dot dot-green"></span>
                  </div>
                  <div className="terminal-title">
                    <Terminal size={12} color="var(--terminal-cyan)" />
                    <span>~/projects/{project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(6, 182, 212, 0.15)',
                      color: 'var(--terminal-cyan)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Project Image Container */}
                <div
                  className="project-image-container"
                  style={{
                    height: '210px',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-terminal)'
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: 0.85
                    }}
                    className="project-img"
                  />

                  {/* Hover Overlay */}
                  <div
                    className="image-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(11, 15, 25, 0.85)',
                      backdropFilter: 'blur(6px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      opacity: 0,
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <button
                      onClick={() => onSelectProject(project)}
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: 'var(--radius-full)' }}
                    >
                      <Eye size={14} />
                      <span>Inspect Specs</span>
                    </button>
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ borderRadius: 'var(--radius-full)' }}
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  {project.featured && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                        color: '#000000',
                        fontSize: '0.725rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                      }}
                    >
                      <Star size={11} fill="#000000" /> FEATURED REPO
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: 'var(--text-main)',
                      marginBottom: '10px',
                      letterSpacing: '-0.01em',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '18px', flex: 1 }}>
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div
                      style={{
                        marginBottom: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        padding: '10px 12px',
                        backgroundColor: 'var(--bg-terminal)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-card)'
                      }}
                    >
                      {project.highlights.slice(0, 2).map((hl, hIdx) => (
                        <div key={hIdx} style={{ fontSize: '0.78rem', color: 'var(--terminal-green)', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
                          <Zap size={12} color="var(--terminal-green)" style={{ flexShrink: 0 }} />
                          <span style={{ fontWeight: 600 }}>{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        style={{
                          padding: '3px 9px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          backgroundColor: 'var(--bg-card-subtle)',
                          color: 'var(--terminal-cyan)',
                          border: '1px solid var(--border-card)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions Footer */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--border-card)'
                    }}
                  >
                    <button
                      onClick={() => onSelectProject(project)}
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px' }}
                    >
                      <span>Read Specs</span>
                      <ArrowRight size={14} />
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)' }}
                          title="GitHub Repository"
                        >
                          <Github size={13} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === 'list' && filteredProjects.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bento-card project-list-item"
                style={{
                  padding: '18px 24px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-card-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '300px' }}>
                  <div
                    style={{
                      width: '90px',
                      height: '64px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      position: 'relative',
                      border: '1px solid var(--border-card)'
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                        {project.title}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'rgba(6, 182, 212, 0.15)',
                          color: 'var(--terminal-cyan)',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      {project.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="btn btn-primary btn-sm"
                    style={{ borderRadius: 'var(--radius-full)', padding: '7px 18px' }}
                  >
                    <span>Specs</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .project-card-item:hover .project-img {
          transform: scale(1.05);
        }
        .project-card-item:hover .image-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 960px) {
          :global(.projects-bento-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
