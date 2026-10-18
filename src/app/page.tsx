"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  return (
    <main className="max-w-[1040px] mx-auto px-6 lg:px-8 bg-ink text-text min-h-screen">
      
      <section className="min-h-screen flex flex-col justify-center pt-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p variants={fadeUp} className="text-gold text-sm tracking-[0.16em] uppercase mb-4 font-semibold">
            Full-Stack Software Developer · U.S. Citizen
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl lg:text-7xl leading-tight mb-6">
            Serene <span className="text-rose italic">Sheikhalard</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-text-dim max-w-[52ch] text-lg mb-10">
            Full-stack software developer building web applications and client websites with Laravel, React, and Next.js. Experienced in role-based access control, secure payment webhooks, and real-time updates.
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-4">
            <a href="Serene_Sheikhalard_Resume.pdf" className="bg-rose text-ink px-6 py-3 rounded-full font-semibold hover:bg-[#cf8b7f] transition">
              Download Resume
            </a>
            <a href="mailto:serenesheikh23@gmail.com" className="border border-line px-6 py-3 rounded-full font-semibold hover:border-gold hover:text-gold transition flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </a>
          </motion.div>
        </motion.div>
      </section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="py-24 border-t border-line">
        <motion.h2 variants={fadeUp} className="font-serif text-4xl mb-12">Experience</motion.h2>
        <motion.div variants={fadeUp} className="grid md:grid-cols-[200px_1fr] gap-8 border-b border-line pb-8">
          <div className="text-gold text-sm">May 2025 — Mar 2026</div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Full-Stack Developer (Trainee)</h3>
            <p className="text-rose mb-4">Mad Fox (Althaalab Almaker)</p>
            <ul className="list-disc list-inside text-text-dim space-y-2">
              <li>Refactored Laravel Blade templates to improve rendering speed.</li>
              <li>Optimized MySQL queries to speed up data retrieval.</li>
              <li>Standardized Git workflows and introduced peer code review.</li>
              <li>Developed an internal admin system with full CRUD operations.</li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="py-24 border-t border-line">
        <motion.h2 variants={fadeUp} className="font-serif text-4xl mb-12">Selected Work</motion.h2>
        <div className="space-y-16">
          <motion.div variants={fadeUp} className="group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-text group-hover:text-rose transition">Marketly</h3>
              <span className="text-xs border border-line px-3 py-1 rounded-full text-text-dim">Launching Soon</span>
            </div>
            <p className="text-text-dim max-w-3xl mb-4">
              Full-stack marketplace with user/admin roles, VIP tiers, deposits/withdrawals, and real-time updates via Laravel Reverb. Features idempotent webhooks (HMAC-SHA256/512) and Docker/CI-CD deployment.
            </p>
            <div className="flex gap-2 text-xs text-text-dim">
              <span className="border border-line px-3 py-1 rounded-full">Laravel</span>
              <span className="border border-line px-3 py-1 rounded-full">React</span>
              <span className="border border-line px-3 py-1 rounded-full">Docker</span>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-text group-hover:text-rose transition">Glow Pop</h3>
              <span className="text-xs border border-line px-3 py-1 rounded-full text-text-dim">Launching Soon</span>
            </div>
            <p className="text-text-dim max-w-3xl mb-4">
              E-commerce platform with product search, cart, wishlist, and Sham Cash payments. Built with Laravel API, React/Redux front end, Arabic/English RTL support, and Laravel Sanctum auth.
            </p>
            <div className="flex gap-2 text-xs text-text-dim">
              <span className="border border-line px-3 py-1 rounded-full">React</span>
              <span className="border border-line px-3 py-1 rounded-full">Redux</span>
              <span className="border border-line px-3 py-1 rounded-full">Laravel</span>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="group">
            <div className="flex justify-between items-start mb-4">
              <a href="https://codecraft.pxxlspace.cv" target="_blank" className="text-2xl font-semibold text-rose hover:underline flex items-center gap-2">
                Code Craft <ArrowUpRight className="w-5 h-5" />
              </a>
              <span className="text-xs border border-rose text-rose px-3 py-1 rounded-full bg-rose/10">Live</span>
            </div>
            <p className="text-text-dim max-w-3xl mb-4">
              Agency website with an admin CMS secured by JWT authentication (NextAuth.js). Includes 12 data models, 56 API handlers, contact form via Resend, and Vitest tests.
            </p>
            <div className="flex gap-2 text-xs text-text-dim">
              <span className="border border-line px-3 py-1 rounded-full">Next.js</span>
              <span className="border border-line px-3 py-1 rounded-full">Prisma</span>
              <span className="border border-line px-3 py-1 rounded-full">Turso</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-24 border-t border-line text-center">
        <h2 className="font-serif text-4xl mb-8">Let's build something.</h2>
        <a href="mailto:serenesheikh23@gmail.com" className="text-xl text-rose hover:text-gold transition underline underline-offset-4">
          serenesheikh23@gmail.com
        </a>
      </motion.section>

    </main>
  );
}
