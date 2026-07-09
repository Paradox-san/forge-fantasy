import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { getSystem } from "@/lib/systems";

export const Route = createFileRoute("/create/dreowacis")({
  component: DreowacisLayout,
});

const STEPS = [
  { path: "", label: "Identidade", num: "I" },
  { path: "raca", label: "Raça", num: "II" },
  { path: "classe", label: "Classe", num: "III" },
  { path: "reino", label: "Reino", num: "IV" },
  { path: "devocao", label: "Devoção", num: "V" },
  { path: "atributos", label: "Atributos", num: "VI" },
  { path: "antecedente", label: "Antecedente", num: "VII" },
  { path: "pericias", label: "Perícias", num: "VIII" },
  { path: "ficha", label: "Ficha", num: "✦" },
];


function DreowacisLayout() {
  const sys = getSystem("dreowacis");
  const location = useLocation();

  useEffect(() => {
    document.body.setAttribute("data-system-bg", sys.id);
    document.body.style.setProperty("--system-bg", sys.theme.pageBg);
    return () => {
      document.body.removeAttribute("data-system-bg");
      document.body.style.removeProperty("--system-bg");
    };
  }, [sys.id, sys.theme.pageBg]);

  const current = location.pathname.split("/create/dreowacis")[1]?.replace("/", "") ?? "";

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

      <nav className="mx-auto max-w-6xl px-6 pt-8">
        <ol className="flex flex-wrap items-center justify-center gap-2 text-xs md:gap-3">
          {STEPS.map((step, i) => {
            const isActive = current === step.path;
            const isPast = STEPS.findIndex((s) => s.path === current) > i;
            const to = step.path
              ? (`/create/dreowacis/${step.path}` as const)
              : ("/create/dreowacis" as const);
            return (
              <li key={step.path} className="flex items-center gap-2">
                <Link
                  to={to}
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
                {i < STEPS.length - 1 && <span className="text-primary/30">·</span>}
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
