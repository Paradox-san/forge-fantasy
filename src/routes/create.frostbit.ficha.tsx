import { createFileRoute } from "@tanstack/react-router";
import {
  ABILITIES, SKILLS, modifier, fmtMod, proficiencyBonus,
  speciesAttributeBonus, getSpecies, getSpeciesVariant, getClass, getOrigin,
  type AbilityKey,
} from "@/lib/frostbit-data";
import { useFrostbit, type Attack, type SpellEntry } from "@/lib/frostbit-store";
import { NavRow } from "./create.frostbit.index";

export const Route = createFileRoute("/create/frostbit/ficha")({
  component: SheetStep,
});

const newAttack = (): Attack => ({
  id: crypto.randomUUID(), name: "", bonus: "+0", damage: "1d6", notes: "",
});
const newSpell = (): SpellEntry => ({
  id: crypto.randomUUID(), name: "", level: "1", school: "", effect: "",
});

function SheetStep() {
  const s = useFrostbit();
  const sp = s.speciesId ? getSpecies(s.speciesId) : undefined;
  const variant = s.speciesId && s.speciesVariantId ? getSpeciesVariant(s.speciesId, s.speciesVariantId) : undefined;
  const cls = s.classId ? getClass(s.classId) : undefined;
  const subclass = cls?.subclasses.find((x) => x.id === s.subclassId);
  const origin = s.originId ? getOrigin(s.originId) : undefined;
  const prof = proficiencyBonus(s.level);

  const totalAbility = (k: AbilityKey) =>
    s.abilities[k] + (s.speciesId ? speciesAttributeBonus(s.speciesId, s.speciesVariantId, k) : 0);

  const conMod = modifier(totalAbility("con"));
  const dexMod = modifier(totalAbility("des"));
  const hitDie = cls?.hitDie ?? 8;
  const perLevel = Math.floor(hitDie / 2) + 1 + conMod;
  const hpMax = hitDie + conMod + Math.max(0, s.level - 1) * perLevel;
  const ac = 10 + dexMod;
  const initiative = dexMod;
  const keyMod = modifier(totalAbility(cls?.keyAbility ?? "int"));
  const spellDc = 8 + prof + keyMod;
  const passivePerception =
    10 + modifier(totalAbility("sab")) + (s.skills.includes("percepcao") ? prof : 0);

  const setAttack = (id: string, patch: Partial<Attack>) =>
    s.setAttacks(s.attacks.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const setSpell = (id: string, patch: Partial<SpellEntry>) =>
    s.setSpells(s.spells.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  return (
    <section>
      <header className="mb-6 text-center no-print">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo Final · Ficha
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Ficha de Frostbit</h1>
      </header>

      <div className="mb-4 flex justify-center gap-2 no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-xs uppercase tracking-widest text-primary hover:bg-primary/20"
        >
          ⬇ Baixar PDF
        </button>
        <button
          type="button"
          onClick={() => s.reset()}
          className="rounded-md border border-border bg-secondary/50 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-primary/50"
        >
          ↺ Nova Ficha
        </button>
      </div>

      <div className="sheet-print-area space-y-4">
        {/* Cabeçalho */}
        <div className="rune-panel rounded-xl p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl text-foreground">{s.name || "Sem nome"}</h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {sp?.name ?? "—"}
                {variant ? ` (${variant.name})` : ""} · {cls?.name ?? "—"}
                {subclass ? ` · ${subclass.name}` : ""} · Nível {s.level}
              </p>
            </div>
            <div className="text-right text-[11px] text-muted-foreground">
              <p>Jogador: {s.player || "—"}</p>
              <p>Origem: {origin?.name ?? "—"}</p>
              <p>Proficiência: <span className="font-mono text-primary">+{prof}</span></p>
            </div>
          </div>
        </div>

        {/* Estatísticas de combate */}
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Stat label="Classe de Armadura" value={`${ac}`} hint="10 + DES" />
          <Stat label="Iniciativa" value={fmtMod(initiative)} hint="mod DES" />
          <Stat label="Pontos de Vida" value={`${hpMax}`} hint={`d${hitDie} + CON`} />
          <Stat label="Dados de Vida" value={`${s.level}d${hitDie}`} hint="por descanso longo" />
          <Stat label="Percepção Passiva" value={`${passivePerception}`} hint="10 + SAB" />
        </div>

        {/* Atributos */}
        <div className="rune-panel rounded-xl p-5">
          <h3 className="mb-3 font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
            Atributos
          </h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {ABILITIES.map((a) => {
              const t = totalAbility(a.key);
              return (
                <div key={a.key} className="rounded-lg border border-border bg-secondary/40 p-3 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{a.short}</p>
                  <p className="font-display text-2xl text-primary">{fmtMod(modifier(t))}</p>
                  <p className="font-mono text-[11px] text-foreground">{t}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Salvaguardas e perícias */}
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rune-panel rounded-xl p-5">
            <h3 className="mb-3 font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
              Salvaguardas
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {ABILITIES.map((a) => {
                const on = cls?.saves.includes(a.key) ?? false;
                const v = modifier(totalAbility(a.key)) + (on ? prof : 0);
                return (
                  <div
                    key={a.key}
                    className={`flex items-center justify-between rounded border px-3 py-1.5 text-xs ${
                      on ? "border-primary/60 bg-primary/10 text-primary" : "border-border bg-secondary/30 text-muted-foreground"
                    }`}
                  >
                    <span>{a.name}</span>
                    <span className="font-mono">{fmtMod(v)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rune-panel rounded-xl p-5">
            <h3 className="mb-3 font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
              Perícias
            </h3>
            <div className="grid gap-1 sm:grid-cols-2">
              {SKILLS.map((sk) => {
                const on = s.skills.includes(sk.key);
                const v = modifier(totalAbility(sk.ability)) + (on ? prof : 0);
                return (
                  <div
                    key={sk.key}
                    className={`flex items-center justify-between rounded px-2 py-1 text-[11px] ${
                      on ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <span>
                      {on ? "◆" : "◇"} {sk.name}
                    </span>
                    <span className="font-mono">{fmtMod(v)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Traços */}
        <div className="rune-panel rounded-xl p-5">
          <h3 className="mb-3 font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
            Traços, Classe e Origem
          </h3>
          <div className="grid gap-3 text-[11px] text-muted-foreground sm:grid-cols-3">
            <div>
              <p className="mb-1 text-primary/80">Espécie · {sp?.name ?? "—"}</p>
              <ul className="space-y-1">
                {sp?.traits.map((t) => <li key={t}>· {t}</li>)}
                {variant && <li className="text-primary/90">· {variant.trait}</li>}
              </ul>
            </div>
            <div>
              <p className="mb-1 text-primary/80">Classe · {cls?.name ?? "—"}</p>
              <ul className="space-y-1">
                {cls?.features.map((f) => <li key={f}>· {f}</li>)}
                {subclass && <li className="text-primary/90">· {subclass.name}: {subclass.text}</li>}
              </ul>
            </div>
            <div>
              <p className="mb-1 text-primary/80">Origem · {origin?.name ?? "—"}</p>
              <p>{origin?.feature ?? "—"}</p>
              <p className="mt-2 text-primary/80">Idiomas</p>
              <p>{[...(sp?.languages ?? []), ...s.languages].join(", ") || "—"}</p>
            </div>
          </div>
          {s.bio && (
            <p className="mt-3 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
              {s.bio}
            </p>
          )}
        </div>

        {/* Ataques */}
        <div className="rune-panel rounded-xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
              Ataques
            </h3>
            <button
              type="button"
              onClick={() => s.setAttacks([...s.attacks, newAttack()])}
              className="rounded border border-primary/50 bg-primary/10 px-2 py-1 text-[10px] uppercase tracking-widest text-primary no-print hover:bg-primary/20"
            >
              + Adicionar
            </button>
          </div>
          {s.attacks.length === 0 ? (
            <p className="text-[11px] text-muted-foreground">Nenhum ataque adicionado.</p>
          ) : (
            <div className="space-y-2">
              {s.attacks.map((a) => (
                <div key={a.id} className="grid gap-2 sm:grid-cols-[2fr_.7fr_1fr_2fr_auto]">
                  <SheetInput value={a.name} onChange={(v) => setAttack(a.id, { name: v })} placeholder="Nome" />
                  <SheetInput value={a.bonus} onChange={(v) => setAttack(a.id, { bonus: v })} placeholder="+0" />
                  <SheetInput value={a.damage} onChange={(v) => setAttack(a.id, { damage: v })} placeholder="1d8" />
                  <SheetInput value={a.notes} onChange={(v) => setAttack(a.id, { notes: v })} placeholder="Notas" />
                  <button
                    type="button"
                    onClick={() => s.setAttacks(s.attacks.filter((x) => x.id !== a.id))}
                    className="rounded border border-border px-2 text-xs text-muted-foreground no-print hover:border-destructive hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Magias */}
        <div className="rune-panel rounded-xl p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
              Magias {cls?.caster ? `· CD ${spellDc} · Ataque ${fmtMod(prof + keyMod)}` : "· classe não conjuradora"}
            </h3>
            <button
              type="button"
              onClick={() => s.setSpells([...s.spells, newSpell()])}
              className="rounded border border-primary/50 bg-primary/10 px-2 py-1 text-[10px] uppercase tracking-widest text-primary no-print hover:bg-primary/20"
            >
              + Adicionar
            </button>
          </div>
          {s.spells.length === 0 ? (
            <p className="text-[11px] text-muted-foreground">Nenhuma magia adicionada.</p>
          ) : (
            <div className="space-y-2">
              {s.spells.map((m) => (
                <div key={m.id} className="grid gap-2 sm:grid-cols-[2fr_.6fr_1fr_2.5fr_auto]">
                  <SheetInput value={m.name} onChange={(v) => setSpell(m.id, { name: v })} placeholder="Nome" />
                  <SheetInput value={m.level} onChange={(v) => setSpell(m.id, { level: v })} placeholder="Nv" />
                  <SheetInput value={m.school} onChange={(v) => setSpell(m.id, { school: v })} placeholder="Escola" />
                  <SheetInput value={m.effect} onChange={(v) => setSpell(m.id, { effect: v })} placeholder="Efeito" />
                  <button
                    type="button"
                    onClick={() => s.setSpells(s.spells.filter((x) => x.id !== m.id))}
                    className="rounded border border-border px-2 text-xs text-muted-foreground no-print hover:border-destructive hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <NavRow prev="pericias" />
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rune-panel rounded-xl p-4 text-center">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-3xl text-primary text-glow-soft">{value}</p>
      <p className="text-[10px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function SheetInput({
  value, onChange, placeholder,
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border border-border bg-input/60 px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
    />
  );
}
