
"use client";

import { motion, useScroll, useMotionValue, useVelocity, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";

// --- Data ---
const PROJECTS = [
  { 
    id: "marketly", title: "Marketly", role: "Full-Stack SaaS Platform", tags: "Laravel, React, TypeScript", status: "Launching Soon", 
    desc: "A multi-role marketplace with VIP tiers, RBAC, real-time updates via Reverb, crypto/regional wallet payments, HMAC-verified webhooks, and CI/CD.", 
    challenge: "Handling idempotent payment webhooks securely for crypto transactions without race conditions.",
    solution: "Implemented HMAC-SHA256/SHA512 verification and database transaction locking.",
    result: "Reduced payment reconciliation time by 80% and eliminated duplicate transaction errors.", link: "" 
  },
  { 
    id: "glowpop", title: "Glow Pop", role: "Luxury E-Commerce", tags: "React, Redux, Laravel", status: "Launching Soon", 
    desc: "A luxury beauty store with cart, wishlist, checkout, AR/EN RTL support, and a full admin dashboard.", 
    challenge: "Building a fully RTL-compatible luxury UI with complex global state (cart/wishlist) across 30+ pages.",
    solution: "Leveraged Redux Toolkit with localized slices and CSS logical properties for seamless RTL flips.",
    result: "Delivered a 100% Lighthouse accessibility score with zero layout shift on language toggle.", link: "" 
  },
  { 
    id: "codecraft", title: "Code Craft", role: "Agency CMS", tags: "Next.js, Prisma, Turso", status: "Live", 
    desc: "An agency website with a secure admin CMS, 12 data models, 56 API handlers, and email delivery via Resend.", 
    challenge: "Building a secure CMS from scratch that non-technical users could operate without breaking the schema.",
    solution: "Developed 56 API handlers with Zod validation and role-based middleware protection.",
    result: "Cut admin content update time by 40% while maintaining zero security breaches.", link: "https://codecraft.pxxlspace.cv" 
  },
  { 
    id: "drama", title: "drama.gov.sy", role: "Institutional CMS", tags: "Laravel, Blade, Tailwind", status: "Live", 
    desc: "An institutional CMS for a government website with a decoupled admin dashboard and RBAC.", 
    challenge: "Decoupling a public-facing government site from a highly restricted admin dashboard.",
    solution: "Built a separate Laravel Blade admin panel secured with Spatie RBAC.",
    result: "Empowered non-technical staff to manage 500+ weekly visitors without developer intervention.", link: "https://drama.gov.sy/" 
  }
];

const SKILLS = ["Laravel", "React", "Next.js", "TypeScript", "Docker", "Redux", "Sanctum", "Prisma", "MySQL", "CI/CD", "PHPUnit", "Tailwind"];

const PRACTICES = [
  { title: "Automated Testing", text: "PHPUnit & Vitest. 100% test coverage on core payment webhooks." },
  { title: "CI/CD Pipelines", text: "GitHub Actions for automated testing, linting, and zero-downtime deployments." },
  { title: "Secure Architecture", text: "HMAC signature verification, Sanctum API tokens, and strict RBAC." },
  { title: "Performance First", text: "Lighthouse 95+ scores, static exports, and image optimization." }
];

// --- Mobile Text Scramble ---
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  
  // Mobile Scroll Velocity Skewing
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewY = useSpring(useTransform(smoothVelocity, [-2000, 2000], [-4, 4]), { stiffness: 200, damping: 30 });

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-lux-bg selection:bg-lux-gold selection:text-black overflow-hidden">
      
      {/* 1. CINEMATIC CURTAIN REVEAL (Works on Mobile) */}
      <AnimatePresence>
        {!isRevealed && (
          <>
            <motion.div initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1.5 }} className="fixed top-0 left-0 w-full h-1/2 bg-black z-[100] border-b border-lux-gold/30" />
            <motion.div initial={{ y: 0 }} animate={{ y: "100%" }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1.5 }} className="fixed bottom-0 left-0 w-full h-1/2 bg-black z-[100] border-t border-lux-gold/30" />
          </>
        )}
      </AnimatePresence>

      {/* 2. SCROLL VELOCITY SKEWING (Works on Mobile) */}
      <motion.div style={{ skewY }} className="origin-center">
        
        {/* Mobile-Optimized Navbar */}
        <nav className="fixed top-0 w-full flex justify-between px-4 py-4 md:px-12 md:py-6 text-[10px] md:text-xs tracking-[0.2em] uppercase z-40 bg-lux-bg/80 backdrop-blur-md border-b border-lux-border/50">
          <a href="#" className="font-serif text-lg font-bold text-lux-gold tracking-normal">S.S.</a>
          <div className="flex gap-4 md:gap-8 items-center">
            <motion.a whileTap={{ scale: 0.9 }} href="#work" className="text-lux-text hover:text-lux-gold">Work</motion.a>
            <motion.a whileTap={{ scale: 0.9 }} href="#about" className="text-lux-text hover:text-lux-gold">About</motion.a>
            <motion.a whileTap={{ scale: 0.9 }} href="#contact" className="text-lux-text hover:text-lux-gold">Contact</motion.a>
          </div>
        </nav>

        {/* HERO (Mobile Friendly) */}
        <section className="relative z-10 min-h-[100dvh] flex flex-col justify-center max-w-7xl mx-auto px-4 pt-20">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-lux-gold text-[10px] tracking-[0.4em] uppercase mb-4 md:mb-8">
            Full-Stack Software Developer
          </motion.p>
          
          <h1 className="font-serif text-[clamp(50px,15vw,140px)] leading-[0.9] tracking-tight mb-6 md:mb-8">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }} className="block">Serene</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="block italic text-lux-gold-light">
              <ScrambleText text="Sheikhalard" />
            </motion.span>
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="flex flex-col gap-6">
            <p className="max-w-md text-lux-muted text-sm md:text-lg">
              I build luxury digital experiences with Laravel, React, and Next.js. Specializing in secure architecture, real-time systems, and end-to-end delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {/* Tap buttons with active state */}
              <motion.a whileTap={{ scale: 0.95 }} href="#contact" className="px-6 py-4 md:px-8 rounded-full font-semibold text-[10px] md:text-xs text-center tracking-widest uppercase border border-lux-gold text-lux-gold bg-lux-gold/10 active:bg-lux-gold active:text-black transition-all duration-300">
                Start a Project
              </motion.a>
              <motion.a whileTap={{ scale: 0.95 }} href="/serene-portfolio/Serene_Sheikhalard_Resume.pdf" download className="px-6 py-4 md:px-8 rounded-full font-semibold text-[10px] md:text-xs text-center tracking-widest uppercase border border-lux-border text-lux-text active:border-lux-gold active:text-lux-gold transition-all duration-300">
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* MARQUEE */}
        <div className="relative z-10 border-y border-lux-border py-4 md:py-8 overflow-hidden bg-black/50 backdrop-blur-sm">
          <div className="flex whitespace-nowrap animate-marquee text-xl md:text-3xl font-serif italic text-lux-muted">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-8 md:gap-12 items-center px-4 md:px-6">
                {SKILLS.map((skill, j) => (
                  <span key={j} className="flex items-center gap-8 md:gap-12">
                    {skill} <span className="text-lux-gold text-xs md:text-sm">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="relative z-10 max-w-5xl mx-auto px-4 py-24 md:py-48">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="md:w-1/3">
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-lux-gold mb-2 md:mb-4">The Philosophy</h2>
              <h3 className="font-serif text-3xl md:text-4xl">Ideas in.<br/>Products out.</h3>
            </div>
            <div className="md:w-2/3">
              <p className="text-xl md:text-4xl leading-relaxed font-light mb-6 md:mb-8">
                Full-stack developer delivering features end to end: React front ends, Laravel APIs, admin dashboards, and Docker deployment. Experienced in role-based access control, secure payment webhooks, and real-time updates.
              </p>
              <p className="text-lux-muted text-sm md:text-lg leading-relaxed">
                I thrive in asynchronous, remote-first environments. I default to written documentation, clear PR descriptions, and Loom walkthroughs rather than unnecessary meetings. I value clean, maintainable code that the next developer can easily understand.
              </p>
            </div>
          </div>
        </section>

        {/* 3. HORIZONTAL SWIPE PRACTICES (Mobile First) */}
        <section className="relative z-10 py-16 md:py-24 border-t border-lux-border">
          <div className="max-w-7xl mx-auto px-4 mb-8 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl">Engineering <span className="italic text-lux-gold">Practices</span></h2>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible md:px-6 md:max-w-7xl md:mx-auto">
            {PRACTICES.map((practice, i) => (
              <div 
                key={i} 
                className="snap-center shrink-0 w-[80vw] sm:w-[45vw] md:w-auto bg-lux-card border border-lux-border p-6 md:p-8 rounded-xl"
              >
                <h3 className="text-lux-gold text-[10px] md:text-sm tracking-widest uppercase mb-3 md:mb-4">{practice.title}</h3>
                <p className="text-lux-muted text-sm leading-relaxed">{practice.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. STICKY STACKING PROJECTS (Mobile Optimized) */}
        <section id="work" className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 border-t border-lux-border">
          <div className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
            <h2 className="font-serif text-4xl md:text-7xl">Selected <span className="italic text-lux-gold">Work</span></h2>
            <span className="text-[10px] md:text-xs tracking-widest uppercase text-lux-muted">({PROJECTS.length} Projects)</span>
          </div>

          <div className="relative flex flex-col items-center">
            {PROJECTS.map((project, i) => (
              <div 
                key={project.id} 
                className="sticky w-full max-w-5xl"
                style={{ 
                  top: `calc(12vh + ${i * 15}px)`, // Stacks nicely on mobile
                  marginBottom: '4vh' 
                }}
              >
                <motion.div
                  layoutId={`card-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  whileTap={{ scale: 0.98 }} // App-like tap feedback
                  className="group relative bg-lux-card border border-lux-border p-6 md:p-12 rounded-2xl cursor-pointer overflow-hidden flex flex-col justify-between min-h-[45vh] md:min-h-[400px] shadow-2xl"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6 md:mb-12">
                      <motion.span layoutId={`role-${project.id}`} className="text-[10px] md:text-xs tracking-widest uppercase text-lux-gold">{project.role}</motion.span>
                      <span className="text-[9px] md:text-[10px] tracking-widest uppercase border border-lux-border px-2 py-1 rounded-full text-lux-muted">{project.status}</span>
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
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative z-10 py-24 md:py-48 border-t border-lux-border text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-lux-gold mb-6 md:mb-8">Ready to start?</h2>
            <a href="mailto:serenesheikh23@gmail.com" className="inline-block font-serif text-[clamp(28px,8vw,80px)] leading-tight active:text-lux-gold transition-colors duration-500">
              Let's build <br/> something great.
            </a>
            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-6 text-[10px] md:text-sm tracking-widest uppercase text-lux-muted">
              <motion.a whileTap={{ scale: 0.9 }} href="mailto:serenesheikh23@gmail.com" className="flex items-center justify-center gap-2 hover:text-lux-gold transition-colors"><Mail className="w-4 h-4" /> Email</motion.a>
              <motion.a whileTap={{ scale: 0.9 }} href="https://www.linkedin.com/in/serene-sheikhalard" target="_blank" className="flex items-center justify-center gap-2 hover:text-lux-gold transition-colors">LinkedIn</motion.a>
              <motion.a whileTap={{ scale: 0.9 }} href="https://codecraft.pxxlspace.cv" target="_blank" className="flex items-center justify-center gap-2 hover:text-lux-gold transition-colors">CodeCraft</motion.a>
              <motion.a whileTap={{ scale: 0.9 }} href="/serene-portfolio/Serene_Sheikhalard_Resume.pdf" download className="flex items-center justify-center gap-2 hover:text-lux-gold transition-colors">Resume</motion.a>
            </div>
          </div>
        </section>

        <footer className="relative z-10 py-6 md:py-8 text-center border-t border-lux-border text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-lux-muted">
          © {new Date().getFullYear()} Serene Sheikhalard. All Rights Reserved.
        </footer>
      </motion.div>

      {/* EXPANDED MODAL (Mobile Optimized) */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 cursor-pointer" />
            <div className="fixed inset-0 flex items-end md:items-center justify-center z-50 pointer-events-none p-0 md:p-12">
              <motion.div layoutId={`card-${selectedProject.id}`} className="bg-lux-card border-t md:border border-lux-gold/30 w-full max-w-4xl h-[85vh] md:h-auto md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-2xl p-6 md:p-16 pointer-events-auto relative hide-scrollbar">
                
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-lux-bg border border-lux-border text-lux-muted active:text-lux-gold transition-colors z-50">
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                <motion.span layoutId={`role-${selectedProject.id}`} className="text-[10px] md:text-xs tracking-widest uppercase text-lux-gold block mb-2 md:mb-4">{selectedProject.role}</motion.span>
                <motion.h3 layoutId={`title-${selectedProject.id}`} className="font-serif text-3xl md:text-6xl mb-4 md:mb-6 text-lux-text">{selectedProject.title}</motion.h3>
                <motion.p layoutId={`desc-${selectedProject.id}`} className="text-lux-muted text-sm md:text-lg leading-relaxed mb-8 md:mb-12">{selectedProject.desc}</motion.p>
                
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h4 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-lux-gold mb-1 md:mb-2">The Challenge</h4>
                    <p className="text-lux-text text-sm md:text-lg leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-lux-gold mb-1 md:mb-2">The Solution</h4>
                    <p className="text-lux-text text-sm md:text-lg leading-relaxed">{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-lux-gold mb-1 md:mb-2">The Outcome</h4>
                    <div className="bg-lux-gold/10 border border-lux-gold/30 p-4 md:p-6 rounded-xl">
                      <p className="text-lux-gold-light text-sm md:text-lg leading-relaxed font-semibold">{selectedProject.result}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-lux-border flex flex-wrap gap-2 md:gap-3">
                  {selectedProject.tags.split(", ").map((tag: string, j: number) => (
                    <span key={j} className="bg-black/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-lux-border text-lux-muted text-[10px] md:text-sm">{tag}</span>
                  ))}
                </div>
                
                {selectedProject.link && (
                  <motion.a whileTap={{ scale: 0.95 }} href={selectedProject.link} target="_blank" className="inline-flex items-center gap-2 mt-8 px-6 py-3 md:px-8 md:py-4 bg-lux-gold text-black font-semibold text-[10px] md:text-xs tracking-widest uppercase rounded-full active:bg-lux-gold-light transition-colors">
                    Visit Live Site <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
