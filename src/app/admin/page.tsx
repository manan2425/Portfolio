'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PortfolioData, Project, Skill, Experience, Achievement, initialPortfolioData } from '@/data/portfolioData';
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
  Star,
  Trophy,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Award
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'experience' | 'achievements' | 'profile'>('overview');

  // Modal / Form state for Projects
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Form state for Skills
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  // Form state for Experience
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);

  // Form state for Achievements
  const [editingAch, setEditingAch] = useState<Partial<Achievement> | null>(null);
  const [isAchModalOpen, setIsAchModalOpen] = useState(false);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragType, setDragType] = useState<'projects' | 'skills' | 'experience' | 'achievements' | null>(null);

  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated');
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }

    const savedLocal = localStorage.getItem('portfolio_custom_data');
    if (savedLocal) {
      try {
        const parsed = JSON.parse(savedLocal);
        if (parsed && parsed.personalInfo) {
          setData(parsed);
        }
      } catch (e) {}
    }

    // Fetch existing portfolio data from server (data/store.json)
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((fetchedData) => {
        if (fetchedData && fetchedData.personalInfo) {
          setData(fetchedData);
          if (typeof window !== 'undefined') {
            localStorage.setItem('portfolio_custom_data', JSON.stringify(fetchedData));
          }
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio_custom_data', JSON.stringify(updatedData));
        if (updatedData.personalInfo?.adminPasscode) {
          localStorage.setItem('custom_admin_passcode', updatedData.personalInfo.adminPasscode);
        }
      }
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

  /* Helper for reordering items */
  const moveItemInArray = <T,>(arr: T[], from: number, to: number): T[] => {
    if (to < 0 || to >= arr.length) return arr;
    const copy = [...arr];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    return copy;
  };

  const handleMove = (type: 'projects' | 'skills' | 'experience' | 'achievements', fromIdx: number, toIdx: number) => {
    let newData = { ...data };
    if (type === 'projects') {
      newData.projects = moveItemInArray(data.projects, fromIdx, toIdx);
    } else if (type === 'skills') {
      newData.skills = moveItemInArray(data.skills, fromIdx, toIdx);
    } else if (type === 'experience') {
      newData.experience = moveItemInArray(data.experience, fromIdx, toIdx);
    } else if (type === 'achievements') {
      newData.achievements = moveItemInArray(data.achievements || [], fromIdx, toIdx);
    }
    setData(newData);
    handleSaveAll(newData);
  };

  const handleDragStart = (type: 'projects' | 'skills' | 'experience' | 'achievements', index: number) => {
    setDragType(type);
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (type: 'projects' | 'skills' | 'experience' | 'achievements', targetIndex: number) => {
    if (draggedIndex === null || dragType !== type || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragType(null);
      return;
    }
    handleMove(type, draggedIndex, targetIndex);
    setDraggedIndex(null);
    setDragType(null);
  };

  /* Project Handlers */
  const handleSaveProject = () => {
    if (!editingProject?.title) return;
    let updatedProjects = [...data.projects];

    if (editingProject.id) {
      updatedProjects = updatedProjects.map((p) =>
        p.id === editingProject.id ? ({ ...p, ...editingProject } as Project) : p
      );
    } else {
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
        category: editingExp.category || 'College Leadership',
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

  /* Achievement Handlers */
  const handleSaveAch = () => {
    if (!editingAch?.title) return;
    let updatedAch = [...(data.achievements || [])];

    if (editingAch.id) {
      updatedAch = updatedAch.map((a) =>
        a.id === editingAch.id ? ({ ...a, ...editingAch } as Achievement) : a
      );
    } else {
      const newA: Achievement = {
        id: `ach-${Date.now()}`,
        title: editingAch.title || 'New Achievement',
        event: editingAch.event || 'Hackathon / Competition',
        period: editingAch.period || '2026',
        description: editingAch.description || '',
        prize: editingAch.prize || '',
        badge: editingAch.badge || 'Winner'
      };
      updatedAch.unshift(newA);
    }

    const newData = { ...data, achievements: updatedAch };
    setData(newData);
    setIsAchModalOpen(false);
    setEditingAch(null);
    handleSaveAll(newData);
  };

  const handleDeleteAch = (id: string) => {
    if (confirm('Delete this achievement?')) {
      const updatedAch = (data.achievements || []).filter((a) => a.id !== id);
      const newData = { ...data, achievements: updatedAch };
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
        <aside style={{ width: '250px', flexShrink: 0 }}>
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
              { id: 'achievements', label: 'Achievements', icon: Trophy, count: (data.achievements || []).length },
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
                  { title: 'Experience Roles', value: data.experience.length, sub: 'Work & College Leadership', icon: Briefcase },
                  { title: 'Achievements', value: (data.achievements || []).length, sub: 'Hackathon Wins & Awards', icon: Trophy },
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
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Quick Actions & Drag-and-Drop Management</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '20px' }}>
                  Use the navigation tabs on the left to add, edit, delete, or <strong>drag and drop to reorder</strong> projects, skills, college roles, and achievements.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button onClick={() => { setActiveTab('projects'); setEditingProject({}); setIsProjectModalOpen(true); }} className="btn btn-primary btn-sm">
                    <Plus size={16} /> Add Project
                  </button>
                  <button onClick={() => { setActiveTab('experience'); setEditingExp({}); setIsExpModalOpen(true); }} className="btn btn-secondary btn-sm">
                    <Plus size={16} /> Add Experience / College Role
                  </button>
                  <button onClick={() => { setActiveTab('achievements'); setEditingAch({}); setIsAchModalOpen(true); }} className="btn btn-secondary btn-sm">
                    <Plus size={16} /> Add Achievement
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Projects</h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Drag items or use arrow buttons to reorder display position.</span>
                </div>
                <button onClick={() => { setEditingProject({}); setIsProjectModalOpen(true); }} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add Project
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    draggable
                    onDragStart={() => handleDragStart('projects', idx)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('projects', idx)}
                    className="glass-card"
                    style={{
                      padding: '20px',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      borderLeft: '4px solid var(--accent-blue)',
                      opacity: draggedIndex === idx && dragType === 'projects' ? 0.4 : 1,
                      cursor: 'grab'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                      <GripVertical size={20} color="var(--text-muted)" style={{ cursor: 'grab', flexShrink: 0 }} />
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', background: 'var(--bg-surface)' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
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
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleMove('projects', idx, idx - 1)}
                        disabled={idx === 0}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 8px', opacity: idx === 0 ? 0.3 : 1 }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMove('projects', idx, idx + 1)}
                        disabled={idx === data.projects.length - 1}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 8px', opacity: idx === data.projects.length - 1 ? 0.3 : 1 }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
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
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Technical Skills</h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Drag items or use arrow buttons to reorder display position.</span>
                </div>
                <button onClick={() => { setEditingSkill({}); setIsSkillModalOpen(true); }} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add Skill
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.skills.map((skill, idx) => (
                  <div
                    key={skill.id}
                    draggable
                    onDragStart={() => handleDragStart('skills', idx)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('skills', idx)}
                    className="glass-card"
                    style={{
                      padding: '14px 20px',
                      background: '#FFFFFF',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'grab',
                      opacity: draggedIndex === idx && dragType === 'skills' ? 0.4 : 1
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <GripVertical size={18} color="var(--text-muted)" style={{ cursor: 'grab' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{skill.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {skill.category} • {skill.level}%
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => handleMove('skills', idx, idx - 1)}
                        disabled={idx === 0}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px', opacity: idx === 0 ? 0.3 : 1 }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMove('skills', idx, idx + 1)}
                        disabled={idx === data.skills.length - 1}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px', opacity: idx === data.skills.length - 1 ? 0.3 : 1 }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
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

          {/* TAB 4: EXPERIENCE & COLLEGE ROLES */}
          {activeTab === 'experience' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Experience & College Roles</h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Drag items or use arrow buttons to reorder display position.</span>
                </div>
                <button onClick={() => { setEditingExp({}); setIsExpModalOpen(true); }} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add Experience / Role
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.experience.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    draggable
                    onDragStart={() => handleDragStart('experience', idx)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('experience', idx)}
                    className="glass-card"
                    style={{
                      padding: '20px',
                      background: '#FFFFFF',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '16px',
                      cursor: 'grab',
                      opacity: draggedIndex === idx && dragType === 'experience' ? 0.4 : 1,
                      borderLeft: `4px solid ${exp.category === 'Work & Internships' ? 'var(--accent-blue)' : '#F59E0B'}`
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1 }}>
                      <GripVertical size={20} color="var(--text-muted)" style={{ cursor: 'grab', marginTop: '4px' }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{exp.role}</h3>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: exp.category === 'Work & Internships' ? 'var(--accent-blue-light)' : 'rgba(245, 158, 11, 0.12)',
                              color: exp.category === 'Work & Internships' ? 'var(--accent-blue)' : '#D97706'
                            }}
                          >
                            {exp.category || 'College Leadership'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '6px' }}>
                          {exp.company} ({exp.period})
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{exp.description}</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleMove('experience', idx, idx - 1)}
                        disabled={idx === 0}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px', opacity: idx === 0 ? 0.3 : 1 }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMove('experience', idx, idx + 1)}
                        disabled={idx === data.experience.length - 1}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px', opacity: idx === data.experience.length - 1 ? 0.3 : 1 }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
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

          {/* TAB 5: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Achievements & Awards</h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Drag items or use arrow buttons to reorder display position.</span>
                </div>
                <button onClick={() => { setEditingAch({}); setIsAchModalOpen(true); }} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add Achievement
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(data.achievements || []).map((ach, idx) => (
                  <div
                    key={ach.id || idx}
                    draggable
                    onDragStart={() => handleDragStart('achievements', idx)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('achievements', idx)}
                    className="glass-card"
                    style={{
                      padding: '20px',
                      background: '#FFFFFF',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '16px',
                      cursor: 'grab',
                      opacity: draggedIndex === idx && dragType === 'achievements' ? 0.4 : 1,
                      borderLeft: '4px solid #10B981'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1 }}>
                      <GripVertical size={20} color="var(--text-muted)" style={{ cursor: 'grab', marginTop: '4px' }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{ach.title}</h3>
                          {ach.badge && (
                            <span
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: '#10B981',
                                color: '#FFFFFF'
                              }}
                            >
                              {ach.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '6px' }}>
                          {ach.event} ({ach.period})
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>{ach.description}</p>
                        {ach.prize && (
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#D97706' }}>
                            🏆 Prize: {ach.prize}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleMove('achievements', idx, idx - 1)}
                        disabled={idx === 0}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px', opacity: idx === 0 ? 0.3 : 1 }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMove('achievements', idx, idx + 1)}
                        disabled={idx === (data.achievements || []).length - 1}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px', opacity: idx === (data.achievements || []).length - 1 ? 0.3 : 1 }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button onClick={() => { setEditingAch(ach); setIsAchModalOpen(true); }} className="btn btn-secondary btn-sm">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteAch(ach.id)} className="btn btn-secondary btn-sm" style={{ color: '#DC2626' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
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

              {/* OVERVIEW SECTION BENTO CARD EDITOR */}
              <div style={{ marginTop: '36px', paddingTop: '28px', borderTop: '1px solid var(--border-card)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>Hero Overview Section Editor</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Customize the 4 key metrics and summary note displayed in the Hero Overview bento card on your home page.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ padding: '16px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px' }}>METRIC 1</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Value (e.g. 04+)"
                        className="form-input"
                        value={data.personalInfo.overviewMetric1Value || ''}
                        onChange={(e) => handleProfileChange('overviewMetric1Value', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Projects)"
                        className="form-input"
                        value={data.personalInfo.overviewMetric1Label || ''}
                        onChange={(e) => handleProfileChange('overviewMetric1Label', e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ padding: '16px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px' }}>METRIC 2</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Value (e.g. 08+)"
                        className="form-input"
                        value={data.personalInfo.overviewMetric2Value || ''}
                        onChange={(e) => handleProfileChange('overviewMetric2Value', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Tech Stack)"
                        className="form-input"
                        value={data.personalInfo.overviewMetric2Label || ''}
                        onChange={(e) => handleProfileChange('overviewMetric2Label', e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ padding: '16px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px' }}>METRIC 3</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Value (e.g. 100%)"
                        className="form-input"
                        value={data.personalInfo.overviewMetric3Value || ''}
                        onChange={(e) => handleProfileChange('overviewMetric3Value', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Type Safe)"
                        className="form-input"
                        value={data.personalInfo.overviewMetric3Label || ''}
                        onChange={(e) => handleProfileChange('overviewMetric3Label', e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ padding: '16px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px' }}>METRIC 4</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Value (e.g. 99+)"
                        className="form-input"
                        value={data.personalInfo.overviewMetric4Value || ''}
                        onChange={(e) => handleProfileChange('overviewMetric4Value', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Performance)"
                        className="form-input"
                        value={data.personalInfo.overviewMetric4Label || ''}
                        onChange={(e) => handleProfileChange('overviewMetric4Label', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Overview Summary Note</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Summary note displayed beneath metrics"
                    value={data.personalInfo.overviewSummary || ''}
                    onChange={(e) => handleProfileChange('overviewSummary', e.target.value)}
                  />
                </div>
              </div>

              {/* SECURITY & PASSWORD CHANGE SECTION */}
              <div style={{ marginTop: '36px', paddingTop: '28px', borderTop: '1px solid var(--border-card)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>Admin Security & Password Change</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Update your secret admin login passcode.
                </p>

                <div style={{ maxWidth: '400px' }} className="form-group">
                  <label className="form-label">New Admin Passcode / Password</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.personalInfo.adminPasscode}
                    onChange={(e) => handleProfileChange('adminPasscode', e.target.value)}
                  />
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
            style={{ maxWidth: '560px', width: '100%', padding: '32px', background: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {editingExp?.id ? 'Edit Experience / College Role' : 'Add Experience / College Role'}
              </h3>
              <button onClick={() => setIsExpModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Role Title (e.g. General Secretary / Developer Head)</label>
              <input
                type="text"
                className="form-input"
                value={editingExp?.role || ''}
                onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Organization / College / Company</label>
              <input
                type="text"
                className="form-input"
                value={editingExp?.company || ''}
                onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={editingExp?.category || 'College Leadership'}
                onChange={(e) => setEditingExp({ ...editingExp, category: e.target.value as any })}
              >
                <option value="College Leadership">College Leadership & Student Chapters</option>
                <option value="Work & Internships">Work & Internships</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Time Period (e.g. July 2025 to June 2026)</label>
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
                Save Role
              </button>
              <button onClick={() => setIsExpModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACHIEVEMENT EDIT MODAL */}
      {isAchModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAchModalOpen(false)}>
          <div
            className="glass-card"
            style={{ maxWidth: '540px', width: '100%', padding: '32px', background: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {editingAch?.id ? 'Edit Achievement' : 'Add Achievement'}
              </h3>
              <button onClick={() => setIsAchModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Achievement Title (e.g. 2nd Runner Up & Won ₹75k Prize)</label>
              <input
                type="text"
                className="form-input"
                value={editingAch?.title || ''}
                onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Event / Competition Name (e.g. Odoo X KSV 2026 Hackathon)</label>
              <input
                type="text"
                className="form-input"
                value={editingAch?.event || ''}
                onChange={(e) => setEditingAch({ ...editingAch, event: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Year / Period (e.g. 2026)</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingAch?.period || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, period: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Badge Tag (e.g. 2nd Runner-Up / Finalist)</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingAch?.badge || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, badge: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Prize / Recognition (e.g. ₹75,000 Cash Prize)</label>
              <input
                type="text"
                className="form-input"
                value={editingAch?.prize || ''}
                onChange={(e) => setEditingAch({ ...editingAch, prize: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description / Summary</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={editingAch?.description || ''}
                onChange={(e) => setEditingAch({ ...editingAch, description: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={handleSaveAch} className="btn btn-primary" style={{ flex: 1 }}>
                Save Achievement
              </button>
              <button onClick={() => setIsAchModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
