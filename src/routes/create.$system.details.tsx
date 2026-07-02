import { createFileRoute } from "@tanstack/react-router";
import { ALIGNMENTS, BACKGROUNDS, LANGUAGES, SKILLS, getClass } from "@/lib/dnd-data";
import { useCharacter } from "@/lib/character-store";
import { Field, NavRow } from "./create.$system.index";

export const Route = createFileRoute("/create/$system/details")({
  component: DetailsStep,
});

function DetailsStep() {
  const {
    background, alignment, bio, classId, skills, languages,
    setField, toggleSkill, toggleLanguage,
  } = useCharacter();
  const cls = getClass(classId);
  const skillMax = cls?.skillCount ?? 0;
  const skillOptionKeys = cls?.skillOptions ?? [];

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo V
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Antecedente, Perícias & Idiomas</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Toques finais antes da forja.
        </p>
      </header>

      <div className="rune-panel mx-auto max-w-3xl rounded-xl p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Antecedente">
            <select value={background} onChange={(e) => setField("background", e.target.value)}
              className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none">
              <option value="">Selecione…</option>
              {BACKGROUNDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Tendência">
            <select value={alignment} onChange={(e) => setField("alignment", e.target.value)}
              className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none">
              <option value="">Selecione…</option>
              {ALIGNMENTS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </Field>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-heading text-[11px] uppercase tracking-[0.3em] text-primary/80">
              Perícias {cls ? `(${skills.length}/${skillMax})` : ""}
            </span>
            {!cls && <span className="text-[11px] text-muted-foreground">Escolha uma classe primeiro</span>}
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2 md:grid-cols-3">
            {SKILLS.map((s) => {
              const available = skillOptionKeys.includes(s.key);
              const checked = skills.includes(s.key);
              const disabled = !available || (!checked && skills.length >= skillMax);
              return (
                <label key={s.key} className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition ${
                  checked ? "border-primary/60 bg-primary/10 text-primary"
                  : disabled ? "cursor-not-allowed border-border/40 bg-secondary/20 text-muted-foreground/50"
                  : "border-border bg-secondary/40 text-foreground hover:border-primary/60"
                }`}>
                  <input type="checkbox" className="accent-primary"
                    checked={checked} disabled={disabled}
                    onChange={() => toggleSkill(s.key, skillMax)} />
                  <span className="flex-1">{s.name}</span>
                  <span className="font-mono text-[10px] opacity-60">{s.ability.toUpperCase()}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Languages */}
        <div className="mt-6">
          <span className="font-heading text-[11px] uppercase tracking-[0.3em] text-primary/80">
            Idiomas ({languages.length})
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {LANGUAGES.map((l) => {
              const on = languages.includes(l);
              return (
                <button key={l} type="button" onClick={() => toggleLanguage(l)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    on ? "border-primary/60 bg-primary/15 text-primary"
                       : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/50"
                  }`}>{l}</button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <Field label="História breve">
            <textarea value={bio} onChange={(e) => setField("bio", e.target.value)} rows={4}
              placeholder="Quem é seu personagem? Qual lenda começa aqui?"
              className="w-full resize-none rounded-md border border-border bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" />
          </Field>
        </div>
      </div>

      <NavRow prev="abilities" next="sheet" nextLabel="Forjar Ficha ✦" />
    </section>
  );
}
