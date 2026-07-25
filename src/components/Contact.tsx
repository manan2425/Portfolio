'use client';

import React, { useState } from 'react';
import { PersonalInfo } from '@/data/portfolioData';
import { Send, Copy, Check, Mail, MessageSquare, Github, Linkedin, ArrowUpRight } from 'lucide-react';

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
    <section id="contact" className="section-spacing" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-card)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span className="bento-section-tag">
            <MessageSquare size={13} />
            <span>LET'S CONNECT</span>
          </span>
          <h2 className="section-title">
            Get In <span className="gradient-heading">Touch</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Have a project in mind, engineering role opportunity, or technical question? Drop me a message.
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
          {/* Left Column: Email & Social Bento Card */}
          <div className="bento-card" style={{ padding: '32px', backgroundColor: 'var(--bg-card-subtle)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
              Direct Communication
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '28px' }}>
              Feel free to reach out via email or connect with me on social platforms. I usually respond within a few hours.
            </p>

            {/* Email Copy Box */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-card)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={20} color="var(--accent-blue)" />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>EMAIL</div>
                  <div style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--text-main)' }}>{personalInfo.email}</div>
                </div>
              </div>

              <button onClick={handleCopyEmail} className="btn btn-secondary btn-sm" title="Copy Email">
                {copied ? <Check size={14} color="var(--status-green)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Social Buttons */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '10px' }}>
                SOCIAL NETWORK
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Message Form Bento Card */}
          <div className="bento-card" style={{ padding: '32px', backgroundColor: '#FFFFFF' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 12px' }}>
                <Check size={36} color="var(--status-green)" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Thank you for reaching out. I'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">YOUR NAME</label>
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
                  <label className="form-label">EMAIL ADDRESS</label>
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
                  <label className="form-label">MESSAGE</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hi Manan, I'd like to talk about..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                  <span>Send Message</span>
                  <Send size={15} />
                </button>
              </form>
            )}
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
