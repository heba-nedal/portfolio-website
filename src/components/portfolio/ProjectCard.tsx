import { ArrowUpRight, ImageIcon } from "lucide-react";
import { type Project } from "@/content/portfolioContent";
import { OptionalImage } from "@/components/portfolio/OptionalImage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

const kindLabel: Record<Project["categoryKind"], string> = {
  real: "border-primary/60 text-primary",
  educational: "border-border text-secondary-foreground",
  training: "border-border text-muted-foreground",
};
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <Dialog>
      <article className="flex w-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_32px_-20px_var(--color-primary)] motion-reduce:hover:translate-y-0">
        <div className="aspect-video shrink-0 overflow-hidden border-b bg-surface">
          <OptionalImage src={p.screenshot} alt={`${p.title} screenshot`} className="h-full w-full object-cover object-top" fallback={
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground" role="img" aria-label={`${p.title}: screenshot not yet added`}>
              <ImageIcon className="h-7 w-7 opacity-60" aria-hidden />
              <span className="text-xs">Screenshot pending</span>
            </div>
          } />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <span className={`rounded-full border px-2.5 py-1 font-mono text-[0.7rem] uppercase ${kindLabel[p.categoryKind]}`}>{p.category}</span>
            <span className="shrink-0 pt-1 font-mono text-xs text-muted-foreground">0{index + 1}</span>
          </div>
          <h3 className="text-2xl font-medium leading-snug">{p.title}</h3>
          {p.organization && <p className="mt-2 text-sm text-muted-foreground">{p.organization}</p>}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.overview}</p>
          <ul className="mt-5 flex flex-wrap gap-2">{p.technologies.map(t => <li key={t} className="chip">{t}</li>)}</ul>
          <p className="mb-5 mt-5 text-xs leading-relaxed text-muted-foreground"><span className="text-foreground">Status:</span> {p.status}</p>
          <DialogTrigger asChild>
            <Button variant="link" className="mt-auto h-10 self-start px-0">View details <ArrowUpRight aria-hidden /></Button>
          </DialogTrigger>
        </div>
      </article>
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl flex-col gap-0 overflow-hidden rounded-lg p-0">
        <header className="shrink-0 border-b px-5 pb-5 pt-6 pr-16 sm:px-7 sm:pr-16">
          <p className="eyebrow mb-2">{p.category}</p>
          <DialogTitle className="text-2xl font-medium sm:text-3xl">{p.title}</DialogTitle>
          {p.organization && <p className="mt-2 text-sm text-muted-foreground">{p.organization}</p>}
          <DialogDescription className="sr-only">Verified project description, technologies, contribution, and status.</DialogDescription>
        </header>
        <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7" tabIndex={0} aria-label="Project details">
          <p className="text-sm leading-relaxed text-muted-foreground">{p.overview}</p>
          <dl className="mt-6 space-y-6 text-sm leading-relaxed">
            <div><dt className="eyebrow mb-2">Technologies</dt><dd><ul className="flex flex-wrap gap-2">{p.technologies.map(t => <li key={t} className="chip">{t}</li>)}</ul></dd></div>
            <div><dt className="eyebrow mb-2">Problem</dt><dd className="text-muted-foreground">{p.problem}</dd></div>
            <div><dt className="eyebrow mb-2">Solution</dt><dd className="text-muted-foreground">{p.solution}</dd></div>
            {p.role && <div><dt className="eyebrow mb-2">My contribution</dt><dd className="text-muted-foreground">{p.role}</dd></div>}
            {p.features && <div><dt className="eyebrow mb-2">Key features</dt><dd><ul className="ml-5 list-disc space-y-2 text-muted-foreground">{p.features.map(f => <li key={f}>{f}</li>)}</ul></dd></div>}
            {p.workflow && <div><dt className="eyebrow mb-2">Workflow</dt><dd className="text-muted-foreground">{p.workflow}</dd></div>}
            {p.outcomes && <div><dt className="eyebrow mb-2">Documented outcomes</dt><dd><ul className="ml-5 list-disc text-muted-foreground">{p.outcomes.map(o => <li key={o}>{o}</li>)}</ul></dd></div>}
            <div><dt className="eyebrow mb-2">Project status</dt><dd className="text-muted-foreground">{p.status}</dd></div>
          </dl>
          {p.notes?.map(n => <p key={n} className="mt-5 border-l-2 border-primary/40 pl-4 text-xs leading-relaxed text-muted-foreground">{n}</p>)}
          {(p.repoUrl || p.demoUrl) && <div className="mt-6 flex flex-wrap gap-4">
            {p.repoUrl && <Button asChild variant="link" className="px-0"><a href={p.repoUrl} {...ext}>Repository <ArrowUpRight /></a></Button>}
            {p.demoUrl && <Button asChild variant="link" className="px-0"><a href={p.demoUrl} {...ext}>Live demo <ArrowUpRight /></a></Button>}
          </div>}
        </div>
        <footer className="flex shrink-0 justify-end border-t bg-surface px-5 py-4 sm:px-7">
          <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
        </footer>
      </DialogContent>
    </Dialog>
  );
}