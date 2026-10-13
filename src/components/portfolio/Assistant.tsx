import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, MessageSquareText, RotateCcw, Square } from "lucide-react";
import { assistant, type AssistantMode } from "@/content/portfolioContent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

/** Returns the text typed after a trailing "/" trigger, or null when the trigger is inactive. */
export function slashQuery(input: string): string | null {
  const m = input.match(/(?:^|\s)\/([^/]*)$/);
  return m ? (m[1] ?? "") : null;
}

export function filterSlash(query: string) {
  const q = query.trim().toLowerCase();
  return assistant.slashGroups
    .map((g) => ({ ...g, items: g.items.filter((i) => !q || i.toLowerCase().includes(q)) }))
    .filter((g) => g.items.length);
}

export function Assistant() {
  const [mode, setMode] = useState<AssistantMode>("portfolio");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const query = slashQuery(input);
  const groups = useMemo(() => (query === null ? [] : filterSlash(query)), [query]);
  const flat = groups.flatMap((g) => g.items);
  const panelOpen = query !== null && !dismissed && flat.length > 0;
  const current = assistant.modes.find((m) => m.id === mode)!;

  useEffect(() => {
    if (query === null) setDismissed(false);
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!panelOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setDismissed(true);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [panelOpen]);

  const scrollDown = () => requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }));

  async function ask(text: string, base: Msg[] = messages) {
    const q = text.trim();
    if (!q || q === "/") {
      setError("Please type a question first.");
      setFailed(null);
      return;
    }
    if (loading) return;
    setError(null);
    setFailed(null);
    const history: Msg[] = [...base, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    scrollDown();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, mode }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "The assistant is temporarily unavailable.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
        scrollDown();
      }
      if (!acc.trim()) throw new Error("The assistant returned no answer. Please try again later or contact Heba directly.");
    } catch (e) {
      if ((e as Error).name === "AbortError") {
        setMessages((m) => (m[m.length - 1]?.content ? m : m.slice(0, -1)));
      } else {
        setMessages(base);
        setFailed(q);
        setError(e instanceof TypeError ? "Network error — please check your connection and try again." : (e as Error).message);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  const pick = (s: string) => {
    setDismissed(true);
    ask(s);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (panelOpen) return pick(flat[active] ?? "");
    ask(input);
  };

  let idx = -1;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-[0_0_0_1px_var(--color-border)]">
      <div role="radiogroup" aria-label="Assistant mode" className="grid grid-cols-2 gap-1 border-b bg-surface p-1.5 sm:grid-cols-4">
        {assistant.modes.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={mode === m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              "rounded-md px-3 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm",
              mode === m.id ? "bg-primary/15 text-primary ring-1 ring-primary/40" : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="border-b px-5 py-2.5 text-xs text-muted-foreground">{current.description}</p>

      <div ref={scrollRef} className="max-h-[28rem] min-h-[14rem] overflow-y-auto p-5 sm:p-6" aria-live="polite">
        {messages.length === 0 ? (
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquareText className="h-4 w-4 text-primary" aria-hidden />
              Answers are based only on the verified content of this portfolio.
            </div>
            <div className="flex flex-wrap gap-2">
              {assistant.suggestions.map((s) => (
                <Button
                  variant="outline"
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="h-auto max-w-full whitespace-normal rounded-full border px-3 py-2 text-left text-sm text-secondary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <ul className="space-y-5">
            {messages.map((m, i) => (
              <li key={i} className={cn("animate-in fade-in-0 slide-in-from-bottom-1 duration-300", m.role === "user" && "flex justify-end")}>
                {m.role === "user" ? (
                  <p className="max-w-[85%] break-words rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">{m.content}</p>
                ) : m.content ? (
                  <div className="max-w-none break-words border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-foreground [&_a]:text-primary [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-2 [&_strong]:text-foreground [&_ul]:mb-2">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="flex items-center gap-3 text-sm text-muted-foreground" role="status">
                    <span className="flex gap-1" aria-hidden>
                      <span className="typing-dot" />
                      <span className="typing-dot [animation-delay:150ms]" />
                      <span className="typing-dot [animation-delay:300ms]" />
                    </span>
                    Looking through the portfolio…
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-3 text-sm text-destructive">
          <span>{error}</span>
          {failed && (
            <Button variant="outline" size="sm" type="button" onClick={() => ask(failed)} className="gap-1.5 text-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> Retry
            </Button>
          )}
        </div>
      )}
      <div ref={wrapRef} className="relative">
        {panelOpen && (
          <div
            id="slash-panel"
            role="listbox"
            aria-label="Suggested questions"
            className="absolute inset-x-3 bottom-full z-20 mb-2 max-h-72 overflow-y-auto rounded-lg border bg-popover p-1.5 shadow-xl animate-in fade-in-0 slide-in-from-bottom-1 duration-150"
          >
            {groups.map((g) => (
              <div key={g.label} role="group" aria-label={g.label}>
                <p className="px-2.5 pb-1 pt-2 font-mono text-[0.65rem] uppercase tracking-wider text-primary">{g.label}</p>
                {g.items.map((s) => {
                  idx++;
                  const i = idx;
                  return (
                    <div
                      key={s}
                      id={`slash-opt-${i}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => pick(s)}
                      className={cn("cursor-pointer rounded-md px-2.5 py-2 text-sm", i === active ? "bg-accent text-foreground" : "text-secondary-foreground")}
                    >
                      {s}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
        <form onSubmit={onSubmit} className="flex items-end gap-2 border-t bg-surface p-3">
          <label htmlFor="assistant-input" className="sr-only">Your question</label>
          <textarea
            id="assistant-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (panelOpen) {
                if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % flat.length); return; }
                if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + flat.length) % flat.length); return; }
                if (e.key === "Escape") { e.preventDefault(); setDismissed(true); return; }
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); pick(flat[active] ?? ""); return; }
              }
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask(input);
              }
            }}
            role="combobox"
            aria-expanded={panelOpen}
            aria-controls="slash-panel"
            aria-autocomplete="list"
            aria-activedescendant={panelOpen ? `slash-opt-${active}` : undefined}
            aria-describedby="slash-hint"
            rows={1}
            maxLength={1000}
            placeholder={current.placeholder}
            className="max-h-32 min-h-11 min-w-0 flex-1 resize-none rounded-md border bg-background px-3 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {loading ? (
            <Button variant="outline" size="icon" type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop" className="grid h-11 w-11 shrink-0 place-items-center rounded-md border text-foreground hover:bg-accent">
              <Square className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="icon" type="submit" aria-label="Send question" className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground transition-transform hover:scale-105 hover:opacity-90">
              <ArrowUp className="h-4 w-4" />
            </Button>
          )}
        </form>
        <p id="slash-hint" className="sr-only">Type a slash to see suggested questions. Use arrow keys and Enter to choose.</p>
      </div>
    </div>
  );
}
