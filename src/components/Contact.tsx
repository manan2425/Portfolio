'use client';

import React, { useState } from 'react';
import { PersonalInfo } from '@/data/portfolioData';
import { Send, Copy, Check, Mail, MessageSquare, Github, Linkedin, Terminal, CornerDownLeft } from 'lucide-react';

interface ContactProps {
  personalInfo: PersonalInfo;
}

export const Contact: React.FC<ContactProps> = ({ personalInfo }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleCopyEmail = () => {
    if (personalInfo.email) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="section-spacing" style={{ backgroundColor: 'var(--bg-app)', borderTop: '1px solid var(--border-card)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span className="bento-section-tag">
            <Terminal size={14} color="var(--terminal-green)" />
            <span>$ curl -X POST /api/contact</span>
          </span>
          <h2 className="section-title">
            Initialize <span className="gradient-heading">Connection</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Have a project in mind, software developer opportunity, or technical discussion? Send a CLI payload.
          </p>
        </div>

        {/* Bento Grid Contact Tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '24px'
          }}
          className="contact-bento-grid"
        >
          {/* Left Column: Direct Email & Social Terminal Card */}
          <div className="bento-card" style={{ padding: '32px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card-hover)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
              Direct Endpoints
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '28px' }}>
              Reach out directly via email or social developer networks.
            </p>

            {/* Email Copy Box */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-terminal)',
                border: '1px solid var(--border-card)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={20} color="var(--terminal-cyan)" />
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>$ export DEV_EMAIL</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{personalInfo.email}</div>
                </div>
              </div>

              <button onClick={handleCopyEmail} className="btn btn-secondary btn-sm" title="Copy Email">
                {copied ? <Check size={14} color="var(--terminal-green)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Social Links */}
            <div>
              <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '10px' }}>
                SOCIAL NETWORKS
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1, fontFamily: 'var(--font-mono)' }}>
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1, fontFamily: 'var(--font-mono)' }}>
                    <Linkedin size={14} />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Terminal POST Form Window */}
          <div className="terminal-window" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red"></span>
                <span className="terminal-dot dot-yellow"></span>
                <span className="terminal-dot dot-green"></span>
              </div>
              <div className="terminal-title">
                <Terminal size={12} color="var(--terminal-green)" />
                <span>POST /api/v1/contact --json</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}>HTTP 200 OK</span>
            </div>

            <div style={{ padding: '28px', backgroundColor: 'var(--bg-terminal)', flex: 1 }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '32px 12px', fontFamily: 'var(--font-mono)' }}>
                  <Check size={40} color="var(--terminal-green)" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--terminal-green)', marginBottom: '6px' }}>
                    Payload Delivered (200 OK)
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Thank you! Your message payload has been transmitted successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">SENDER NAME ($ NAME)</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">EMAIL ENDPOINT ($ EMAIL)</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">MESSAGE PAYLOAD ($ BODY)</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Hi Manan, I'd like to discuss a project..."
                      className="form-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontFamily: 'var(--font-mono)' }}>
                    <span>Send Payload</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.contact-bento-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
