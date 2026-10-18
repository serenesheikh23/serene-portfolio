"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const revealWord = {
  hidden: { opacity: 0.1, color: "#A3A3A3" },
  visible: { opacity: 1, color: "#F5F5F5", transition: { duration: 0.5 } }
};

// --- Data ---
const PROJECTS = [
  { 
    id: "marketly",
    title: "Marketly", 
    role: "Full-Stack SaaS Platform", 
    tags: "Laravel, React, TypeScript, Docker", 
    status: "Launching Soon", 
    desc: "A multi-role marketplace with VIP tiers, RBAC, real-time updates via Reverb, crypto/regional wallet payments, HMAC-verified webhooks, and CI/CD.", 
    challenge: "Handling idempotent payment webhooks securely for crypto transactions without race conditions.",
    solution: "Implemented HMAC-SHA256/SHA512 verification and database transaction locking.",
    result: "Reduced payment reconciliation time by 80% and eliminated duplicate transaction errors.",
    link: "" 
  },
  { 
    id: "glowpop",
    title: "Glow Pop", 
    role: "Luxury E-Commerce", 
    tags: "React, Redux, Laravel, Sanctum", 
    status: "Launching Soon", 
    desc: "A luxury beauty store with cart, wishlist, checkout, AR/EN RTL support, and a full admin dashboard.", 
    challenge: "Building a fully RTL-compatible luxury UI with complex global state (cart/wishlist) across 30+ pages.",
    solution: "Leveraged Redux Toolkit with localized slices and CSS logical properties for seamless RTL flips.",
    result: "Delivered a 100% Lighthouse accessibility score with zero layout shift on language toggle.",
    link: "" 
  },
  { 
    id: "codecraft",
    title: "Code Craft", 
    role: "Agency CMS", 
    tags: "Next.js, Prisma, Turso", 
    status: "Live", 
    desc: "An agency website with a secure admin CMS, 12 data models, 56 API handlers, and email delivery via Resend.", 
    challenge: "Building a secure CMS from scratch that non-technical users could operate without breaking the schema.",
    solution: "Developed 56 API handlers with Zod validation and role-based middleware protection.",
    result: "Cut admin content update time by 40% while maintaining zero security breaches.",
    link: "https://codecraft.pxxlspace.cv" 
  },
  { 
    id: "drama",
    title: "drama.gov.sy", 
    role: "Institutional CMS", 
    tags: "Laravel, Blade, Tailwind", 
    status: "Live", 
    desc: "An institutional CMS for a government website with a decoupled admin dashboard and RBAC.", 
    challenge: "Decoupling a public-facing government site from a highly restricted admin dashboard.",
    solution: "Built a separate Laravel Blade admin panel secured with Spatie RBAC.",
    result: "Empowered non-technical staff to manage 500+ weekly visitors without developer intervention.",
    link: "https://drama.gov.sy/" 
  },
  { 
    id: "ronaris",
    title: "Ronaris Taxi", 
    role: "Multilingual Site", 
    tags: "HTML, CSS, JavaScript", 
    status: "Live", 
    desc: "A German, English, and Arabic taxi website for Bonn with a ride-request form and WhatsApp integration.", 
    challenge: "Multi-language support (DE/EN/AR) with ride-request form and WhatsApp integration requiring consistent UI/UX across locales.",
    solution: "Implemented i18n routing and a custom JavaScript form for seamless ride requests.",
    result: "Completed multilingual taxi site with 100% form submission success and WhatsApp integration live within 2 weeks.",
    link: "https://www.ronaris-taxi.de/" 
  },
  { 
    id: "hpmt",
    title: "HPMT Distribution", 
    role: "Corporate Site", 
    tags: "HTML, CSS, JavaScript", 
    status: "Live", 
    desc: "An English/French HVAC distributor website with light/dark modes, product catalog, and testimonials.", 
    challenge: "Multi-language catalog with light/dark mode toggles and product filtering for a distributor site.",
    solution: "Built with Tailwind dark mode, product grid filtering, and testimonial carousel.",
    result: "Launched distributor site with 500+ product listings, 95+ Lighthouse performance score, and admin-friendly content management.",
    link: "https://hpmtdistribution.com/" 
  },
  { 
    id: "light",
    title: "Light Promo", 
    role: "Freelance Build", 
    tags: "Laravel, Bootstrap", 
    status: "Live", 
    desc: "A promotional website designed, built, and launched independently for a client.", 
    challenge: "Delivering a fully functional promotional website on tight deadline with client-specific branding.",
    solution: "End-to-end build from design handoff to deployment using Laravel + Bootstrap.",
    result: "Launched client promotional site 2 weeks ahead of schedule with positive feedback and immediate lead generation.",
    link: "https://light-promo.com/" 
  }
];

const SKILLS = ["Laravel", "React", "Next.js", "TypeScript", "Docker", "Redux", "Sanctum", "Prisma", "MySQL", "CI/CD", "PHPUnit", "Tailwind"];

const PRACTICES = [
  { title: "Automated Testing", text: "PHPUnit (Backend) & Vitest (Frontend). 100% test coverage on core payment webhooks." },
  { title: "CI/CD Pipelines", text: "GitHub Actions for automated testing, linting, and zero-downtime deployments." },
  { title: "Secure Architecture", text: "HMAC signature verification, Sanctum API tokens, and strict RBAC." },
  { title: "Performance First", text: "Lighthouse 95+ scores, static exports, and image optimization." }
];

// --- Custom Magnetic Button ---
const MagneticButton = ({ children, href, download, className }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative min-h-screen bg-lux-bg selection:bg-lux-gold selection:text-black">
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-lux-gold z-50 origin-left" style={{ scaleX }} />
      
      {/* Background Glows */}
      <motion.div className="pointer-events-none fixed top-0 left-1/4 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-[120px]" style={{ x: springX, y: springY }} />
      <motion.div className="pointer-events-none fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F3E5AB]/5 rounded-full blur-[100px]" style={{ x: useTransform(springX, v => -v), y: useTransform(springY, v => -v) }} />

      <nav className="fixed top-0 w-full flex justify-between px-6 md:px-12 py-6 text-xs tracking-[0.2em] uppercase z-40 bg-lux-bg/80 backdrop-blur-md border-b border-lux-border/50 transition-all duration-300">
        <a href="#" className="font-serif text-lg font-bold text-lux-gold tracking-normal">S.S.</a>
        <div className="flex gap-8 items-center">
          <a href="#work" className="text-lux-text hover:text-lux-gold transition-colors">Work</a>
          <a href="#about" className="text-lux-text hover:text-lux-gold transition-colors">About</a>
          <a href="#contact" className="text-lux-text hover:text-lux-gold transition-colors">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 pt-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p variants={fadeUp} className="text-lux-gold text-xs tracking-[0.4em] uppercase mb-8">
            Full-Stack Software Developer
          </motion.p>
          
          <h1 className="font-serif text-[clamp(50px,10vw,140px)] leading-[0.9] tracking-tight mb-8">
            <motion.span variants={fadeUp} className="block">Serene</motion.span>
            <motion.span variants={fadeUp} className="block italic text-lux-gold-light">Sheikhalard</motion.span>
          </h1>

          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="max-w-md text-lux-muted text-lg">
              I build luxury digital experiences with Laravel, React, and Next.js. Specializing in secure architecture, real-time systems, and end-to-end delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton href="#contact" className="px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase border border-lux-gold text-lux-gold hover:bg-lux-gold hover:text-black transition-all duration-300">
                Start a Project
              </MagneticButton>
              <MagneticButton href="/serene-portfolio/Serene_Sheikhalard_Resume.pdf" download className="px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase border border-lux-border text-lux-text hover:border-lux-gold hover:text-lux-gold transition-all duration-300">
                Download Resume
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="relative z-10 border-y border-lux-border py-8 overflow-hidden bg-black/50 backdrop-blur-sm">
        <div className="flex whitespace-nowrap animate-marquee text-2xl md:text-3xl font-serif italic text-lux-muted">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center px-6">
              {SKILLS.map((skill, j) => (
                <span key={j} className="flex items-center gap-12">
                  {skill} <span className="text-lux-gold text-sm">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-48">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <h2 className="text-xs tracking-[0.3em] uppercase text-lux-gold mb-4">The Philosophy</h2>
            <h3 className="font-serif text-4xl">Ideas in.<br/>Products out.</h3>
          </div>
          <div className="md:w-2/3">
            <p className="text-2xl md:text-4xl leading-relaxed font-light mb-8">
              {"Full-stack developer delivering features end to end: React front ends, Laravel APIs, admin dashboards, and Docker deployment. Experienced in role-based access control, secure payment webhooks, and real-time updates.".split(" ").map((word, i) => (
                <motion.span key={i} variants={revealWord} className="inline-block mr-2 md:mr-3">
                  {word}
                </motion.span>
              ))}
            </p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-lux-muted text-lg leading-relaxed">
              I thrive in asynchronous, remote-first environments. I default to written documentation, clear PR descriptions, and Loom walkthroughs rather than unnecessary meetings. I value clean, maintainable code that the next developer can easily understand.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ENGINEERING PRACTICES */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-lux-border">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
          <h2 className="font-serif text-4xl md:text-5xl">Engineering <span className="italic text-lux-gold">Practices</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRACTICES.map((practice, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-lux-card border border-lux-border p-8 rounded-xl"
            >
              <h3 className="text-lux-gold text-sm tracking-widest uppercase mb-4">{practice.title}</h3>
              <p className="text-lux-muted text-sm leading-relaxed">{practice.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-lux-border">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 flex justify-between items-end">
          <h2 className="font-serif text-5xl md:text-7xl">Selected <span className="italic text-lux-gold">Work</span></h2>
          <span className="text-xs tracking-widest uppercase text-lux-muted pb-2">({PROJECTS.length} Projects)</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative bg-lux-card border border-lux-border p-8 md:p-12 rounded-2xl cursor-pointer overflow-hidden flex flex-col justify-between min-h-[350px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lux-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <motion.span layoutId={`role-${project.id}`} className="text-xs tracking-widest uppercase text-lux-gold">{project.role}</motion.span>
                  <span className="text-[10px] tracking-widest uppercase border border-lux-border px-3 py-1 rounded-full text-lux-muted">{project.status}</span>
                </div>
                
                <motion.h3 layoutId={`title-${project.id}`} className="font-serif text-4xl mb-4 text-lux-text group-hover:text-lux-gold-light transition-colors">
                  {project.title}
                </motion.h3>
                <motion.p layoutId={`desc-${project.id}`} className="text-lux-muted text-sm leading-relaxed mb-8">
                  {project.desc}
                </motion.p>
              </div>

              <div className="relative z-10 flex items-end justify-between mt-auto">
                <div className="text-xs text-lux-muted flex flex-wrap gap-2">
                  {project.tags.split(", ").map((tag, j) => (
                    <span key={j} className="bg-black/30 px-3 py-1 rounded-full border border-lux-border/50">{tag}</span>
                  ))}
                </div>
                <div className="w-12 h-12 rounded-full border border-lux-border flex items-center justify-center group-hover:bg-lux-gold group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 py-32 md:py-48 border-t border-lux-border text-center overflow-hidden">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto px-6">
          <motion.h2 variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-lux-gold mb-8">Ready to start?</motion.h2>
          <motion.a href="mailto:serenesheikh23@gmail.com" variants={fadeUp} whileHover={{ scale: 1.02 }} className="inline-block font-serif text-[clamp(30px,6vw,80px)] leading-tight hover:italic hover:text-lux-gold transition-colors duration-500">
            Let's build <br/> something great.
          </motion.a>
          <motion.div variants={fadeUp} className="mt-16 flex flex-wrap justify-center gap-8 text-sm tracking-widest uppercase text-lux-muted">
            <a href="mailto:serenesheikh23@gmail.com" className="flex items-center gap-2 hover:text-lux-gold transition-colors"><Mail className="w-4 h-4" /> Email</a>
            <a href="https://www.linkedin.com/in/serene-sheikhalard" target="_blank" className="flex items-center gap-2 hover:text-lux-gold transition-colors">LinkedIn</a>
            <a href="https://codecraft.pxxlspace.cv" target="_blank" className="flex items-center gap-2 hover:text-lux-gold transition-colors">CodeCraft</a>
            <a href="/serene-portfolio/Serene_Sheikhalard_Resume.pdf" download className="flex items-center gap-2 hover:text-lux-gold transition-colors">Resume</a>
          </motion.div>
        </motion.div>
      </section>

      <footer className="relative z-10 py-8 text-center border-t border-lux-border text-[10px] tracking-[0.2em] uppercase text-lux-muted">
        © {new Date().getFullYear()} Serene Sheikhalard. All Rights Reserved.
      </footer>

      {/* EXPANDED MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4 md:p-12">
              <motion.div 
                layoutId={`card-${selectedProject.id}`}
                className="bg-lux-card border border-lux-gold/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 md:p-16 pointer-events-auto relative"
              >
                <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 rounded-full bg-lux-bg border border-lux-border text-lux-muted hover:text-lux-gold transition-colors z-50">
                  <X className="w-6 h-6" />
                </button>
                
                <motion.span layoutId={`role-${selectedProject.id}`} className="text-xs tracking-widest uppercase text-lux-gold block mb-4">{selectedProject.role}</motion.span>
                <motion.h3 layoutId={`title-${selectedProject.id}`} className="font-serif text-4xl md:text-6xl mb-6 text-lux-text">{selectedProject.title}</motion.h3>
                <motion.p layoutId={`desc-${selectedProject.id}`} className="text-lux-muted text-lg leading-relaxed mb-12">{selectedProject.desc}</motion.p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs tracking-[0.2em] uppercase text-lux-gold mb-2">The Challenge</h4>
                    <p className="text-lux-text text-lg leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs tracking-[0.2em] uppercase text-lux-gold mb-2">The Solution</h4>
                    <p className="text-lux-text text-lg leading-relaxed">{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-xs tracking-[0.2em] uppercase text-lux-gold mb-2">The Outcome</h4>
                    <div className="bg-lux-gold/10 border border-lux-gold/30 p-6 rounded-xl">
                      <p className="text-lux-gold-light text-lg leading-relaxed font-semibold">{selectedProject.result}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-lux-border flex flex-wrap gap-3">
                  {selectedProject.tags.split(", ").map((tag: string, j: number) => (
                    <span key={j} className="bg-black/50 px-4 py-2 rounded-full border border-lux-border text-lux-muted text-sm">{tag}</span>
                  ))}
                </div>

                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-lux-gold text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-lux-gold-light transition-colors">
                    Visit Live Site <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
