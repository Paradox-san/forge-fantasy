import { createFileRoute } from "@tanstack/react-router";
import {
  SKILLS, ABILITIES, fmtMod, modifier, proficiencyBonus, getKingdom,
} from "@/lib/dreowacis-data";
import { useDreowacis } from "@/lib/dreowacis-store";
import { NavRow } from "./create.dreowacis.index";

const MAX_SKILLS = 4;

export const Route = createFileRoute("/create/dreowacis/pericias")({
  component: SkillsStep,
});

function SkillsStep() {
  const { skills, toggleSkill, abilities, abilityMethod: _m, level, kingdomId, bio, setField } =
    useDreowacis();
  const kingdom = kingdomId ? getKingdom(kingdomId) : undefined;
  const prof = proficiencyBonus(level);

  const total = (abilityKey: (typeof ABILITIES)[number]["key"], trained: boolean) => {
    const base = abilities[abilityKey];
    const bonus = kingdom?.bonusAbility === abilityKey ? 1 : 0;
    return modifier(base + bonus) + (trained ? prof : 0);
  };

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo V · Perícias
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Treinamento e Ofício</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Escolha até {MAX_SKILLS} perícias treinadas. Bônus de proficiência atual:{" "}
          <span className="font-mono text-primary">+{prof}</span>
        </p>
      </header>

      <div className="mx-auto max-w-4xl">
        <div className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((sk) => {
            const trained = skills.includes(sk.key);
            const mod = total(sk.ability, trained);
            return (
              <button
                key={sk.key}
                type="button"
                onClick={() => toggleSkill(sk.key, MAX_SKILLS)}
                disabled={!trained && skills.length >= MAX_SKILLS}
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
                  </p>
                </div>
                <span className="font-mono text-lg">{fmtMod(mod)}</span>
              </button>
            );
          })}
        </div>

        <div className="rune-panel rounded-xl p-6">
          <label className="mb-2 block font-heading text-[11px] uppercase tracking-[0.3em] text-primary/80">
            Biografia / Motivo
          </label>
          <textarea
            value={bio}
            onChange={(e) => setField("bio", e.target.value)}
            placeholder="Um parágrafo sobre o passado do seu personagem em Dreowacis…"
            rows={5}
            className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <NavRow prev="atributos" next="antecedente" nextLabel="Escolher Antecedente" />
    </section>
  );
}
