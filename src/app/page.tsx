"use client";

import { motion, useScroll, useVelocity, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, X, Download } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const PROJECTS = [
  {
    id: "marketly", title: "Marketly", role: "Full-Stack SaaS Platform", tags: "Laravel, React, TypeScript, Docker", status: "Live",
    desc: "A multi-role marketplace with VIP tiers, RBAC, real-time updates via Reverb, crypto and regional wallet payments, HMAC-verified webhooks, and CI/CD.",
    challenge: "Processing crypto payment webhooks securely, since providers can send the same event more than once.",
    solution: "Verified every webhook with HMAC-SHA256 (USDT) and HMAC-SHA512 (Binance Pay) and made processing idempotent, with PHPUnit tests covering it.",
    result: "A repeated webhook is processed once, so duplicate transactions can't be created, and automated tests protect that behavior.",
    link: "https://marketlly.store"
  },
  {
    id: "glowpop", title: "Glow Pop", role: "Luxury E-Commerce", tags: "React, Redux, Laravel, Sanctum", status: "Live",
    desc: "A luxury beauty store with cart, wishlist, checkout, Arabic and English support, and a full admin dashboard.",
    challenge: "A complete beauty store in Arabic and English, with a full back office.",
    solution: "React and Redux Toolkit front end with a Laravel API secured by Sanctum, Sham Cash payments, and an admin dashboard.",
    result: "Customers browse, search, save to a wishlist, and check out. Staff manage products, orders, inventory, and users in one place.",
    link: "https://github.com/serenesheikh23/glowpop"
  },
  {
    id: "codecraft", title: "Code Craft", role: "Agency CMS", tags: "Next.js, Prisma, Turso", status: "Live",
    desc: "An agency website with a secure admin CMS, 12 data models, 56 API handlers, and email delivery via Resend.",
    challenge: "Letting an agency update its own website without a developer.",
    solution: "An admin CMS with JWT role-based login (NextAuth.js), 12 data models, 56 API handlers, Resend email, and Vitest tests.",
    result: "Services, projects, testimonials, and legal pages are editable from a secured admin panel, and enquiries arrive by email.",
    link: "https://codeeecrafttt.vercel.app"
  },
  {
    id: "drama", title: "drama.gov.sy", role: "Institutional CMS", tags: "Laravel, Blade, Tailwind", status: "Live",
    desc: "An institutional CMS for a government website with a decoupled admin dashboard and role-based access control.",
    challenge: "Letting authorized staff of a government institution manage content safely.",
    solution: "A Laravel CMS with a decoupled admin dashboard and role-based access control, built at Mad Fox.",
    result: "A live institutional website where content is managed by role.",
    link: "https://drama.gov.sy/"
  },
  {
    id: "ronaris", title: "Ronaris Taxi", role: "Multilingual Site", tags: "HTML, CSS, JavaScript", status: "Live",
    desc: "A German, English, and Arabic taxi website for Bonn with a ride-request form and phone and WhatsApp contact options.",
    challenge: "Letting Bonn customers book quickly in German, English, or Arabic.",
    solution: "A JavaScript ride-request form with phone and WhatsApp contact options.",
    result: "A live site with three easy ways to book: form, call, or WhatsApp.",
    link: "https://www.ronaris-taxi.de/"
  },
  {
    id: "hpmt", title: "HPMT Distribution", role: "Corporate Site", tags: "HTML, CSS, JavaScript", status: "Live",
    desc: "An English and French HVAC distributor website with light and dark modes, product catalog, and testimonials.",
    challenge: "Presenting an HVAC catalog clearly to English and French customers.",
    solution: "A bilingual site with light and dark modes, a product catalog, and testimonials.",
    result: "A live site where customers browse in their language and contact the team.",
    link: "https://hpmtdistribution.com/"
  },
  {
    id: "light", title: "Light Promo", role: "Freelance Build", tags: "Laravel, Bootstrap", status: "Live",
    desc: "A promotional website designed, built, and launched independently for a client.",
    challenge: "Getting a client's promotional website designed and online.",
    solution: "Designed, built, and launched independently with Laravel and Bootstrap.",
    result: "A live site, delivered from concept to launch.",
    link: "https://light-promo.com/"
  }
];

const SKILLS = ["Laravel", "React", "Next.js", "TypeScript", "Docker", "Redux", "Sanctum", "Prisma", "MySQL", "CI/CD", "PHPUnit", "Tailwind", "Claude / AI-Assisted Dev", "Notion"];

const PRACTICES = [
  { title: "Frontend Architecture", text: "React 19, Next.js App Router, and Redux Toolkit for scalable, type-safe global state management." },
  { title: "Backend & APIs", text: "Laravel REST APIs secured with Sanctum, Spatie RBAC, and HMAC-verified webhooks for payments." },
  { title: "Testing & CI/CD", text: "Vitest (Frontend) and PHPUnit (Backend) automated via GitHub Actions pipelines." },
  { title: "Performance First", text: "Lighthouse 95+ scores through static exports, image optimization, and lazy loading." }
];

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((letter, index) => {
          if (letter === " ") return " ";
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span aria-label={text}>{displayText}</span>;
};

// --- DRAGGABLE SKILLS MARQUEE ---
const SkillsMarquee = ({ activeSkill, setActiveSkill }: { activeSkill: string | null, setActiveSkill: (s: string | null) => void }) => {
  return (
    <div className="relative z-10 border-y border-lux-border bg-black/50 backdrop-blur-sm overflow-hidden">
      <div className="text-center pt-6 pb-2">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-lux-muted">
          Drag to explore or click any skill to filter
        </p>
      </div>
      <div className="py-4 md:py-6 overflow-hidden cursor-grab active:cursor-grabbing" aria-label="Filter projects by skill">
        <motion.div 
          drag="x" 
          dragConstraints={{ left: -2000, right: 2000 }} 
          dragElastic={0.1}
          dragTransition={{ power: 0, timeConstant: 200 }}
          className="flex whitespace-nowrap text-xl md:text-3xl font-serif italic text-lux-muted"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-8 md:gap-12 items-center px-4 md:px-6">
              {SKILLS.map((skill, j) => (
                <button 
                  key={j} 
                  onClick={() => setActiveSkill(activeSkill === skill ? null : skill)}
                  className={`flex items-center gap-8 md:gap-12 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeSkill === skill 
                      ? "text-lux-gold font-bold bg-lux-gold/10" 
                      : "hover:text-lux-gold hover:bg-white/5"
                  }`}
                >
                  {skill} <span className="text-lux-gold text-xs md:text-sm">✦</span>
                </button>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: modalRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 cursor-pointer" />
      <div className="fixed inset-0 flex items-end md:items-center justify-center z-50 pointer-events-none p-0 md:p-12">
        <motion.div 
          layoutId={`card-${project.id}`} 
          className="bg-lux-card border-t md:border border-lux-gold/30 w-full max-w-4xl h-[85vh] md:h-auto md:max-h-[90vh] rounded-t-3xl md:rounded-2xl pointer-events-auto relative overflow-hidden flex flex-col"
        >
          <motion.div className="absolute top-0 left-0 right-0 h-1 bg-lux-gold z-50 origin-left" style={{ scaleX }} />

          <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-lux-bg border border-lux-border text-lux-muted active:text-lux-gold transition-colors z-50">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div ref={modalRef} className="overflow-y-auto p-6 md:p-16 hide-scrollbar h-full">
            <motion.span layoutId={`role-${project.id}`} className="text-[10px] md:text-xs tracking-widest uppercase text-lux-gold block mb-2 md:mb-4">{project.role}</motion.span>
            <motion.h3 layoutId={`title-${project.id}`} className="font-serif text-3xl md:text-6xl mb-4 md:mb-6 text-lux-text">{project.title}</motion.h3>
            <motion.p layoutId={`desc-${project.id}`} className="text-lux-muted text-sm md:text-lg leading-relaxed mb-8 md:mb-12">{project.desc}</motion.p>

            <div className="space-y-6 md:space-y-8">
              <div>
                <h4 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-lux-gold mb-1 md:mb-2">The Challenge</h4>
                <p className="text-lux-text text-sm md:text-lg leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h4 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-lux-gold mb-1 md:mb-2">The Solution</h4>
                <p className="text-lux-text text-sm md:text-lg leading-relaxed">{project.solution}</p>
              </div>
              <div>
                <h4 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-lux-gold mb-1 md:mb-2">The Outcome</h4>
                <div className="bg-lux-gold/10 border border-lux-gold/30 p-4 md:p-6 rounded-xl">
                  <p className="text-lux-gold-light text-sm md:text-lg leading-relaxed font-semibold">{project.result}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-lux-border flex flex-wrap gap-2 md:gap-3">
              {project.tags.split(", ").map((tag: string, j: number) => (
                <span key={j} className="bg-black/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-lux-border text-lux-muted text-[10px] md:text-sm">{tag}</span>
              ))}
            </div>

            {project.link && (
              <motion.a whileTap={{ scale: 0.95 }} href={project.link} target="_blank" className="inline-flex items-center gap-2 mt-8 px-6 py-3 md:px-8 md:py-4 bg-lux-gold text-black font-semibold text-[10px] md:text-xs tracking-widest uppercase rounded-full active:bg-lux-gold-light transition-colors">
                Visit Live Site <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewY = useTransform(smoothVelocity, [-2000, 2000], [-4, 4]);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);

  const filteredProjects = activeSkill
    ? PROJECTS.filter((p) => p.tags.toLowerCase().includes(activeSkill.toLowerCase()))
    : PROJECTS;

  return (
    <main className="relative min-h-screen bg-lux-bg selection:bg-lux-gold selection:text-black font-sans">

      <AnimatePresence>
        {!isRevealed && (
          <>
            <motion.div initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.8 }} className="fixed top-0 left-0 w-full h-1/2 bg-black z-[100] border-b border-lux-gold/30" />
            <motion.div initial={{ y: 0 }} animate={{ y: "100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.8 }} className="fixed bottom-0 left-0 w-full h-1/2 bg-black z-[100] border-t border-lux-gold/30" />
          </>
        )}
      </AnimatePresence>

      {/* NAVBAR MOVED OUTSIDE THE SKEW WRAPPER TO STAY FIXED */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-4 py-4 md:px-12 md:py-6 text-[10px] md:text-xs tracking-[0.2em] uppercase z-40 bg-lux-bg/80 backdrop-blur-md border-b border-lux-border/50">
        <a href="#" className="font-serif text-lg font-bold text-lux-gold tracking-normal">S.S.</a>
        <div className="flex gap-4 md:gap-8 items-center">
          <motion.a whileTap={{ scale: 0.9 }} href="#work" className="text-lux-text hover:text-lux-gold">Work</motion.a>
          <motion.a whileTap={{ scale: 0.9 }} href="#about" className="text-lux-text hover:text-lux-gold">About</motion.a>
          <motion.a whileTap={{ scale: 0.9 }} href="#contact" className="text-lux-text hover:text-lux-gold">Contact</motion.a>
          <motion.a whileTap={{ scale: 0.9 }} href="/Serene_Sheikhalard_Resume.pdf" download="Serene_Sheikhalard_Resume.pdf" className="hidden md:flex items-center gap-1 text-lux-gold hover:text-lux-gold-light">
            <Download className="w-3 h-3" /> Resume
          </motion.a>
        </div>
      </nav>

      {/* SKEW WRAPPER FOR MAIN CONTENT */}
      <motion.div style={{ skewY }} className="origin-center overflow-hidden pt-20">

        <section className="relative z-10 min-h-[100dvh] flex flex-col justify-center max-w-7xl mx-auto px-4 pt-20">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-lux-gold text-[10px] tracking-[0.4em] uppercase mb-4 md:mb-8">
            Full-Stack Software Developer
          </motion.p>

          <h1 className="font-serif text-[clamp(50px,15vw,140px)] leading-[0.9] tracking-tight mb-6 md:mb-8">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="block">Serene</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="block italic text-lux-gold-light">
              <ScrambleText text="Sheikhalard" />
            </motion.span>
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="flex flex-col gap-6">
            <p className="max-w-md text-lux-muted text-sm md:text-lg">
              I build secure, full-stack web applications with Laravel, React, and Next.js. Payments, real-time features, and admin dashboards, delivered end to end.
            </p>
            <p className="text-lux-gold text-xs font-semibold tracking-wider uppercase">
              Open to full-time and remote roles. Arabic and English.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <motion.a whileTap={{ scale: 0.95 }} href="/Serene_Sheikhalard_Resume.pdf" download="Serene_Sheikhalard_Resume.pdf" className="px-6 py-4 md:px-8 rounded-full font-semibold text-[10px] md:text-xs text-center tracking-widest uppercase border border-lux-gold text-lux-gold bg-lux-gold/10 active:bg-lux-gold active:text-black transition-all duration-300">
                Download Resume
              </motion.a>
              <motion.a whileTap={{ scale: 0.95 }} href="#contact" className="px-6 py-4 md:px-8 rounded-full font-semibold text-[10px] md:text-xs text-center tracking-widest uppercase border border-lux-border text-lux-text active:border-lux-gold active:text-lux-gold transition-all duration-300">
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </section>

        <section id="about" className="relative z-10 max-w-5xl mx-auto px-4 py-24 md:py-48">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="md:w-1/3">
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-lux-gold mb-2 md:mb-4">About</h2>
              <h3 className="font-serif text-3xl md:text-4xl">Ideas in.<br/>Products out.</h3>
            </div>
            <div className="md:w-2/3">
              <p className="text-xl md:text-4xl leading-relaxed font-light mb-6 md:mb-8 text-lux-text">
                I deliver features end to end: React front ends, Laravel APIs, admin dashboards, and Docker deployment. I focus on role-based access control, secure payment webhooks, and real-time updates, and I use AI-assisted tools while owning the architecture and quality of every project.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-16 md:py-24 border-t border-lux-border">
          <div className="max-w-7xl mx-auto px-4 mb-8 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-lux-text">Engineering <span className="italic text-lux-gold">Practices</span></h2>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible md:px-6 md:max-w-7xl md:mx-auto">
            {PRACTICES.map((practice, i) => (
              <div key={i} className="snap-center shrink-0 w-[80vw] sm:w-[45vw] md:w-auto bg-lux-card border border-lux-border p-6 md:p-8 rounded-xl">
                <h3 className="text-lux-gold text-[10px] md:text-sm tracking-widest uppercase mb-3 md:mb-4">{practice.title}</h3>
                <p className="text-lux-muted text-sm leading-relaxed">{practice.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DRAGGABLE MARQUEE */}
        <SkillsMarquee activeSkill={activeSkill} setActiveSkill={setActiveSkill} />

        <section id="work" className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 border-t border-lux-border">
          <div className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
            <h2 className="font-serif text-4xl md:text-7xl text-lux-text">
              {activeSkill ? (
                <>Filtered <span className="italic text-lux-gold">Work</span></>
              ) : (
                <>Selected <span className="italic text-lux-gold">Work</span></>
              )}
            </h2>
            <div className="flex items-center gap-4">
              {activeSkill && (
                <button onClick={() => setActiveSkill(null)} className="text-[10px] uppercase tracking-widest text-lux-gold border border-lux-gold px-3 py-1 rounded-full hover:bg-lux-gold hover:text-black transition-colors">
                  Clear Filter
                </button>
              )}
              <span className="text-[10px] md:text-xs tracking-widest uppercase text-lux-muted">({filteredProjects.length} Projects)</span>
            </div>
          </div>

          <div className="relative flex flex-col items-center">
            <AnimatePresence>
              {filteredProjects.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lux-muted text-sm py-12">
                  No projects match this filter.
                </motion.div>
              )}
            </AnimatePresence>

            {filteredProjects.map((project, i) => (
              <motion.div 
                layout
                key={project.id} 
                className={`w-full max-w-5xl ${filteredProjects.length > 1 ? "sticky" : "relative"}`} 
                style={filteredProjects.length > 1 ? { top: `calc(12vh + ${i * 15}px)`, marginBottom: '4vh' } : { marginBottom: '4vh' }}
              >
                <motion.div
                  layoutId={`card-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-lux-card border border-lux-border p-6 md:p-12 rounded-2xl cursor-pointer overflow-hidden flex flex-col justify-between min-h-[45vh] md:min-h-[400px] shadow-2xl"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6 md:mb-12">
                      <motion.span layoutId={`role-${project.id}`} className="text-[10px] md:text-xs tracking-widest uppercase text-lux-gold">{project.role}</motion.span>
                      <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] tracking-widest uppercase border border-lux-border px-2.5 py-1 rounded-full text-lux-muted">
                        <span className={`w-1.5 h-1.5 rounded-full ${project.status === "Live" ? "bg-green-500 animate-pulse" : "bg-lux-gold animate-pulse"}`} />
                        {project.status}
                      </span>
                    </div>
                    <motion.h3 layoutId={`title-${project.id}`} className="font-serif text-3xl md:text-5xl mb-3 md:mb-4 text-lux-text">{project.title}</motion.h3>
                    <motion.p layoutId={`desc-${project.id}`} className="text-lux-muted text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-2xl">{project.desc}</motion.p>
                  </div>
                  <div className="relative z-10 flex items-end justify-between mt-auto">
                    <div className="text-[10px] md:text-xs text-lux-muted flex flex-wrap gap-2">
                      {project.tags.split(", ").map((tag, j) => (
                        <span key={j} className="bg-black/30 px-2 py-1 md:px-3 rounded-full border border-lux-border/50">{tag}</span>
                      ))}
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-lux-border flex items-center justify-center bg-black/50">
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-lux-gold" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="relative z-10 py-24 md:py-48 border-t border-lux-border text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-lux-gold mb-6 md:mb-8">Ready to start?</h2>
            <a href="mailto:serenesheikh23@gmail.com" className="inline-block font-serif text-[clamp(28px,8vw,80px)] leading-tight active:text-lux-gold transition-colors duration-500 text-lux-text mb-6">
              Let's build something great.
            </a>
            <p className="text-lux-muted text-sm md:text-base max-w-lg mx-auto mb-12">
              Open to full-time and remote roles. Email me or connect on LinkedIn.
            </p>
            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-6 text-[10px] md:text-sm tracking-widest uppercase text-lux-muted">
              <motion.a whileTap={{ scale: 0.9 }} href="mailto:serenesheikh23@gmail.com" className="flex items-center justify-center gap-2 hover:text-lux-gold transition-colors"><Mail className="w-4 h-4" /> Email</motion.a>
              <motion.a whileTap={{ scale: 0.9 }} href="https://www.linkedin.com/in/serene-sheikhalard" target="_blank" className="flex items-center justify-center gap-2 hover:text-lux-gold transition-colors">LinkedIn</motion.a>
              <motion.a whileTap={{ scale: 0.9 }} href="https://github.com/serenesheikh23" target="_blank" className="flex items-center justify-center gap-2 hover:text-lux-gold transition-colors">GitHub</motion.a>
              <motion.a whileTap={{ scale: 0.9 }} href="/Serene_Sheikhalard_Resume.pdf" download="Serene_Sheikhalard_Resume.pdf" className="flex items-center justify-center gap-2 hover:text-lux-gold transition-colors">Resume</motion.a>
            </div>
          </div>
        </section>

        <footer className="relative z-10 py-6 md:py-8 text-center border-t border-lux-border text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-lux-muted">
          © {new Date().getFullYear()} Serene Sheikhalard. All Rights Reserved.
        </footer>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}