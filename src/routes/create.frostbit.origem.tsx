import { createFileRoute } from "@tanstack/react-router";
import { ORIGINS, getOrigin, getSkill } from "@/lib/frostbit-data";
import { useFrostbit } from "@/lib/frostbit-store";
import { NavRow } from "./create.frostbit.index";

export const Route = createFileRoute("/create/frostbit/origem")({
  component: OriginStep,
});

function OriginStep() {
  const { originId, setField } = useFrostbit();
  const origin = originId ? getOrigin(originId) : undefined;

  const pick = (id: string) => {
    setField("originId", id);
    const o = getOrigin(id);
    if (o) setField("skills", [...o.skills]);
  };

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo V · Origem
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">O que você era antes</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A origem concede duas perícias treinadas automaticamente — depois você completa o resto.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ORIGINS.map((o) => {
          const sel = originId === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => pick(o.id)}
              className={`rune-panel rounded-xl p-4 text-left transition ${
                sel
                  ? "border-primary/80 [box-shadow:var(--glow-neon)] -translate-y-0.5"
                  : "hover:-translate-y-0.5 hover:border-primary/60"
              }`}
            >
              <h3 className="font-heading text-base text-foreground">{o.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{o.description}</p>
              <p className="mt-2 font-mono text-[10px] text-primary/80">
                {o.skills.map((s) => getSkill(s).name).join(" · ")}
              </p>
            </button>
          );
        })}
      </div>

      {origin && (
        <div className="rune-panel mt-8 rounded-xl p-5">
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
            {origin.name}
          </h2>
          <p className="mt-2 text-[11px]">
            <span className="text-primary/80">Característica: </span>
            <span className="text-muted-foreground">{origin.feature}</span>
          </p>
          <p className="mt-1 text-[11px]">
            <span className="text-primary/80">Perícias concedidas: </span>
            <span className="text-muted-foreground">
              {origin.skills.map((s) => getSkill(s).name).join(", ")}
            </span>
          </p>
        </div>
      )}

      <NavRow prev="atributos" next="pericias" disabled={!origin} nextLabel="Escolher Perícias" />
    </section>
  );
}
