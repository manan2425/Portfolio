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
  achievements: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
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
  },
  projects: [
    {
      id: "proj-1",
      title: "ShareRide - Carpooling System",
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
      description: "Completed a project internship at Helius Wellness focusing on web platform engineering and intelligent features.",
      achievements: [
        "Gained practical experience in AI/ML model integration and Full Stack web application development",
        "Implemented real-world healthcare project features with data-driven workflows"
      ]
    },
    {
      id: "exp-3",
      role: "Summer Intern (Machine Learning)",
      company: "Ural Federal University (UrFU - Yekaterinburg, Russia)",
      period: "July 2025 – Aug 2025",
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
      description: "Developed web analytics dashboards and responsive frontend user interfaces.",
      achievements: [
        "Developed a Dynamic Analytical Dashboard Website for different product lines and categories",
        "Engineered responsive and interactive UI components using HTML, CSS, and JavaScript with cross-browser reliability"
      ]
    },
    {
      id: "exp-5",
      role: "General Secretary",
      company: "Birla Vishvakarma Mahavidyalaya",
      period: "July 2025 – June 2026",
      description: "Elected General Secretary managing student activities and campus operations.",
      achievements: [
        "Coordinated major institute events and led student activity councils",
        "Facilitated effective communication between students, faculty, and administration"
      ]
    },
    {
      id: "exp-6",
      role: "Student Coordinator",
      company: "SSIP 2.0 BVM SB",
      period: "Sep 2024 – Apr 2025",
      description: "Guided student innovation and entrepreneurship initiatives under SSIP 2.0.",
      achievements: [
        "Promoted student innovation by organizing mentorship sessions and funding guidance",
        "Supported student project teams from initial ideation to prototype development"
      ]
    }
  ]
};
