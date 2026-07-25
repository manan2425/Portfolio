'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PortfolioData, Project, Skill, Experience, initialPortfolioData } from '@/data/portfolioData';
import {
  Shield,
  LayoutDashboard,
  FolderPlus,
  Cpu,
  Briefcase,
  User,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  X,
  Code2,
  Star
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'experience' | 'profile'>('overview');

  // Modal / Form state for Projects
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Form state for Skills
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  // Form state for Experience
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated');
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }

    // Fetch existing portfolio data
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((fetchedData) => {
        if (fetchedData && fetchedData.personalInfo) {
          setData(fetchedData);
        }
      })
      .catch((err) => console.log('Loaded default admin state:', err))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    router.push('/admin/login');
  };

  const handleSaveAll = async (updatedData = data) => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Error saving data to server');
    } finally {
      setSaving(false);
    }
  };

  /* Project Handlers */
  const handleSaveProject = () => {
    if (!editingProject?.title) return;
    let updatedProjects = [...data.projects];

    if (editingProject.id) {
      // Edit existing
      updatedProjects = updatedProjects.map((p) =>
        p.id === editingProject.id ? ({ ...p, ...editingProject } as Project) : p
      );
    } else {
      // Add new
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: editingProject.title || 'New Project',
        description: editingProject.description || '',
        longDescription: editingProject.longDescription || editingProject.description || '',
        category: (editingProject.category as any) || 'Full Stack',
        tags: editingProject.tags || ['Next.js', 'React'],
        image: editingProject.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        githubUrl: editingProject.githubUrl || '#',
        liveUrl: editingProject.liveUrl || '#',
        featured: editingProject.featured || false,
        highlights: editingProject.highlights || []
      };
      updatedProjects.unshift(newProj);
    }

    const newData = { ...data, projects: updatedProjects };
    setData(newData);
    setIsProjectModalOpen(false);
    setEditingProject(null);
    handleSaveAll(newData);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = data.projects.filter((p) => p.id !== id);
      const newData = { ...data, projects: updatedProjects };
      setData(newData);
      handleSaveAll(newData);
    }
  };

  /* Skill Handlers */
  const handleSaveSkill = () => {
    if (!editingSkill?.name) return;
    let updatedSkills = [...data.skills];

    if (editingSkill.id) {
      updatedSkills = updatedSkills.map((s) =>
        s.id === editingSkill.id ? ({ ...s, ...editingSkill } as Skill) : s
      );
    } else {
      const newSk: Skill = {
        id: `sk-${Date.now()}`,
        name: editingSkill.name || 'New Skill',
        category: (editingSkill.category as any) || 'Frontend',
        level: editingSkill.level || 85,
        iconName: editingSkill.iconName || 'Code2'
      };
      updatedSkills.push(newSk);
    }

    const newData = { ...data, skills: updatedSkills };
    setData(newData);
    setIsSkillModalOpen(false);
    setEditingSkill(null);
    handleSaveAll(newData);
  };

  const handleDeleteSkill = (id: string) => {
    if (confirm('Delete this skill?')) {
      const updatedSkills = data.skills.filter((s) => s.id !== id);
      const newData = { ...data, skills: updatedSkills };
      setData(newData);
      handleSaveAll(newData);
    }
  };

  /* Experience Handlers */
  const handleSaveExp = () => {
    if (!editingExp?.role) return;
    let updatedExp = [...data.experience];

    if (editingExp.id) {
      updatedExp = updatedExp.map((e) =>
        e.id === editingExp.id ? ({ ...e, ...editingExp } as Experience) : e
      );
    } else {
      const newE: Experience = {
        id: `exp-${Date.now()}`,
        role: editingExp.role || 'Software Engineer',
        company: editingExp.company || 'Company Name',
        period: editingExp.period || '2024 to Present',
        description: editingExp.description || '',
        achievements: editingExp.achievements || []
      };
      updatedExp.unshift(newE);
    }

    const newData = { ...data, experience: updatedExp };
    setData(newData);
    setIsExpModalOpen(false);
    setEditingExp(null);
    handleSaveAll(newData);
  };

  const handleDeleteExp = (id: string) => {
    if (confirm('Delete this work experience entry?')) {
      const updatedExp = data.experience.filter((e) => e.id !== id);
      const newData = { ...data, experience: updatedExp };
      setData(newData);
      handleSaveAll(newData);
    }
  };

  /* Profile Handlers */
  const handleProfileChange = (field: string, value: any) => {
    const updatedInfo = { ...data.personalInfo, [field]: value };
    const newData = { ...data, personalInfo: updatedInfo };
    setData(newData);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-primary)' }}>Loading Admin Dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Navbar */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-light)',
          padding: '16px 0',
          position: 'sticky',
          top: 0,
          zIndex: 800
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {data.personalInfo.name}'s Admin
              </span>
              <span className="pill-badge pill-green" style={{ marginLeft: '10px', fontSize: '0.7rem', padding: '2px 8px' }}>
                ADMIN SESSION ACTIVE
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {saveSuccess && (
              <span style={{ fontSize: '0.85rem', color: 'var(--status-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={16} /> Saved!
              </span>
            )}
            <button onClick={() => handleSaveAll(data)} disabled={saving} className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
            </button>
            <Link href="/" target="_blank" className="btn btn-secondary btn-sm">
              <span>View Site</span>
              <ExternalLink size={16} />
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ color: '#DC2626' }}>
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="container" style={{ flex: 1, padding: '32px 24px', display: 'flex', gap: '32px' }}>
        {/* Admin Sidebar Navigation */}
        <aside style={{ width: '240px', flexShrink: 0 }}>
          <div
            className="glass-card"
            style={{
              padding: '16px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'projects', label: 'Projects', icon: FolderPlus, count: data.projects.length },
              { id: 'skills', label: 'Skills', icon: Cpu, count: data.skills.length },
              { id: 'experience', label: 'Experience', icon: Briefcase, count: data.experience.length },
              { id: 'profile', label: 'Profile & Bio', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    fontSize: '0.925rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-surface)',
                        color: isActive ? '#FFFFFF' : 'var(--text-muted)'
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Panel */}
        <main style={{ flex: 1 }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>Dashboard Overview</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {[
                  { title: 'Total Projects', value: data.projects.length, sub: `${data.projects.filter(p => p.featured).length} Featured`, icon: FolderPlus },
                  { title: 'Technical Skills', value: data.skills.length, sub: 'Across 4 Domains', icon: Cpu },
                  { title: 'Experience Roles', value: data.experience.length, sub: 'Milestones & Companies', icon: Briefcase },
                  { title: 'Availability Status', value: data.personalInfo.isAvailable ? 'Open to Work' : 'Unavailable', sub: data.personalInfo.location, icon: User },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{stat.title}</span>
                        <Icon size={20} color="var(--accent-primary)" />
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{stat.sub}</div>
                    </div>
                  );
                })}
              </div>

              <div className="glass-card" style={{ padding: '28px', background: '#FFFFFF' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Quick Actions & Management</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '20px' }}>
                  Use the navigation tabs on the left to add new portfolio entries, edit your bio, update your technical skills, or update your social links.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => { setActiveTab('projects'); setEditingProject({}); setIsProjectModalOpen(true); }} className="btn btn-primary btn-sm">
                    <Plus size={16} /> Add New Project
                  </button>
                  <button onClick={() => { setActiveTab('skills'); setEditingSkill({}); setIsSkillModalOpen(true); }} className="btn btn-secondary btn-sm">
                    <Plus size={16} /> Add Skill
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Projects</h2>
                <button onClick={() => { setEditingProject({}); setIsProjectModalOpen(true); }} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add Project
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="glass-card"
                    style={{
                      padding: '20px',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', background: 'var(--bg-surface)' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{proj.title}</span>
                          {proj.featured && (
                            <span className="pill-badge" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                              <Star size={10} /> Featured
                            </span>
                          )}
                          <span className="pill-badge pill-green" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                            {proj.category}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, maxLines: 1 }}>
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => { setEditingProject(proj); setIsProjectModalOpen(true); }}
                        className="btn btn-secondary btn-sm"
                        title="Edit Project"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#DC2626' }}
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Technical Skills</h2>
                <button onClick={() => { setEditingSkill({}); setIsSkillModalOpen(true); }} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add Skill
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                {data.skills.map((skill) => (
                  <div key={skill.id} className="glass-card" style={{ padding: '16px', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{skill.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {skill.category} • {skill.level}%
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => { setEditingSkill(skill); setIsSkillModalOpen(true); }} className="btn btn-secondary btn-sm" style={{ padding: '6px' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDeleteSkill(skill.id)} className="btn btn-secondary btn-sm" style={{ padding: '6px', color: '#DC2626' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Experience</h2>
                <button onClick={() => { setEditingExp({}); setIsExpModalOpen(true); }} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add Experience
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="glass-card" style={{ padding: '20px', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{exp.role}</h3>
                      <div style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '6px' }}>
                        {exp.company} ({exp.period})
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{exp.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => { setEditingExp(exp); setIsExpModalOpen(true); }} className="btn btn-secondary btn-sm">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteExp(exp.id)} className="btn btn-secondary btn-sm" style={{ color: '#DC2626' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <div className="glass-card" style={{ padding: '32px', background: '#FFFFFF' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>Personal Profile & Passcode</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.personalInfo.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.personalInfo.title}
                    onChange={(e) => handleProfileChange('title', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.personalInfo.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={data.personalInfo.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Hero Headline Tagline</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.personalInfo.tagline}
                    onChange={(e) => handleProfileChange('tagline', e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">About / Bio Summary</label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    value={data.personalInfo.about}
                    onChange={(e) => handleProfileChange('about', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.personalInfo.github}
                    onChange={(e) => handleProfileChange('github', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">LinkedIn URL</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Resume Download Link</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.personalInfo.resumeUrl}
                    onChange={(e) => handleProfileChange('resumeUrl', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Admin Passcode</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.personalInfo.adminPasscode}
                    onChange={(e) => handleProfileChange('adminPasscode', e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={data.personalInfo.isAvailable}
                      onChange={(e) => handleProfileChange('isAvailable', e.target.checked)}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Display "Available for Hire" status pulse badge on Hero section</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => handleSaveAll(data)}
                disabled={saving}
                className="btn btn-primary"
                style={{ marginTop: '20px', padding: '14px 28px' }}
              >
                <Save size={16} />
                <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* PROJECT EDIT MODAL */}
      {isProjectModalOpen && (
        <div className="modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
          <div
            className="glass-card"
            style={{ maxWidth: '600px', width: '100%', padding: '32px', background: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {editingProject?.id ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Project Title</label>
              <input
                type="text"
                className="form-input"
                value={editingProject?.title || ''}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={editingProject?.category || 'Full Stack'}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Short Description</label>
              <textarea
                rows={2}
                className="form-textarea"
                value={editingProject?.description || ''}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Long Overview Description</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={editingProject?.longDescription || ''}
                onChange={(e) => setEditingProject({ ...editingProject, longDescription: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-input"
                value={editingProject?.image || ''}
                onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">GitHub Repository URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingProject?.githubUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Live Demo URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingProject?.liveUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={editingProject?.featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                />
                <span>Mark as Featured Project</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={handleSaveProject} className="btn btn-primary" style={{ flex: 1 }}>
                Save Project
              </button>
              <button onClick={() => setIsProjectModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SKILL EDIT MODAL */}
      {isSkillModalOpen && (
        <div className="modal-overlay" onClick={() => setIsSkillModalOpen(false)}>
          <div
            className="glass-card"
            style={{ maxWidth: '480px', width: '100%', padding: '32px', background: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {editingSkill?.id ? 'Edit Skill' : 'Add Skill'}
              </h3>
              <button onClick={() => setIsSkillModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Skill Name</label>
              <input
                type="text"
                className="form-input"
                value={editingSkill?.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Domain Category</label>
              <select
                className="form-select"
                value={editingSkill?.category || 'Frontend'}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Databases & Cloud">Databases & Cloud</option>
                <option value="Tools & Others">Tools & Others</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Proficiency Level ({editingSkill?.level || 85}%)</label>
              <input
                type="range"
                min="10"
                max="100"
                className="form-input"
                value={editingSkill?.level || 85}
                onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={handleSaveSkill} className="btn btn-primary" style={{ flex: 1 }}>
                Save Skill
              </button>
              <button onClick={() => setIsSkillModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPERIENCE EDIT MODAL */}
      {isExpModalOpen && (
        <div className="modal-overlay" onClick={() => setIsExpModalOpen(false)}>
          <div
            className="glass-card"
            style={{ maxWidth: '520px', width: '100%', padding: '32px', background: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {editingExp?.id ? 'Edit Experience' : 'Add Experience'}
              </h3>
              <button onClick={() => setIsExpModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Role Title</label>
              <input
                type="text"
                className="form-input"
                value={editingExp?.role || ''}
                onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company / Organization</label>
              <input
                type="text"
                className="form-input"
                value={editingExp?.company || ''}
                onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Period (e.g. 2024 to Present)</label>
              <input
                type="text"
                className="form-input"
                value={editingExp?.period || ''}
                onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role Summary Description</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={editingExp?.description || ''}
                onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={handleSaveExp} className="btn btn-primary" style={{ flex: 1 }}>
                Save Experience
              </button>
              <button onClick={() => setIsExpModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
