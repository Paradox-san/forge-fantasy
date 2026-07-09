import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CLASSES, getClass } from "@/lib/dreowacis-data";
import { useDreowacis } from "@/lib/dreowacis-store";
import { NavRow } from "./create.dreowacis.index";

export const Route = createFileRoute("/create/dreowacis/classe")({
  component: ClassStep,
});

function ClassStep() {
  const {
    classId,
    classSubChoiceId,
    classAbilities,
    setField,
    toggleClassAbility,
  } = useDreowacis();

  const cls = useMemo(() => (classId ? getClass(classId) : undefined), [classId]);

  const pickClass = (id: string) => {
    if (id === classId) return;
    setField("classId", id);
    setField("classSubChoiceId", "");
    setField("classAbilities", []);
  };

  const canContinue =
    !!cls &&
    (!cls.subChoice || !!classSubChoiceId) &&
    classAbilities.length === cls.chooseAbilities;

  const grouped: Record<string, typeof CLASSES> = {
    Magia: [],
    Marcial: [],
    Habilidade: [],
  };
  CLASSES.forEach((c) => grouped[c.category].push(c));

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo III · Classe
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Sua vocação em Dreowacis</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sua classe define seu Atributo Chave, dado de vida e como você enfrenta os desafios do mundo.
        </p>
      </header>

      <div className="space-y-8">
        {(["Magia", "Marcial", "Habilidade"] as const).map((cat) => (
          <div key={cat}>
            <p className="mb-3 font-heading text-[11px] uppercase tracking-[0.35em] text-primary/70">
              Classes de {cat}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[cat].map((c) => {
                const sel = classId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => pickClass(c.id)}
                    className={`rune-panel rounded-xl p-4 text-left transition ${
                      sel
                        ? "border-primary/80 [box-shadow:var(--glow-neon)] -translate-y-0.5"
                        : "hover:-translate-y-0.5 hover:border-primary/60"
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-heading text-base text-foreground">{c.name}</h3>
                      <span className="font-mono text-[10px] text-primary/70">d{c.hitDie}</span>
                    </div>
                    {c.altName && (
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {c.altName}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">{c.tagline}</p>
                    <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
                      <span className="rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 font-mono text-primary">
                        Chave: {c.keyAbility.toUpperCase()}
                      </span>
                      {Object.entries(c.attrBonuses).map(([k, v]) => (
                        <span key={k} className="rounded border border-border bg-secondary/50 px-1.5 py-0.5 font-mono text-muted-foreground">
                          +{v} {k.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {cls && (
        <div className="mt-8 space-y-4">
          <div className="rune-panel rounded-xl p-5">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
              {cls.name}{cls.altName ? ` (${cls.altName})` : ""}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{cls.flavor}</p>
            <div className="mt-3 grid gap-2 text-[11px] sm:grid-cols-2">
              <p><span className="text-primary/80">Proficiências: </span>{cls.profs}</p>
              {cls.restriction && (
                <p className="text-destructive/90"><span className="text-primary/80">Restrição: </span>{cls.restriction}</p>
              )}
            </div>
            <div className="mt-3 rounded border border-primary/30 bg-primary/5 p-3">
              <p className="font-heading text-[11px] uppercase tracking-widest text-primary">
                Habilidade Automática · {cls.autoAbility.name}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">{cls.autoAbility.text}</p>
            </div>
          </div>

          {cls.subChoice && (
            <div className="rune-panel rounded-xl p-5">
              <h3 className="mb-3 font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
                {cls.subChoice.label}
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {cls.subChoice.options.map((o) => {
                  const sel = classSubChoiceId === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setField("classSubChoiceId", o.id)}
                      className={`rounded-lg border p-3 text-left text-xs transition ${
                        sel
                          ? "border-primary bg-primary/10 text-primary [box-shadow:var(--glow-neon-sm)]"
                          : "border-border bg-secondary/40 text-foreground hover:border-primary/50"
                      }`}
                    >
                      <p className="font-heading text-sm">{o.name}</p>
                      {o.text && o.text !== "—" && (
                        <p className="mt-1 text-[11px] text-muted-foreground">{o.text}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="rune-panel rounded-xl p-5">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
                Habilidades de Classe · escolha {cls.chooseAbilities}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                {classAbilities.length}/{cls.chooseAbilities}
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {cls.abilities.map((ab) => {
                const sel = classAbilities.includes(ab.id);
                const full = !sel && classAbilities.length >= cls.chooseAbilities;
                return (
                  <button
                    key={ab.id}
                    type="button"
                    disabled={full}
                    onClick={() => toggleClassAbility(ab.id, cls.chooseAbilities)}
                    className={`rounded-lg border p-3 text-left text-xs transition ${
                      sel
                        ? "border-primary bg-primary/10 text-primary [box-shadow:var(--glow-neon-sm)]"
                        : "border-border bg-secondary/40 text-foreground hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                    }`}
                  >
                    <p className="font-heading text-sm">{ab.name}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{ab.text}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <NavRow prev="raca" next="reino" disabled={!canContinue} nextLabel="Escolher Reino" />
    </section>
  );
}
