import { createFileRoute } from "@tanstack/react-router";
import { DEITIES } from "@/lib/dreowacis-data";
import { useDreowacis } from "@/lib/dreowacis-store";
import { NavRow } from "./create.dreowacis.index";

export const Route = createFileRoute("/create/dreowacis/devocao")({
  component: DeityStep,
});

function DeityStep() {
  const { deityId, setField } = useDreowacis();

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo III · Devoção
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">A quem você jura fé?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Os deuses são os seres de maior influência em Dreowacis — a devoção também pode ser nenhuma.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          type="button"
          onClick={() => setField("deityId", "nenhum")}
          className={`rune-panel rounded-xl p-5 text-left transition ${
            deityId === "nenhum" ? "border-primary/80 [box-shadow:var(--glow-neon)]" : "hover:border-primary/60"
          }`}
        >
          <h3 className="font-heading text-lg text-foreground">Sem Devoção</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            O universo é grande. Talvez você não escolha lado — ou talvez ainda não tenha escolhido.
          </p>
        </button>
        {DEITIES.map((d) => {
          const selected = deityId === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setField("deityId", d.id)}
              className={`rune-panel rounded-xl p-5 text-left transition ${
                selected
                  ? "border-primary/80 [box-shadow:var(--glow-neon)] -translate-y-0.5"
                  : "hover:-translate-y-0.5 hover:border-primary/60"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-lg text-foreground">{d.name}</h3>
                {selected && (
                  <span className="rounded-full border border-primary bg-primary/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                    Devoto
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-primary/70">{d.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{d.domain}</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded border border-border bg-secondary/60 px-2 py-0.5 text-muted-foreground">
                  {d.alignment}
                </span>
                <span className="rounded border border-border bg-secondary/60 px-2 py-0.5 text-muted-foreground">
                  {d.colors}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <NavRow prev="reino" next="atributos" disabled={!deityId} nextLabel="Distribuir Atributos" />
    </section>
  );
}
