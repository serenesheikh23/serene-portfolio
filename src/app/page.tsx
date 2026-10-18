"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Terminal, ShieldCheck, ShieldAlert, ShoppingBag, Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- LIVING CODE HERO COMPONENT ---
const LivingCodeHero = () => {
  const [text, setText] = useState("");
  const fullText = `const webhook = await stripe.webhooks.constructEvent(payload, sig, secret);\n\nif (await isDuplicate(webhook.id)) {\n  return res.status(200).send("Already processed");\n}\n\nawait db.orders.create({ data: webhook.data });`;
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
        setTimeout(() => setIsDone(true), 1000);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[300px] md:h-[400px] flex flex-col justify-center">
      <AnimatePresence>
        {!isDone ? (
          <motion.div 
            key="terminal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
            className="bg-black/80 border border-lux-border rounded-xl p-6 shadow-2xl backdrop-blur-md font-mono text-sm md:text-base text-green-400 overflow-hidden"
          >
            <div className="flex gap-2 mb-4 border-b border-lux-border/50 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-xs text-lux-muted flex items-center gap-2"><Terminal className="w-3 h-3"/> bash — webhook-test</span>
            </div>
            <pre className="whitespace-pre-wrap">{text}<span className="animate-pulse">_</span></pre>
          </motion.div>
        ) : (
          <motion.div 
            key="hero"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="text-center md:text-left"
          >
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lux-gold text-xs tracking-[0.4em] uppercase mb-4">
              Full-Stack Software Developer
            </motion.p>
            <h1 className="font-serif text-[clamp(50px,10vw,140px)] leading-[0.9] tracking-tight">
              <span className="block text-lux-text">Serene</span>
              <span className="block italic text-lux-gold-light">Sheikhalard</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- WEBHOOK VISUALIZER COMPONENT ---
const WebhookVisualizer = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    { title: "Incoming Request", icon: <Terminal className="w-4 h-4" /> },
    { title: "HMAC Verified", icon: <ShieldCheck className="w-4 h-4" /> },
    { title: "Idempotency Check", icon: <ShieldAlert className="w-4 h-4" /> },
    { title: "Order Created", icon: <ArrowUpRight className="w-4 h-4" /> }
  ];

  useEffect(() => {
    if (step > 0 && step < 4) {
      const timer = setTimeout(() => setStep(step + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="mt-6 bg-black/40 border border-lux-border rounded-xl p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-lux-muted font-mono">Webhook Lifecycle</span>
        <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest text-lux-gold hover:text-white border border-lux-gold/50 px-2 py-1 rounded">Run Test</button>
      </div>
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-lux-border -z-10" />
        {steps.map((s, i) => {
          const isActive = step > i;
          return (
            <div key={i} className="flex flex-col items-center gap-2 bg-lux-card px-2 z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${isActive ? "border-lux-gold bg-lux-gold/20 text-lux-gold" : "border-lux-border text-lux-muted"}`}>
                {s.icon}
              </div>
              <span className={`text-[9px] uppercase tracking-wider ${isActive ? "text-lux-gold" : "text-lux-muted"}`}>{s.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- MARKETLY CUSTOM CARD ---
const MarketlyCard = ({ project, i }: any) => {
  const [vip, setVip] = useState(1);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: i * 0.1 }} whileHover={{ y: -5 }}
      className="group relative bg-lux-card border border-lux-border p-6 md:p-8 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[400px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lux-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <span className="text-xs tracking-widest uppercase text-lux-gold">{project.role}</span>
          <span className="text-[10px] tracking-widest uppercase border border-lux-border px-3 py-1 rounded-full text-lux-muted">{project.status}</span>
        </div>
        <h3 className="font-serif text-3xl mb-2">{project.title}</h3>
        <p className="text-lux-muted text-sm leading-relaxed mb-6">{project.desc}</p>
        
        {/* VIP Slider */}
        <div className="bg-black/30 border border-lux-border rounded-lg p-4 mb-4">
          <div className="flex justify-between text-xs text-lux-gold mb-2 font-mono">
            <span>VIP Tier {vip}</span>
            <span>{vip === 1 ? "2% Fee / $500 Limit" : vip === 2 ? "1% Fee / $2,000 Limit" : "0% Fee / $10,000 Limit"}</span>
          </div>
          <input 
            type="range" min="1" max="3" step="1" value={vip} 
            onChange={(e) => setVip(Number(e.target.value))}
            className="w-full accent-lux-gold" 
          />
        </div>

        {/* Webhook Visualizer */}
        <WebhookVisualizer />
      </div>
    </motion.div>
  );
};

// --- GLOW POP CARD ---
const GlowPopCard = ({ project, i }: any) => {
  const [cart, setCart] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: i * 0.1 }} whileHover={{ y: -5 }}
      className="group relative bg-lux-card border border-lux-border p-6 md:p-8 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[400px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lux-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <span className="text-xs tracking-widest uppercase text-lux-gold">{project.role}</span>
          <span className="text-[10px] tracking-widest uppercase border border-lux-border px-3 py-1 rounded-full text-lux-muted">{project.status}</span>
        </div>
        <h3 className="font-serif text-3xl mb-2">{project.title}</h3>
        <p className="text-lux-muted text-sm leading-relaxed mb-6">{project.desc}</p>
        
        <div className="flex items-center gap-4 bg-black/30 p-4 rounded-lg border border-lux-border">
          <ShoppingBag className="text-lux-gold w-6 h-6" />
          <div className="flex-1">
            <div className="text-sm font-semibold">Luxury Item</div>
            <div className="text-xs text-lux-muted">$120.00</div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setCart(cart + 1)}
            className="bg-lux-gold text-black px-4 py-2 rounded-md text-xs font-bold uppercase"
          >
            Add {cart > 0 && `(${cart})`}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// --- DRAMA GOV CARD ---
const DramaGovCard = ({ project, i }: any) => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: i * 0.1 }} whileHover={{ y: -5 }}
      className="group relative bg-lux-card border border-lux-border p-6 md:p-8 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[400px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lux-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <span className="text-xs tracking-widest uppercase text-lux-gold">{project.role}</span>
          <span className="text-[10px] tracking-widest uppercase border border-lux-border px-3 py-1 rounded-full text-lux-muted">{project.status}</span>
        </div>
        <h3 className="font-serif text-3xl mb-2">{project.title}</h3>
        <p className="text-lux-muted text-sm leading-relaxed mb-6">{project.desc}</p>
        
        <div className="relative bg-black/30 border border-lux-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[120px] transition-all duration-500">
          {isAdmin ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full">
              <div className="text-[10px] uppercase text-red-400 mb-2 flex items-center justify-center gap-2"><Unlock className="w-3 h-3"/> Admin Mode</div>
              <div className="border border-dashed border-lux-gold/50 p-2 text-xs text-left bg-lux-bg">
                <span className="text-lux-gold">Edit:</span> Welcome to Drama...
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full">
              <div className="text-[10px] uppercase text-green-400 mb-2 flex items-center justify-center gap-2"><Lock className="w-3 h-3"/> Public View</div>
              <div className="text-sm font-serif text-lux-text">Welcome to Drama</div>
              <div className="text-xs text-lux-muted mt-1">Institutional portal</div>
            </motion.div>
          )}
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="mt-4 text-[10px] uppercase tracking-widest text-lux-gold hover:text-white"
          >
            Toggle View
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const PROJECTS = [
  { title: "Marketly", role: "Full-Stack SaaS Platform", tags: "Laravel, React, TypeScript, Docker", status: "Launching Soon", desc: "A multi-role marketplace with VIP tiers, RBAC, real-time updates via Reverb, crypto payments, and HMAC-verified webhooks.", link: "" },
  { title: "Glow Pop", role: "Luxury E-Commerce", tags: "React, Redux, Laravel, Sanctum", status: "Launching Soon", desc: "A luxury beauty store with cart, wishlist, checkout, AR/EN RTL support, and a full admin dashboard.", link: "" },
  { title: "Code Craft", role: "Agency CMS", tags: "Next.js, Prisma, Turso", status: "Live", desc: "An agency website with a secure admin CMS, 12 data models, 56 API handlers, and email delivery via Resend.", link: "https://codecraft.pxxlspace.cv" },
  { title: "drama.gov.sy", role: "Institutional CMS", tags: "Laravel, Blade, Tailwind", status: "Live", desc: "An institutional CMS for a government website with a decoupled admin dashboard and RBAC.", link: "https://drama.gov.sy/" },
  { title: "Ronaris Taxi", role: "Multilingual Site", tags: "HTML, CSS, JavaScript", status: "Live", desc: "A German, English, and Arabic taxi website for Bonn with a ride-request form and WhatsApp integration.", link: "https://www.ronaris-taxi.de/" },
  { title: "HPMT Distribution", role: "Corporate Site", tags: "HTML, CSS, JavaScript", status: "Live", desc: "An English/French HVAC distributor website with light/dark modes, product catalog, and testimonials.", link: "https://hpmtdistribution.com/" },
  { title: "Light Promo", role: "Freelance Build", tags: "Laravel, Bootstrap", status: "Live", desc: "A promotional website designed, built, and launched independently for a client.", link: "https://light-promo.com/" }
];

const SKILLS = ["Laravel", "React", "Next.js", "TypeScript", "Docker", "Redux", "Sanctum", "Prisma", "MySQL", "CI/CD", "PHPUnit", "Tailwind"];

export default function Home() {
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

      <section className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 pt-20">
        <LivingCodeHero />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 1 }} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
          <p className="max-w-md text-lux-muted text-lg">
            I build luxury digital experiences with Laravel, React, and Next.js. Specializing in secure architecture, real-time systems, and end-to-end delivery.
          </p>
          <div className="flex gap-4">
            <a href="#contact" className="px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase border border-lux-gold text-lux-gold hover:bg-lux-gold hover:text-black transition-all duration-300">
              Start a Project
            </a>
          </div>
        </motion.div>
      </section>

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

      <section id="about" className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-48">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <h2 className="text-xs tracking-[0.3em] uppercase text-lux-gold mb-4">The Philosophy</h2>
            <h3 className="font-serif text-4xl">Ideas in.<br/>Products out.</h3>
          </div>
          <div className="md:w-2/3">
            <p className="text-2xl md:text-4xl leading-relaxed font-light">
              {"Full-stack developer delivering features end to end: React front ends, Laravel APIs, admin dashboards, and Docker deployment. Experienced in role-based access control, secure payment webhooks, and real-time updates.".split(" ").map((word, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0.1, color: "#A3A3A3" }, visible: { opacity: 1, color: "#F5F5F5", transition: { duration: 0.5 } } }} className="inline-block mr-2 md:mr-3">
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>
      </section>

      <section id="work" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-lux-border">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 flex justify-between items-end">
          <h2 className="font-serif text-5xl md:text-7xl">Selected <span className="italic text-lux-gold">Work</span></h2>
          <span className="text-xs tracking-widest uppercase text-lux-muted pb-2">({PROJECTS.length} Projects)</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => {
            if (project.title === "Marketly") return <MarketlyCard key={i} project={project} i={i} />;
            if (project.title === "Glow Pop") return <GlowPopCard key={i} project={project} i={i} />;
            if (project.title === "drama.gov.sy") return <DramaGovCard key={i} project={project} i={i} />;
            
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.1 }} whileHover={{ y: -5 }} className="group relative bg-lux-card border border-lux-border p-6 md:p-8 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-lux-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs tracking-widest uppercase text-lux-gold">{project.role}</span>
                    <span className="text-[10px] tracking-widest uppercase border border-lux-border px-3 py-1 rounded-full text-lux-muted">{project.status}</span>
                  </div>
                  <h3 className="font-serif text-3xl mb-2">{project.title}</h3>
                  <p className="text-lux-muted text-sm leading-relaxed mb-6">{project.desc}</p>
                </div>
                <div className="relative z-10 flex items-end justify-between mt-auto">
                  <div className="text-xs text-lux-muted flex flex-wrap gap-2">
                    {project.tags.split(", ").map((tag, j) => (
                      <span key={j} className="bg-black/30 px-3 py-1 rounded-full border border-lux-border/50">{tag}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" className="w-10 h-10 rounded-full border border-lux-border flex items-center justify-center group-hover:bg-lux-gold group-hover:text-black transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

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
    </main>
  );
}