import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Loader2, MessageSquareText, Square } from "lucide-react";
import { assistant } from "@/content/portfolioContent";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };

export function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const scrollDown = () => requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }));

  async function ask(text: string) {
    const q = text.trim();
    if (!q) {
      setError("Please type a question first.");
      return;
    }
    if (loading) return;
    setError(null);
    const history: Msg[] = [...messages, { role: "user", content: q }];
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
        body: JSON.stringify({ messages: history }),
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
        setMessages(history);
        setError(
          e instanceof TypeError
            ? "Network error — please check your connection and try again."
            : (e as Error).message,
        );
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
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
                  className="h-auto max-w-full whitespace-normal rounded-full border px-3 py-2 text-left text-sm text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <ul className="space-y-5">
            {messages.map((m, i) => (
              <li key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                {m.role === "user" ? (
                  <p className="max-w-[85%] break-words rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">{m.content}</p>
                ) : m.content ? (
                  <div className="prose-answer max-w-none break-words text-sm leading-relaxed text-foreground [&_a]:text-primary [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-2 [&_strong]:text-foreground [&_ul]:mb-2">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Looking through the portfolio…
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p role="alert" className="border-t px-5 py-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <form onSubmit={onSubmit} className="flex items-end gap-2 border-t bg-surface p-3">
        <label htmlFor="assistant-input" className="sr-only">
          Your question
        </label>
        <textarea
          id="assistant-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(input);
            }
          }}
          rows={1}
          maxLength={1000}
          placeholder="Ask about skills, projects, or background…"
          className="max-h-32 min-h-11 min-w-0 flex-1 resize-none rounded-md border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {loading ? (
          <Button variant="outline" size="icon" type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop" className="grid h-11 w-11 shrink-0 place-items-center rounded-md border text-foreground hover:bg-accent">
            <Square className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="icon" type="submit" aria-label="Send question" className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground hover:opacity-90">
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  );
}
