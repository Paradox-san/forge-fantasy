import { createFileRoute } from "@tanstack/react-router";
import { BACKGROUNDS, BACKGROUND_SKILLS } from "@/lib/dreowacis-data";
import { useDreowacis } from "@/lib/dreowacis-store";
import { NavRow } from "./create.dreowacis.index";

export const Route = createFileRoute("/create/dreowacis/antecedente")({
  component: BackgroundStep,
});

function BackgroundStep() {
  const { backgroundId, setField } = useDreowacis();

  const pick = (id: string) => {
    setField("backgroundId", id);
    // Preenche automaticamente as perícias concedidas pelo antecedente
    const grants = BACKGROUND_SKILLS[id] ?? [];
    setField("skills", grants);
  };

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo VII · Antecedente
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">O que veio antes da aventura?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cada antecedente entrega item inicial, proficiências e uma habilidade de suporte única.
          As perícias concedidas serão marcadas automaticamente no próximo passo.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BACKGROUNDS.map((b) => {
          const selected = backgroundId === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => pick(b.id)}
              className={`rune-panel rounded-xl p-5 text-left transition ${
                selected
                  ? "border-primary/80 [box-shadow:var(--glow-neon)] -translate-y-0.5"
                  : "hover:-translate-y-0.5 hover:border-primary/60"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-lg text-foreground">{b.name}</h3>
                {selected && (
                  <span className="rounded-full border border-primary bg-primary/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                    Escolhido
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{b.flavor}</p>
              <div className="mt-3 space-y-1.5 text-[11px]">
                <p className="text-muted-foreground">
                  <span className="text-primary/80">Item: </span>{b.item}
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary/80">Proficiências: </span>{b.proficiencies}
                </p>
                {b.languages && (
                  <p className="text-muted-foreground">
                    <span className="text-primary/80">Idiomas: </span>{b.languages}
                  </p>
                )}
              </div>
              <div className="mt-3 rounded border border-primary/30 bg-primary/5 p-2">
                <p className="font-heading text-[11px] uppercase tracking-widest text-primary">
                  {b.supportName}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{b.supportText}</p>
              </div>
            </button>
          );
        })}
      </div>

      <NavRow prev="atributos" next="pericias" disabled={!backgroundId} nextLabel="Ajustar Perícias" />
    </section>
  );
}
