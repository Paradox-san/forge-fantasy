import { createFileRoute } from "@tanstack/react-router";
import { KINGDOMS } from "@/lib/dreowacis-data";
import { useDreowacis } from "@/lib/dreowacis-store";
import { NavRow } from "./create.dreowacis.index";

export const Route = createFileRoute("/create/dreowacis/reino")({
  component: KingdomStep,
});

function KingdomStep() {
  const { kingdomId, setField } = useDreowacis();

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo II · Reino
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">De onde você vem?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Quatro nações disputam o continente. Cinco, se contar Dracmead.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KINGDOMS.map((k) => {
          const selected = kingdomId === k.id;
          return (
            <button
              key={k.id}
              type="button"
              onClick={() => setField("kingdomId", k.id)}
              className={`rune-panel relative overflow-hidden rounded-xl p-5 text-left transition ${
                selected ? "-translate-y-0.5" : "hover:-translate-y-0.5 hover:border-primary/60"
              }`}
              style={
                selected
                  ? {
                      borderColor: k.themeColor,
                      boxShadow: `0 0 24px ${k.themeColor}55, inset 0 0 30px ${k.themeColor}22`,
                    }
                  : undefined
              }
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-30 blur-2xl"
                style={{ background: k.themeColor }}
              />
              <div className="relative flex items-baseline justify-between">
                <h3 className="font-heading text-lg text-foreground">{k.name}</h3>
                {selected && (
                  <span
                    className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest"
                    style={{
                      borderColor: k.themeColor,
                      color: k.themeColor,
                      background: `${k.themeColor}1a`,
                    }}
                  >
                    Origem
                  </span>
                )}
              </div>
              <p className="relative mt-1 text-[11px] uppercase tracking-[0.25em] text-primary/70">
                {k.tagline}
              </p>
              <p className="relative mt-3 text-sm text-muted-foreground">{k.description}</p>
              <div className="relative mt-4 flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded border border-border bg-secondary/60 px-2 py-0.5 text-muted-foreground">
                  Idioma: {k.language}
                </span>
                <span
                  className="rounded border px-2 py-0.5 font-mono"
                  style={{
                    borderColor: `${k.themeColor}66`,
                    color: k.themeColor,
                    background: `${k.themeColor}14`,
                  }}
                >
                  +1 {k.bonusAbility.toUpperCase()}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <NavRow prev="" next="devocao" disabled={!kingdomId} nextLabel="Escolher Devoção" />
    </section>
  );
}
