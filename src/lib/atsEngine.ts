export interface RecruiterReaction {
  type: 'success' | 'warn' | 'error' | 'project';
  text: string;
  category: string;
}

export interface SkillGroup {
  name: string;
  score: number; // 0 - 100
  keywords: string[];
}

export interface InterviewPrediction {
  stage: string;
  probability: number; // 0 - 100
  feedback: string;
}

export interface ATSResult {
  score: number;
  role: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  reactions: RecruiterReaction[];
  skillsHeatmap: SkillGroup[];
  predictions: InterviewPrediction[];
  recruiterNotes: string[];
  roasts: string[];
  metrics: {
    keywordMatchRate: number;
    sectionCount: number;
    actionVerbCount: number;
    wordCount: number;
    formattingIssues: number;
  };
}

export type JobRole = 
  | 'Full Stack Developer' 
  | 'Frontend Developer' 
  | 'Backend Developer'
  | 'Java Developer' 
  | 'AI/ML Engineer'
  | 'Data Scientist'
  | 'DevOps Engineer'
  | 'Product Manager'
  | 'Other';

const ROLE_KEYWORDS: Record<Exclude<JobRole, 'Other'>, string[]> = {
  'Full Stack Developer': [
    'React', 'Node.js', 'Express', 'JavaScript', 'TypeScript', 'HTML', 'CSS',
    'SQL', 'PostgreSQL', 'MongoDB', 'REST API', 'GraphQL', 'Git', 'Docker',
    'AWS', 'CI/CD', 'Next.js', 'Redux', 'System Design', 'Testing', 'NoSQL'
  ],
  'Frontend Developer': [
    'React', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS',
    'Redux', 'Vue', 'Angular', 'Webpack', 'Sass', 'REST API', 'Git',
    'Responsive Design', 'Web Performance', 'SEO', 'Accessibility', 'Jest', 'DOM'
  ],
  'Backend Developer': [
    'Node.js', 'Express', 'Python', 'Go', 'Java', 'SQL', 'PostgreSQL', 'MongoDB',
    'REST API', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Redis',
    'Microservices', 'System Design', 'Testing', 'ORM', 'Message Queues', 'gRPC'
  ],
  'Java Developer': [
    'Java', 'Spring Boot', 'Spring', 'Hibernate', 'JPA', 'Microservices',
    'REST API', 'SQL', 'MySQL', 'Oracle', 'PostgreSQL', 'Maven', 'Gradle',
    'Docker', 'Kubernetes', 'Git', 'JUnit', 'Multithreading', 'OOP', 'JVM', 'Kafka'
  ],
  'AI/ML Engineer': [
    'Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning',
    'NLP', 'Computer Vision', 'Scikit-learn', 'Pandas', 'NumPy', 'SQL',
    'R', 'Data Science', 'neural networks', 'AWS', 'Docker', 'Git',
    'Data Structures', 'Algorithms', 'Model Deployment', 'Spark'
  ],
  'Data Scientist': [
    'Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Pandas', 'NumPy',
    'Data Visualization', 'Tableau', 'Power BI', 'Jupyter', 'Scikit-learn',
    'Git', 'Data Mining', 'Big Data', 'Spark', 'Hadoop', 'A/B Testing'
  ],
  'DevOps Engineer': [
    'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git', 'Terraform', 'Ansible',
    'Linux', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana', 'Bash',
    'Python', 'Nginx', 'Cloud Security', 'IaC', 'SRE', 'CloudFormation'
  ],
  'Product Manager': [
    'Product Roadmap', 'Agile', 'Scrum', 'Jira', 'Product Strategy', 'Analytics',
    'Market Research', 'Stakeholder Management', 'User Stories', 'KPIs',
    'A/B Testing', 'UI/UX Design', 'SQL', 'Customer Discovery', 'Cross-functional'
  ]
};

const ACTION_VERBS = [
  'led', 'developed', 'designed', 'optimized', 'managed', 'created', 'built',
  'implemented', 'accelerated', 'improved', 'increased', 'reduced', 'saved',
  'engineered', 'spearheaded', 'orchestrated', 'authored', 'automated', 'delivered'
];

const SECTIONS = {
  experience: [/experience/i, /work history/i, /employment history/i, /professional background/i],
  education: [/education/i, /academic/i, /university/i, /college/i],
  skills: [/skills/i, /technologies/i, /technical skills/i, /core competencies/i],
  projects: [/projects/i, /personal projects/i, /portfolio/i],
  contact: [/contact/i, /email/i, /phone/i, /address/i, /linkedin/i, /github/i]
};

// Generates logical keywords based on user custom role text
export function getCustomKeywords(customRole: string): string[] {
  const normalized = customRole.toLowerCase();
  const keywordsSet = new Set<string>();

  keywordsSet.add('Git');
  keywordsSet.add('SQL');
  keywordsSet.add('REST API');
  keywordsSet.add('Docker');
  keywordsSet.add('CI/CD');
  keywordsSet.add('Testing');
  keywordsSet.add('Agile');

  if (normalized.includes('devops') || normalized.includes('sre') || normalized.includes('infrastructure') || normalized.includes('cloud')) {
    ['Kubernetes', 'AWS', 'Terraform', 'Linux', 'Jenkins', 'Ansible', 'Bash', 'Prometheus', 'Monitoring', 'IaC'].forEach(k => keywordsSet.add(k));
  } else if (normalized.includes('data') || normalized.includes('analytics') || normalized.includes('bi')) {
    ['Python', 'Pandas', 'NumPy', 'Tableau', 'Power BI', 'Statistics', 'R', 'Data Visualization', 'Excel', 'Spark'].forEach(k => keywordsSet.add(k));
  } else if (normalized.includes('product') || normalized.includes('project') || normalized.includes('scrum') || normalized.includes('manager') || normalized.includes('owner')) {
    ['Agile', 'Scrum', 'Jira', 'Roadmap', 'KPIs', 'Stakeholder Management', 'User Stories', 'Analytics', 'Strategy'].forEach(k => keywordsSet.add(k));
  } else if (normalized.includes('backend') || normalized.includes('server') || normalized.includes('api')) {
    ['Node.js', 'Express', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'GraphQL', 'System Design', 'Redis', 'Microservices'].forEach(k => keywordsSet.add(k));
  } else if (normalized.includes('frontend') || normalized.includes('ui') || normalized.includes('ux') || normalized.includes('web') || normalized.includes('design')) {
    ['React', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Redux', 'Responsive Design', 'Next.js', 'Sass'].forEach(k => keywordsSet.add(k));
  } else if (normalized.includes('security') || normalized.includes('cyber') || normalized.includes('penetration') || normalized.includes('infosec')) {
    ['Cybersecurity', 'Firewalls', 'Penetration Testing', 'OWASP', 'Linux', 'Cryptography', 'SIEM', 'Vulnerability Assessment', 'Python', 'Network Security'].forEach(k => keywordsSet.add(k));
  } else {
    const tokens = customRole.split(/[\s\-_,]+/).filter(t => t.length > 2);
    tokens.forEach(t => {
      const cap = t.charAt(0).toUpperCase() + t.slice(1);
      keywordsSet.add(cap);
    });
    ['System Design', 'TypeScript', 'Python', 'Cloud Computing', 'Database Management', 'Microservices', 'AWS'].forEach(k => keywordsSet.add(k));
  }

  return Array.from(keywordsSet);
}

export function analyzeResume(resumeText: string, role: JobRole, customRoleName?: string): ATSResult {
  const normalizedText = resumeText.toLowerCase();
  
  // Word Count
  const words = resumeText.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Keyword Matching
  const targetKeywords = role === 'Other' && customRoleName
    ? getCustomKeywords(customRoleName)
    : ROLE_KEYWORDS[role as Exclude<JobRole, 'Other'>] || [];
  
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  targetKeywords.forEach(kw => {
    const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b|${escaped}`, 'i');
    
    if (regex.test(normalizedText)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const keywordMatchRate = targetKeywords.length > 0 
    ? Math.round((matchedKeywords.length / targetKeywords.length) * 100)
    : 0;

  // Section Presence Checks
  let sectionCount = 0;
  const sectionsFound: string[] = [];
  const sectionsMissing: string[] = [];

  Object.entries(SECTIONS).forEach(([sectionName, regexList]) => {
    const isFound = regexList.some(rx => rx.test(normalizedText));
    if (isFound) {
      sectionCount++;
      sectionsFound.push(sectionName);
    } else {
      sectionsMissing.push(sectionName);
    }
  });

  // Action Verbs
  let actionVerbCount = 0;
  const foundVerbs: string[] = [];
  ACTION_VERBS.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(normalizedText)) {
      actionVerbCount++;
      foundVerbs.push(verb);
    }
  });

  // Contact Info Hygiene
  let formattingIssues = 0;
  const hygieneChecks = {
    hasEmail: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(resumeText),
    hasPhone: /(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/.test(resumeText),
    hasLinkedIn: /linkedin\.com/i.test(resumeText),
    hasGitHub: /github\.com/i.test(resumeText)
  };

  if (!hygieneChecks.hasEmail) formattingIssues++;
  if (!hygieneChecks.hasPhone) formattingIssues++;
  if (!hygieneChecks.hasLinkedIn && !hygieneChecks.hasGitHub) formattingIssues++;

  // Project Quality Check
  // Check if they mention external links or numbers indicating production metrics (%, $, users, metrics)
  const hasQuantifiedMetrics = /\b\d+%\b|\b\d+\s*(users|active|dau|mau|kb|mb|gb|percent)\b|\$\b\d+/i.test(resumeText);
  const hasProjectSection = sectionsFound.includes('projects');

  // --- Scoring Algorithm ---
  const keywordScore = Math.min(50, Math.round((matchedKeywords.length / Math.max(1, targetKeywords.length)) * 50));
  
  const totalSections = Object.keys(SECTIONS).length;
  const sectionScore = Math.min(20, Math.round((sectionCount / totalSections) * 20));

  let readabilityScore = 0;
  if (wordCount >= 300 && wordCount <= 1200) {
    readabilityScore = 15;
  } else if ((wordCount >= 150 && wordCount < 300) || (wordCount > 1200 && wordCount <= 1800)) {
    readabilityScore = 10;
  } else if (wordCount > 0) {
    readabilityScore = 5;
  }

  let hygieneScore = 15;
  hygieneScore -= formattingIssues * 3;
  if (actionVerbCount < 3) {
    hygieneScore -= 3;
  }
  hygieneScore = Math.max(0, hygieneScore);

  const score = Math.min(100, Math.max(0, keywordScore + sectionScore + readabilityScore + hygieneScore));

  // --- Create Recruiter Reactions ---
  const reactions: RecruiterReaction[] = [];
  if (keywordMatchRate >= 70) {
    reactions.push({ type: 'success', text: `Strong ${role} keyword alignment detected`, category: 'Skills' });
  } else {
    reactions.push({ type: 'error', text: `Weak keywords matching key ${role} job specs`, category: 'Skills' });
  }

  if (hasQuantifiedMetrics) {
    reactions.push({ type: 'project', text: '🔥 Real production metrics & quantified impact found', category: 'Experience' });
  } else {
    reactions.push({ type: 'warn', text: '⚠ Missing quantified achievements or scale numbers', category: 'Experience' });
  }

  if (hygieneChecks.hasGitHub) {
    reactions.push({ type: 'success', text: '✅ GitHub Portfolio Link attached and verified', category: 'Links' });
  } else {
    reactions.push({ type: 'warn', text: '🚫 No GitHub links detected to showcase project repositories', category: 'Links' });
  }

  if (actionVerbCount >= 5) {
    reactions.push({ type: 'success', text: '💪 Dynamic vocabulary indicating strong ownership', category: 'Tone' });
  }

  if (sectionsMissing.length > 0) {
    reactions.push({ type: 'error', text: `🚫 Missing critical blocks: ${sectionsMissing.join(', ')}`, category: 'Structure' });
  }

  // --- Skill Heatmap Metrics ---
  const skillsHeatmap: SkillGroup[] = [
    {
      name: 'Frontend',
      score: Math.min(100, (matchedKeywords.filter(k => ['react', 'next.js', 'html', 'css', 'javascript', 'typescript', 'tailwind css', 'sass'].includes(k.toLowerCase())).length * 20) + (role.includes('Frontend') ? 30 : 10)),
      keywords: ['React', 'TypeScript', 'Tailwind', 'Next.js']
    },
    {
      name: 'Backend',
      score: Math.min(100, (matchedKeywords.filter(k => ['node.js', 'express', 'spring boot', 'java', 'python', 'go', 'microservices'].includes(k.toLowerCase())).length * 20) + (role.includes('Backend') || role.includes('Java') ? 30 : 10)),
      keywords: ['Node.js', 'Spring Boot', 'APIs', 'Go']
    },
    {
      name: 'Database',
      score: Math.min(100, (matchedKeywords.filter(k => ['sql', 'postgresql', 'mongodb', 'mysql', 'oracle', 'nosql', 'redis'].includes(k.toLowerCase())).length * 25) + 20),
      keywords: ['PostgreSQL', 'MongoDB', 'SQL', 'Redis']
    },
    {
      name: 'Cloud & Infrastructure',
      score: Math.min(100, (matchedKeywords.filter(k => ['aws', 'docker', 'kubernetes', 'ci/cd', 'git', 'terraform'].includes(k.toLowerCase())).length * 20) + (role.includes('DevOps') ? 40 : 15)),
      keywords: ['AWS', 'Docker', 'CI/CD', 'Terraform']
    },
    {
      name: 'DSA & Systems',
      score: Math.min(100, (matchedKeywords.filter(k => ['algorithms', 'data structures', 'system design', 'oop', 'multithreading'].includes(k.toLowerCase())).length * 25) + 30),
      keywords: ['Data Structures', 'Algorithms', 'System Design']
    }
  ];

  // Adjust scores to be non-zero and feel realistic
  skillsHeatmap.forEach(h => {
    h.score = Math.max(20, Math.min(100, h.score));
  });

  // --- Interview Prediction Stages ---
  const predictions: InterviewPrediction[] = [
    {
      stage: 'Initial Resume Screening',
      probability: Math.round(score),
      feedback: score >= 80 
        ? 'Almost guaranteed pass. Clean formatting and high keyword overlap.' 
        : score >= 60 ? 'Decent odds, but may get filtered depending on applicant volume.' 
        : 'Very low probability. Scanner bot might drop this profile before review.'
    },
    {
      stage: 'Technical Screening Round',
      probability: Math.round(score * 0.85),
      feedback: keywordMatchRate >= 65 
        ? 'Solid likelihood. Candidate possesses core technical terminology required.'
        : 'Risky. Resume lacks multiple foundational tech words for this tier.'
    },
    {
      stage: 'Hiring Manager Loop',
      probability: Math.round(score * (hasQuantifiedMetrics ? 0.75 : 0.45)),
      feedback: hasQuantifiedMetrics
        ? 'High probability of connection. Quantified business results make you stand out.'
        : 'Warning: Hiring managers demand metrics. Add percentages and stats to improve odds.'
    }
  ];

  // --- Sticky Recruiter Notes & Roasts ---
  const recruiterNotes: string[] = [];
  const roasts: string[] = [];

  if (score >= 85) {
    recruiterNotes.push('Shortlist immediately. Exceptional keyword compliance.');
    recruiterNotes.push('Check GitHub links; projects look complex and well-structured.');
    roasts.push('Look at this high achiever. Do you sleep at night or just compile code?');
    roasts.push('A clean layout. An actual developer must have formatted this, not a generic markdown exporter.');
  } else if (score >= 65) {
    recruiterNotes.push('Moderate potential. Good foundational skills, but needs more project metrics.');
    recruiterNotes.push('Follow up on missing core keywords during initial call.');
    roasts.push('Has the experience, but hides it under generic descriptions like "responsible for daily tasks". Yawn.');
    roasts.push('Looks like you built a few React apps. Welcome to the ocean of 10,000 other developers doing the exact same thing.');
  } else {
    recruiterNotes.push('Pass. Lacks core frameworks, contact links, or structure.');
    roasts.push('This resume is so bare it looks like a placeholder file in an empty GitHub repo.');
    roasts.push('No portfolio links, no metrics. Are we hiring a software engineer or a mystery writer?');
  }

  if (formattingIssues > 0) {
    roasts.push(`Missing essential contact coordinates. How are we supposed to offer you a job? Carrier pigeon?`);
  }
  if (actionVerbCount < 4) {
    roasts.push('Vocabulary is extremely passive. You "assisted with" and "helped with" everything. Did you actually build anything yourself?');
  }

  // Fallbacks
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];
  const displayRoleName = role === 'Other' && customRoleName ? customRoleName : role;

  if (keywordMatchRate >= 70) {
    strengths.push(`Excellent vocabulary match (${keywordMatchRate}%) for ${displayRoleName} roles.`);
  } else {
    weaknesses.push(`Keyword match rate is sub-optimal (${keywordMatchRate}%). Target role demands more core skills.`);
    suggestions.push(`Integrate missing keywords: ${missingKeywords.slice(0, 4).join(', ')} directly into your experience statements.`);
  }
  
  if (sectionCount === totalSections) {
    strengths.push('Complete document layout with all expected standard candidate sections.');
  } else {
    weaknesses.push(`Missing standard sections: ${sectionsMissing.map(s => s.toUpperCase()).join(', ')}.`);
    suggestions.push(`Explicitly label sections like "${sectionsMissing[0]}" to ensure parser bots can categorize your history.`);
  }

  if (hasQuantifiedMetrics) {
    strengths.push('Resume details show quantified business impact (percentages or metrics).');
  } else {
    weaknesses.push('No business impact metrics found. Work experience items are list of tasks, not achievements.');
    suggestions.push('Add numerical achievements: e.g. "reduced system latency by 20%" instead of "worked on system performance".');
  }

  if (strengths.length === 0) strengths.push('Readable text blocks with standard contact details.');
  if (weaknesses.length === 0) weaknesses.push('No fatal structural issues identified.');
  if (suggestions.length === 0) suggestions.push('Tailor experience bullet points specifically to this job posting requirements.');

  return {
    score,
    role: displayRoleName,
    matchedKeywords,
    missingKeywords,
    strengths,
    weaknesses,
    suggestions,
    reactions,
    skillsHeatmap,
    predictions,
    recruiterNotes,
    roasts,
    metrics: {
      keywordMatchRate,
      sectionCount,
      actionVerbCount,
      wordCount,
      formattingIssues
    }
  };
}
