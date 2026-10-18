"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useRef, useEffect } from "react";

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Word-by-word reveal for the About section
const revealWord = {
  hidden: { opacity: 0.1, color: "#A3A3A3" },
  visible: { opacity: 1, color: "#F5F5F5", transition: { duration: 0.5 } }
};

const PROJECTS = [
  { title: "Marketly", role: "Full-Stack SaaS Platform", tags: "Laravel, React, TypeScript, Docker", status: "Launching Soon", desc: "A multi-role marketplace with VIP tiers, RBAC, real-time updates via Reverb, crypto/regional wallet payments, HMAC-verified webhooks, and CI/CD.", link: "" },
  { title: "Glow Pop", role: "Luxury E-Commerce", tags: "React, Redux, Laravel, Sanctum", status: "Launching Soon", desc: "A luxury beauty store with cart, wishlist, checkout, AR/EN RTL support, and a full admin dashboard.", link: "" },
  { title: "Code Craft", role: "Agency CMS", tags: "Next.js, Prisma, Turso", status: "Live", desc: "An agency website with a secure admin CMS, 12 data models, 56 API handlers, and email delivery via Resend.", link: "https://codecraft.pxxlspace.cv" },
  { title: "drama.gov.sy", role: "Institutional CMS", tags: "Laravel, Blade, Tailwind", status: "Live", desc: "An institutional CMS for a government website with a decoupled admin dashboard and RBAC.", link: "https://drama.gov.sy/" },
  { title: "Ronaris Taxi", role: "Multilingual Site", tags: "HTML, CSS, JavaScript", status: "Live", desc: "A German, English, and Arabic taxi website for Bonn with a ride-request form and WhatsApp integration.", link: "https://www.ronaris-taxi.de/" },
  { title: "HPMT Distribution", role: "Corporate Site", tags: "HTML, CSS, JavaScript", status: "Live", desc: "An English/French HVAC distributor website with light/dark modes, product catalog, and testimonials.", link: "https://hpmtdistribution.com/" },
  { title: "Light Promo", role: "Freelance Build", tags: "Laravel, Bootstrap", status: "Live", desc: "A promotional website designed, built, and launched independently for a client.", link: "https://light-promo.com/" }
];

const SKILLS = ["Laravel", "React", "Next.js", "TypeScript", "Docker", "Redux", "Sanctum", "Prisma", "MySQL", "CI/CD", "PHPUnit", "Tailwind"];

export default function Home() {
  // Mouse Parallax Effect
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

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative min-h-screen bg-lux-bg selection:bg-lux-gold selection:text-black">
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-lux-gold z-50 origin-left" style={{ scaleX }} />

      {/* Luxury Background Glows */}
      <motion.div 
        className="pointer-events-none fixed top-0 left-1/4 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-[120px]"
        style={{ x: springX, y: springY }}
      />
      <motion.div 
        className="pointer-events-none fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F3E5AB]/5 rounded-full blur-[100px]"
        style={{ x: useTransform(springX, v => -v), y: useTransform(springY, v => -v) }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full flex justify-between px-6 md:px-12 py-8 text-xs tracking-[0.2em] uppercase z-40 mix-blend-difference">
        <a href="#" className="font-serif text-lg font-bold text-lux-gold tracking-normal">S.S.</a>
        <div className="flex gap-8">
          <a href="#work" className="hover:text-lux-gold transition-colors">Work</a>
          <a href="#about" className="hover:text-lux-gold transition-colors">About</a>
          <a href="#contact" className="hover:text-lux-gold transition-colors">Contact</a>
        </div>
      </nav>

      {/* HERO SECTION */}
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
            <div className="flex gap-4">
              <a href="#contact" className="px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase border border-lux-gold text-lux-gold hover:bg-lux-gold hover:text-black transition-all duration-300">
                Start a Project
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE SECTION */}
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

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-48">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row gap-12"
        >
          <div className="md:w-1/3">
            <h2 className="text-xs tracking-[0.3em] uppercase text-lux-gold mb-4">The Philosophy</h2>
            <h3 className="font-serif text-4xl">Ideas in.<br/>Products out.</h3>
          </div>
          <div className="md:w-2/3">
            <p className="text-2xl md:text-4xl leading-relaxed font-light">
              {"Full-stack developer delivering features end to end: React front ends, Laravel APIs, admin dashboards, and Docker deployment. Experienced in role-based access control, secure payment webhooks, and real-time updates.".split(" ").map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={revealWord}
                  className="inline-block mr-2 md:mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="work" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-lux-border">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 flex justify-between items-end">
          <h2 className="font-serif text-5xl md:text-7xl">Selected <span className="italic text-lux-gold">Work</span></h2>
          <span className="text-xs tracking-widest uppercase text-lux-muted pb-2">({PROJECTS.length} Projects)</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative bg-lux-card border border-lux-border p-8 md:p-12 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[350px]"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-lux-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-xs tracking-widest uppercase text-lux-gold">{project.role}</span>
                  <span className="text-[10px] tracking-widest uppercase border border-lux-border px-3 py-1 rounded-full text-lux-muted group-hover:border-lux-gold group-hover:text-lux-gold transition-colors">
                    {project.status}
                  </span>
                </div>
                
                <h3 className="font-serif text-4xl mb-4 group-hover:text-lux-gold-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-lux-muted text-sm leading-relaxed mb-8">
                  {project.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-end justify-between mt-auto">
                <div className="text-xs text-lux-muted flex flex-wrap gap-2">
                  {project.tags.split(", ").map((tag, j) => (
                    <span key={j} className="bg-black/30 px-3 py-1 rounded-full border border-lux-border/50">{tag}</span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" className="w-12 h-12 rounded-full border border-lux-border flex items-center justify-center group-hover:bg-lux-gold group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-32 md:py-48 border-t border-lux-border text-center overflow-hidden">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto px-6">
          <motion.h2 variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-lux-gold mb-8">
            Ready to start?
          </motion.h2>
          
          <motion.a 
            href="mailto:serenesheikh23@gmail.com"
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            className="inline-block font-serif text-[clamp(30px,6vw,80px)] leading-tight hover:italic hover:text-lux-gold transition-colors duration-500"
          >
            Let's build <br/> something great.
          </motion.a>

          <motion.div variants={fadeUp} className="mt-16 flex flex-wrap justify-center gap-8 text-sm tracking-widest uppercase text-lux-muted">
            <a href="mailto:serenesheikh23@gmail.com" className="flex items-center gap-2 hover:text-lux-gold transition-colors">
              <Mail className="w-4 h-4" /> Email
            </a>
            <a href="https://www.linkedin.com/in/serene-sheikhalard" target="_blank" className="flex items-center gap-2 hover:text-lux-gold transition-colors">
              LinkedIn
            </a>
            <a href="https://codecraft.pxxlspace.cv" target="_blank" className="flex items-center gap-2 hover:text-lux-gold transition-colors">
              CodeCraft
            </a>
            <a href="/Serene_Sheikhalard_Resume.pdf" download className="flex items-center gap-2 hover:text-lux-gold transition-colors">
              Resume
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 text-center border-t border-lux-border text-[10px] tracking-[0.2em] uppercase text-lux-muted">
        © {new Date().getFullYear()} Serene Sheikhalard. All Rights Reserved.
      </footer>

    </main>
  );
}
