import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ABILITIES, STANDARD_ARRAY, POINT_BUY_COST, POINT_BUY_TOTAL,
  fmtMod, modifier, rollAbility, speciesAttributeBonus, getSpecies,
} from "@/lib/frostbit-data";
import { useFrostbit } from "@/lib/frostbit-store";
import { NavRow } from "./create.frostbit.index";

export const Route = createFileRoute("/create/frostbit/atributos")({
  component: AbilitiesStep,
});

const METHODS = [
  { id: "standard", label: "Conjunto Padrão" },
  { id: "random", label: "Geração Aleatória" },
  { id: "pointbuy", label: "Custo de Pontos" },
] as const;

function AbilitiesStep() {
  const { abilities, abilityMethod, speciesId, speciesVariantId, setAbility, setField } =
    useFrostbit();
  const sp = speciesId ? getSpecies(speciesId) : undefined;

  const remaining = useMemo(() => {
    if (abilityMethod !== "standard") return [];
    const counts: Record<number, number> = {};
    STANDARD_ARRAY.forEach((v) => (counts[v] = (counts[v] ?? 0) + 1));
    ABILITIES.map((a) => abilities[a.key]).forEach((v) => {
      if (counts[v]) counts[v]--;
    });
    return STANDARD_ARRAY.filter((v) => counts[v] > 0);
  }, [abilities, abilityMethod]);

  const pointsSpent = useMemo(() => {
    if (abilityMethod !== "pointbuy") return 0;
    return ABILITIES.reduce((s, a) => s + (POINT_BUY_COST[abilities[a.key]] ?? 0), 0);
  }, [abilities, abilityMethod]);
  const pointsLeft = POINT_BUY_TOTAL - pointsSpent;

  const chooseMethod = (m: (typeof METHODS)[number]["id"]) => {
    setField("abilityMethod", m);
    if (m === "standard") ABILITIES.forEach((a, i) => setAbility(a.key, STANDARD_ARRAY[i] ?? 10));
    else if (m === "pointbuy") ABILITIES.forEach((a) => setAbility(a.key, 8));
    else ABILITIES.forEach((a) => setAbility(a.key, rollAbility()));
  };

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo IV · Atributos
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Os Seis Atributos</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Modificador = (valor − 10) ÷ 2, arredondando para baixo. Bônus de espécie já somados.
        </p>
      </header>

      <div className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        {METHODS.map((m) => {
          const active = abilityMethod === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => chooseMethod(m.id)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition ${
                active
                  ? "border-primary bg-primary/20 text-primary [box-shadow:var(--glow-neon-sm)]"
                  : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/60"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-secondary/30 px-4 py-3">
          {abilityMethod === "standard" && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Disponíveis:
              </span>
              {STANDARD_ARRAY.map((v, i) => {
                const ok = remaining.includes(v);
                return (
                  <span
                    key={i}
                    className={`rounded border px-2 py-0.5 font-mono text-xs ${
                      ok
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border bg-secondary/30 text-muted-foreground/60 line-through"
                    }`}
                  >
                    {v}
                  </span>
                );
              })}
            </div>
          )}
          {abilityMethod === "random" && (
            <>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                4d6, descarte o menor. Total:{" "}
                <span className="font-mono text-primary">
                  {ABILITIES.reduce((s, a) => s + abilities[a.key], 0)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => ABILITIES.forEach((a) => setAbility(a.key, rollAbility()))}
                className="rounded-md border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs uppercase tracking-widest text-primary hover:bg-primary/20"
              >
                ↻ Rolar todos
              </button>
            </>
          )}
          {abilityMethod === "pointbuy" && (
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Pontos:{" "}
              <span className={`font-mono ${pointsLeft < 0 ? "text-destructive" : "text-primary"}`}>
                {pointsLeft}
              </span>{" "}
              / {POINT_BUY_TOTAL} — valores 8–15
            </span>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ABILITIES.map((a) => {
            const base = abilities[a.key];
            const bonus = speciesId ? speciesAttributeBonus(speciesId, speciesVariantId, a.key) : 0;
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
                  {abilityMethod === "standard" && (
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
                  )}
                  {abilityMethod === "random" && (
                    <div className="flex flex-1 items-center gap-2">
                      <span className="flex-1 rounded-md border border-border bg-input/60 px-3 py-2 font-mono text-lg text-foreground">
                        {base}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAbility(a.key, rollAbility())}
                        className="rounded-md border border-primary/50 bg-primary/10 px-2 py-2 text-xs text-primary hover:bg-primary/20"
                      >
                        ↻
                      </button>
                    </div>
                  )}
                  {abilityMethod === "pointbuy" && (
                    <div className="flex flex-1 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAbility(a.key, Math.max(8, base - 1))}
                        className="rounded-md border border-border bg-secondary/60 px-3 py-2 text-primary hover:border-primary"
                      >
                        −
                      </button>
                      <span className="flex-1 rounded-md border border-border bg-input/60 px-3 py-2 text-center font-mono text-lg text-foreground">
                        {base}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = base + 1;
                          if (next > 15) return;
                          const nextCost = POINT_BUY_COST[next] ?? 99;
                          const curCost = POINT_BUY_COST[base] ?? 0;
                          if (pointsSpent - curCost + nextCost > POINT_BUY_TOTAL) return;
                          setAbility(a.key, next);
                        }}
                        className="rounded-md border border-border bg-secondary/60 px-3 py-2 text-primary hover:border-primary"
                      >
                        +
                      </button>
                    </div>
                  )}
                  <div className="text-right">
                    <p className="font-display text-3xl text-primary text-glow-soft">
                      {fmtMod(mod)}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">mod</p>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {base} {bonus !== 0 ? `${bonus > 0 ? "+" : "−"} ${Math.abs(bonus)} (${sp?.name})` : ""} ={" "}
                  <span className="text-foreground">{total}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <NavRow prev="classe" next="origem" nextLabel="Escolher Origem" />
    </section>
  );
}
