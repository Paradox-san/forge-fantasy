import { createFileRoute } from "@tanstack/react-router";
import { RACES, fmtMod } from "@/lib/dnd-data";
import { useCharacter } from "@/lib/character-store";
import { NavRow } from "./create.$system.index";

export const Route = createFileRoute("/create/$system/race")({
  component: RaceStep,
});

function RaceStep() {
  const { raceId, setField } = useCharacter();

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo II
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Escolha sua Linhagem</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O sangue lembra. Cada povo carrega seus dons antigos.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RACES.map((race) => {
          const selected = raceId === race.id;
          return (
            <button
              key={race.id}
              type="button"
              onClick={() => setField("raceId", race.id)}
              className={`rune-panel relative rounded-xl p-5 text-left transition ${
                selected
                  ? "border-primary/80 [box-shadow:var(--glow-neon)] -translate-y-0.5"
                  : "hover:-translate-y-0.5 hover:border-primary/60"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-lg text-foreground">{race.name}</h3>
                {selected && (
                  <span className="rounded-full border border-primary bg-primary/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                    Escolhido
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{race.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {Object.entries(race.bonuses).map(([k, v]) => (
                  <span
                    key={k}
                    className="rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary"
                  >
                    {k.toUpperCase()} {fmtMod(v)}
                  </span>
                ))}
                <span className="rounded border border-border bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {race.speed}m
                </span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1 text-[11px] text-muted-foreground">
                {race.traits.map((t) => (
                  <li key={t} className="rounded bg-secondary/40 px-1.5 py-0.5">
                    {t}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <NavRow prev="" next="class" disabled={!raceId} nextLabel="Escolher Vocação" />
    </section>
  );
}
