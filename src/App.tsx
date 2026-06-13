import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  FileText,
  Github,
  Linkedin,
  type LucideIcon,
  Mail,
  Network,
  Globe,
  Sparkles,
  MessageCircle,
} from "lucide-react";

// ─── Profile & Links ─────────────────────────────────────────────────────────

const profileLinks = {
  github: "https://github.com/Patil161004",
  linkedin: "https://www.linkedin.com/in/atharv-patil-539710233",
  email: "mailto:patilav1610@gmail.com",
  resume: "/Atharv_Patil_Resume.pdf",
  whatsapp: "https://wa.me/917722003772",
};

// ─── Services / What I Build ─────────────────────────────────────────────────

const services = [
  {
    number: "01",
    name: "AI & Machine Learning Systems",
    description:
      "Building production ML pipelines — from computer vision models (ResNet50, CNN) to churn prediction and intelligent classification workflows with real-world evaluation.",
  },
  {
    number: "02",
    name: "Generative AI Products",
    description:
      "Developing AI-powered applications using Gemini API, LLMs, and intelligent chat interfaces with JWT-secured auth and async background job queues.",
  },
  {
    number: "03",
    name: "Full Stack Web Development",
    description:
      "Designing and shipping complete web applications — React frontends, Node.js/Express backends, MongoDB/MySQL databases, and CI/CD deployments on Render.",
  },
  {
    number: "04",
    name: "Digital Forensics Tools",
    description:
      "Building desktop investigation platforms for law enforcement using Electron + Flask with CDR/SDR/IPDR analysis, IMEI tracking, IP geolocation, and cell tower mapping.",
  },
  {
    number: "05",
    name: "Data Analytics & Dashboards",
    description:
      "Turning raw business data into actionable insights with Power BI, Tableau, Matplotlib, and ML-driven analytics for customer trends and operational performance.",
  },
  {
    number: "06",
    name: "Freelance Software Delivery",
    description:
      "End-to-end delivery for startups and businesses — from responsive marketing sites to full-stack operational apps — across healthcare, hospitality, parking, and events.",
  },
];

// ─── Skill Map ────────────────────────────────────────────────────────────────

const skillMap = [
  {
    id: "ai",
    name: "AI & Machine Learning",
    shortName: "AI/ML",
    icon: BrainCircuit,
    accent: "#FF5D8F",
    description:
      "End-to-end ML engineering — computer vision with ResNet50, churn prediction pipelines, deep learning model training and evaluation, and GenAI integration with Gemini API.",
    tools: ["Python", "TensorFlow", "OpenCV", "Flask", "Gemini API"],
    projects: [
      "Diabetic Retinopathy Severity Detection",
      "EduNova — Learning Companion",
      "Customer Churn Prediction",
      "Computer Vision Attendance",
    ],
  },
  {
    id: "fullstack",
    name: "Full Stack Development",
    shortName: "Full Stack",
    icon: Code2,
    accent: "#7DD3FC",
    description:
      "React, Node.js, Express, and MongoDB for complete web app delivery — responsive UIs, REST APIs, real-time features, and cloud deployment with CI/CD pipelines.",
    tools: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript"],
    projects: [
      "EduNova — Learning Companion",
      "Canteen Food Ordering System",
      "Bonito Valet App",
      "Healthberry Life Sciences Website",
    ],
  },
  {
    id: "genai",
    name: "Generative AI & APIs",
    shortName: "GenAI",
    icon: Sparkles,
    accent: "#F8B84E",
    description:
      "Building GenAI-powered products with Gemini API, LLM integrations, intelligent chat interfaces, async AI queues, and production-ready AI feature pipelines.",
    tools: ["Gemini API", "Python", "REST APIs", "Node.js", "React"],
    projects: [
      "EduNova — Learning Companion",
      "Diabetic Retinopathy Severity Detection",
    ],
  },
  {
    id: "data",
    name: "Data Analytics",
    shortName: "Analytics",
    icon: BarChart3,
    accent: "#27C4A8",
    description:
      "Business intelligence and visual analytics using Power BI, Tableau, and Matplotlib — driving client trend insights and operational performance reporting.",
    tools: ["Power BI", "Tableau", "Matplotlib", "SQL", "Python"],
    projects: [
      "MPOWER Business Dashboards",
      "Customer Churn Analysis",
      "Diabetic Retinopathy CNN",
    ],
  },
  {
    id: "backend",
    name: "Backend & Databases",
    shortName: "Backend",
    icon: Database,
    accent: "#B98CFF",
    description:
      "API design, role-based auth, database architecture (MySQL, MongoDB), and secure backend systems with encrypted storage and scalable data workflows.",
    tools: ["PHP", "MySQL", "MongoDB", "Node.js", "JWT"],
    projects: [
      "Canteen Food Ordering System",
      "VPNDS Forensics Platform",
      "EduNova — Learning Companion",
    ],
  },
] as const;

// ─── Projects ─────────────────────────────────────────────────────────────────

const projects = [
  {
    number: "01",
    category: "Medical AI",
    name: "Diabetic Retinopathy Severity Detection",
    description:
      "A CNN-based system that detects diabetic retinopathy severity from retina images, classifying stages 0–4 with 89% accuracy using a fine-tuned ResNet50.",
    tags: ["Python", "Flask", "TensorFlow", "CNN", "Computer Vision"],
    details: [
      "Pretrained ResNet50 fine-tuned on a labeled retina dataset for 5-class severity staging.",
      "89% model accuracy — upload a retina image, get an instant severity prediction.",
      "Simple Flask web interface with end-to-end inference pipeline.",
    ],
    link: "https://github.com/Patil161004",
  },
  {
    number: "02",
    category: "GenAI Full Stack",
    name: "EduNova — Learning Companion",
    description:
      "A full-stack AI-powered learning platform with personalized roadmaps, real-time Gemini AI chat, task management, progress tracking, and placement prep.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Gemini API", "JWT"],
    details: [
      "Real-time AI chat powered by Gemini API, with async background queues for heavy AI workloads.",
      "JWT-secured auth, full CRUD, progress tracking, and CI/CD deployment on Render.",
      "Personalized learning roadmaps and placement preparation features.",
    ],
    link: "https://bonitovaletapp.onrender.com",
  },
  {
    number: "03",
    category: "Digital Forensics",
    name: "VPNDS Digital Forensics Platform",
    description:
      "A desktop digital forensics investigation tool for police departments — built as an Electron app with Flask backend for CDR/SDR/IPDR analysis and advanced intelligence gathering.",
    tags: ["Python", "Flask", "Electron", "JavaScript", "REST APIs"],
    details: [
      "CDR, SDR & IPDR record analysis with advanced search/filtering for criminal investigations.",
      "IP geolocation, IMEI tracking, domain enumeration, email header analysis & cell tower mapping.",
      "Secure role-based authentication with encrypted user data storage.",
    ],
    link: "https://github.com/Patil161004",
  },
  {
    number: "04",
    category: "Full Stack",
    name: "Canteen Food Ordering System",
    description:
      "A multi-page food ordering platform for a college canteen with separate student and admin flows, Razorpay payment gateway, and daily/monthly sales analytics dashboards.",
    tags: ["PHP", "JavaScript", "Bootstrap", "CSS", "MySQL"],
    details: [
      "Separate student ordering flow and admin dashboard with daily/monthly sales analytics.",
      "Integrated Razorpay test payment gateway for digital payments.",
      "Full MySQL backend with order management and role-based access.",
    ],
    link: "https://github.com/Patil161004",
  },
  {
    number: "05",
    category: "ML Internship",
    name: "Customer Churn Prediction",
    description:
      "An ML model built at MPOWER — Aditya Birla Education Trust to predict customer churn from company data, paired with business dashboards for actionable insights.",
    tags: ["Python", "Machine Learning", "Power BI", "Data Analytics"],
    details: [
      "ML classification pipeline trained on real company customer data.",
      "Visual dashboards delivering insights on client trends and business performance.",
      "Applied under senior mentorship in a corporate environment at Aditya Birla.",
    ],
    link: "https://github.com/Patil161004",
  },
  {
    number: "06",
    category: "Web Development",
    name: "Bonito Valet App",
    description:
      "A full-stack valet/parking operations web application built and deployed on Render with CI/CD for Bonito Valet, handling live valet bookings and operations.",
    tags: ["Node.js", "React", "MongoDB", "Render", "CI/CD"],
    details: [
      "Full-stack operational app managing valet bookings and real-time operations.",
      "Deployed on Render with CI/CD pipeline for continuous delivery.",
      "Live production app used by the client for daily operations.",
    ],
    link: "https://bonitovaletapp.onrender.com",
  },
  {
    number: "07",
    category: "Web Development",
    name: "Healthberry Life Sciences Website",
    description:
      "A professional, responsive marketing website designed and developed for Healthberry Life Sciences to showcase their products and brand online.",
    tags: ["React", "JavaScript", "CSS", "Responsive Design"],
    details: [
      "Clean information architecture and modern UI for a life sciences brand.",
      "Responsive across devices — desktop, tablet, and mobile.",
      "Live production website representing the brand online.",
    ],
    link: "https://healthberrylifesciences.com",
  },
  {
    number: "08",
    category: "Event Web",
    name: "ANMI Convention Website",
    description:
      "A convention/event website developed for ANMI to inform attendees, manage event details, and serve as the official digital presence for the convention.",
    tags: ["JavaScript", "HTML", "CSS", "Event Site"],
    details: [
      "Structured content layout for event schedules, speakers, and information.",
      "Fast-loading static site with professional design for convention branding.",
      "Live site used for the actual ANMI Convention event.",
    ],
    link: "https://anmi.in",
  },
] as const;

const featuredProjectIds = new Set([
  "Diabetic Retinopathy Severity Detection",
  "EduNova — Learning Companion",
  "VPNDS Digital Forensics Platform",
  "Canteen Food Ordering System",
  "Customer Churn Prediction",
  "Bonito Valet App",
]);

const featuredProjects = projects.filter((p) => featuredProjectIds.has(p.name));
const moreProjects = projects.filter((p) => !featuredProjectIds.has(p.name));

// ─── Shared Components ────────────────────────────────────────────────────────

type FadeInProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

function FadeIn<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...props
}: FadeInProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = useMemo(
    () => motion.create((as ?? "div") as ElementType),
    [as],
  );

  return (
    <MotionElement
      initial={shouldReduceMotion ? false : { opacity: 0, x, y }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { duration, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
      viewport={{ once: true, margin: "50px", amount: 0 }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouseMove = (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const withinBounds =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding &&
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (!withinBounds) {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
        return;
      }
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setIsActive(true);
      setPosition({
        x: (event.clientX - centerX) / strength,
        y: (event.clientY - centerY) / strength,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, shouldReduceMotion, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: shouldReduceMotion
          ? undefined
          : `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: shouldReduceMotion
          ? undefined
          : isActive
            ? activeTransition
            : inactiveTransition,
        willChange: shouldReduceMotion ? undefined : "transform",
      }}
    >
      {children}
    </div>
  );
}

function ContactButton() {
  return (
    <a
      href={profileLinks.email}
      className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition duration-200 hover:scale-[1.02] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background:
          "linear-gradient(123deg, #0f0c29 7%, #302b63 37%, #24243e 72%, #1a1a2e 100%)",
        boxShadow:
          "0px 4px 4px rgba(59, 130, 246, 0.25), 4px 4px 12px #3b82f6 inset",
      }}
    >
      <span>Contact Me</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ResourceLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto");
  return (
    <a
      href={href}
      target={isExternal && !href.startsWith("mailto") ? "_blank" : undefined}
      rel={isExternal && !href.startsWith("mailto") ? "noopener noreferrer" : undefined}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 px-4 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:border-[#D7E2EA]/70 hover:bg-[#D7E2EA]/10 sm:h-12 sm:px-5"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

function LiveProjectButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      <span>View Project</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  const accentByCategory: Record<string, string> = {
    "Medical AI": "#FF5D8F",
    "GenAI Full Stack": "#B98CFF",
    "Digital Forensics": "#F8B84E",
    "Full Stack": "#7DD3FC",
    "ML Internship": "#27C4A8",
    "Web Development": "#60A5FA",
    "Event Web": "#F97316",
  };
  const accent = accentByCategory[project.category] ?? "#D7E2EA";

  const metricsByProject: Record<string, { label: string; value: number }[]> = {
    "Diabetic Retinopathy Severity Detection": [
      { label: "Model accuracy", value: 89 },
      { label: "Stage classification", value: 95 },
      { label: "Inference speed", value: 82 },
    ],
    "EduNova — Learning Companion": [
      { label: "AI chat coverage", value: 91 },
      { label: "Auth security", value: 96 },
      { label: "Feature completeness", value: 88 },
    ],
    "VPNDS Digital Forensics Platform": [
      { label: "CDR analysis depth", value: 87 },
      { label: "Data source coverage", value: 83 },
      { label: "Auth & security", value: 92 },
    ],
    "Canteen Food Ordering System": [
      { label: "Order flow UX", value: 85 },
      { label: "Admin dashboard", value: 79 },
      { label: "Payment integration", value: 90 },
    ],
    "Customer Churn Prediction": [
      { label: "Prediction accuracy", value: 84 },
      { label: "Dashboard insights", value: 78 },
      { label: "Data pipeline", value: 86 },
    ],
    "Bonito Valet App": [
      { label: "Ops coverage", value: 88 },
      { label: "CI/CD reliability", value: 93 },
      { label: "Live deployment", value: 95 },
    ],
  };

  const metrics =
    metricsByProject[project.name] ??
    project.tags.slice(0, 3).map((tag, index) => ({
      label: tag,
      value: [84, 73, 88][index] ?? 76,
    }));

  const architectureStepsByProject: Record<string, string[]> = {
    "Diabetic Retinopathy Severity Detection": ["Upload Retina", "ResNet50 Inference", "Stage Prediction"],
    "EduNova — Learning Companion": ["Auth & Login", "Gemini AI Chat", "Track Progress"],
    "VPNDS Digital Forensics Platform": ["Load Records", "Analyze CDR/IPDR", "Map Intelligence"],
    "Canteen Food Ordering System": ["Browse Menu", "Place Order", "Razorpay Payment"],
    "Customer Churn Prediction": ["Load Data", "Train ML Model", "Dashboard Insights"],
    "Bonito Valet App": ["Book Valet", "Manage Operations", "Deploy on Render"],
  };

  const architectureSteps =
    architectureStepsByProject[project.name] ??
    project.tags.slice(0, 3).map((tag) => `Use ${tag}`);

  return (
    <div className="relative flex min-h-[280px] overflow-hidden rounded-[32px] border border-[#D7E2EA]/20 bg-[#090A0C] p-4 sm:min-h-[360px] sm:rounded-[44px] sm:p-5 md:rounded-[56px]">
      <div
        className="absolute inset-x-8 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        aria-hidden="true"
      />
      <div className="grid w-full grid-rows-[auto_1fr] gap-4">
        <div className="flex min-w-0 items-center justify-between gap-3 rounded-[24px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span className="min-w-0 break-words text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/70 [overflow-wrap:anywhere]">
              {project.category}
            </span>
          </div>
          <span className="shrink-0 text-xs font-light uppercase tracking-wider text-[#D7E2EA]/45">
            Preview
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-w-0 flex-col justify-between rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
                Project System
              </p>
              <p className="mt-3 min-w-0 break-words text-[clamp(1.35rem,3vw,1.85rem)] font-black uppercase leading-none text-[#D7E2EA] [overflow-wrap:anywhere]">
                {project.name}
              </p>
            </div>
            <div className="mt-8 grid gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="min-w-0 rounded-full border border-[#D7E2EA]/15 px-3 py-2 text-[0.68rem] font-medium uppercase leading-snug tracking-wider text-[#D7E2EA]/70 [overflow-wrap:anywhere]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-3 rounded-[28px] border border-[#D7E2EA]/15 bg-[#0C0C0C] p-4">
            {metrics.map((metric, index) => (
              <div key={`${metric.label}-${index}`} className="grid gap-2">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-[0.68rem] uppercase tracking-wider text-[#D7E2EA]/50">
                  <span className="min-w-0 break-words leading-snug [overflow-wrap:anywhere]">
                    {metric.label}
                  </span>
                  <span className="shrink-0">{metric.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#D7E2EA]/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${metric.value}%`,
                      background: `linear-gradient(90deg, ${accent}, rgba(215,226,234,0.8))`,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-auto grid gap-2 pt-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-wider text-[#D7E2EA]/40">
                Architecture Flow
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {architectureSteps.map((step, index) => (
                  <div
                    key={step}
                    className="relative min-w-0 rounded-2xl border border-[#D7E2EA]/12 bg-[#D7E2EA]/5 p-3"
                    style={{
                      boxShadow: `inset 0 0 28px ${accent}${index === 1 ? "29" : "17"}`,
                    }}
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-black text-[#0C0C0C]"
                      style={{ backgroundColor: accent }}
                    >
                      {index + 1}
                    </span>
                    <span className="mt-3 block min-w-0 break-words text-[0.68rem] font-semibold uppercase leading-snug tracking-wider text-[#D7E2EA]/75 [overflow-wrap:anywhere]">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skill Map", href: "#skills" },
    { label: "What I Build", href: "#build" },
    { label: "Projects", href: "#projects" },
    { label: "Freelance", href: "#freelance" },
    { label: "Resume", href: profileLinks.resume },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">

      {/* ── Ambient glow behind character ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 50% 85%, rgba(59,130,246,0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Subtle grid lines ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#D7E2EA 1px, transparent 1px), linear-gradient(90deg, #D7E2EA 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* ── Navigation ── */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-30 flex w-full flex-wrap justify-center gap-x-6 gap-y-3 border-b border-[#D7E2EA]/8 px-6 py-5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/70 sm:justify-between sm:text-sm md:px-10 md:py-6 md:text-[0.8rem] lg:text-[0.85rem]"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="transition-all duration-200 hover:text-[#D7E2EA] hover:opacity-100"
          >
            {item.label}
          </a>
        ))}
      </FadeIn>

      {/* ── Hero Heading ── */}
      <FadeIn
        delay={0.15}
        y={40}
        className="relative z-20 mt-14 w-full overflow-hidden sm:mt-12 md:mt-8"
      >
        <h1 className="hero-heading w-full whitespace-nowrap text-center text-[9vw] font-black uppercase leading-none tracking-tight sm:text-[9.6vw] md:text-[10.2vw] lg:text-[11.2vw]">
          Hi, Atharv here !
        </h1>
      </FadeIn>

      {/* ── Character GIF — centered, bottom-anchored, masked ── */}
      <motion.div
        className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 w-[320px] sm:w-[400px] md:w-[460px] lg:w-[520px]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1, ease: "easeInOut" }}
      >
        <FadeIn delay={0.55} y={24}>
          {/* Background glow disc */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 h-[220px] w-[220px] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <Magnet
            padding={100}
            strength={2}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            {/* Image wrapper — gradient overlays kill white background */}
            <div className="relative select-none">
              <img
                src="/download.gif"
                alt="Portrait of Atharv Patil"
                className="w-full object-contain"
                draggable={false}
                style={{
                  filter: "drop-shadow(0 32px 64px rgba(59,130,246,0.22)) drop-shadow(0 8px 24px rgba(0,0,0,0.6))",
                  maskImage: "linear-gradient(to bottom, black 55%, transparent 97%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 97%)",
                }}
              />
              {/* Left edge fade */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[22%]"
                style={{ background: "linear-gradient(to right, #0C0C0C 20%, transparent)" }}
                aria-hidden="true"
              />
              {/* Right edge fade */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-[22%]"
                style={{ background: "linear-gradient(to left, #0C0C0C 20%, transparent)" }}
                aria-hidden="true"
              />
              {/* Top edge fade */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[18%]"
                style={{ background: "linear-gradient(to bottom, #0C0C0C 10%, transparent)" }}
                aria-hidden="true"
              />
            </div>
          </Magnet>
        </FadeIn>
      </motion.div>

      {/* ── Bottom bar — tagline + links ── */}
      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-8 sm:pb-9 md:px-10 md:pb-11">
        <FadeIn delay={0.35} y={20}>
          <div className="max-w-[220px] sm:max-w-[380px] md:max-w-[520px]">
            <p className="text-[clamp(0.7rem,1.3vw,1.1rem)] font-light uppercase leading-snug tracking-[0.18em] text-[#D7E2EA]/65">
              Full Stack Engineer · AI/ML Developer · B.Tech IT — VIT Mumbai
            </p>
            <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
              <ResourceLink href={profileLinks.resume} label="Resume" icon={FileText} />
              <ResourceLink href={profileLinks.github} label="GitHub" icon={Github} />
              <ResourceLink href={profileLinks.linkedin} label="LinkedIn" icon={Linkedin} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <div className="flex flex-col items-end gap-3">
            <ContactButton />
            <div className="flex gap-2 sm:hidden">
              <a
                href={profileLinks.resume}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
                aria-label="Open resume"
              >
                <FileText className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={profileLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
                aria-label="Open GitHub profile"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={profileLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
                aria-label="Open LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Skill Map Section ────────────────────────────────────────────────────────

function SkillMapSection() {
  const [activeSkillId, setActiveSkillId] =
    useState<(typeof skillMap)[number]["id"]>("ai");
  const activeSkill =
    skillMap.find((skill) => skill.id === activeSkillId) ?? skillMap[0];
  const ActiveSkillIcon = activeSkill.icon;
  const activeSkillProjects: readonly string[] = activeSkill.projects;
  const activeProjects = projects.filter((project) =>
    activeSkillProjects.includes(project.name),
  );

  return (
    <section
      id="skills"
      className="overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32 lg:px-12 xl:px-16 2xl:px-20"
      aria-label="Interactive skill map"
    >
      <div className="mx-auto max-w-[1680px]">
        <FadeIn>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="hero-heading text-[clamp(3rem,12vw,150px)] font-black uppercase leading-none tracking-tight">
              Skill Map
            </h2>
            <p className="max-w-2xl text-[clamp(0.95rem,1.5vw,1.2rem)] font-light leading-relaxed text-[#D7E2EA]/70">
              Select a skill area to see the tools I use and the projects where
              that skill shows up.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch xl:gap-10">
          <FadeIn delay={0.1} className="hidden md:block">
            <div className="min-h-[620px] rounded-[32px] border border-[#D7E2EA]/15 bg-[#111316] p-6 shadow-2xl shadow-black/30 xl:p-8">
              <div className="grid h-full min-h-[568px] grid-cols-[160px_1fr] gap-4 xl:grid-cols-[190px_1fr] xl:gap-6">
                <div className="flex flex-col items-center justify-center rounded-[28px] border border-[#D7E2EA]/15 bg-[#0C0C0C]/70 px-5 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D7E2EA]/25 bg-[#D7E2EA]/5">
                    <Network className="h-8 w-8 text-[#D7E2EA]" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-[#D7E2EA]/50">
                    Atharv Patil
                  </p>
                  <p className="mt-2 text-2xl font-black uppercase leading-none text-[#D7E2EA]">
                    Skill Graph
                  </p>
                </div>

                <div className="relative grid content-center gap-4 xl:gap-5">
                  <div
                    className="absolute bottom-10 left-[35px] top-10 w-px bg-[#D7E2EA]/15"
                    aria-hidden="true"
                  />

                  {skillMap.map((skill) => {
                    const Icon = skill.icon;
                    const isActive = skill.id === activeSkill.id;

                    return (
                      <motion.button
                        key={skill.id}
                        type="button"
                        onClick={() => setActiveSkillId(skill.id)}
                        onMouseEnter={() => setActiveSkillId(skill.id)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        className="relative z-10 grid min-h-[80px] grid-cols-[60px_1fr] items-center gap-3 rounded-[20px] border p-3 text-left transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#D7E2EA]/70 xl:grid-cols-[60px_1fr_auto]"
                        style={{
                          borderColor: isActive
                            ? skill.accent
                            : "rgba(215,226,234,0.16)",
                          background: isActive
                            ? `linear-gradient(90deg, ${skill.accent}24, rgba(215,226,234,0.06))`
                            : "rgba(215,226,234,0.045)",
                          boxShadow: isActive
                            ? `0 18px 50px ${skill.accent}18`
                            : "none",
                        }}
                        aria-pressed={isActive}
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-[#0C0C0C]">
                          <Icon
                            className="h-5 w-5"
                            style={{ color: skill.accent }}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold uppercase leading-tight tracking-wider text-[#D7E2EA]">
                            {skill.name}
                          </span>
                          <span className="mt-1 block text-xs font-light leading-relaxed text-[#D7E2EA]/55">
                            {skill.projects.length} related projects
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="grid gap-3 md:hidden">
            {skillMap.map((skill) => {
              const Icon = skill.icon;
              const isActive = skill.id === activeSkill.id;

              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setActiveSkillId(skill.id)}
                  className="flex items-center justify-between rounded-[24px] border p-4 text-left transition duration-200"
                  style={{
                    borderColor: isActive ? skill.accent : "rgba(215,226,234,0.18)",
                    background: isActive
                      ? `${skill.accent}1F`
                      : "rgba(215,226,234,0.05)",
                  }}
                  aria-pressed={isActive}
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      className="h-6 w-6"
                      style={{ color: skill.accent }}
                      aria-hidden="true"
                    />
                    <span className="text-base font-semibold uppercase tracking-wider text-[#D7E2EA]">
                      {skill.name}
                    </span>
                  </span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: skill.accent }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.article
              key={activeSkill.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex min-h-full flex-col rounded-[32px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-6 text-[#D7E2EA] sm:p-8 xl:p-10"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                    Active skill
                  </p>
                  <h3 className="mt-3 text-[clamp(2rem,4vw,4.4rem)] font-black uppercase leading-none tracking-tight">
                    {activeSkill.name}
                  </h3>
                </div>
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: activeSkill.accent,
                    background: `${activeSkill.accent}1F`,
                  }}
                >
                  <ActiveSkillIcon
                    className="h-7 w-7"
                    style={{ color: activeSkill.accent }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <p className="mt-6 text-[clamp(1rem,1.7vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/75">
                {activeSkill.description}
              </p>

              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                  Tools
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeSkill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-[#D7E2EA]/20 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                  Related projects
                </p>
                <div className="mt-3 grid gap-3">
                  {activeProjects.map((project) => (
                    <a
                      key={project.name}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-[22px] border border-[#D7E2EA]/15 bg-[#0C0C0C]/50 px-4 py-4 transition duration-200 hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/10"
                    >
                      <span>
                        <span className="block text-sm font-light uppercase tracking-widest text-[#D7E2EA]/45">
                          {project.category}
                        </span>
                        <span className="mt-1 block text-lg font-semibold leading-tight text-[#D7E2EA]">
                          {project.name}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-[#D7E2EA]/60 transition duration-200 group-hover:text-[#D7E2EA]"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  // Decorative floating icons instead of external images
  const decorIcons = [
    { icon: BrainCircuit, color: "#FF5D8F", pos: "absolute left-[1%] top-[4%] z-0" },
    { icon: Code2, color: "#7DD3FC", pos: "absolute bottom-[8%] left-[3%] z-0" },
    { icon: Sparkles, color: "#F8B84E", pos: "absolute right-[1%] top-[4%] z-0" },
    { icon: BarChart3, color: "#27C4A8", pos: "absolute bottom-[8%] right-[3%] z-0" },
  ];

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
    >
      {decorIcons.map(({ icon: Icon, color, pos }, i) => (
        <FadeIn
          key={i}
          delay={0.1 * (i + 1)}
          duration={0.9}
          x={i < 2 ? -80 : 80}
          y={0}
          className={`${pos} pointer-events-none`}
        >
          <div
            className="flex h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 items-center justify-center rounded-3xl border opacity-20"
            style={{ borderColor: color, background: `${color}08` }}
          >
            <Icon className="h-10 w-10 sm:h-14 sm:w-14 md:h-18 md:w-18" style={{ color }} />
          </div>
        </FadeIn>
      ))}

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            About me
          </h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14 md:mt-16">
          <AnimatedText text="I am a final-year B.Tech Information Technology student at VIT Mumbai with a 9.28 CGPA, building AI systems, full-stack products, and digital tools that solve real problems. My work spans computer vision, GenAI platforms, forensics software, and freelance client projects across healthcare, hospitality, and beyond." />
        </div>

        {/* Stats row */}
        <FadeIn delay={0.2} y={20} className="mt-14 sm:mt-18">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
            {[
              { value: "9.28", label: "CGPA" },
              { value: "8+", label: "Projects" },
              { value: "4+", label: "Clients" },
              { value: "2", label: "Internships" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-[20px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 px-6 py-5 text-center"
              >
                <p className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-none text-[#D7E2EA]">
                  {value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.25} y={20} className="mt-16 sm:mt-20 md:mt-24">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ContactButton />
            <ResourceLink href={profileLinks.resume} label="Resume" icon={FileText} />
            <ResourceLink href={profileLinks.email} label="Email" icon={Mail} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const characters = text.split("");

  return (
    <p
      ref={ref}
      aria-label={text}
      className="mx-auto max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
    >
      {characters.map((character, index) => (
        <AnimatedCharacter
          key={`${character}-${index}`}
          character={character}
          index={index}
          total={characters.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function AnimatedCharacter({
  character,
  index,
  total,
  progress,
}: {
  character: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const start = index / total;
  const end = Math.min(start + 0.12, 1);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const displayCharacter = character === " " ? "\u00A0" : character;

  return (
    <span className="relative inline-block" aria-hidden="true">
      <span className="opacity-0">{displayCharacter}</span>
      <motion.span
        className="absolute left-0 top-0"
        style={{ opacity: shouldReduceMotion ? 1 : opacity }}
      >
        {displayCharacter}
      </motion.span>
    </span>
  );
}

// ─── Services / What I Build ─────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section
      id="build"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          What I Build
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn
            key={service.number}
            as="article"
            delay={index * 0.1}
            className="flex gap-6 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-10 sm:py-10 md:gap-14 md:py-12"
          >
            <span className="min-w-[2.1ch] text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#0C0C0C]">
              {service.number}
            </span>
            <div className="flex flex-col justify-center gap-3 pt-2">
              <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">
                {service.name}
              </h3>
              <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Projects
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-7xl">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={featuredProjects.length}
          />
        ))}
      </div>

      <MoreProjects />
    </section>
  );
}

function MoreProjects() {
  return (
    <FadeIn className="mx-auto mt-12 max-w-7xl sm:mt-16 md:mt-24">
      <div className="flex flex-col gap-4 border-t border-[#D7E2EA]/20 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
            More projects
          </p>
          <h3 className="mt-3 text-[clamp(2rem,5vw,4.8rem)] font-black uppercase leading-none text-[#D7E2EA]">
            Supporting Work
          </h3>
        </div>
        <p className="max-w-xl text-sm font-light leading-relaxed text-[#D7E2EA]/65 sm:text-base">
          Additional projects and freelance deliveries that round out the
          full picture of my experience.
        </p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {moreProjects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[180px] flex-col justify-between rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-5 transition duration-200 hover:border-[#D7E2EA]/45 hover:bg-[#D7E2EA]/10"
          >
            <span>
              <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/45">
                {project.category}
              </span>
              <span className="mt-2 block text-xl font-semibold uppercase leading-tight text-[#D7E2EA]">
                {project.name}
              </span>
              <span className="mt-3 block text-sm font-light leading-relaxed text-[#D7E2EA]/65">
                {project.description}
              </span>
            </span>
            <span className="mt-5 flex flex-wrap items-center gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D7E2EA]/15 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-widest text-[#D7E2EA]/65"
                >
                  {tag}
                </span>
              ))}
              <ArrowUpRight
                className="ml-auto h-5 w-5 text-[#D7E2EA]/45 transition duration-200 group-hover:text-[#D7E2EA]"
                aria-hidden="true"
              />
            </span>
          </a>
        ))}
      </div>
    </FadeIn>
  );
}

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[number];
  index: number;
  totalCards: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="mb-6 md:mb-0 md:h-[85vh]">
      <motion.article
        className="project-sticky-card relative rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[44px] sm:p-6 md:sticky md:rounded-[60px] md:p-8"
        style={{
          top: `calc(var(--project-sticky-top) + ${index * 28}px)`,
          scale: shouldReduceMotion ? undefined : scale,
          zIndex: index + 1,
          transformOrigin: "top center",
        }}
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-end gap-4 sm:gap-8">
            <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">
              {project.number}
            </span>
            <div className="pb-2 sm:pb-4">
              <p className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/70 sm:text-sm">
                {project.category}
              </p>
              <h3 className="text-[clamp(1.4rem,4vw,4.2rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>
          <div className="pb-2 sm:pb-4">
            <LiveProjectButton href={project.link} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-[0.45fr_0.55fr]">
          <ProjectVisual project={project} />
          <div className="flex min-h-[320px] flex-col justify-between rounded-[32px] border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 p-6 text-[#D7E2EA] sm:rounded-[44px] sm:p-8 md:rounded-[60px]">
            <div>
              <p className="text-[clamp(1rem,1.6vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/80">
                {project.description}
              </p>
              <ul className="mt-6 grid gap-3 text-sm font-light leading-relaxed text-[#D7E2EA]/70 sm:text-base">
                {project.details.map((detail) => (
                  <li key={detail} className="border-t border-[#D7E2EA]/15 pt-3">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D7E2EA]/25 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────

function ExperienceSection() {
  const experiences = [
    {
      company: "VPNDS",
      role: "Python Development Intern",
      duration: "June 2025 – Dec 2025",
      location: "Remote",
      summary: "Digital Forensics Investigation Platform",
      accent: "#F8B84E",
      points: [
        "Built a digital forensics investigation Electron desktop app for police departments — Flask backend + JavaScript frontend.",
        "CDR, SDR & IPDR record analysis with advanced search/filtering for criminal investigations.",
        "IP geolocation, IMEI tracking, domain enumeration, email header analysis & cell tower mapping with live API integrations.",
        "Secure role-based authentication with encrypted user data storage.",
      ],
      tags: ["CDR Analysis", "IMEI Tracking", "IP Geolocation", "Flask", "Electron"],
    },
    {
      company: "MPOWER — Aditya Birla Education Trust",
      role: "Data Analytics & ML Intern",
      duration: "June 2025 – July 2025",
      location: "Prabhadevi, India",
      summary: "Customer Churn Prediction & Computer Vision Attendance",
      accent: "#27C4A8",
      points: [
        "Built an ML model to predict customer churn from real company data.",
        "Built a computer vision system to automate attendance counting.",
        "Created visual dashboards delivering insights on client trends and business performance.",
        "Applied technical skills to real-world business problems under senior mentorship.",
      ],
      tags: ["Churn Prediction", "Computer Vision", "Power BI", "ML Pipelines"],
    },
  ];

  return (
    <section
      id="experience"
      className="bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <h2 className="hero-heading mb-16 text-[clamp(3rem,12vw,150px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
            Experience
          </h2>
        </FadeIn>

        <div className="grid gap-6">
          {experiences.map((exp, index) => (
            <FadeIn key={exp.company} delay={index * 0.15}>
              <article
                className="rounded-[32px] border border-[#D7E2EA]/15 bg-[#111316] p-6 sm:p-8 md:p-10"
                style={{ boxShadow: `0 0 60px ${exp.accent}08` }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span
                      className="inline-block rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-widest"
                      style={{ background: `${exp.accent}22`, color: exp.accent }}
                    >
                      {exp.role}
                    </span>
                    <h3 className="mt-3 text-[clamp(1.4rem,3vw,2.5rem)] font-black uppercase leading-tight text-[#D7E2EA]">
                      {exp.company}
                    </h3>
                    <p className="mt-1 text-sm font-light text-[#D7E2EA]/50">
                      {exp.duration} · {exp.location}
                    </p>
                  </div>
                  <p
                    className="shrink-0 rounded-[16px] border px-4 py-2 text-xs font-medium uppercase tracking-wider"
                    style={{ borderColor: `${exp.accent}40`, color: exp.accent }}
                  >
                    {exp.summary}
                  </p>
                </div>

                <ul className="mt-6 grid gap-3">
                  {exp.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 border-t border-[#D7E2EA]/10 pt-3 text-sm font-light leading-relaxed text-[#D7E2EA]/70 sm:text-base"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: exp.accent }}
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#D7E2EA]/15 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-widest text-[#D7E2EA]/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Freelance Section ────────────────────────────────────────────────────────

function FreelanceSection() {
  const clients = [
    {
      client: "Healthberry Life Sciences",
      url: "https://healthberrylifesciences.com",
      category: "Web Development",
      accent: "#FF5D8F",
      desc: "Designed & developed a professional marketing website showcasing life sciences products with clean IA and modern UI.",
      tech: ["React", "JavaScript", "CSS"],
    },
    {
      client: "Bonito Valet",
      url: "https://bonitovaletapp.onrender.com",
      category: "Business Software",
      accent: "#7DD3FC",
      desc: "Built a full-stack valet operations app deployed on Render with CI/CD — handling live bookings and daily operations.",
      tech: ["Node.js", "React", "MongoDB"],
    },
    {
      client: "Grow More Parking",
      url: "https://growmoreparking.com",
      category: "Web Development",
      accent: "#27C4A8",
      desc: "Custom business website for a parking services brand, tailored to attract and inform customers with a clean UX.",
      tech: ["JavaScript", "HTML", "CSS"],
    },
    {
      client: "ANMI Convention",
      url: "https://anmi.in",
      category: "Event Website",
      accent: "#F8B84E",
      desc: "Convention website delivering event schedules, speaker info, and structured content for a national-level convention.",
      tech: ["JavaScript", "HTML", "CSS"],
    },
  ];

  return (
    <section
      id="freelance"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="mb-4 text-[clamp(3rem,12vw,150px)] font-black uppercase leading-none tracking-tight">
            Freelance
          </h2>
          <p className="mb-16 max-w-2xl text-[clamp(0.95rem,1.5vw,1.2rem)] font-light leading-relaxed opacity-60 sm:mb-20 md:mb-28">
            4+ clients served · Healthcare · Hospitality · Parking · Events
          </p>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2">
          {clients.map((c, index) => (
            <FadeIn key={c.client} delay={index * 0.1}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[220px] flex-col justify-between rounded-[28px] border border-[rgba(12,12,12,0.12)] bg-[rgba(12,12,12,0.03)] p-6 transition duration-200 hover:border-[rgba(12,12,12,0.3)] hover:bg-[rgba(12,12,12,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-widest text-white"
                      style={{ background: c.accent }}
                    >
                      {c.category}
                    </span>
                    <Globe className="h-4 w-4 opacity-30 transition group-hover:opacity-70" />
                  </div>
                  <h3 className="mt-4 text-[clamp(1.2rem,2.5vw,2rem)] font-black uppercase leading-tight">
                    {c.client}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed opacity-60">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[rgba(12,12,12,0.15)] px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-widest opacity-60"
                    >
                      {t}
                    </span>
                  ))}
                  <ArrowUpRight
                    className="ml-auto h-5 w-5 opacity-30 transition duration-200 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Footer ───────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-[#0C0C0C] px-5 py-24 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-32 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-40"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(59,130,246,0.3) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeIn y={40}>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/50">
            Let's Build Something Together
          </p>
          <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            Get In Touch
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={20} className="mt-10 sm:mt-14">
          <p className="mx-auto max-w-lg text-[clamp(1rem,2vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/70">
            Open to AI Engineering, ML, Full Stack, and freelance opportunities.
            Based in Mumbai — available for remote and on-site roles.
          </p>
        </FadeIn>

        <FadeIn delay={0.35} y={20} className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-14">
          <ContactButton />
          <ResourceLink href={profileLinks.whatsapp} label="WhatsApp" icon={MessageCircle} />
          <ResourceLink href={profileLinks.github} label="GitHub" icon={Github} />
          <ResourceLink href={profileLinks.linkedin} label="LinkedIn" icon={Linkedin} />
          <ResourceLink href={profileLinks.resume} label="Resume" icon={FileText} />
        </FadeIn>

        <FadeIn delay={0.5} y={10} className="mt-20 sm:mt-28 md:mt-36">
          <p className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/25">
            © 2025 Atharv Patil · patilav1610@gmail.com · +91-7722003772
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <main
      className="min-h-screen bg-[#0C0C0C] font-kanit text-[#D7E2EA]"
      style={{ overflowX: "clip" }}
    >
      <HeroSection />
      <SkillMapSection />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <ProjectsSection />
      <FreelanceSection />
      <ContactSection />
    </main>
  );
}
