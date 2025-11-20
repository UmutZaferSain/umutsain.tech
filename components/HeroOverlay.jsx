"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Customers", href: "/customers" },
  { label: "Changelog", href: "/changelog" }
];

export default function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col">
      <header className="pointer-events-auto flex items-center justify-between px-8 py-5 md:px-16">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent via-white/20 to-accent/60 shadow-glow ring-1 ring-accent/30" />
          <span className="text-lg font-semibold tracking-tight text-white">Neon Forge</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {navLinks.map(({ label, href }) => (
            <Link key={href} className="transition hover:text-white" href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            className="pointer-events-auto rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
            href="/login"
          >
            Log In
          </Link>
          <Link
            className="pointer-events-auto relative overflow-hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black shadow-[0_0_24px_rgba(44,255,121,0.45)] transition hover:shadow-[0_0_32px_rgba(44,255,121,0.65)]"
            href="/signup"
          >
            Sign Up
            <span className="absolute inset-0 bg-white/30 opacity-0 transition hover:opacity-15" />
          </Link>
        </div>
        <button className="pointer-events-auto block rounded-full border border-white/15 px-3 py-2 text-sm text-white/70 transition hover:text-white md:hidden">
          Menu
        </button>
      </header>

      <div className="pointer-events-none relative z-10 flex flex-1 items-center justify-center px-6 pb-16 pt-4 md:px-12">
        <div className="pointer-events-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
          >
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(44,255,121,0.8)]" />
            Hyper-scale ready
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: "easeOut" }}
            className="text-balance text-4xl font-bold leading-tight text-white md:text-6xl"
          >
            AI infrastructure that developers love
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.85, ease: "easeOut" }}
            className="mt-5 text-balance text-lg text-white/70 md:text-xl"
          >
            Run inference, training, and batch processing with sub-second cold starts, GPU auto-scaling, and glass-like
            observability layers designed for modern teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              className="glass-border pointer-events-auto relative rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-glow transition hover:-translate-y-0.5"
              href="/signup"
            >
              Start Building
              <span className="absolute inset-0 rounded-full bg-white/30 opacity-0 transition hover:opacity-15" />
            </Link>
            <Link
              className="pointer-events-auto rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/50 hover:text-white"
              href="/docs"
            >
              Explore Docs
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
