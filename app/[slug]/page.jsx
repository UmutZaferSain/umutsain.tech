import Link from "next/link";
import { notFound } from "next/navigation";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Customers", href: "/customers" },
  { label: "Changelog", href: "/changelog" }
];

const pages = {
  platform: {
    kicker: "Platform",
    title: "Ship AI features without infra drag",
    description:
      "Run inference, training, and batch with a single GPU control plane. Ship faster with autoscaling, multi-region failover, and built-in guardrails.",
    bullets: [
      "One API for online inference, batch jobs, and training pipelines",
      "Autoscale GPUs with cold starts under 300ms and budget guardrails",
      "Deep observability: traces, live metrics, and replayable incidents"
    ],
    stats: [
      { label: "p95 latency", value: "< 120 ms" },
      { label: "SLA uptime", value: "99.95%" },
      { label: "Regions", value: "12 global" }
    ],
    primary: { href: "/signup", label: "Launch console" },
    secondary: { href: "/docs", label: "View docs" }
  },
  pricing: {
    kicker: "Pricing",
    title: "Transparent, usage-based pricing",
    description: "Start free, scale predictably. Pay only for the GPU seconds you use and keep alerts on burn rates.",
    bullets: [
      "On-demand and reserved GPU pools with automatic bin-packing",
      "Spend alerts, hard caps, and cost attribution per workspace",
      "Free tier for low-traffic inference and staging environments"
    ],
    stats: [
      { label: "Free credits", value: "$300" },
      { label: "Billing granularity", value: "Per second" },
      { label: "Enterprise", value: "Custom SLAs" }
    ],
    primary: { href: "/signup", label: "Start for free" },
    secondary: { href: "/customers", label: "Talk to sales" }
  },
  docs: {
    kicker: "Docs",
    title: "Everything documented, copy-paste ready",
    description: "Examples for Python, JS, and Go clients. Ship quickly with templates for inference, queues, and workers.",
    bullets: [
      "Quickstarts for REST, gRPC, and SDKs",
      "Reference with live examples and curl snippets",
      "Cookbook for autoscaling, canary deploys, and blue/green"
    ],
    stats: [
      { label: "Code samples", value: "180+" },
      { label: "Latency guides", value: "p50 to p99" },
      { label: "Change history", value: "Daily" }
    ],
    primary: { href: "https://example.com/docs", label: "Open docs" },
    secondary: { href: "/changelog", label: "Latest changes" }
  },
  customers: {
    kicker: "Customers",
    title: "Built with teams that ship AI to production",
    description: "From fast-moving startups to public companies, teams rely on Neon Forge for stable GPU infra.",
    bullets: [
      "Dedicated support channels and incident retros",
      "Private control planes with VPC peering and SSO",
      "Reference architectures for safety, finance, and healthcare"
    ],
    stats: [
      { label: "Deploys / day", value: "4,200" },
      { label: "Teams onboarded", value: "320+" },
      { label: "NPS", value: "71" }
    ],
    primary: { href: "/signup", label: "Get a demo" },
    secondary: { href: "/changelog", label: "See release notes" }
  },
  changelog: {
    kicker: "Changelog",
    title: "What shipped this week",
    description: "Track the releases that keep your clusters fast, safe, and observable.",
    bullets: [
      "GPU bin-packing v2: 18% cost reduction on mixed workloads",
      "Latency hints: auto-tunes concurrency windows per model",
      "Observability: trace-to-log stitching and live tailing"
    ],
    stats: [
      { label: "Commits this week", value: "148" },
      { label: "Incidents", value: "0" },
      { label: "Rollbacks", value: "0" }
    ],
    primary: { href: "/docs", label: "View docs" },
    secondary: { href: "/platform", label: "Explore platform" }
  },
  login: {
    kicker: "Log in",
    title: "Welcome back",
    description: "Access your workspaces, deployments, and usage in one place.",
    primary: { href: "/signup", label: "Create account" }
  },
  signup: {
    kicker: "Get started",
    title: "Create your Neon Forge account",
    description: "Provision GPUs in minutes with sane defaults, guardrails, and observability baked in.",
    primary: { href: "/login", label: "I already have an account" }
  }
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

function StatPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.16em] text-white/60">{label}</div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

export default function MarketingPage({ params }) {
  const page = pages[params.slug];
  if (!page) return notFound();

  const isAuth = params.slug === "login" || params.slug === "signup";

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(44,255,121,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(44,255,121,0.06),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-16 pt-8 md:px-10 md:pt-12">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur md:px-6">
          <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent via-white/20 to-accent/60 shadow-glow ring-1 ring-accent/30" />
            <span className="text-lg font-semibold tracking-tight text-white">Neon Forge</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-white/70 md:gap-6">
            {navLinks.map(({ label, href }) => (
              <Link key={href} className="transition hover:text-white" href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/40 hover:text-white" href="/login">
              Log In
            </Link>
            <Link className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black shadow-glow transition hover:-translate-y-0.5" href="/signup">
              Sign Up
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur md:px-10">
          <div className="absolute inset-0 opacity-40 blur-3xl">
            <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-accent/30" />
            <div className="absolute bottom-4 right-10 h-32 w-32 rounded-full bg-white/15" />
          </div>

          <div className="relative z-10 flex flex-col gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 shadow-inner">
                <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(44,255,121,0.8)]" />
                {page.kicker}
              </div>
              <h1 className="text-balance text-4xl font-bold leading-tight text-white md:text-5xl">{page.title}</h1>
              <p className="max-w-3xl text-lg text-white/70 md:text-xl">{page.description}</p>
              {!isAuth && (
                <div className="flex flex-wrap items-center gap-3">
                  <Link className="glass-border relative rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black shadow-glow transition hover:-translate-y-0.5" href={page.primary.href}>
                    {page.primary.label}
                    <span className="absolute inset-0 rounded-full bg-white/30 opacity-0 transition hover:opacity-15" />
                  </Link>
                  <Link className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/45 hover:text-white" href={page.secondary.href}>
                    {page.secondary.label}
                  </Link>
                </div>
              )}
            </div>

            {isAuth ? (
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <form className="space-y-4 rounded-2xl border border-white/10 bg-black/50 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <label className="block text-sm font-semibold text-white">
                    Email
                    <input
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-white/40 focus:border-accent/60 focus:outline-none"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                    />
                  </label>
                  <label className="block text-sm font-semibold text-white">
                    Password
                    <input
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-white/40 focus:border-accent/60 focus:outline-none"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </label>
                  <button type="submit" className="glass-border relative w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black shadow-glow transition hover:-translate-y-0.5">
                    {params.slug === "login" ? "Log In" : "Create account"}
                    <span className="absolute inset-0 rounded-full bg-white/30 opacity-0 transition hover:opacity-15" />
                  </button>
                </form>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-lg font-semibold text-white">What you get</h2>
                  <ul className="mt-4 space-y-3 text-sm text-white/70">
                    <li>• Deploy models with zero cold starts</li>
                    <li>• Live logs, metrics, and traces out of the box</li>
                    <li>• Workspaces with SSO, RBAC, and audit trails</li>
                  </ul>
                  <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-white" href={page.primary.href}>
                    {page.primary.label}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4 rounded-2xl border border-white/10 bg-black/50 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <h2 className="text-lg font-semibold text-white">Why teams choose us</h2>
                  <ul className="space-y-3 text-white/70">
                    {page.bullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(44,255,121,0.6)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-lg font-semibold text-white">Snapshot</h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {page.stats.map((stat) => (
                      <StatPill key={stat.label} {...stat} />
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/70">
                    Need something custom?{" "}
                    <Link className="font-semibold text-accent transition hover:text-white" href="/customers">
                      Talk to us
                    </Link>
                    .
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
