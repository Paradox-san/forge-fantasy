import { createFileRoute } from "@tanstack/react-router";
import {
  SKILLS, LANGUAGES, fmtMod, modifier, proficiencyBonus,
  speciesAttributeBonus, getClass, getOrigin, getSpecies,
} from "@/lib/frostbit-data";
import { useFrostbit } from "@/lib/frostbit-store";
import { NavRow } from "./create.frostbit.index";

export const Route = createFileRoute("/create/frostbit/pericias")({
  component: SkillsStep,
});

function SkillsStep() {
  const s = useFrostbit();
  const cls = s.classId ? getClass(s.classId) : undefined;
  const origin = s.originId ? getOrigin(s.originId) : undefined;
  const sp = s.speciesId ? getSpecies(s.speciesId) : undefined;
  const prof = proficiencyBonus(s.level);

  const originSkills = origin?.skills ?? [];
  const extraHuman = s.speciesId === "humano" ? 1 : 0;
  const maxSkills = originSkills.length + (cls?.skillCount ?? 2) + extraHuman;

  const total = (key: (typeof SKILLS)[number]["ability"], trained: boolean) => {
    const base = s.abilities[key] + (s.speciesId ? speciesAttributeBonus(s.speciesId, s.speciesVariantId, key) : 0);
    return modifier(base) + (trained ? prof : 0);
  };

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo VI · Perícias
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Ofício e Treinamento</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Até {maxSkills} perícias treinadas ({originSkills.length} da origem +{" "}
          {cls?.skillCount ?? 2} da classe{extraHuman ? " + 1 humano" : ""}). Proficiência:{" "}
          <span className="font-mono text-primary">+{prof}</span>
        </p>
      </header>

      <div className="mx-auto max-w-4xl">
        <div className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((sk) => {
            const trained = s.skills.includes(sk.key);
            const fromOrigin = originSkills.includes(sk.key);
            const mod = total(sk.ability, trained);
            return (
              <button
                key={sk.key}
                type="button"
                onClick={() => s.toggleSkill(sk.key, maxSkills)}
                disabled={(!trained && s.skills.length >= maxSkills) || fromOrigin}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition ${
                  trained
                    ? "border-primary bg-primary/10 text-primary [box-shadow:var(--glow-neon-sm)]"
                    : "border-border bg-secondary/40 text-foreground hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                }`}
              >
                <div>
                  <p className="font-heading text-sm">{sk.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {sk.ability.toUpperCase()}
                    {fromOrigin ? " · origem" : ""}
                  </p>
                </div>
                <span className="font-mono text-lg">{fmtMod(mod)}</span>
              </button>
            );
          })}
        </div>

        <div className="rune-panel mb-6 rounded-xl p-6">
          <p className="mb-3 font-heading text-[11px] uppercase tracking-[0.3em] text-primary/80">
            Idiomas {sp ? `· nativos: ${sp.languages.join(", ")}` : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => {
              const on = s.languages.includes(l);
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => s.toggleLanguage(l)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    on
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rune-panel rounded-xl p-6">
          <label className="mb-2 block font-heading text-[11px] uppercase tracking-[0.3em] text-primary/80">
            Biografia / Motivo
          </label>
          <textarea
            value={s.bio}
            onChange={(e) => s.setField("bio", e.target.value)}
            placeholder="O que te fez sair do abrigo…"
            rows={5}
            className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <NavRow prev="origem" next="ficha" nextLabel="Ver Ficha" />
    </section>
  );
}
