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
  SlidersHorizontal
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

  // Filter projects by category and search query
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
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, rgba(79, 70, 229, 0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="bento-section-tag" style={{ background: 'var(--accent-blue-light)', boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)' }}>
            <Sparkles size={14} className="sparkle-icon" color="var(--accent-blue)" />
            <span>FEATURED PORTFOLIO & CASE STUDIES</span>
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
                Crafted <span className="gradient-heading">Projects & Digital Works</span>
              </h2>
              <p className="section-subtitle" style={{ marginTop: '10px' }}>
                Explore production web applications, machine learning platforms, and digital tools engineered for speed and precision.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-card)',
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
                  backgroundColor: viewMode === 'grid' ? 'var(--accent-blue)' : 'transparent',
                  color: viewMode === 'grid' ? '#FFFFFF' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: viewMode === 'grid' ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                <LayoutGrid size={15} />
                <span>Grid View</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'list' ? 'var(--accent-blue)' : 'transparent',
                  color: viewMode === 'list' ? '#FFFFFF' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: viewMode === 'list' ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                <List size={15} />
                <span>List View</span>
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
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-card)',
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
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent-blue-border)' : 'transparent',
                    backgroundColor: isActive ? 'var(--accent-blue)' : 'var(--bg-card-subtle)',
                    color: isActive ? '#FFFFFF' : 'var(--text-main)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isActive ? '0 4px 14px rgba(37, 99, 235, 0.25)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--accent-blue-light)';
                      e.currentTarget.style.color = 'var(--accent-blue)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)';
                      e.currentTarget.style.color = 'var(--text-main)';
                    }
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--border-card)',
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
              size={16}
              color="var(--accent-blue)"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search title, tech, feature..."
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
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-card)',
                transition: 'all 0.2s ease'
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

        {/* Results Counter Sub-header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', padding: '0 4px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Showing <strong style={{ color: 'var(--accent-blue)' }}>{filteredProjects.length}</strong> of {projects.length} project case studies
          </span>
          {activeCategory !== 'All' || searchQuery ? (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-blue)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Reset Filters
            </button>
          ) : null}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div
            className="bento-card"
            style={{
              padding: '64px 24px',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-bento)'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-blue-light)',
                color: 'var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <Search size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
              No matching projects found
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 20px auto' }}>
              We couldn&apos;t find any projects matching &quot;{searchQuery}&quot; in {activeCategory}. Try adjusting your search query or filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 'var(--radius-full)', padding: '8px 20px' }}
            >
              Reset Search & Filters
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
            {filteredProjects.map((project) => {
              return (
                <div
                  key={project.id}
                  className="bento-card project-card-item"
                  style={{
                    gridColumn: 'span 1',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-card)',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* Browser Window Header */}
                  <div
                    style={{
                      padding: '10px 18px',
                      backgroundColor: '#F8FAFC',
                      borderBottom: '1px solid var(--border-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '2px 10px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--border-card)',
                          fontSize: '0.725rem',
                          color: 'var(--text-subtle)',
                          fontWeight: 600,
                          fontFamily: 'monospace'
                        }}
                      >
                        <Lock size={10} color="#10B981" />
                        <span>https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.app</span>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--accent-blue-light)',
                        color: 'var(--accent-blue)',
                        border: '1px solid var(--accent-blue-border)',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Image Viewport Frame */}
                  <div
                    className="project-image-container"
                    style={{
                      height: '220px',
                      width: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-card-subtle)'
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      className="project-img"
                    />

                    {/* Glass Overlay on Hover */}
                    <div
                      className="image-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.45)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
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
                        style={{ borderRadius: 'var(--radius-full)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </button>
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            borderColor: 'transparent'
                          }}
                        >
                          <ExternalLink size={14} />
                          <span>Live Site</span>
                        </a>
                      )}
                    </div>

                    {/* Featured Shine Badge */}
                    {project.featured && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-full)',
                          background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                          color: '#FFFFFF',
                          fontSize: '0.725rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                          letterSpacing: '0.04em'
                        }}
                      >
                        <Star size={12} fill="#FFFFFF" /> FEATURED WORK
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--text-main)',
                        marginBottom: '10px',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.3
                      }}
                    >
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '20px', flex: 1 }}>
                      {project.description}
                    </p>

                    {/* Highlights bullet points */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div
                        style={{
                          marginBottom: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          padding: '12px 14px',
                          backgroundColor: 'var(--bg-card-subtle)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-card)'
                        }}
                      >
                        {project.highlights.slice(0, 2).map((hl, hIdx) => (
                          <div key={hIdx} style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Zap size={14} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                            <span style={{ fontWeight: 600 }}>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Tag Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: 'var(--accent-blue-light)',
                            color: 'var(--accent-blue)',
                            border: '1px solid var(--accent-blue-border)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer Actions */}
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
                        style={{ borderRadius: 'var(--radius-full)', padding: '7px 16px' }}
                      >
                        <span>Case Study</span>
                        <ArrowRight size={14} />
                      </button>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)' }}
                            title="GitHub Code"
                          >
                            <Github size={14} />
                            <span>Code</span>
                          </a>
                        )}
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)' }}
                            title="Live Demo"
                          >
                            <ExternalLink size={14} />
                            <span>Live</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === 'list' && filteredProjects.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bento-card project-list-item"
                style={{
                  padding: '20px 24px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  flexWrap: 'wrap',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '300px' }}>
                  <div
                    style={{
                      width: '100px',
                      height: '72px',
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
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{project.title}</h3>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--accent-blue-light)',
                          color: 'var(--accent-blue)'
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      {project.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', maxWidth: '240px' }} className="hide-mobile">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-card-subtle)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-card)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="btn btn-primary btn-sm"
                    style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
                  >
                    <span>Read Details</span>
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
        .project-list-item:hover {
          border-color: var(--border-card-hover) !important;
          box-shadow: var(--shadow-bento-hover) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 960px) {
          :global(.projects-bento-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.projects-bento-grid > div) {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 640px) {
          .hide-mobile {
            display: none !important;
          }
          .project-search-box {
            width: 100% !important;
          }
          .project-image-container {
            height: 190px !important;
          }
          .project-filter-bar {
            padding: 14px 16px !important;
          }
        }
      `}</style>
    </section>
  );
};
