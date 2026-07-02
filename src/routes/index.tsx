import { createFileRoute, Link } from "@tanstack/react-router";
import { SYSTEMS, type SystemInfo } from "@/lib/systems";
import { useCharacter } from "@/lib/character-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arcanum — Escolha seu Reino" },
      {
        name: "description",
        content:
          "Toda lenda começa com um sistema. Escolha seu reino e comece a forjar heróis, mundos e histórias sem limites.",
      },
    ],
  }),
  component: WelcomePage,
});

const NAV = [
  { label: "Início", href: "#" },
  { label: "Fichas", href: "#sistemas" },
  { label: "Modelos", href: "#sistemas" },
  { label: "Compêndio", href: "#ritual" },
  { label: "Ajustes", href: "#ritual" },
];

function WelcomePage() {
  const setSystem = useCharacter((s) => s.setSystem);
  const reset = useCharacter((s) => s.reset);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient background ornaments */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 28%, oklch(0.45 0.22 305 / 0.35), transparent 55%), radial-gradient(circle at 8% 90%, oklch(0.35 0.2 295 / 0.25), transparent 50%), radial-gradient(circle at 92% 88%, oklch(0.35 0.2 295 / 0.25), transparent 50%)",
        }}
      />
      {/* Rune side rails */}
      <RuneRail side="left" />
      <RuneRail side="right" />

      {/* Top nav */}
      <header className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-8 py-6">
        <div className="flex flex-col">
          <span className="font-display text-2xl text-glow" style={{ color: "var(--parchment)" }}>
            Arcanum Ledger
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.45em] text-primary/80">
            Forja de Fichas
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.35em] text-foreground/80 md:flex">
          {NAV.map((n, i) => (
            <a
              key={n.label}
              href={n.href}
              className={
                i === 0
                  ? "text-primary text-glow-soft"
                  : "transition hover:text-primary"
              }
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavIcon glyph="?" label="Ajuda" />
          <NavIcon glyph="❦" label="Compêndio" />
          <NavIcon glyph="☉" label="Conta" />
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-10 pb-6 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center gap-3 text-primary/70" aria-hidden>
          <span>✦</span>
          <span className="h-px w-24 bg-primary/40" />
          <span className="font-display text-xs uppercase tracking-[0.5em]">Salão dos Códices</span>
          <span className="h-px w-24 bg-primary/40" />
          <span>✦</span>
        </div>
        <h1
          className="font-display text-5xl leading-tight text-glow md:text-7xl"
          style={{ color: "var(--parchment)" }}
        >
          Escolha Seu Reino
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-sm text-muted-foreground md:text-base">
          Toda lenda começa com um sistema. Selecione seu reino e comece a forjar
          heróis, mundos e histórias sem limites.
        </p>
      </section>

      {/* Realm grid */}
      <section id="sistemas" className="relative mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEMS.map((sys) => (
            <RealmCard
              key={sys.id}
              sys={sys}
              onEnter={() => {
                reset();
                setSystem(sys.id);
              }}
            />
          ))}
        </div>
      </section>

      {/* Ritual strip */}
      <section id="ritual" className="relative mx-auto max-w-5xl px-6 pb-16">
        <div className="rune-panel rounded-xl p-8 md:p-10">
          <h2 className="text-center font-display text-2xl text-foreground md:text-3xl">O Ritual</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-5">
            {[
              ["I", "Identidade", "Nome, jogador e nível"],
              ["II", "Linhagem", "Escolha sua raça"],
              ["III", "Vocação", "Escolha sua classe"],
              ["IV", "Atributos", "Distribua o array padrão"],
              ["V", "Ficha", "Layout único da sua classe"],
            ].map(([num, title, desc]) => (
              <li key={num} className="text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-lg text-primary text-glow-soft">
                  {num}
                </div>
                <p className="font-heading text-sm text-foreground">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="relative mx-auto max-w-6xl px-6 pb-10 text-center">
        <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-primary/60" aria-hidden>
          <span>✦</span>
          <span className="h-px w-16 bg-primary/30" />
          <span className="font-display text-[10px] uppercase tracking-[0.5em]">
            Sua Lenda · Suas Regras · Seu Reino
          </span>
          <span className="h-px w-16 bg-primary/30" />
          <span>✦</span>
        </div>
      </footer>
    </main>
  );
}

/* ---------- helpers ---------- */

function NavIcon({ glyph, label }: { glyph: string; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-md border border-primary/30 bg-secondary/40 text-primary/90 transition hover:border-primary/70 hover:text-primary"
    >
      <span className="font-display text-sm">{glyph}</span>
    </button>
  );
}

function RuneRail({ side }: { side: "left" | "right" }) {
  const runes = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ".split("");
  return (
    <div
      className={`pointer-events-none absolute top-24 bottom-24 hidden w-10 flex-col items-center justify-around gap-2 text-primary/40 md:flex ${
        side === "left" ? "left-2" : "right-2"
      }`}
      aria-hidden
    >
      {runes.map((r, i) => (
        <span key={i} className="font-display text-sm" style={{ textShadow: "0 0 6px oklch(0.72 0.32 305 / 0.5)" }}>
          {r}
        </span>
      ))}
    </div>
  );
}

function RealmCard({ sys, onEnter }: { sys: SystemInfo; onEnter: () => void }) {
  const available = sys.status === "available";
  const { primary, secondary, text } = sys.theme;

  // CSS variables let hover state swap the whole palette without JS.
  const cardStyle = {
    "--sys-primary": primary,
    "--sys-secondary": secondary,
    "--sys-text": text,
  } as React.CSSProperties;

  const card = (
    <article className="realm-card group relative h-full" style={cardStyle}>
      <div
        className="relative h-full overflow-hidden rounded-md p-[2px] transition-all duration-300"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.72 0.32 305 / 0.9), oklch(0.45 0.22 305 / 0.5) 50%, oklch(0.72 0.32 305 / 0.9))",
          boxShadow:
            "0 0 24px oklch(0.6 0.28 305 / 0.45), inset 0 0 12px oklch(0.72 0.32 305 / 0.35)",
        }}
      >
        <div
          className="realm-card-inner relative flex h-full flex-col items-center rounded-[4px] px-6 pt-10 pb-8 text-center transition-colors duration-300"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.16 0.05 295 / 0.96), oklch(0.11 0.03 290 / 0.98))",
          }}
        >
          <CornerGlyph pos="top-left" />
          <CornerGlyph pos="top-right" />
          <CornerGlyph pos="bottom-left" />
          <CornerGlyph pos="bottom-right" />

          <span
            className={`absolute right-4 top-4 rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-[0.25em] ${
              available
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border bg-secondary/60 text-muted-foreground"
            }`}
          >
            {available ? "Pronto" : "Em breve"}
          </span>

          <div className="relative my-2 flex size-32 items-center justify-center">
            <div
              className="realm-ring absolute inset-0 rounded-full border animate-rune-spin"
              style={{ borderColor: "oklch(0.6 0.28 305 / 0.5)", boxShadow: "0 0 24px oklch(0.6 0.28 305 / 0.45)" }}
            />
            <div className="absolute inset-3 rounded-full border border-primary/30" />
            <div className="absolute inset-6 rounded-full border border-primary/20" />
            <span
              className={`realm-sigil relative font-display text-5xl transition-colors ${
                available ? "text-primary text-glow animate-flicker" : "text-primary/60"
              }`}
            >
              {sys.sigil}
            </span>
          </div>

          <h3
            className="realm-title mt-4 font-display text-2xl leading-tight transition-colors"
            style={{ color: "var(--parchment)" }}
          >
            {sys.name}
          </h3>
          <p className="realm-tagline mt-1 text-[10px] uppercase tracking-[0.35em] text-primary/80 transition-colors">
            {sys.tagline}
          </p>

          <div className="my-4 flex items-center gap-2 text-primary/60">
            <span className="h-px w-10 bg-primary/40" />
            <span aria-hidden>✦</span>
            <span className="h-px w-10 bg-primary/40" />
          </div>

          <p className="flex-1 text-sm text-muted-foreground">{sys.description}</p>

          <div className="realm-cta mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-primary transition-colors">
            <span aria-hidden>▸</span>
            <span>{available ? "Entrar no Reino" : "Aguardar Despertar"}</span>
            <span aria-hidden>◂</span>
          </div>
        </div>
      </div>
    </article>
  );

  return available ? (
    <Link
      to="/create/$system"
      params={{ system: sys.id }}
      onClick={onEnter}
      className="block transition duration-300 hover:-translate-y-1"
    >
      {card}
    </Link>
  ) : (
    <div className="opacity-80">{card}</div>
  );
}

function CornerGlyph({ pos }: { pos: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const cls =
    pos === "top-left"
      ? "left-2 top-2"
      : pos === "top-right"
        ? "right-2 top-2"
        : pos === "bottom-left"
          ? "bottom-2 left-2"
          : "bottom-2 right-2";
  return (
    <span
      aria-hidden
      className={`realm-corner absolute ${cls} font-display text-xs text-primary/70 transition-colors`}
      style={{ textShadow: "0 0 6px oklch(0.72 0.32 305 / 0.6)" }}
    >
      ✦
    </span>
  );
}
