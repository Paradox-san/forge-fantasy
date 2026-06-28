import { createFileRoute, Link, Outlet, useLocation, useParams } from "@tanstack/react-router";
import { getSystem } from "@/lib/systems";
import { useEffect } from "react";
import { useCharacter } from "@/lib/character-store";

export const Route = createFileRoute("/create/$system")({
  component: CreateLayout,
});

const STEPS = [
  { path: "", label: "Identidade", num: "I" },
  { path: "race", label: "Linhagem", num: "II" },
  { path: "class", label: "Vocação", num: "III" },
  { path: "abilities", label: "Atributos", num: "IV" },
  { path: "details", label: "Detalhes", num: "V" },
  { path: "sheet", label: "Ficha", num: "✦" },
];

function CreateLayout() {
  const { system } = useParams({ from: "/create/$system" });
  const sys = getSystem(system);
  const location = useLocation();
  const setSystem = useCharacter((s) => s.setSystem);

  useEffect(() => {
    if (sys.status === "available") setSystem(sys.id);
  }, [sys.id, sys.status, setSystem]);

  const current = location.pathname.split(`/create/${system}`)[1]?.replace("/", "") ?? "";

  if (sys.status !== "available") {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="rune-panel max-w-lg rounded-xl p-10 text-center">
          <span className="font-display text-5xl text-primary text-glow">{sys.sigil}</span>
          <h1 className="mt-4 font-display text-3xl text-foreground">{sys.name}</h1>
          <p className="mt-2 text-sm uppercase tracking-widest text-primary/80">{sys.tagline}</p>
          <p className="mt-6 text-muted-foreground">{sys.description}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            Este códice ainda desperta. Por ora, comece sua jornada com D&D 5.5.
          </p>
          <Link
            to="/create/$system"
            params={{ system: "dnd5e" }}
            className="neon-btn mt-8 inline-block rounded-md px-6 py-3 font-heading text-sm uppercase tracking-[0.2em]"
          >
            Iniciar D&D 5.5
          </Link>
          <div className="mt-4">
            <Link to="/" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
              ← Voltar ao salão
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-border/60 bg-background/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-display text-2xl text-primary text-glow-soft">✦</span>
            <span className="font-display text-sm tracking-[0.3em] text-foreground">ARCANUM</span>
          </Link>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Sistema</p>
            <p className="font-heading text-sm text-primary">{sys.name}</p>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <nav className="mx-auto max-w-6xl px-6 pt-8">
        <ol className="flex flex-wrap items-center justify-center gap-2 text-xs md:gap-3">
          {STEPS.map((step, i) => {
            const isActive = current === step.path;
            const isPast =
              STEPS.findIndex((s) => s.path === current) > i;
            return (
              <li key={step.path} className="flex items-center gap-2">
                <Link
                  to={step.path ? `/create/$system/${step.path}` as never : "/create/$system"}
                  params={{ system }}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition ${
                    isActive
                      ? "border-primary bg-primary/15 text-primary [box-shadow:var(--glow-neon-sm)]"
                      : isPast
                        ? "border-primary/40 bg-secondary/60 text-foreground hover:border-primary/70"
                        : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <span className="font-display text-[10px]">{step.num}</span>
                  <span className="uppercase tracking-widest text-[10px]">{step.label}</span>
                </Link>
                {i < STEPS.length - 1 && (
                  <span className="text-primary/30">·</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <Outlet />
      </div>
    </main>
  );
}
