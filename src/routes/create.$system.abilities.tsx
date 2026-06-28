import { createFileRoute } from "@tanstack/react-router";
import { ABILITIES, STANDARD_ARRAY, fmtMod, modifier, getRace } from "@/lib/dnd-data";
import { useCharacter } from "@/lib/character-store";
import { NavRow } from "./create.$system.index";
import { useMemo } from "react";

export const Route = createFileRoute("/create/$system/abilities")({
  component: AbilitiesStep,
});

function AbilitiesStep() {
  const { abilities, raceId, setAbility } = useCharacter();
  const race = getRace(raceId);

  const used = useMemo(() => {
    return ABILITIES.map((a) => abilities[a.key]).filter((v) => v > 0);
  }, [abilities]);

  const remaining = useMemo(() => {
    const counts: Record<number, number> = {};
    STANDARD_ARRAY.forEach((v) => (counts[v] = (counts[v] ?? 0) + 1));
    used.forEach((v) => {
      if (counts[v]) counts[v]--;
    });
    return STANDARD_ARRAY.filter((v) => counts[v] > 0);
  }, [used]);

  const assignAuto = () => {
    ABILITIES.forEach((a, i) => setAbility(a.key, STANDARD_ARRAY[i] ?? 10));
  };

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo IV
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Forje seus Atributos</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use o array padrão (15, 14, 13, 12, 10, 8). Bônus raciais somam ao final.
        </p>
      </header>

      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Disponíveis:</span>
            {STANDARD_ARRAY.map((v, i) => {
              const isAvailable = remaining.includes(v);
              return (
                <span
                  key={i}
                  className={`rounded border px-2 py-0.5 font-mono text-xs ${
                    isAvailable
                      ? "border-primary/60 bg-primary/10 text-primary"
                      : "border-border bg-secondary/30 text-muted-foreground/60 line-through"
                  }`}
                >
                  {v}
                </span>
              );
            })}
          </div>
          <button
            type="button"
            onClick={assignAuto}
            className="rounded-md border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs uppercase tracking-widest text-primary hover:bg-primary/20"
          >
            ✦ Distribuir auto
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ABILITIES.map((a) => {
            const base = abilities[a.key];
            const bonus = race?.bonuses[a.key] ?? 0;
            const total = base + bonus;
            const mod = modifier(total);
            return (
              <div key={a.key} className="rune-panel rounded-xl p-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-heading text-xs uppercase tracking-[0.3em] text-primary/80">
                    {a.short}
                  </span>
                  <span className="text-xs text-muted-foreground">{a.name}</span>
                </div>
                <div className="mt-3 flex items-end gap-3">
                  <select
                    value={base}
                    onChange={(e) => setAbility(a.key, Number(e.target.value))}
                    className="flex-1 rounded-md border border-border bg-input/60 px-3 py-2 font-mono text-lg text-foreground focus:border-primary focus:outline-none"
                  >
                    {STANDARD_ARRAY.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                    {!STANDARD_ARRAY.includes(base) && <option value={base}>{base}</option>}
                  </select>
                  <div className="text-right">
                    <p className="font-display text-3xl text-primary text-glow-soft">
                      {fmtMod(mod)}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      mod
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {base} {bonus > 0 ? `+ ${bonus} (raça)` : ""} = <span className="text-foreground">{total}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <NavRow prev="class" next="details" nextLabel="Últimos toques" />
    </section>
  );
}
