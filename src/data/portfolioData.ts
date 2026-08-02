export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  about: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
  isAvailable: boolean;
  location: string;
  adminPasscode: string;
  overviewMetric1Value?: string;
  overviewMetric1Label?: string;
  overviewMetric2Value?: string;
  overviewMetric2Label?: string;
  overviewMetric3Value?: string;
  overviewMetric3Label?: string;
  overviewMetric4Value?: string;
  overviewMetric4Label?: string;
  overviewSummary?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Full Stack' | 'Frontend' | 'AI/ML' | 'Mobile';
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  highlights: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases & Cloud' | 'Tools & Others';
  level: number; // 1-100
  iconName: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  category?: 'Work & Internships' | 'College Leadership';
  achievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  period: string;
  description: string;
  prize?: string;
  badge?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  achievements?: Achievement[];
}

export const initialPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Manan Patel",
    title: "MERN Stack & AI/ML Engineer",
    tagline: "Building scalable, responsive web applications and intelligent data-driven solutions.",
    about: "Aspiring MERN Stack Developer with a strong foundation in MongoDB, Express.js, React.js, and Node.js, specializing in building scalable, responsive, and user-friendly web applications. Possessing secondary expertise in AI/ML, enabling integration of intelligent and data-driven features into modern web solutions.",
    email: "mananpatel448@gmail.com",
    github: "https://github.com/manan2425",
    linkedin: "https://linkedin.com/in/manan-patel-806809280",
    twitter: "https://twitter.com/manan2425",
    resumeUrl: "/resume4.pdf",
    isAvailable: true,
    location: "Anand, Gujarat, India",
    adminPasscode: "admin123",
    overviewMetric1Value: "04+",
    overviewMetric1Label: "Projects",
    overviewMetric2Value: "08+",
    overviewMetric2Label: "Tech Stack",
    overviewMetric3Value: "100%",
    overviewMetric3Label: "Type Safe",
    overviewMetric4Value: "99+",
    overviewMetric4Label: "Performance",
    overviewSummary: "Specialized in engineering full-stack platforms with modern App Router architecture.",
  },
  projects: [
    {
      id: "proj-1",
      title: "ShareRide: Carpooling System",
      description: "An Enterprise Carpooling Platform enabling employees to find/offer rides, manage trips, track journeys in real time, and process wallet payments.",
      longDescription: "Built ShareRide, an Enterprise Carpooling Platform that enables employees to find and offer rides, manage trips and vehicles, track journeys in real time, and handle payments through an integrated wallet system. Awarded 2nd Runner-Up out of 838 teams at Odoo x KSV Hackathon 2026.",
      category: "Full Stack",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Authentication", "Socket.io", "Maps API", "Razorpay"],
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80",
      githubUrl: "https://github.com/manan2425/ShareRide",
      liveUrl: "https://github.com/manan2425/ShareRide",
      featured: true,
      highlights: [
        "2nd Runner-Up out of 838 teams at Odoo x KSV Hackathon 2026 (Won ₹25k Odoo Prize & ₹50k KSV Award)",
        "Real-time trip location tracking via Socket.io & Maps API",
        "Integrated in-app wallet payment system powered by Razorpay"
      ]
    },
    {
      id: "proj-2",
      title: "Vendor Bridge Procurement ERP",
      description: "Procurement & Vendor Management ERP automating vendor onboarding, RFQs, quotation approvals, purchase order generation, and invoicing.",
      longDescription: "Developed VendorBridge, a Procurement & Vendor Management ERP that automates vendor management, RFQs, quotation approvals, purchase order generation, invoicing, and procurement analytics through role-based workflows.",
      category: "Full Stack",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Authentication", "Nodemailer", "PDFKit"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      githubUrl: "https://github.com/manan2425/VendorBridge",
      liveUrl: "https://github.com/manan2425/VendorBridge",
      featured: true,
      highlights: [
        "Role-based procurement workflow automation (RFQs, Quotations, Invoices)",
        "Automated PDFKit invoice generator & Nodemailer email notifications"
      ]
    },
    {
      id: "proj-3",
      title: "Paperless Machine Monitoring System",
      description: "Industrial Machine Monitoring System integrating HMI and PLC for real-time tracking of 16 machine losses with automated downtime alerts.",
      longDescription: "Designed and implemented a Machine Monitoring System integrating HMI and PLC for real-time tracking of 16 machine losses. Created a centralized dashboard with dynamic visualizations, automated downtime alerts, and shift-wise performance reports.",
      category: "Full Stack",
      tags: ["PLC", "HMI", "Python", "SQL", "JavaScript", "Chart.js", "Matplotlib", "HTML/CSS"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
      githubUrl: "https://github.com/manan2425/Machine-Monitoring-System",
      liveUrl: "https://github.com/manan2425/Machine-Monitoring-System",
      featured: true,
      highlights: [
        "Real-time industrial loss tracking across 16 metrics using PLC & HMI integration",
        "Automated SMTP downtime alerts and shift-wise analytical reports"
      ]
    },
    {
      id: "proj-4",
      title: "AI-Powered Community Health Manager",
      description: "Health management platform for cardiovascular patients using AI predictive analytics and Flan-T5 models for personalized care.",
      longDescription: "Developed an AI-powered community health management system to monitor and support cardiovascular patients through personalized insights, Flan-T5 model integration, and RAG predictive analytics.",
      category: "AI/ML",
      tags: ["Python", "Flan-T5-small", "RAG Model", "React.js", "Node.js", "MongoDB", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
      githubUrl: "https://github.com/manan2425",
      liveUrl: "https://github.com/manan2425",
      featured: false,
      highlights: [
        "Integrated RAG & Flan-T5 NLP models for clinical recommendation",
        "Personalized cardiovascular patient monitoring & risk prediction"
      ]
    },
    {
      id: "proj-5",
      title: "Online Food Ordering System",
      description: "Full-stack food ordering platform with secure authentication, restaurant admin panel, and real-time order tracking.",
      longDescription: "Developed a responsive food ordering platform with secure user authentication, featuring an admin panel for restaurants to manage menus, track orders, and handle deliveries.",
      category: "Full Stack",
      tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80",
      githubUrl: "https://github.com/manan2425/Online-Food-Ordering-System",
      liveUrl: "https://github.com/manan2425/Online-Food-Ordering-System",
      featured: false,
      highlights: [
        "Restaurant menu management admin dashboard",
        "Secure customer authentication & live order workflow"
      ]
    },
    {
      id: "proj-6",
      title: "Face Attendance System",
      description: "Automated computer vision system utilizing facial recognition algorithms to mark student/employee attendance.",
      longDescription: "Created an automated Face Attendance System using machine learning algorithms to record attendance seamlessly through real-time facial recognition camera feeds.",
      category: "AI/ML",
      tags: ["Python", "OpenCV", "Machine Learning", "Computer Vision"],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
      githubUrl: "https://github.com/manan2425/Face-Attendence-system",
      liveUrl: "https://github.com/manan2425/Face-Attendence-system",
      featured: false,
      highlights: [
        "Automatic attendance marking via facial feature extraction",
        "Instant log generation and dataset record keeping"
      ]
    }
  ],
  skills: [
    { id: "sk-1", name: "React.js & Next.js", category: "Frontend", level: 92, iconName: "Code2" },
    { id: "sk-2", name: "JavaScript & HTML/CSS", category: "Frontend", level: 90, iconName: "FileCode" },
    { id: "sk-3", name: "Tailwind CSS & Bootstrap", category: "Frontend", level: 88, iconName: "Palette" },
    { id: "sk-4", name: "Node.js & Express.js", category: "Backend", level: 90, iconName: "Server" },
    { id: "sk-5", name: "Python & Machine Learning", category: "Backend", level: 85, iconName: "Terminal" },
    { id: "sk-6", name: "C, C++, Java, C#, PHP", category: "Backend", level: 82, iconName: "Code2" },
    { id: "sk-7", name: "MongoDB, MySQL, PostgreSQL", category: "Databases & Cloud", level: 88, iconName: "Database" },
    { id: "sk-8", name: "Git, GitHub & REST APIs", category: "Tools & Others", level: 90, iconName: "GitBranch" }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Full Semester External Project Intern",
      company: "Elecon Engineering Company Limited (Anand, Gujarat)",
      period: "Jan 2026 – May 2026",
      category: "Work & Internships",
      description: "Completed the FSEP (Final Semester Engineering Project) program at Elecon Engineering Company Limited.",
      achievements: [
        "Gained hands-on industrial engineering experience and professional software execution exposure",
        "Collaborated with engineering teams to build end-to-end industrial software solutions"
      ]
    },
    {
      id: "exp-2",
      role: "Project Intern (AI/ML & Full Stack)",
      company: "Helius Wellness (Ahmedabad, Gujarat)",
      period: "July 2025 – Dec 2025",
      category: "Work & Internships",
      description: "Completed a project internship at Helius Wellness focusing on web platform engineering and intelligent features.",
      achievements: [
        "Gained practical experience in AI/ML model integration and Full Stack web application development",
        "Implemented real-world healthcare project features with data-driven workflows"
      ]
    },
    {
      id: "exp-3",
      role: "Summer Intern (Machine Learning)",
      company: "Ural Federal University (UrFU, Yekaterinburg, Russia)",
      period: "July 2025 – Aug 2025",
      category: "Work & Internships",
      description: "Participated in an international Summer Internship program at Ural Federal University in Russia.",
      achievements: [
        "Focused on Machine Learning concepts, algorithms, and practical applications",
        "Participated in international cultural exchange programs, enhancing global team collaboration"
      ]
    },
    {
      id: "exp-4",
      role: "Summer Intern (Web Engineering)",
      company: "Tech Elecon Pvt. Ltd. (Anand, Gujarat)",
      period: "May 2025 – June 2025",
      category: "Work & Internships",
      description: "Developed web analytics dashboards and responsive frontend user interfaces.",
      achievements: [
        "Developed a Dynamic Analytical Dashboard Website for different product lines and categories",
        "Engineered responsive and interactive UI components using HTML, CSS, and JavaScript with cross-browser reliability"
      ]
    },
    {
      id: "exp-5",
      role: "General Secretary",
      company: "BVM Central Committee (Birla Vishvakarma Mahavidyalaya)",
      period: "July 2025 – June 2026",
      category: "College Leadership",
      description: "Elected General Secretary heading the BVM Central Committee, managing overall campus student activities, governance, and institutional events.",
      achievements: [
        "Coordinated major institute-wide events, technical symposiums, and student activity councils",
        "Facilitated effective communication between the student body, faculty heads, and administration"
      ]
    },
    {
      id: "exp-6",
      role: "Treasurer",
      company: "The Space Association Student Chapter (TSASC BVM)",
      period: "Apr 2025 – July 2025",
      category: "College Leadership",
      description: "Managed financial budgeting, fund allocations, and accounting records for space and astronomy chapter initiatives.",
      achievements: [
        "Supervised event budget planning and financial allocations for student chapter activities",
        "Maintained transparent financial audit records and resource management"
      ]
    },
    {
      id: "exp-7",
      role: "Developer Head",
      company: "BVM Central Committee",
      period: "Oct 2024 – July 2025",
      category: "College Leadership",
      description: "Spearheaded web development initiatives and digital management portals for BVM Central Committee campus operations.",
      achievements: [
        "Led developer teams to build official campus event web portals and student management systems",
        "Ensured high availability, responsive designs, and secure data workflows"
      ]
    },
    {
      id: "exp-8",
      role: "Chairperson / Student Coordinator",
      company: "SSIP 2.0 BVM SB (Student Start-up & Innovation Policy)",
      period: "Sep 2024 – Aug 2025",
      category: "College Leadership",
      description: "Guided student innovation, start-up initiatives, and prototype grant proposals under Gujarat SSIP 2.0.",
      achievements: [
        "Promoted student innovation by organizing mentorship sessions, hackathons, and funding guidance",
        "Supported student project teams from initial ideation to prototype development stage"
      ]
    },
    {
      id: "exp-9",
      role: "Chairperson",
      company: "BYTE Club (BVM)",
      period: "Feb 2024 – Aug 2025",
      category: "College Leadership",
      description: "Led BYTE (Building Youth Through Engineering) Club, organizing coding bootcamps, workshops, and competitive hackathons.",
      achievements: [
        "Directed overall club operations, technical workshops, and competitive programming contests",
        "Mentored junior developers in web technologies, data structures, and software fundamentals"
      ]
    },
    {
      id: "exp-10",
      role: "Developer Head",
      company: "The Space Association Student Chapter (TSASC BVM)",
      period: "Apr 2024 – Apr 2025",
      category: "College Leadership",
      description: "Led technical web development projects and digital infrastructure for the Space Association student chapter.",
      achievements: [
        "Managed technical project teams and built chapter web presence",
        "Created interactive web portals for space science events and student registrations"
      ]
    },
    {
      id: "exp-11",
      role: "Developer Head",
      company: "IEEE BVM Student Branch",
      period: "Jan 2024 – Jan 2025",
      category: "College Leadership",
      description: "Led web development and technical initiatives for IEEE BVM SB during an award-winning leadership term.",
      achievements: [
        "Won BEST Student Chapter at Nirma University organized by IEEE Gujarat Section",
        "Architected and managed official IEEE BVM SB web applications and event platforms"
      ]
    },
    {
      id: "exp-12",
      role: "Technical Lead",
      company: "ML Club BVM",
      period: "Jan 2024 – Jan 2025",
      category: "College Leadership",
      description: "Led machine learning workshops, AI research projects, and hands-on developer bootcamps.",
      achievements: [
        "Organized hands-on AI/ML bootcamps and guided student project research",
        "Taught machine learning algorithms, Python data science libraries, and model deployment"
      ]
    },
    {
      id: "exp-13",
      role: "Web Developer Team Member",
      company: "The Space Association Student Chapter (TSASC BVM)",
      period: "Nov 2023 – Apr 2024",
      category: "College Leadership",
      description: "Contributed to frontend development, UI components, and event pages for space association web portals.",
      achievements: [
        "Developed responsive web pages and interactive club features",
        "Collaborated with senior developers on UI/UX enhancements"
      ]
    },
    {
      id: "exp-14",
      role: "Volunteer",
      company: "Computer Society of India (CSI) BVM Student Branch",
      period: "Jul 2023 – May 2024",
      category: "College Leadership",
      description: "Volunteered in organizing technical symposiums, coding competitions, and student workshops.",
      achievements: [
        "Assisted in conducting national-level technical symposiums and competitive coding events",
        "Managed logistics, participant registrations, and technical event setups"
      ]
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "2nd Runner Up (Won ₹75,000 Cash Prize)",
      event: "Odoo X KSV 2026 Hackathon",
      period: "2026",
      description: "Secured 2nd Runner-Up position out of 838 participating teams across India for engineering ShareRide Enterprise Carpooling Platform.",
      prize: "₹75,000 Cash Prize (₹25,000 Odoo Prize + ₹50,000 KSV Award)",
      badge: "2nd Runner-Up"
    },
    {
      id: "ach-2",
      title: "National Finalist – Odoo Headquarters",
      event: "Odoo Hackathon 2026",
      period: "Sept 2026",
      description: "Qualified as a National Finalist to compete live at Odoo Headquarters in September 2026.",
      prize: "National Finalist Selection",
      badge: "Finalist"
    },
    {
      id: "ach-3",
      title: "Runner Up",
      event: "WEBATHON '24 Hackathon",
      period: "2024",
      description: "Awarded Runner-Up title for building high-performance responsive web application prototypes in a fast-paced competitive webathon.",
      prize: "Runner-Up Trophy & Certificate",
      badge: "Runner-Up"
    },
    {
      id: "ach-4",
      title: "BEST Student Chapter Award",
      event: "IEEE Gujarat Section (Nirma University)",
      period: "2024 – 2025",
      description: "Led IEEE BVM Student Branch as Developer Head to win the prestigious BEST Student Chapter Award among IEEE chapters across Gujarat.",
      prize: "Best Student Chapter Recognition",
      badge: "Best Chapter Award"
    }
  ]
};

