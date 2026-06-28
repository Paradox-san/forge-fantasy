import { createFileRoute } from "@tanstack/react-router";
import { ALIGNMENTS, BACKGROUNDS } from "@/lib/dnd-data";
import { useCharacter } from "@/lib/character-store";
import { Field, NavRow } from "./create.$system.index";

export const Route = createFileRoute("/create/$system/details")({
  component: DetailsStep,
});

function DetailsStep() {
  const { background, alignment, bio, setField } = useCharacter();

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo V
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Antecedente & Alma</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          De onde veio. O que move. Toques finais antes da forja.
        </p>
      </header>

      <div className="rune-panel mx-auto max-w-2xl rounded-xl p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Antecedente">
            <select
              value={background}
              onChange={(e) => setField("background", e.target.value)}
              className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
            >
              <option value="">Selecione…</option>
              {BACKGROUNDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tendência">
            <select
              value={alignment}
              onChange={(e) => setField("alignment", e.target.value)}
              className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
            >
              <option value="">Selecione…</option>
              {ALIGNMENTS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="mt-5">
          <Field label="História breve">
            <textarea
              value={bio}
              onChange={(e) => setField("bio", e.target.value)}
              rows={5}
              placeholder="Quem é seu personagem? Qual lenda começa aqui?"
              className="w-full resize-none rounded-md border border-border bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </Field>
        </div>
      </div>

      <NavRow prev="abilities" next="sheet" nextLabel="Forjar Ficha ✦" />
    </section>
  );
}
