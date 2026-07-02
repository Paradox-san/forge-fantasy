import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCharacter, type CharacterState } from "@/lib/character-store";
import {
  getRace, getClass, ABILITIES, SKILLS, modifier, fmtMod,
  type AbilityKey,
} from "@/lib/dnd-data";
import { getSystem } from "@/lib/systems";

export const Route = createFileRoute("/create/$system/sheet")({
  component: SheetStep,
});

function SheetStep() {
  const char = useCharacter();
  const sys = getSystem(char.system);
  const race = getRace(char.raceId);
  const cls = getClass(char.classId);
  const [tab, setTab] = useState<"main" | "spells">("main");

  if (!race || !cls) {
    return (
      <div className="rune-panel mx-auto max-w-xl rounded-xl p-8 text-center">
        <p className="text-muted-foreground">
          Você precisa escolher raça e classe antes de forjar a ficha.
        </p>
        <Link to="/create/$system/race" params={{ system: char.system }}
          className="neon-btn mt-6 inline-block rounded-md px-5 py-2 text-xs uppercase tracking-widest">
          Escolher Linhagem
        </Link>
      </div>
    );
  }

  // Ability totals (base + racial)
  const totals = ABILITIES.reduce((acc, a) => {
    acc[a.key] = char.abilities[a.key] + (race.bonuses[a.key] ?? 0);
    return acc;
  }, {} as Record<AbilityKey, number>);
  const mods = ABILITIES.reduce((acc, a) => {
    acc[a.key] = modifier(totals[a.key]);
    return acc;
  }, {} as Record<AbilityKey, number>);

  const profBonus = 2 + Math.floor((char.level - 1) / 4);
  const conMod = mods.con;
  const dexMod = mods.des;
  const wisMod = mods.sab;
  const primaryMod = mods[cls.primary];

  const hp = cls.hitDie + conMod + (char.level - 1) * (Math.floor(cls.hitDie / 2) + 1 + conMod);
  const ac = 10 + dexMod;
  const initiative = dexMod;
  const spellDC = 8 + profBonus + primaryMod;
  const spellAtk = profBonus + primaryMod;
  const perceptionProf = char.skills.includes("percepcao");
  const passivePerc = 10 + wisMod + (perceptionProf ? profBonus : 0);

  const color = cls.themeColor;
  const accent = cls.themeAccent;
  const glyph = cls.glyph;

  const hasSpells = cls.spells.length > 0;

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-glow-soft" style={{ color }}>
            Forjada · {sys.name}
          </p>
          <h1 className="mt-1 font-display text-3xl text-foreground">Sua Ficha</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => window.print()}
            className="rounded-md border border-border bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:border-primary/60">
            ⎙ Imprimir
          </button>
          <Link to="/create/$system/details" params={{ system: char.system }}
            className="rounded-md border border-border bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:border-primary/60">
            ← Editar
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="mb-4 flex gap-2">
        <TabBtn active={tab === "main"} onClick={() => setTab("main")} color={color}>Ficha</TabBtn>
        {hasSpells && (
          <TabBtn active={tab === "spells"} onClick={() => setTab("spells")} color={color}>
            Magias ({cls.spells.length})
          </TabBtn>
        )}
      </div>

      <div
        className="relative overflow-hidden rounded-2xl p-[2px]"
        style={{
          background: `linear-gradient(180deg, ${color}, ${accent} 50%, ${color})`,
          boxShadow: `0 0 40px ${color}55`,
        }}
      >
        <div
          className="relative rounded-[14px] p-8"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.16 0.05 295 / 0.96), oklch(0.11 0.03 290 / 0.98))",
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden
            style={{ background: `radial-gradient(circle at 50% 0%, ${color}55, transparent 60%)` }} />

          {/* Identity — always visible */}
          <div className="relative flex flex-wrap items-center justify-between gap-4 border-b pb-4"
            style={{ borderColor: `${color}55` }}>
            <div className="flex items-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-full border-2"
                style={{ borderColor: color, boxShadow: `0 0 18px ${color}66, inset 0 0 18px ${color}33` }}>
                <span className="font-display text-4xl text-glow" style={{ color }}>{glyph}</span>
              </div>
              <div>
                <h2 className="font-display text-3xl text-foreground text-glow md:text-4xl">
                  {char.name || "Sem nome"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="text-foreground">{race.name}</span> ·{" "}
                  <span style={{ color }}>{cls.name}</span> · Nível {char.level}
                  {char.background && <> · <span className="text-foreground">{char.background}</span></>}
                  {char.alignment && ` · ${char.alignment}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-display text-5xl text-glow" style={{ color }}>{hp}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Pontos de Vida</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Dados: <span className="font-mono text-foreground">{char.level}d{cls.hitDie}</span>
              </p>
            </div>
          </div>

          {tab === "main" ? (
            <MainTab
              char={char} race={race} cls={cls}
              totals={totals} mods={mods}
              ac={ac} initiative={initiative} profBonus={profBonus}
              passivePerc={passivePerc}
              color={color} glyph={glyph}
            />
          ) : (
            <SpellsTab cls={cls} spellDC={spellDC} spellAtk={spellAtk} color={color} glyph={glyph} />
          )}

          {char.bio && tab === "main" && (
            <div className="relative mt-6">
              <SectionTitle color={color} glyph={glyph}>Crônica</SectionTitle>
              <p className="mt-3 rounded-lg border bg-background/60 p-4 text-sm italic text-muted-foreground"
                style={{ borderColor: `${color}55` }}>
                {char.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Main tab ---------- */

function MainTab({
  char, race, cls, totals, mods, ac, initiative, profBonus, passivePerc, color, glyph,
}: {
  char: CharacterState;
  race: NonNullable<ReturnType<typeof getRace>>;
  cls: NonNullable<ReturnType<typeof getClass>>;
  totals: Record<AbilityKey, number>;
  mods: Record<AbilityKey, number>;
  ac: number; initiative: number; profBonus: number; passivePerc: number;
  color: string; glyph: string;
}) {
  return (
    <>
      {/* Stat row */}
      <div className="relative mt-6 grid gap-3 sm:grid-cols-3 md:grid-cols-6">
        <StatBadge label="CA" value={ac} color={color} />
        <StatBadge label="Iniciat." value={fmtMod(initiative)} color={color} />
        <StatBadge label="Prof." value={fmtMod(profBonus)} color={color} />
        <StatBadge label="P. Perc." value={passivePerc} color={color} />
        <StatBadge label="Desloc." value={`${race.speed}m`} color={color} />
        <StatBadge label="Dado" value={`d${cls.hitDie}`} color={color} />
      </div>

      {/* Abilities + Saves */}
      <div className="relative mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <SectionTitle color={color} glyph={glyph}>Atributos</SectionTitle>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6 md:grid-cols-3">
            {ABILITIES.map((a) => (
              <div key={a.key} className="rounded-lg border bg-background/60 p-3 text-center"
                style={{ borderColor: `${color}55` }}>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{a.short}</p>
                <p className="mt-1 font-display text-2xl" style={{ color }}>{fmtMod(mods[a.key])}</p>
                <p className="font-mono text-xs text-foreground">{totals[a.key]}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle color={color} glyph={glyph}>Salvaguardas</SectionTitle>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {ABILITIES.map((a) => {
              const prof = cls.saves.includes(a.key);
              const total = mods[a.key] + (prof ? profBonus : 0);
              return (
                <div key={a.key}
                  className="flex items-center justify-between rounded-md border bg-background/60 px-3 py-2 text-sm"
                  style={{ borderColor: `${color}55` }}>
                  <span className="flex items-center gap-2">
                    <span className={`inline-block size-2 rounded-full ${prof ? "" : "opacity-30"}`}
                      style={{ background: color, boxShadow: prof ? `0 0 6px ${color}` : undefined }} />
                    <span className="text-foreground">{a.short}</span>
                  </span>
                  <span className="font-mono" style={{ color }}>{fmtMod(total)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="relative mt-6">
        <SectionTitle color={color} glyph={glyph}>Perícias</SectionTitle>
        <div className="mt-3 grid gap-1.5 sm:grid-cols-2 md:grid-cols-3">
          {SKILLS.map((s) => {
            const prof = char.skills.includes(s.key);
            const total = mods[s.ability] + (prof ? profBonus : 0);
            return (
              <div key={s.key}
                className="flex items-center justify-between rounded-md border bg-background/60 px-3 py-1.5 text-xs"
                style={{ borderColor: prof ? `${color}88` : `${color}22` }}>
                <span className="flex items-center gap-2">
                  <span className={`inline-block size-1.5 rounded-full ${prof ? "" : "opacity-20"}`}
                    style={{ background: color, boxShadow: prof ? `0 0 6px ${color}` : undefined }} />
                  <span className={prof ? "text-foreground" : "text-muted-foreground"}>{s.name}</span>
                  <span className="opacity-50 font-mono text-[9px]">({s.ability.toUpperCase()})</span>
                </span>
                <span className="font-mono" style={{ color: prof ? color : undefined }}>
                  {fmtMod(total)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attacks */}
      <div className="relative mt-6">
        <SectionTitle color={color} glyph={glyph}>Ataques</SectionTitle>
        <div className="mt-3 overflow-hidden rounded-lg border" style={{ borderColor: `${color}55` }}>
          <table className="w-full text-sm">
            <thead className="bg-background/60 text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">Arma</th>
                <th className="px-3 py-2 text-right">Ataque</th>
                <th className="px-3 py-2 text-right">Dano</th>
                <th className="px-3 py-2 text-left">Prop.</th>
              </tr>
            </thead>
            <tbody>
              {cls.attacks.map((atk) => {
                const bonus = mods[atk.ability] + profBonus;
                const damageMod = mods[atk.ability];
                return (
                  <tr key={atk.name} className="border-t" style={{ borderColor: `${color}33` }}>
                    <td className="px-3 py-2 text-foreground">{atk.name}</td>
                    <td className="px-3 py-2 text-right font-mono" style={{ color }}>{fmtMod(bonus)}</td>
                    <td className="px-3 py-2 text-right font-mono">
                      {atk.damage}{damageMod !== 0 ? `${fmtMod(damageMod)}` : ""}{" "}
                      <span className="text-[10px] text-muted-foreground">{atk.damageType}</span>
                    </td>
                    <td className="px-3 py-2 text-[11px] text-muted-foreground">{atk.properties ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Features / Traits / Languages */}
      <div className="relative mt-6 grid gap-4 md:grid-cols-3">
        <Panel title="Habilidades de Classe" color={color} glyph={glyph}>
          <ul className="space-y-1.5 text-sm">
            {cls.features.map((f) => (
              <li key={f}><span style={{ color }}>{glyph}</span> {f}</li>
            ))}
          </ul>
        </Panel>
        <Panel title="Traços de Espécie" color={color} glyph={glyph}>
          <ul className="space-y-1.5 text-sm">
            {race.traits.map((t) => (
              <li key={t}><span style={{ color }}>{glyph}</span> {t}</li>
            ))}
          </ul>
        </Panel>
        <Panel title="Idiomas" color={color} glyph={glyph}>
          <div className="flex flex-wrap gap-1.5">
            {(char.languages.length ? char.languages : race.languages).map((l) => (
              <span key={l} className="rounded-full border px-2 py-0.5 text-xs"
                style={{ borderColor: `${color}66`, color, background: `${color}12` }}>
                {l}
              </span>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

/* ---------- Spells tab ---------- */

function SpellsTab({
  cls, spellDC, spellAtk, color, glyph,
}: {
  cls: NonNullable<ReturnType<typeof getClass>>;
  spellDC: number; spellAtk: number; color: string; glyph: string;
}) {
  const byLevel = cls.spells.reduce((acc, s) => {
    (acc[s.level] ??= []).push(s);
    return acc;
  }, {} as Record<number, typeof cls.spells>);
  const levels = Object.keys(byLevel).map(Number).sort((a, b) => a - b);

  return (
    <div className="relative mt-6">
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <StatBadge label="Atrib. Conjur." value={cls.primary.toUpperCase()} color={color} />
        <StatBadge label="CD de Magia" value={spellDC} color={color} />
        <StatBadge label="Bônus Ataque" value={fmtMod(spellAtk)} color={color} />
      </div>

      {levels.map((lvl) => (
        <div key={lvl} className="mb-5">
          <SectionTitle color={color} glyph={glyph}>
            {lvl === 0 ? "Truques" : `Nível ${lvl}`}
          </SectionTitle>
          <div className="mt-2 grid gap-2 md:grid-cols-2">
            {byLevel[lvl].map((s) => (
              <div key={s.name} className="rounded-lg border bg-background/60 p-3"
                style={{ borderColor: `${color}55` }}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-heading text-sm text-foreground">{s.name}</p>
                  <span className="text-[10px] uppercase tracking-widest" style={{ color }}>
                    {s.school}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- primitives ---------- */

function TabBtn({
  active, onClick, color, children,
}: { active: boolean; onClick: () => void; color: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className="rounded-md border px-4 py-2 text-xs uppercase tracking-widest transition"
      style={{
        borderColor: active ? color : "var(--border)",
        background: active ? `${color}1a` : "transparent",
        color: active ? color : "var(--muted-foreground)",
        boxShadow: active ? `0 0 12px ${color}55` : undefined,
      }}>
      {children}
    </button>
  );
}

function StatBadge({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border p-3"
      style={{
        borderColor: `${color}66`,
        background: `linear-gradient(180deg, ${color}1a, transparent)`,
        boxShadow: `inset 0 0 18px ${color}22`,
      }}>
      <p className="font-display text-2xl text-glow" style={{ color }}>{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function SectionTitle({ color, glyph, children }: { color: string; glyph: string; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.4em]" style={{ color }}>
      <span aria-hidden>{glyph}</span>
      {children}
    </h3>
  );
}

function Panel({
  title, color, glyph, children,
}: { title: string; color: string; glyph: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-4"
      style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}10, transparent)` }}>
      <SectionTitle color={color} glyph={glyph}>{title}</SectionTitle>
      <div className="mt-2">{children}</div>
    </div>
  );
}
