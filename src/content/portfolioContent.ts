// Single source of truth for all portfolio content.
// Used by the website sections AND the AI assistant's knowledge context.

export const profile = {
  name: "Heba N. Ismail",
  initials: "HI",
  title: "Backend Software Engineer | Laravel & PHP",
  location: "Gaza, Palestine",
  heroIntro:
    "Building structured backend systems and practical software solutions that solve real problems.",
  heroSupport:
    "I am a Computer Systems Engineering graduate with hands-on backend project experience and a growing interest in AI-powered solutions and intelligent automation.",
  photo: "/images/profile-photo.jpg",
  about: [
    "I am a Computer Systems Engineering graduate with a strong interest in backend development, logical problem-solving, data processing, and database design.",
    "I enjoy understanding how systems work, translating requirements into structured solutions, and building software that behaves according to clear and reliable rules. My practical experience includes contributing to a real-world backend system for the Coastal Municipalities Water Utility (CMWU), alongside educational projects that helped me develop my Laravel and software development skills.",
    "I am also expanding my capabilities in artificial intelligence and intelligent automation, exploring how these technologies can improve workflows and deliver practical value.",
    "I am looking to grow as a backend software engineer while contributing to meaningful software projects and freelance opportunities.",
  ],
};

export const contact = {
  heading: "Let's Connect",
  text: "I'm open to backend development opportunities, freelance projects, and meaningful software collaborations.",
  email: "hebanedal224@gmail.com",
  github: "https://github.com/heba-nedal",
  linkedin: "https://www.linkedin.com/in/heba-n-ismail-b836b2377/",
  location: "Gaza, Palestine",
};

export type SkillGroup = { name: string; kind: "applied" | "foundation"; items: string[] };

export const skills: SkillGroup[] = [
  { name: "Backend Development", kind: "applied", items: ["PHP", "Laravel", "MVC Architecture", "Middleware", "Authentication", "Authorization"] },
  { name: "Database Development", kind: "applied", items: ["MySQL", "PostgreSQL", "Database Design", "Database Relationships", "Migrations"] },
  { name: "Web Development", kind: "applied", items: ["Blade", "AJAX", "DataTables"] },
  { name: "Laravel Application Features", kind: "applied", items: ["Multi-Guard Authentication", "Laravel Fortify", "Notifications", "Jobs and Listeners", "Background Processing"] },
  { name: "AI and Intelligent Automation", kind: "applied", items: ["Advanced Prompt Engineering", "Reusable Prompt Templates", "CTCO and Few-Shot Prompting", "Google Apps Script", "Zapier Workflow Automation", "GPT for Google Sheets and Docs", "AI-Assisted Content Creation"] },
  { name: "Software Engineering Foundations", kind: "foundation", items: ["Data Structures", "Algorithms", "Database Fundamentals", "Requirements Engineering", "Software Design", "Software Testing"] },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  categoryKind: "real" | "educational" | "training";
  organization?: string;
  status: string;
  technologies: string[];
  overview: string;
  problem: string;
  solution: string;
  role?: string;
  features?: string[];
  workflow?: string;
  notes?: string[];
  outcomes?: string[];
  screenshot?: string;
  repoUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    id: "cmwu",
    screenshot: "/images/projects/cmwu.jpg",
    title: "CMWU — Backend System Development",
    category: "Real-World Project",
    categoryKind: "real",
    organization: "Coastal Municipalities Water Utility (CMWU), Gaza",
    status: "Real-world project completed as a graduation project.",
    technologies: ["Laravel", "PHP", "PostgreSQL", "Git"],
    overview:
      "Contributed to backend development for a real software system serving the Coastal Municipalities Water Utility (CMWU) in Gaza. The work involved implementing selected backend features and business logic within an existing Laravel codebase.",
    problem:
      "Operational and administrative workflows require structured software support to manage related records, enforce business rules, and maintain consistent data.",
    solution:
      "Contributed to selected backend features, database changes, and application logic supporting operational and administrative workflows.",
    role: "Backend development contributor responsible for assigned features, implementation tasks, and changes within the existing codebase.",
    features: [
      "Contract and purchase-order CRUD functionality",
      "Structured database relationships",
      "Service-layer business logic",
      "Selected operational workflows",
    ],
    notes: [
      "Only public-safe descriptions are shown. Internal details, data, and repositories are private.",
    ],
  },
  {
    id: "freelango",
    screenshot: "/images/projects/freelango.jpg",
    title: "FreelanGo — Freelancing Platform",
    category: "Educational Project",
    categoryKind: "educational",
    status: "Educational project — core features implemented; not fully completed.",
    technologies: ["Laravel", "PHP", "MySQL", "Blade", "AJAX", "DataTables"],
    overview:
      "An educational freelancing platform developed through guided Laravel learning. The project explores a multi-role application for administrators, freelancers, and clients.",
    problem:
      "Freelancing platforms need structured ways to organize users, control access, and manage application features across different roles.",
    solution:
      "Implemented selected application features while learning Laravel architecture and advanced framework concepts.",
    role: "Hands-on implementation and learning through guided development tasks.",
    features: [
      "Admin, freelancer, and client/user roles.",
      "Authentication using Laravel Fortify and multiple guards.",
      "Middleware and access control.",
      "DataTables and AJAX interactions.",
      "Notifications and background processing using Jobs and Listeners.",
    ],
    notes: ["Not a commercial product or deployed production platform."],
  },
  {
    id: "edukate",
    screenshot: "/images/projects/edukate.jpg",
    title: "Edukate — Online Courses Platform",
    category: "Educational Project",
    categoryKind: "educational",
    status: "Educational project — final completion and deployment status not confirmed.",
    technologies: ["Laravel", "PHP", "MySQL", "Blade"],
    overview: "An educational online course-management platform developed through guided Laravel training.",
    problem:
      "An online learning platform needs organized course management and role-specific experiences for administrators, teachers, and students.",
    solution:
      "Built and practiced backend features for managing course-related data and separating access by user role.",
    role: "Implemented assigned learning tasks with trainer guidance and feedback.",
    features: [
      "Admin dashboard.",
      "Teacher dashboard.",
      "Student dashboard.",
      "CRUD operations for courses and related records.",
      "Role-based access control.",
    ],
  },
  {
    id: "workshop-automation",
    screenshot: "/images/projects/workshop-automation.jpg",
    title: "AI-Powered Workshop Registration Workflow",
    category: "AI and Automation Training Project",
    categoryKind: "training",
    status: "AI and Automation Training Project — prototype / training implementation.",
    technologies: ["Zapier", "Google Forms", "Google Sheets", "AI by Zapier", "Email by Zapier"],
    overview:
      "A workflow automation project designed to streamline technology workshop registration using form submissions, structured data storage, AI-assisted information processing, and email notifications.",
    problem:
      "Manual handling of workshop registration can require repetitive data entry, information review, and confirmation messages.",
    solution:
      "Designed an automated workflow that collects registration submissions, records them in Google Sheets, uses AI to summarize or extract relevant information, and sends a confirmation message. Exceptional cases are flagged for human review.",
    workflow:
      "Google Forms Submission → Validate and Process Registration → Google Sheets Record → AI-Assisted Summarization or Extraction → Email Confirmation or Exception Review",
    notes: [
      "Business rule: a confirmation message acknowledges receipt of a registration. It does not imply acceptance or guaranteed participation.",
      "Scope: does not handle payments, participant selection, capacity management, or scheduling.",
    ],
  },
];

export const experience = [
  {
    title: "Backend Development — Real-World Project",
    organization: "Coastal Municipalities Water Utility (CMWU), Gaza",
    status: "Graduation project (not a paid position)",
    description:
      "Contributed to backend development for a real software system serving CMWU. Worked on assigned features, backend logic, database changes, and structured implementation within an existing Laravel codebase.",
  },
  {
    title: "Software Development Training — Support Ticketing System",
    organization: undefined as string | undefined,
    status: "In progress",
    description:
      "Currently undertaking practical software development training under the guidance of a software engineer. The training involves implementing assigned tasks in a support ticketing system and gaining experience with an existing codebase, feature requirements, and iterative development.",
  },
];

export const education = {
  university: {
    degree: "B.Sc. in Computer Systems Engineering",
    institution: "Al-Azhar University – Gaza",
    year: "2026",
    distinction: "Excellent",
    gpa: "95.01%",
    achievement: "Ranked first in the graduating cohort.",
    certificate: {
      src: "/images/graduation-certificate.jpg",
      width: 834,
      height: 637,
      pendingMessage: "Official graduation certificate pending — graduation procedures in progress.",
    },
  },
  secondary: {
    degree: "General Secondary Education",
    year: "2021",
    grade: "99.6%",
    achievement: "Ranked second in Palestine.",
  },
};

export const training = [
  {
    title: "AI & Intelligent Automation Training",
    organization: "Women's Affairs Center — Gaza",
    period: "In progress",
    description:
      "Selected as one of 20 participants from approximately 2,000 applicants, according to the program information provided. Completed the AI section and currently progressing through intelligent automation.",
    items: [
      "Advanced prompt engineering and reusable prompt templates.",
      "CTCO and few-shot prompting.",
      "Google Apps Script and email automation.",
      "GPT integration with Google Sheets and Google Docs.",
      "Custom plugin development exercises.",
      "Brand voice and AI-assisted content creation.",
      "AI-generated multimedia exercises.",
      "ATS-oriented CV development.",
      "Research on safe and ethical AI use.",
      "Zapier workflow automation.",
    ],
  },
  { title: "Advanced Laravel Training", organization: "Instructor: Ahmed Zaqout", period: "2025", description: "Practical learning and guided implementation of advanced Laravel concepts and application features." },
  { title: "Laravel Fundamentals", organization: "Learn More — Gaza", period: "2025", description: "Training in Laravel fundamentals and backend web application development." },
  { title: "Git & GitHub", organization: "Almdrasa.com", period: "2023", description: "Training in version control and GitHub workflows." },
  { title: "Academic Foundations", organization: "Al-Azhar University – Gaza", period: "Coursework", description: "Computer Systems Engineering coursework covering databases, data structures, algorithms, requirements engineering, software design, software testing, and related subjects." },
] as { title: string; organization: string; period: string; description: string; items?: string[] }[];

export type AssistantMode = "portfolio" | "recommend" | "fit" | "work";

export const assistant = {
  title: "Ask Me About My Work",
  subtitle: "Have a question about my skills, projects, or background? Choose a mode, or type “/” for suggested questions.",
  modes: [
    { id: "portfolio", label: "Portfolio", description: "Background, education, skills, training, and projects.", placeholder: "Ask about skills, projects, or background…" },
    { id: "recommend", label: "Project match", description: "Describe what you want to build — get the most relevant project.", placeholder: "Describe what you're trying to build…" },
    { id: "fit", label: "Career fit", description: "Paste a role or requirement — see which documented skills match.", placeholder: "Paste a role, project, or technical requirement…" },
    { id: "work", label: "Ask about my work", description: "Open-ended follow-ups on projects, technologies, and contributions.", placeholder: "Ask a follow-up about a project or contribution…" },
  ] as { id: AssistantMode; label: string; description: string; placeholder: string }[],
  slashGroups: [
    { label: "About My Background", items: ["What is Heba's background?", "What backend technologies has she used?"] },
    { label: "Explore My Projects", items: ["Tell me about the CMWU project.", "What is the difference between FreelanGo and Edukate?", "Which projects demonstrate backend development skills?"] },
    { label: "Find Relevant Skills", items: ["Which of Heba's skills match my project requirements?", "What AI and automation work has she completed?"] },
  ],
  suggestions: [
    "What backend technologies has Heba used?",
    "Tell me about the CMWU project.",
    "What is the difference between FreelanGo and Edukate?",
    "What AI and automation work has Heba completed?",
    "Which project is most relevant to a backend development requirement?",
    "How can I contact Heba?",
  ],
  fallback:
    "I couldn't verify that information from the available portfolio content. Please contact Heba directly if you need further details.",
};

/** Short, evidence-only note for a skill badge, derived from the content above. */
export function skillEvidence(skill: string, group: SkillGroup): string {
  const s = skill.toLowerCase();
  const hits = projects
    .filter((p) => [...p.technologies, ...(p.features ?? [])].some((t) => {
      const x = t.toLowerCase().replace(/\.$/, "");
      return x.length >= 3 && (x.includes(s) || s.includes(x));
    }))
    .map((p) => p.title.split(" — ")[0]);
  if (hits.length) return `Documented in: ${hits.join(", ")}.`;
  if (group.kind === "foundation") return "Covered in Computer Systems Engineering coursework.";
  if (group.name.startsWith("AI")) return "Practised in the AI & Intelligent Automation Training.";
  return "Practised through Laravel training and project work.";
}

/** Builds the knowledge context the AI assistant answers from. */
export function buildKnowledgeContext(): string {
  return JSON.stringify(
    {
      profile: { name: profile.name, title: profile.title, location: profile.location, summary: profile.heroSupport, about: profile.about },
      skills,
      projects: projects.map(({ screenshot, ...p }) => p),
      practicalExperience: experience,
      education,
      trainingAndDevelopment: training,
      publicContact: { email: contact.email, github: contact.github, linkedin: contact.linkedin, location: contact.location },
    },
    null,
    1,
  );
}
