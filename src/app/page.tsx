cat > src/app/page.tsx << 'EOF'
"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useVelocity } from "framer-motion";
import { ArrowUpRight, Mail, X, ArrowLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// --- CINEMATIC PRELOADER ---
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A]"
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="text-[#D4AF37] text-6xl font-serif italic mb-4">{count}%</div>
      <div className="text-[#A3A3A3] text-xs tracking-[0.3em] uppercase">Loading Experience</div>
    </motion.div>
  );
};

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className: string, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
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

// --- CURSOR REACTIVE TEXT ---
const CursorReactiveText = ({ text }: { text: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <h1 className="font-serif text-[clamp(50px,10vw,140px)] leading-[0.9] tracking-tight mb-8">
      {text.split("").map((char, i) => {
        const x = useTransform(mouseX, (val) => {
          if (typeof window === "undefined") return 0;
          // Approximate distance for effect
          return Math.max(0, 1 - Math.abs(val - (window.innerWidth / 2)) / 500) * 20;
        });
        return (
          <motion.span key={i} style={{ y: x }} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </h1>
  );
};

// --- VELOCITY MARQUEE ---
const VelocityMarquee = ({ items }: { items: string[] }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${v}%`);

  const directionFactor = useRef<number>(1);
  useEffect(() => {
    let animationFrameId: number;
    let currentBaseX = baseX.get();
    
    const animate = () => {
      let moveBy = directionFactor.current * -0.05;
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
      currentBaseX += moveBy;
      baseX.set(currentBaseX);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [baseX, velocityFactor]);

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-[#262626] py-8 bg-black/50">
      <motion.div className="flex whitespace-nowrap text-2xl md:text-3xl font-serif italic text-[#A3A3A3]" style={{ x }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center px-6">
            {items.map((item, j) => (
              <span key={j} className="flex items-center gap-12">
                {item} <span className="text-[#D4AF37] text-sm">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const PROJECTS = [
  { id: "marketly", title: "Marketly", role: "Full-Stack SaaS Platform", tags: "Laravel, React, TypeScript, Docker", status: "Launching Soon", desc: "A multi-role marketplace with VIP tiers, RBAC, real-time updates via Reverb, crypto/regional wallet payments, HMAC-verified webhooks, and CI/CD.", link: "" },
  { id: "glowpop", title: "Glow Pop", role: "Luxury E-Commerce", tags: "React, Redux, Laravel, Sanctum", status: "Launching Soon", desc: "A luxury beauty store with cart, wishlist, checkout, AR/EN RTL support, and a full admin dashboard.", link: "" },
  { id: "codecraft", title: "Code Craft", role: "Agency CMS", tags: "Next.js, Prisma, Turso", status: "Live", desc: "An agency website with a secure admin CMS, 12 data models, 56 API handlers, and email delivery via Resend.", link: "https://codecraft.pxxlspace.cv" },
  { id: "drama", title: "drama.gov.sy", role: "Institutional CMS", tags: "Laravel, Blade, Tailwind", status: "Live", desc: "An institutional CMS for a government website with a decoupled admin dashboard and RBAC.", link: "https://drama.gov.sy/" },
];

const SKILLS = ["Laravel", "React", "Next.js", "TypeScript", "Docker", "Redux", "Sanctum", "Prisma", "MySQL", "CI/CD", "PHPUnit", "Tailwind"];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Background Gold Light Follow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className={`relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5] ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#D4AF37] z-50 origin-left" style={{ scaleX }} />

        {/* Gold Light Follow */}
        <motion.div 
          className="pointer-events-none fixed top-1/2 left-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ x: springX, y: springY }}
        />

        <nav className="fixed top-0 w-full flex justify-between px-6 md:px-12 py-6 text-xs tracking-[0.2em] uppercase z-40 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#262626]/50">
          <a href="#" className="font-serif text-lg font-bold text-[#D4AF37] tracking-normal">S.S.</a>
          <div className="flex gap-8 items-center">
            <a href="#work" className="hover:text-[#D4AF37] transition-colors">Work</a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </div>
        </nav>

        <section className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 pt-20">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-8">
            Full-Stack Software Developer
          </motion.p>
          
          <CursorReactiveText text="Serene Sheikhalard" />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="max-w-md text-[#A3A3A3] text-lg">
              I build luxury digital experiences with Laravel, React, and Next.js. Specializing in secure architecture, real-time systems, and end-to-end delivery.
            </p>
            <MagneticButton href="#contact" className="px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
              Start a Project
            </MagneticButton>
          </motion.div>
        </section>

        <VelocityMarquee items={SKILLS} />

        <section id="about" className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-48">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4">The Philosophy</h2>
              <h3 className="font-serif text-4xl text-[#F5F5F5]">Ideas in.<br/>Products out.</h3>
            </div>
            <div className="md:w-2/3">
              <p className="text-2xl md:text-4xl leading-relaxed font-light text-[#A3A3A3]">
                Full-stack developer delivering features end to end: React front ends, Laravel APIs, admin dashboards, and Docker deployment. Experienced in role-based access control, secure payment webhooks, and real-time updates.
              </p>
            </div>
          </div>
        </section>

        <section id="work" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-[#262626]">
          <div className="mb-20 flex justify-between items-end">
            <h2 className="font-serif text-5xl md:text-7xl text-[#F5F5F5]">Selected <span className="italic text-[#D4AF37]">Work</span></h2>
            <span className="text-xs tracking-widest uppercase text-[#A3A3A3] pb-2">({PROJECTS.length} Projects)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-[#141414] border border-[#262626] p-8 md:p-12 rounded-2xl cursor-pointer overflow-hidden flex flex-col justify-between min-h-[350px]"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <motion.span layoutId={`role-${project.id}`} className="text-xs tracking-widest uppercase text-[#D4AF37]">{project.role}</motion.span>
                    <span className="text-[10px] tracking-widest uppercase border border-[#262626] px-3 py-1 rounded-full text-[#A3A3A3]">{project.status}</span>
                  </div>
                  <motion.h3 layoutId={`title-${project.id}`} className="font-serif text-4xl mb-4 text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors">{project.title}</motion.h3>
                  <motion.p layoutId={`desc-${project.id}`} className="text-[#A3A3A3] text-sm leading-relaxed mb-8">{project.desc}</motion.p>
                </div>
                <div className="relative z-10 flex items-end justify-between mt-auto">
                  <div className="text-xs text-[#A3A3A3] flex flex-wrap gap-2">
                    {project.tags.split(", ").map((tag, j) => (
                      <span key={j} className="bg-black/30 px-3 py-1 rounded-full border border-[#262626]/50">{tag}</span>
                    ))}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-[#262626] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="relative z-10 py-32 md:py-48 border-t border-[#262626] text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-8">Ready to start?</h2>
            <a href="mailto:serenesheikh23@gmail.com" className="inline-block font-serif text-[clamp(30px,6vw,80px)] leading-tight text-[#F5F5F5] hover:italic hover:text-[#D4AF37] transition-colors duration-500">
              Let's build <br/> something great.
            </a>
          </div>
        </section>

        <footer className="relative z-10 py-8 text-center border-t border-[#262626] text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3]">
          © {new Date().getFullYear()} Serene Sheikhalard. All Rights Reserved.
        </footer>
      </main>

      {/* EXPANDING PROJECT MODAL */}
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
                className="bg-[#141414] border border-[#D4AF37]/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 md:p-16 pointer-events-auto relative"
              >
                <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 rounded-full bg-[#0A0A0A] border border-[#262626] text-[#A3A3A3] hover:text-[#D4AF37]">
                  <X className="w-6 h-6" />
                </button>
                
                <motion.span layoutId={`role-${selectedProject.id}`} className="text-xs tracking-widest uppercase text-[#D4AF37] block mb-4">{selectedProject.role}</motion.span>
                <motion.h3 layoutId={`title-${selectedProject.id}`} className="font-serif text-5xl md:text-7xl mb-8 text-[#F5F5F5]">{selectedProject.title}</motion.h3>
                <motion.p layoutId={`desc-${selectedProject.id}`} className="text-[#A3A3A3] text-lg md:text-xl leading-relaxed mb-12">{selectedProject.desc}</motion.p>
                
                <div className="border-t border-[#262626] pt-8">
                  <h4 className="text-xs tracking-[0.2em] uppercase text-[#A3A3A3] mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tags.split(", ").map((tag: string, j: number) => (
                      <span key={j} className="bg-black/50 px-4 py-2 rounded-full border border-[#262626] text-[#F5F5F5] text-sm">{tag}</span>
                    ))}
                  </div>
                </div>

                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" className="inline-flex items-center gap-2 mt-12 px-8 py-4 bg-[#D4AF37] text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:scale-105 transition-transform">
                    Visit Live Site <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
EOF