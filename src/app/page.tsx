'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  analyzeResume, 
  JobRole, 
  ATSResult,
  RecruiterReaction,
  SkillGroup,
  InterviewPrediction
} from '../lib/atsEngine';
import { 
  FileText, 
  Briefcase, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Lightbulb, 
  BookOpen, 
  Send, 
  RefreshCw, 
  ExternalLink, 
  Mail, 
  User, 
  FileCheck,
  Check,
  Info,
  Upload,
  AlertCircle,
  Shield,
  Zap,
  Sword,
  Award,
  Plus,
  Minus,
  Sparkles,
  Flame,
  Frown,
  Eye,
  Sliders,
  ChevronRight
} from 'lucide-react';

const DEMO_RESUMES: Record<Exclude<JobRole, 'Other'>, string> = {
  'Full Stack Developer': `Sujal Kumar
Email: sujalreal983@gmail.com
Phone: +91 98765 43210
GitHub: github.com/sujal-kumar
LinkedIn: linkedin.com/in/sujal-kumar

PROFESSIONAL SUMMARY
Highly motivated Full Stack Developer with 3+ years of experience building scalable web applications. Proficient in React, Node.js, and database design.

WORK EXPERIENCE
Full Stack Engineer | Digital Heroes Co. (2024 - Present)
- Led the migration of a legacy platform to Next.js and TypeScript, improving page load speed by 40%.
- Developed REST APIs using Express and Node.js to support mobile clients, handling 50k+ daily active users.
- Designed database schemas in PostgreSQL and MongoDB to optimize queries and reduce latency by 15%.
- Implemented robust CI/CD pipelines with GitHub Actions and Docker, reducing deployment cycle times by 30%.
- Collaborated in an Agile environment using Git for version control and issue tracking.

EDUCATION
B.Tech in Computer Science & Engineering
XYZ University (Graduated 2024)

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, HTML, CSS, SQL
Frameworks/Libraries: React, Node.js, Express, Next.js, Redux
Tools/DevOps: Git, Docker, PostgreSQL, MongoDB, AWS, REST API, GraphQL, Testing`,

  'Frontend Developer': `Sujal Kumar
Email: sujalreal983@gmail.com
Phone: +91 98765 43210
GitHub: github.com/sujal-kumar
LinkedIn: linkedin.com/in/sujal-kumar

SUMMARY
Frontend Developer dedicated to crafting pixel-perfect, highly accessible user interfaces. Experienced in modern CSS architectures and React ecosystems.

EXPERIENCE
Frontend Developer | Tech Solutions (2024 - Present)
- Built interactive client dashboards using React, JavaScript, and Redux.
- Optimized web performance, reducing bundle sizes by 35% using Webpack code-splitting.
- Designed fully responsive layouts utilizing modern CSS grid, flexbox, and Sass.
- Ensured strict web accessibility (WCAG 2.1 AA compliance) and SEO best practices.
- Implemented unit testing with Jest to guarantee 90%+ code coverage on core components.

EDUCATION
B.S. in Software Engineering

SKILLS
React, HTML, CSS, JavaScript, TypeScript, Tailwind CSS, Redux, Responsive Design, Sass, DOM, Git, SEO`,

  'Backend Developer': `Sujal Kumar
Email: sujalreal983@gmail.com
Phone: +91 98765 43210
GitHub: github.com/sujal-kumar
LinkedIn: linkedin.com/in/sujal-kumar

SUMMARY
Backend Developer focused on backend architectures, building microservices, and database optimization.

EXPERIENCE
Backend Engineer | Core Systems (2023 - Present)
- Developed and maintained microservices using Node.js, Go, and gRPC.
- Designed scalable database models with PostgreSQL and MongoDB.
- Optimized API query performance, reducing system latency by 25% with Redis caching.
- Spearheaded Kubernetes cluster configurations and containerized code using Docker.
- Monitored services and pipelines in AWS using CloudWatch.

SKILLS
Node.js, Express, Go, Python, SQL, PostgreSQL, MongoDB, REST API, GraphQL, Docker, Kubernetes, AWS, Redis, Microservices, Git`,

  'Java Developer': `Sujal Kumar
Email: sujalreal983@gmail.com
Phone: +91 98765 43210
LinkedIn: linkedin.com/in/sujal-kumar

SUMMARY
Java Developer specialized in enterprise-level microservices and relational database systems. Experienced in high-performance OOP design.

EXPERIENCE
Software Engineer | Global Banking Corp (2023 - Present)
- Developed secure, scalable REST APIs using Spring Boot and Java.
- Migrated monolithic applications to a microservices architecture.
- Optimized database operations using Hibernate, JPA, and PostgreSQL.
- Authored comprehensive unit tests utilizing JUnit, achieving 95% statement coverage.
- Managed containerized deployments using Docker and Kubernetes.

SKILLS
Java, Spring Boot, Spring, Hibernate, JPA, Microservices, REST API, SQL, PostgreSQL, Maven, Git, JUnit, OOP`,

  'AI/ML Engineer': `Sujal Kumar
Email: sujalreal983@gmail.com
Phone: +91 98765 43210
GitHub: github.com/sujal-kumar

SUMMARY
AI/ML Engineer passionate about designing predictive models, training deep learning neural networks, and optimizing machine learning pipelines.

EXPERIENCE
Machine Learning Engineer | Smart AI Labs (2024 - Present)
- Engineered predictive regression models in Python using Scikit-learn and Pandas.
- Designed deep learning models for Computer Vision and NLP using PyTorch and TensorFlow.
- Automated data processing pipelines using NumPy, handling over 10M rows of raw structured data.
- Deployed trained neural networks as scalable microservices using AWS and Docker.

SKILLS
Python, Machine Learning, Deep Learning, NLP, Computer Vision, PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, SQL, Git, Docker`,

  'Data Scientist': `Sujal Kumar
Email: sujalreal983@gmail.com
Phone: +91 98765 43210
GitHub: github.com/sujal-kumar

SUMMARY
Data Scientist skilled in statistical modeling, data exploration, and analytics dashboard design.

EXPERIENCE
Data Analyst & Scientist | Insight Analytics (2023 - Present)
- Conducted exploratory data analysis on client metrics using Python, Pandas, and SQL.
- Designed robust data visualization reports using Tableau and Power BI.
- Implemented machine learning classification algorithms to predict customer churn rate.
- Planned and monitored product impact metrics through statistical A/B testing.

SKILLS
Python, SQL, R, Statistics, Pandas, NumPy, Tableau, Power BI, Scikit-learn, A/B Testing, Spark, Git`,

  'DevOps Engineer': `Sujal Kumar
Email: sujalreal983@gmail.com
Phone: +91 98765 43210
GitHub: github.com/sujal-kumar

SUMMARY
Infrastructure & DevOps Engineer specialized in CI/CD automation, AWS cloud deployments, and SRE monitoring.

EXPERIENCE
DevOps Engineer | Cloud Scale Inc (2023 - Present)
- Orchestrated containerization workflows utilizing Docker and Kubernetes.
- Automated Cloud deployments and Infrastructure as Code (IaC) utilizing Terraform.
- Built automated software delivery workflows using GitHub Actions and Jenkins.
- Developed Linux shell scripts and Python tools to automate system health checks.
- Implemented real-time system monitoring dashboards with Prometheus and Grafana.

SKILLS
AWS, Docker, Kubernetes, Terraform, CI/CD, Git, Linux, Bash, Jenkins, Prometheus, Grafana, Ansible`,

  'Product Manager': `Sujal Kumar
Email: sujalreal983@gmail.com
Phone: +91 98765 43210
LinkedIn: linkedin.com/in/sujal-kumar

SUMMARY
Product Manager with engineering roots, driving product strategy, roadmaps, and agile delivery.

EXPERIENCE
Technical Product Manager | Future Tech (2023 - Present)
- Authored product roadmaps and feature specs, defining user stories and sprint priorities.
- Led Agile Scrum planning teams, facilitating daily standups and sprint reviews in Jira.
- Analyzed product telemetry data, planning key metrics using SQL and A/B Testing.
- Collaborated with engineering, design, and marketing to launch three core cloud features.

SKILLS
Product Roadmap, Agile, Scrum, Jira, Product Strategy, Analytics, Stakeholder Management, User Stories, SQL, A/B Testing`
};

export default function Home() {
  const [resumeText, setResumeText] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<JobRole>('Full Stack Developer');
  const [customRole, setCustomRole] = useState<string>('');
  const [result, setResult] = useState<ATSResult | null>(null);
  
  // Animation / Status states
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Recruiter Desk Simulator Settings
  const [roastMode, setRoastMode] = useState<boolean>(false);
  const [equippedKeywords, setEquippedKeywords] = useState<string[]>([]);
  const [simulatedScore, setSimulatedScore] = useState<number>(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated scan steps for human feedback
  const scanSequence = async () => {
    setIsScanning(true);
    setResult(null);
    setEquippedKeywords([]);

    const steps = [
      'Booting up Recruiter parser...',
      'Categorizing candidate sections...',
      'Evaluating action-force verbs...',
      'Matching keywords against hiring pool...',
      'Writing internal review notes...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setScanStep(steps[i]);
      await new Promise(r => setTimeout(r, 600));
    }

    const analysis = analyzeResume(
      resumeText,
      selectedRole,
      selectedRole === 'Other' ? customRole : undefined
    );

    setResult(analysis);
    setSimulatedScore(analysis.score);
    setIsScanning(false);
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    scanSequence();
  };

  const toggleKeywordEquip = (kw: string) => {
    if (!result) return;
    let updated = [...equippedKeywords];
    if (updated.includes(kw)) {
      updated = updated.filter(k => k !== kw);
    } else {
      updated.push(kw);
    }
    setEquippedKeywords(updated);

    const base = result.score;
    const missing = result.missingKeywords.length;
    if (missing === 0) return;
    const maxBoost = 100 - base;
    const perKw = maxBoost / missing;
    setSimulatedScore(Math.round(base + (updated.length * perKw)));
  };

  const loadDemo = (role: JobRole) => {
    if (role === 'Other') {
      setResumeText(`Sujal Kumar\nEmail: sujalreal983@gmail.com\n\n[Describe projects, roles, and technologies relevant to your target role...]`);
    } else {
      setResumeText(DEMO_RESUMES[role]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);

    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!['.pdf', '.docx', '.txt'].includes(ext)) {
      setUploadError('Invalid scroll file. Drop a .pdf, .docx, or .txt.');
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/parse', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Extraction failed.');
      setResumeText(data.text || '');
    } catch (err: any) {
      setUploadError(err.message || 'Error parsing document.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-[#e4e4e7] font-sans antialiased selection:bg-[#27272a] selection:text-white pb-16">
      
      {/* Vercel/Linear Style Header */}
      <header className="border-b border-[#1f1f23] bg-[#09090b]/80 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded bg-white flex items-center justify-center">
              <span className="text-[11px] font-black text-black">R</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#a1a1aa]">
                Recruiter Desk
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[#71717a] font-mono font-medium">
                v1.1
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] font-mono text-[#71717a] hidden sm:inline">
              Simulating Recruiter Decision Workflows
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 py-10">
        
        {/* Subtle Notion-Style Title */}
        <div className="mb-10 text-left border-b border-[#1f1f23] pb-6">
          <div className="flex items-center space-x-2 text-[10px] text-amber-500 font-mono font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            The Recruiter Desk Simulator
          </h1>
          <p className="text-sm text-[#a1a1aa] max-w-2xl leading-relaxed">
            See your resume from the perspective of an ambitious, metrics-driven tech recruiter. Bypass AI layout fluff, discover missing stack items, and gauge your interview conversion rates.
          </p>
        </div>

        {/* Input & Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Form */}
          <div className="md:col-span-7 bg-[#0d0d11] border border-[#1f1f23] rounded-xl p-5 shadow-sm">
            <form onSubmit={handleAnalyze} className="space-y-5">
              
              {/* Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="role" className="block text-[10px] font-bold text-[#71717a] uppercase tracking-wider mb-1.5">
                    Job Class Specs
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      value={selectedRole}
                      onChange={(e) => {
                        setSelectedRole(e.target.value as JobRole);
                        setCustomRole('');
                      }}
                      className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="Java Developer">Java Developer</option>
                      <option value="AI/ML Engineer">AI/ML Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Other">Other (Specify Custom Role)</option>
                    </select>
                  </div>
                </div>

                {selectedRole === 'Other' && (
                  <div>
                    <label htmlFor="custom-class" className="block text-[10px] font-bold text-[#71717a] uppercase tracking-wider mb-1.5">
                      Specify Custom Class
                    </label>
                    <input
                      id="custom-class"
                      type="text"
                      required
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="e.g. Security Lead"
                      className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#52525b] focus:outline-none focus:ring-1 focus:ring-white transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Uploader */}
              <div>
                <label className="block text-[10px] font-bold text-[#71717a] uppercase tracking-wider mb-1.5">
                  Import Resume (PDF, DOCX, or TXT)
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-[#27272a] hover:border-[#3f3f46] rounded-xl p-4 bg-[#18181b]/50 hover:bg-[#18181b]/95 text-center cursor-pointer transition-all flex flex-col items-center justify-center group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.txt"
                    className="hidden"
                  />
                  {isUploading ? (
                    <div className="flex items-center space-x-2 py-1">
                      <RefreshCw className="w-4 h-4 text-[#a1a1aa] animate-spin" />
                      <span className="text-xs text-[#a1a1aa]">Extracting text nodes...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-1">
                      <Upload className="w-4 h-4 text-[#71717a] group-hover:text-[#a1a1aa] mb-1 transition-colors" />
                      <span className="text-xs font-semibold text-[#a1a1aa]">Click or Drag files to import</span>
                      <span className="text-[9px] text-[#52525b] mt-0.5">Supports PDF / Word doc format</span>
                    </div>
                  )}
                </div>
                {uploadError && (
                  <div className="mt-2 text-[10px] text-rose-500 font-mono flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>

              {/* Scroll Content Text Area */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="scroll-content" className="block text-[10px] font-bold text-[#71717a] uppercase tracking-wider">
                    Resume Plaintext details
                  </label>
                  <button
                    type="button"
                    onClick={() => loadDemo(selectedRole)}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Load Demo Resume
                  </button>
                </div>
                <div className="relative">
                  <textarea
                    id="scroll-content"
                    required
                    rows={6}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Import your document scroll or copy paste candidate specs here..."
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-lg p-3 text-xs text-[#d4d4d8] placeholder-[#52525b] focus:outline-none focus:ring-1 focus:ring-white transition-all font-mono resize-y"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-[#0d0d11]/90 rounded-lg flex flex-col items-center justify-center border border-indigo-900/20 overflow-hidden">
                      {/* Laser scanning bar */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-lg shadow-indigo-500/50 animate-bounce" />
                      <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin mb-2" />
                      <span className="text-xs font-mono text-indigo-300 tracking-wide">{scanStep}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Run simulator Button */}
              <button
                type="submit"
                disabled={isScanning || !resumeText.trim()}
                className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-[#e4e4e7] text-black text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
              >
                {isScanning ? 'Processing Resume...' : 'Analyze Candidate Details'}
              </button>
            </form>
          </div>

          {/* Guidelines info */}
          <div className="md:col-span-5 space-y-5">
            <div className="bg-[#0d0d11]/60 border border-[#1f1f23] rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3 flex items-center">
                <Info className="w-4 h-4 text-[#a1a1aa] mr-1.5" />
                Hiring Screen Rules
              </h3>
              <ul className="space-y-3.5 text-xs text-[#a1a1aa]">
                <li className="flex items-start">
                  <Check className="w-3.5 h-3.5 text-[#a1a1aa] mr-2.5 mt-0.5 flex-shrink-0" />
                  <span><strong>Class alignment checks:</strong> Searches stack alignment for major frameworks.</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-3.5 h-3.5 text-[#a1a1aa] mr-2.5 mt-0.5 flex-shrink-0" />
                  <span><strong>Scale Metrics check:</strong> Spotlights numerical details indicating measurable product performance impact.</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-3.5 h-3.5 text-[#a1a1aa] mr-2.5 mt-0.5 flex-shrink-0" />
                  <span><strong>Clean Formatting:</strong> Missing email or coordinates immediately triggers recruiter review alert notes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              id="results-section"
              className="space-y-8 scroll-mt-20"
            >
              
              {/* Recruiter desk board wrapper */}
              <div className="border border-[#1f1f23] bg-[#0d0d11] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                
                {/* Desk Settings (Roast toggle) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1f1f23] pb-5 mb-8 gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#71717a] block uppercase tracking-widest">Workspace</span>
                    <h2 className="text-xl font-bold text-white flex items-center">
                      Recruiter Dashboard Review
                    </h2>
                  </div>

                  {/* Roast Mode Toggle switch */}
                  <div className="flex items-center space-x-3 bg-[#18181b] border border-[#27272a] p-1.5 rounded-lg px-3">
                    <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider flex items-center">
                      <Flame className={`w-3.5 h-3.5 mr-1.5 transition-colors ${roastMode ? 'text-amber-500 animate-bounce' : 'text-[#71717a]'}`} />
                      Roast Mode
                    </span>
                    <button
                      type="button"
                      onClick={() => setRoastMode(!roastMode)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none cursor-pointer ${
                        roastMode ? 'bg-amber-500' : 'bg-[#27272a]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${roastMode ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                {/* Score & predictions columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[#1f1f23] items-start">
                  
                  {/* Recruiter Interest Meter */}
                  <div className="lg:col-span-5 flex flex-col items-center bg-[#18181b]/50 border border-[#27272a]/30 rounded-xl p-5 relative overflow-hidden">
                    <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wide mb-4">
                      Recruiter Interest Meter
                    </span>

                    {/* Circular dial gauge */}
                    <div className="relative flex items-center justify-center w-36 h-36">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          className="stroke-[#09090b]"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          className={`transition-all duration-300 ${
                            simulatedScore >= 80 ? 'stroke-emerald-500' : simulatedScore >= 60 ? 'stroke-amber-500' : 'stroke-rose-500'
                          }`}
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={264}
                          strokeDashoffset={264 - (264 * simulatedScore) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">{simulatedScore}%</span>
                        <span className="text-[8px] text-[#71717a] font-bold uppercase tracking-wider">Interest</span>
                      </div>
                    </div>

                    {/* Score simulator status message */}
                    <div className="text-center mt-4">
                      {simulatedScore >= 85 ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center justify-center">
                          🎉 Recruiter would likely shortlist this profile
                        </span>
                      ) : simulatedScore >= 60 ? (
                        <span className="text-xs font-bold text-amber-500 flex items-center justify-center">
                          ⚠ Needs optimization to pass review
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-500 flex items-center justify-center">
                          ⚠ Recruiter may reject before technical round
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Interview Prediction Engine */}
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider">
                      Interview Prediction Engine
                    </h3>
                    <div className="space-y-3.5">
                      {result.predictions.map((p, idx) => {
                        // Recalculate probability based on simulated score shifts
                        const ratio = simulatedScore / result.score;
                        const simulatedProbability = Math.min(100, Math.round(p.probability * ratio));

                        return (
                          <div key={idx} className="bg-[#18181b]/30 border border-[#27272a]/20 p-3 rounded-lg flex justify-between items-center text-xs">
                            <div className="space-y-0.5">
                              <span className="block font-bold text-white">{p.stage}</span>
                              <span className="text-[10px] text-[#71717a] block leading-snug">{p.feedback}</span>
                            </div>
                            <div className="text-right ml-4">
                              <span className={`block font-mono font-bold text-sm ${
                                simulatedProbability >= 80 ? 'text-emerald-400' : simulatedProbability >= 50 ? 'text-amber-400' : 'text-rose-400'
                              }`}>
                                {simulatedProbability}%
                              </span>
                              <span className="text-[9px] text-[#52525b] uppercase block">Chance</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Recruiter Notes & Roast sticky panel */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[#1f1f23]">
                  
                  {/* Notes Feed */}
                  <div className="md:col-span-6 bg-yellow-950/10 border border-yellow-900/20 rounded-xl p-4 relative">
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-yellow-500 rounded-full animate-ping" />
                    <h3 className="text-xs font-bold text-yellow-500 mb-3 flex items-center">
                      <span className="mr-1.5">📝</span>
                      {roastMode ? 'Internal Recruiter Roast Notes' : 'Internal Review Notes'}
                    </h3>
                    <ul className="space-y-2.5">
                      {(roastMode ? result.roasts : result.recruiterNotes).map((note, idx) => (
                        <li key={idx} className="text-xs text-yellow-300/90 leading-relaxed pl-3.5 border-l-2 border-yellow-500/40">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recruiter reactions list */}
                  <div className="md:col-span-6 space-y-3">
                    <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider">
                      Recruiter Live Reactions Feed
                    </h3>
                    <div className="space-y-2">
                      {result.reactions.map((rx, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-[#18181b]/30 p-2.5 rounded-lg border border-[#27272a]/20 text-xs">
                          <span className="text-white flex items-center leading-normal">
                            <span className="mr-2 flex-shrink-0 text-sm">
                              {rx.type === 'success' ? '✅' : rx.type === 'project' ? '🔥' : rx.type === 'warn' ? '⚠' : '🚫'}
                            </span>
                            <span>{rx.text}</span>
                          </span>
                          <span className="text-[9px] font-mono text-[#52525b] uppercase ml-3 tracking-wider flex-shrink-0">
                            {rx.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Skill Heatmap visualizer & Simulator panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Heatmap progress bars */}
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider flex items-center justify-between">
                      <span>Skill Heatmap Stats</span>
                      <Sliders className="w-3.5 h-3.5" />
                    </h3>
                    <div className="space-y-3.5 bg-[#18181b]/20 p-4 rounded-xl border border-[#27272a]/30">
                      {result.skillsHeatmap.map((skill, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-semibold text-white">{skill.name}</span>
                            <span className="font-mono text-[#71717a]">{skill.score}% matches</span>
                          </div>
                          <div className="w-full bg-[#18181b] rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-500 ${
                                skill.score >= 75 ? 'bg-emerald-500' : skill.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${skill.score}%` }}
                            />
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {skill.keywords.map((k, kIdx) => (
                              <span key={kIdx} className="text-[9px] text-[#52525b] px-1 bg-[#18181b] border border-[#27272a]/40 rounded font-mono">
                                {k}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulator Sandbox */}
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider">
                      Sandbox Skill Equip Simulator
                    </h3>
                    <div className="bg-[#18181b]/30 border border-[#27272a]/40 rounded-xl p-4 space-y-4">
                      <div className="flex items-start space-x-2 text-[10px] leading-relaxed text-[#71717a]">
                        <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span>Click on these missing resume skills to simulate adding them to your resume scroll. Watch your Recruiter Interest level update live!</span>
                      </div>

                      {/* Missing skills list */}
                      <div>
                        <span className="block text-[10px] font-bold text-[#52525b] uppercase tracking-wider mb-2">
                          Un-equipped Skills ({result.missingKeywords.length - equippedKeywords.length})
                        </span>
                        {result.missingKeywords.filter(k => !equippedKeywords.includes(k)).length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {result.missingKeywords.filter(k => !equippedKeywords.includes(k)).map((kw, idx) => (
                              <button
                                key={idx}
                                onClick={() => toggleKeywordEquip(kw)}
                                className="inline-flex items-center px-2 py-1 bg-[#18181b] hover:bg-indigo-950/40 border border-[#27272a] hover:border-indigo-800 text-[10px] rounded font-mono font-medium text-[#a1a1aa] transition-colors cursor-pointer"
                                title="Simulate adding keyword"
                              >
                                <Plus className="w-3 h-3 mr-1 text-[#52525b]" />
                                {kw}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] text-emerald-400 font-mono italic">All keywords are equipped!</span>
                        )}
                      </div>

                      {/* Equipped buffs */}
                      {equippedKeywords.length > 0 && (
                        <div className="pt-3 border-t border-[#1f1f23]">
                          <span className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">
                            Active Sandbox Buffs ({equippedKeywords.length})
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {equippedKeywords.map((kw, idx) => (
                              <button
                                key={idx}
                                onClick={() => toggleKeywordEquip(kw)}
                                className="inline-flex items-center px-2 py-1 bg-indigo-950/50 border border-indigo-800 text-[10px] rounded font-mono font-medium text-emerald-400 cursor-pointer hover:bg-rose-950/20 hover:border-rose-900/40 hover:text-rose-400 transition-colors"
                              >
                                <Minus className="w-3 h-3 mr-1" />
                                {kw}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggestions and tips list */}
                      <div className="pt-3 border-t border-[#1f1f23] space-y-2">
                        <span className="block text-[10px] font-bold text-[#52525b] uppercase mb-1">Hiring tips</span>
                        {result.suggestions.slice(0, 3).map((suggestion, idx) => (
                          <div key={idx} className="flex items-start text-[11px] text-[#a1a1aa] leading-relaxed">
                            <span className="mr-1.5 text-indigo-400 font-bold">•</span>
                            <span>{suggestion}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-[#1f1f23]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-xs text-[#71717a]">
            <span className="font-semibold flex items-center text-[#a1a1aa]">
              <User className="w-3.5 h-3.5 mr-1 text-indigo-400" />
              Sujal Kumar
            </span>
            <a href="mailto:sujalreal983@gmail.com" className="hover:text-indigo-400 transition-colors mt-0.5">
              sujalreal983@gmail.com
            </a>
          </div>

          <div>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-[#27272a] hover:border-[#3f3f46] bg-[#18181b] rounded-lg text-xs font-semibold text-[#a1a1aa] hover:text-white transition-all shadow-sm cursor-pointer group"
            >
              <span>Built for Digital Heroes</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1.5 text-[#52525b] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
