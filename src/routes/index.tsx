import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronDown, FileText, Github, GraduationCap, Linkedin, Mail, MapPin, Menu, X } from "lucide-react";
import { profile, contact, skills, projects, experience, education, training, assistant, type Project } from "@/content/portfolioContent";
import { OptionalImage, useImageAvailable } from "@/components/portfolio/OptionalImage";
import { Assistant } from "@/components/portfolio/Assistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Heba N. Ismail — Backend Software Engineer | Laravel & PHP" },
      { name: "description", content: "Portfolio of Heba N. Ismail, Computer Systems Engineering graduate building backend systems with Laravel, PHP, and PostgreSQL. Gaza, Palestine." },
      { property: "og:title", content: "Heba N. Ismail — Backend Software Engineer" },
      { property: "og:description", content: "Laravel & PHP backend projects, education, training, and an AI portfolio assistant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"],
  ["experience", "Experience"], ["education", "Education"], ["assistant", "AI Assistant"], ["contact", "Contact"],
] as const;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-3xl font-medium sm:text-4xl">{title}</h2>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <a href="#home" className="font-display text-lg">Heba N. Ismail</a>
        <ul className="hidden gap-6 text-sm text-muted-foreground lg:flex">
          {NAV.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="transition-colors hover:text-foreground">{label}</a></li>
          ))}
        </ul>
        <button className="grid h-10 w-10 place-items-center rounded-md border lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <ul className="border-t px-5 py-3 lg:hidden">
          {NAV.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className="block py-2.5 text-muted-foreground hover:text-foreground">{label}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
      <div>
        <p className="eyebrow mb-5">{profile.title}</p>
        <h1 className="text-5xl font-medium leading-[1.05] sm:text-6xl">{profile.name}</h1>
        <p className="mt-6 max-w-xl font-display text-xl italic text-foreground/90 sm:text-2xl">{profile.heroIntro}</p>
        <p className="mt-5 max-w-xl text-muted-foreground">{profile.heroSupport}</p>
        <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" aria-hidden /> {profile.location}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">View My Projects <ArrowRight className="h-4 w-4" /></a>
          <a href="#assistant" className="rounded-md border px-5 py-3 text-sm font-medium hover:border-primary hover:text-primary">Ask My AI Assistant</a>
          <a href="#contact" className="rounded-md border px-5 py-3 text-sm font-medium hover:border-primary hover:text-primary">Contact Me</a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-xs">
        <div className="aspect-[4/5] overflow-hidden rounded-xl border bg-surface">
          <OptionalImage
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            className="h-full w-full object-cover object-top"
            fallback={
              <div className="grid h-full w-full place-items-center" role="img" aria-label="Portrait placeholder">
                <span className="font-display text-6xl text-muted-foreground">{profile.initials}</span>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}

const kindLabel: Record<Project["categoryKind"], string> = { real: "border-primary text-primary", educational: "border-border text-secondary-foreground", training: "border-border text-muted-foreground" };

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const detailsId = `project-${p.id}-details`;
  return (
    <article className="flex flex-col rounded-xl border bg-card p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider ${kindLabel[p.categoryKind]}`}>{p.category}</span>
        <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
      </div>
      <h3 className="text-2xl font-medium">{p.title}</h3>
      {p.organization && <p className="mt-1 text-sm text-muted-foreground">{p.organization}</p>}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.overview}</p>
      <ul className="mt-5 flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
      <p className="mt-5 text-xs text-muted-foreground"><span className="text-foreground">Status:</span> {p.status}</p>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={detailsId} className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary hover:underline">
        {open ? "Hide details" : "View details"} <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <dl id={detailsId} className="mt-5 space-y-4 border-t pt-5 text-sm">
          <div><dt className="eyebrow mb-1">Problem</dt><dd className="text-muted-foreground">{p.problem}</dd></div>
          <div><dt className="eyebrow mb-1">Solution</dt><dd className="text-muted-foreground">{p.solution}</dd></div>
          {p.role && <div><dt className="eyebrow mb-1">My role</dt><dd className="text-muted-foreground">{p.role}</dd></div>}
          {p.features && (
            <div><dt className="eyebrow mb-1">{p.categoryKind === "real" ? "Implementation areas" : "Documented features"}</dt>
              <dd><ul className="ml-5 list-disc space-y-1 text-muted-foreground">{p.features.map((f) => <li key={f}>{f}</li>)}</ul></dd></div>
          )}
          {p.workflow && <div><dt className="eyebrow mb-1">Workflow</dt><dd className="text-muted-foreground">{p.workflow}</dd></div>}
          {p.outcomes && <div><dt className="eyebrow mb-1">Documented outcomes</dt><dd><ul className="ml-5 list-disc text-muted-foreground">{p.outcomes.map((o) => <li key={o}>{o}</li>)}</ul></dd></div>}
          {p.notes?.map((n) => <p key={n} className="rounded-md bg-secondary px-3 py-2 text-xs text-secondary-foreground">{n}</p>)}
          {(p.repoUrl || p.demoUrl) && (
            <div className="flex gap-4">
              {p.repoUrl && <a href={p.repoUrl} {...ext} className="text-primary underline">Repository</a>}
              {p.demoUrl && <a href={p.demoUrl} {...ext} className="text-primary underline">Live demo</a>}
            </div>
          )}
        </dl>
      )}
    </article>
  );
}

function Certificate() {
  const c = education.university.certificate;
  const ok = useImageAvailable(c.src);
  const [zoom, setZoom] = useState(false);
  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-lg border bg-surface" style={{ aspectRatio: `${c.width} / ${c.height}` }}>
        {ok ? (
          <button onClick={() => setZoom(true)} className="h-full w-full" aria-label="Enlarge graduation certificate">
            <img src={c.src} alt="Graduation certificate" className="h-full w-full object-contain" />
          </button>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
            <GraduationCap className="h-10 w-10 text-muted-foreground" aria-hidden />
            <p className="max-w-xs text-sm text-muted-foreground">{c.pendingMessage}</p>
          </div>
        )}
      </div>
      {zoom && ok && (
        <div role="dialog" aria-modal="true" aria-label="Graduation certificate" onClick={() => setZoom(false)} className="fixed inset-0 z-50 grid place-items-center bg-background/95 p-6">
          <img src={c.src} alt="Graduation certificate" className="max-h-full max-w-full object-contain" />
          <button className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-md border" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
      )}
    </div>
  );
}

function Index() {
  const u = education.university;
  const s = education.secondary;
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <Header />
      <main>
        <Hero />

        <section id="about" className="border-t">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_2fr]">
            <SectionHead eyebrow="01 — About" title="About me" />
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">{profile.about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
          </div>
        </section>

        <section id="skills" className="border-t">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <SectionHead eyebrow="02 — Skills" title="Skills & technologies" />
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((g) => (
                <div key={g.name} className="bg-card p-6">
                  <h3 className="font-sans text-sm font-semibold">{g.name}</h3>
                  <p className="mb-4 mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">{g.kind === "foundation" ? "Academic foundation" : "Used in projects & training"}</p>
                  <ul className="flex flex-wrap gap-2">{g.items.map((i) => <li key={i} className="chip">{i}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="border-t">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <SectionHead eyebrow="03 — Projects" title="Selected projects" />
            <div className="grid gap-6 md:grid-cols-2">{projects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}</div>
          </div>
        </section>

        <section id="experience" className="border-t">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_2fr]">
            <SectionHead eyebrow="04 — Experience" title="Practical Experience" />
            <ol className="space-y-10 border-l pl-6">
              {experience.map((e) => (
                <li key={e.title} className="relative">
                  <span className="absolute -left-[1.85rem] top-2 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{e.status}</p>
                  <h3 className="mt-1 text-xl font-medium">{e.title}</h3>
                  {e.organization && <p className="text-sm text-muted-foreground">{e.organization}</p>}
                  <p className="mt-3 leading-relaxed text-muted-foreground">{e.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="education" className="border-t">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <SectionHead eyebrow="05 — Education" title="Education & training" />
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <article className="rounded-xl border bg-card p-6">
                <p className="eyebrow">University · {u.year}</p>
                <h3 className="mt-2 text-2xl font-medium">{u.degree}</h3>
                <p className="text-muted-foreground">{u.institution}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div><dt className="text-muted-foreground">Cumulative GPA</dt><dd className="font-display text-2xl">{u.gpa}</dd></div>
                  <div><dt className="text-muted-foreground">Distinction</dt><dd className="font-display text-2xl">{u.distinction}</dd></div>
                </dl>
                <p className="mt-4 text-sm">{u.achievement}</p>
                <Certificate />
              </article>
              <div className="space-y-6">
                <article className="rounded-xl border bg-card p-6">
                  <p className="eyebrow">Secondary · {s.year}</p>
                  <h3 className="mt-2 text-xl font-medium">{s.degree}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">Final grade: <span className="text-foreground">{s.grade}</span></p>
                  <p className="mt-1 text-sm">{s.achievement}</p>
                </article>
                <div className="rounded-xl border bg-card p-6">
                  <h3 className="flex items-center gap-2 font-sans text-sm font-semibold"><FileText className="h-4 w-4 text-primary" aria-hidden /> Training & professional development</h3>
                  <ol className="mt-5 space-y-6">
                    {training.map((t) => (
                      <li key={t.title}>
                        <div className="flex items-baseline justify-between gap-3">
                          <h4 className="font-medium">{t.title}</h4>
                          <span className="shrink-0 font-mono text-xs text-primary">{t.period}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t.organization}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
                        {t.items && (
                          <details className="mt-2 text-sm">
                            <summary className="cursor-pointer text-primary">Selected work</summary>
                            <ul className="ml-5 mt-2 list-disc space-y-1 text-muted-foreground">{t.items.map((i) => <li key={i}>{i}</li>)}</ul>
                          </details>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="assistant" className="border-t">
          <div className="mx-auto max-w-3xl px-5 py-20">
            <p className="eyebrow mb-3">06 — AI Assistant</p>
            <h2 className="text-3xl font-medium sm:text-4xl">{assistant.title}</h2>
            <p className="mb-8 mt-3 text-muted-foreground">{assistant.subtitle}</p>
            <Assistant />
          </div>
        </section>

        <section id="contact" className="border-t">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="eyebrow mb-3">07 — Contact</p>
            <h2 className="text-4xl font-medium sm:text-5xl">{contact.heading}</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">{contact.text}</p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <li><a href={`mailto:${contact.email}`} className="flex h-full flex-col gap-2 rounded-xl border bg-card p-5 hover:border-primary"><Mail className="h-5 w-5 text-primary" /><span className="text-xs text-muted-foreground">Email</span><span className="break-all text-sm">{contact.email}</span></a></li>
              <li><a href={contact.github} {...ext} className="flex h-full flex-col gap-2 rounded-xl border bg-card p-5 hover:border-primary"><Github className="h-5 w-5 text-primary" /><span className="text-xs text-muted-foreground">GitHub</span><span className="text-sm">heba-nedal</span></a></li>
              <li><a href={contact.linkedin} {...ext} className="flex h-full flex-col gap-2 rounded-xl border bg-card p-5 hover:border-primary"><Linkedin className="h-5 w-5 text-primary" /><span className="text-xs text-muted-foreground">LinkedIn</span><span className="text-sm">Heba N. Ismail</span></a></li>
              <li className="flex flex-col gap-2 rounded-xl border bg-card p-5"><MapPin className="h-5 w-5 text-primary" /><span className="text-xs text-muted-foreground">Location</span><span className="text-sm">{contact.location}</span></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-display text-base text-foreground">{profile.name}</p><p>{profile.title}</p></div>
          <div className="flex items-center gap-4">
            <a href={contact.github} {...ext} aria-label="GitHub" className="hover:text-primary"><Github className="h-5 w-5" /></a>
            <a href={contact.linkedin} {...ext} aria-label="LinkedIn" className="hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            <a href={`mailto:${contact.email}`} aria-label="Email" className="hover:text-primary"><Mail className="h-5 w-5" /></a>
            <span>© {new Date().getFullYear()} {profile.name}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
