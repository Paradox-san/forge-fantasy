import { createFileRoute } from "@tanstack/react-router";
import { COMMON_CLASSES, SPECIAL_CLASSES, getClass, getSkill } from "@/lib/frostbit-data";
import { useFrostbit } from "@/lib/frostbit-store";
import { NavRow } from "./create.frostbit.index";
import { useState } from "react";

export const Route = createFileRoute("/create/frostbit/classe")({
  component: ClassStep,
});

function ClassStep() {
  const { classId, subclassId, setField } = useFrostbit();
  const cls = classId ? getClass(classId) : undefined;
  const [showSpecialClass, setShowSpecialClass] = useState(false);

  const pick = (id: string) => {
    if (id === classId) return;
    setField("classId", id);
    setField("subclassId", "");
    setField("skills", []);
  };

  const canContinue = !!cls && !!subclassId;

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo III · Classe
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Como você sobrevive</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Em Frostbit a subclasse é escolhida já no nível 1 — o inverno não espera você amadurecer.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COMMON_CLASSES.map((c) => {
          const sel = classId === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => pick(c.id)}
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
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.tagline}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{c.flavor}</p>
              <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
                <span className="rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 font-mono text-primary">
                  Chave: {c.keyAbility.toUpperCase()}
                </span>
                <span className="rounded border border-border bg-secondary/50 px-1.5 py-0.5 font-mono text-muted-foreground">
                  Salv: {c.saves.map((s) => s.toUpperCase()).join("/")}
                </span>
                {c.caster && (
                  <span className="rounded border border-border bg-secondary/50 px-1.5 py-0.5 font-mono text-muted-foreground">
                    conjurador
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-8">
  <div className="mb-3 flex items-center justify-between gap-3">
    <p className="font-heading text-[11px] uppercase tracking-[0.35em] text-primary/70">
      Classes Especiais
    </p>
    <button
      type="button"
      onClick={() => setshowSpecialClass(!showSpecialClass)}
      className="rounded-md border border-primary/50 bg-primary/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-primary hover:bg-primary/20"
    >
      {showSpecialClass ? "Ocultar" : "Revelar (requer aval do mestre)"}
    </button>
  </div>
  {showSpecialClass ? (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {SPECIAL_CLASSES.map((c) => (
        <ClassCard key={c.id} c={c} />
      ))}
    </div>
  ) : (
    <p className="rounded-lg border border-dashed border-border/70 bg-secondary/20 px-4 py-6 text-center text-xs text-muted-foreground">
      Algumas classes só se revelam para quem as procura.
    </p>
  )}
</div>

      {cls && (
        <div className="mt-8 space-y-4">
          <div className="rune-panel rounded-xl p-5">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
              {cls.name}
            </h2>
            <p className="mt-2 text-[11px]">
              <span className="text-primary/80">Proficiências: </span>
              <span className="text-muted-foreground">{cls.profs}</span>
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-primary/80">Perícias: </span>
              <span className="text-muted-foreground">
                escolha {cls.skillCount} entre {cls.skillOptions.map((s) => getSkill(s).name).join(", ")}
              </span>
            </p>
            <ul className="mt-3 flex flex-wrap gap-2 text-[10px]">
              {cls.features.map((f) => (
                <li
                  key={f}
                  className="rounded border border-border bg-secondary/40 px-2 py-0.5 text-muted-foreground"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="rune-panel rounded-xl p-5">
            <h3 className="mb-3 font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
              {cls.subclassLabel}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {cls.subclasses.map((sc) => {
                const sel = subclassId === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setField("subclassId", sc.id)}
                    className={`rounded-lg border p-3 text-left text-xs transition ${
                      sel
                        ? "border-primary bg-primary/10 text-primary [box-shadow:var(--glow-neon-sm)]"
                        : "border-border bg-secondary/40 text-foreground hover:border-primary/50"
                    }`}
                  >
                    <p className="font-heading text-sm">{sc.name}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{sc.text}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <NavRow prev="especie" next="atributos" disabled={!canContinue} nextLabel="Definir Atributos" />
    </section>
  );
}
