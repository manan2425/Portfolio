'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Monitor, Play, RefreshCw, X, Check } from 'lucide-react';
import { PortfolioData } from '@/data/portfolioData';

interface InteractiveTerminalProps {
  data: PortfolioData;
  onNavigateSection?: (sectionId: string) => void;
}

interface CommandOutput {
  id: string;
  command: string;
  type: 'output' | 'error' | 'success' | 'matrix';
  content: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ data, onNavigateSection }) => {
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputList, setOutputList] = useState<CommandOutput[]>([]);
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputList]);

  // Initial welcome message
  useEffect(() => {
    const initialOutputs: CommandOutput[] = [
      {
        id: 'init-1',
        command: 'neofetch',
        type: 'output',
        timestamp: new Date().toLocaleTimeString(),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'center', padding: '10px 0' }}>
            <div style={{ color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.25, whiteSpace: 'pre' }}>
{`  __  __   _   _   _    _  _   
 |  \\/  | / \\ | \\ | |  / \\| \\ | 
 | |\\/| |/ _ \\|  \\| | / _ \\  \\| |
 | |  | / ___ \\ |\\  |/ ___ \\ |\\ |
 |_|  |_/_/   \\_\\_| \\_/_/   \\_\\_|`}
            </div>
            <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
              <div style={{ color: 'var(--terminal-cyan)', fontWeight: 800 }}>manan@dev-box:~$</div>
              <div>-------------------------</div>
              <div><span style={{ color: 'var(--terminal-yellow)' }}>OS:</span> MananOS 2.0 (Linux x86_64)</div>
              <div><span style={{ color: 'var(--terminal-yellow)' }}>Role:</span> {data.personalInfo.title}</div>
              <div><span style={{ color: 'var(--terminal-yellow)' }}>Location:</span> {data.personalInfo.location}</div>
              <div><span style={{ color: 'var(--terminal-yellow)' }}>Kernel:</span> Next.js 14.2 / App Router</div>
              <div><span style={{ color: 'var(--terminal-yellow)' }}>Uptime:</span> 99.9% Production Ready</div>
              <div><span style={{ color: 'var(--terminal-yellow)' }}>Shell:</span> zsh 5.9 (x86_64-apple-darwin22.0)</div>
              <div><span style={{ color: 'var(--terminal-yellow)' }}>Stack:</span> MERN (MongoDB, Express, React, Node) + AI/ML</div>
            </div>
          </div>
        )
      },
      {
        id: 'init-2',
        command: 'help',
        type: 'output',
        timestamp: new Date().toLocaleTimeString(),
        content: (
          <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            <div>Type <span style={{ color: 'var(--terminal-green)', fontWeight: 700 }}>help</span> to view all CLI commands, or click quick options below:</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {['projects', 'skills', 'exp', 'achievements', 'contact', 'resume', 'matrix', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runCommand(cmd)}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(6, 182, 212, 0.15)',
                    color: 'var(--terminal-cyan)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  $ {cmd}
                </button>
              ))}
            </div>
          </div>
        )
      }
    ];
    setOutputList(initialOutputs);
  }, []);

  const runCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add to history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const time = new Date().toLocaleTimeString();
    let content: React.ReactNode = null;
    let type: CommandOutput['type'] = 'output';

    switch (cmd) {
      case 'help':
        content = (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.7 }}>
            <div style={{ color: 'var(--terminal-cyan)', fontWeight: 700, marginBottom: '6px' }}>AVAILABLE LINUX CLI COMMANDS:</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>neofetch</span> - System specs & developer bio</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>projects</span> - List software projects & case studies</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>skills</span> - Display tech stack & competencies</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>exp</span> - Output git commit log of career history</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>achievements</span> - Print hackathon awards & honors</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>contact</span> - Direct email & communication channels</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>resume</span> - Download / open CV PDF</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>matrix</span> - Toggle green cyberpunk matrix effect</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>sudo hire</span> - Developer authorization command</div>
            <div><span style={{ color: 'var(--terminal-green)', width: '120px', display: 'inline-block' }}>clear</span> - Clear terminal output buffer</div>
          </div>
        );
        break;

      case 'neofetch':
      case 'whoami':
        content = (
          <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
            <div style={{ color: 'var(--terminal-cyan)', fontWeight: 800 }}>manan@dev-box:~$</div>
            <div>-------------------------</div>
            <div><span style={{ color: 'var(--terminal-yellow)' }}>Name:</span> {data.personalInfo.name}</div>
            <div><span style={{ color: 'var(--terminal-yellow)' }}>Title:</span> {data.personalInfo.title}</div>
            <div><span style={{ color: 'var(--terminal-yellow)' }}>Bio:</span> {data.personalInfo.about}</div>
            <div><span style={{ color: 'var(--terminal-yellow)' }}>Location:</span> {data.personalInfo.location}</div>
            <div><span style={{ color: 'var(--terminal-yellow)' }}>Availability:</span> {data.personalInfo.isAvailable ? '✓ Open for Opportunities' : 'Busy'}</div>
          </div>
        );
        break;

      case 'projects':
      case 'ls projects':
        content = (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div style={{ color: 'var(--terminal-cyan)', fontWeight: 700, marginBottom: '6px' }}>
              total {data.projects.length} repository projects found:
            </div>
            {data.projects.map((p, i) => (
              <div key={p.id} style={{ marginBottom: '8px', paddingLeft: '12px', borderLeft: '2px solid var(--terminal-green)' }}>
                <span style={{ color: 'var(--terminal-yellow)' }}>[{i + 1}] {p.title}</span> ({p.category})
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{p.description}</div>
                <div style={{ color: 'var(--terminal-cyan)', fontSize: '0.75rem' }}>Tech: {p.tags.join(', ')}</div>
              </div>
            ))}
            {onNavigateSection && (
              <button
                onClick={() => onNavigateSection('projects')}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '8px', fontSize: '0.78rem' }}
              >
                Jump to Projects UI Section →
              </button>
            )}
          </div>
        );
        break;

      case 'skills':
      case 'cat skills.json':
        content = (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div style={{ color: 'var(--terminal-cyan)', fontWeight: 700, marginBottom: '6px' }}>
              $ pacman -S --noconfirm engineering-capabilities
            </div>
            {data.skills.map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <span style={{ width: '180px', color: 'var(--text-main)', fontWeight: 600 }}>{s.name}</span>
                <span style={{ color: 'var(--terminal-green)' }}>
                  [{'█'.repeat(Math.floor(s.level / 10)) + '░'.repeat(10 - Math.floor(s.level / 10))}]
                </span>
                <span style={{ color: 'var(--terminal-cyan)', fontSize: '0.78rem' }}>{s.level}%</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'exp':
      case 'git log':
        content = (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', lineHeight: 1.6 }}>
            <div style={{ color: 'var(--terminal-cyan)', fontWeight: 700, marginBottom: '6px' }}>
              $ git log --graph --oneline --decorate --all
            </div>
            {data.experience.map((e, idx) => (
              <div key={e.id} style={{ marginBottom: '6px' }}>
                <span style={{ color: 'var(--terminal-yellow)' }}>* commit {e.id.replace('exp-', '7a8b9')}</span>{' '}
                <span style={{ color: 'var(--terminal-green)' }}>({e.period})</span>
                <div style={{ color: 'var(--text-main)', fontWeight: 700, paddingLeft: '14px' }}>{e.role} @ {e.company}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', paddingLeft: '14px' }}>{e.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'achievements':
        content = (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div style={{ color: 'var(--terminal-cyan)', fontWeight: 700, marginBottom: '6px' }}>
              $ ./run_benchmarks.sh --show-trophies
            </div>
            {data.achievements?.map((a) => (
              <div key={a.id} style={{ marginBottom: '8px', padding: '6px 10px', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <div style={{ color: 'var(--terminal-yellow)', fontWeight: 800 }}>🏆 {a.title} - {a.event} ({a.period})</div>
                <div style={{ color: 'var(--text-main)', fontSize: '0.8rem' }}>{a.description}</div>
                {a.prize && <div style={{ color: 'var(--terminal-green)', fontSize: '0.75rem', fontWeight: 700 }}>Prize: {a.prize}</div>}
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
      case 'sudo contact':
        content = (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div style={{ color: 'var(--terminal-green)', fontWeight: 700 }}>$ curl -X POST /api/v1/contact</div>
            <div>Email: <a href={`mailto:${data.personalInfo.email}`} style={{ color: 'var(--terminal-cyan)' }}>{data.personalInfo.email}</a></div>
            <div>GitHub: <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-cyan)' }}>{data.personalInfo.github}</a></div>
            <div>LinkedIn: <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-cyan)' }}>{data.personalInfo.linkedin}</a></div>
            {onNavigateSection && (
              <button
                onClick={() => onNavigateSection('contact')}
                className="btn btn-primary btn-sm"
                style={{ marginTop: '8px', fontSize: '0.78rem' }}
              >
                Open Interactive Form →
              </button>
            )}
          </div>
        );
        break;

      case 'resume':
      case 'cat resume.pdf':
        window.open(data.personalInfo.resumeUrl || '/resume4.pdf', '_blank');
        type = 'success';
        content = <div style={{ color: 'var(--terminal-green)' }}>Opening {data.personalInfo.resumeUrl}... PDF loaded successfully!</div>;
        break;

      case 'matrix':
        setMatrixActive((prev) => !prev);
        type = 'matrix';
        content = <div style={{ color: 'var(--terminal-green)' }}>Matrix visual effect status updated.</div>;
        break;

      case 'sudo hire':
      case 'sudo':
        type = 'success';
        content = (
          <div style={{ color: 'var(--terminal-green)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            [ACCESS GRANTED] User is authorized to hire Manan Patel! Let's build scalable engineering systems together.
          </div>
        );
        break;

      case 'clear':
        setOutputList([]);
        setInputVal('');
        return;

      default:
        type = 'error';
        content = (
          <div style={{ color: 'var(--terminal-red)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            zsh: command not found: &quot;{rawCmd}&quot;. Type <span style={{ color: 'var(--terminal-yellow)' }}>help</span> for list of valid commands.
          </div>
        );
        break;
    }

    setOutputList((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: rawCmd,
        type,
        content,
        timestamp: time
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      className="terminal-window"
      style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Terminal Bar */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot dot-red"></span>
          <span className="terminal-dot dot-yellow"></span>
          <span className="terminal-dot dot-green"></span>
        </div>
        <div className="terminal-title">
          <Terminal size={14} color="var(--terminal-green)" />
          <span>manan@iitkgp-dev: ~/portfolio-cli (zsh)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
          <button
            onClick={() => setOutputList([])}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Clear Terminal"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div
        style={{
          padding: '20px',
          minHeight: '340px',
          maxHeight: '480px',
          overflowY: 'auto',
          backgroundColor: matrixActive ? '#020d06' : 'var(--bg-terminal)',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {outputList.map((item) => (
          <div key={item.id} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--terminal-green)', fontWeight: 700 }}>manan@dev-box:~$</span>
              <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item.command}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', marginLeft: 'auto' }}>{item.timestamp}</span>
            </div>
            <div style={{ marginTop: '4px', paddingLeft: '14px' }}>
              {item.content}
            </div>
          </div>
        ))}

        {/* Input Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
          <span style={{ color: 'var(--terminal-green)', fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
            manan@dev-box:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'projects', 'skills', 'contact')..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--terminal-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          />
          <CornerDownLeft size={14} color="var(--text-subtle)" />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Chips Bar */}
      <div
        style={{
          padding: '10px 16px',
          backgroundColor: '#121929',
          borderTop: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto'
        }}
      >
        <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          QUICK EXECUTE:
        </span>
        {['neofetch', 'projects', 'skills', 'exp', 'achievements', 'contact', 'resume', 'sudo hire', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => runCommand(cmd)}
            style={{
              padding: '3px 9px',
              borderRadius: '4px',
              backgroundColor: 'var(--bg-card-subtle)',
              color: 'var(--terminal-cyan)',
              border: '1px solid var(--border-card)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--terminal-cyan)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-card)';
              e.currentTarget.style.color = 'var(--terminal-cyan)';
            }}
          >
            $ {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
