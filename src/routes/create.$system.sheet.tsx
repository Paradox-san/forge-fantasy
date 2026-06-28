import { createFileRoute, Link } from "@tanstack/react-router";
import { useCharacter } from "@/lib/character-store";
import { getRace, getClass, ABILITIES, modifier, fmtMod, type DndClass } from "@/lib/dnd-data";
import { getSystem } from "@/lib/systems";

export const Route = createFileRoute("/create/$system/sheet")({
  component: SheetStep,
});

function SheetStep() {
  const char = useCharacter();
  const sys = getSystem(char.system);
  const race = getRace(char.raceId);
  const cls = getClass(char.classId);

  if (!race || !cls) {
    return (
      <div className="rune-panel mx-auto max-w-xl rounded-xl p-8 text-center">
        <p className="text-muted-foreground">
          Você precisa escolher raça e classe antes de forjar a ficha.
        </p>
        <Link
          to="/create/$system/race"
          params={{ system: char.system }}
          className="neon-btn mt-6 inline-block rounded-md px-5 py-2 text-xs uppercase tracking-widest"
        >
          Escolher Linhagem
        </Link>
      </div>
    );
  }

  // Computed stats
  const conMod = modifier(char.abilities.con + (race.bonuses.con ?? 0));
  const dexMod = modifier(char.abilities.des + (race.bonuses.des ?? 0));
  const primaryMod = modifier(
    char.abilities[cls.primary] + (race.bonuses[cls.primary] ?? 0),
  );
  const hp = cls.hitDie + conMod + (char.level - 1) * (Math.floor(cls.hitDie / 2) + 1 + conMod);
  const ac = 10 + dexMod;
  const profBonus = 2 + Math.floor((char.level - 1) / 4);
  const initiative = dexMod;

  const stats = { hp, ac, profBonus, initiative, primaryMod, conMod, dexMod };

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
            Forjada · {sys.name}
          </p>
          <h1 className="mt-1 font-display text-3xl text-foreground">Sua Ficha</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md border border-border bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:border-primary/60"
          >
            ⎙ Imprimir
          </button>
          <Link
            to="/create/$system/details"
            params={{ system: char.system }}
            className="rounded-md border border-border bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:border-primary/60"
          >
            ← Editar
          </Link>
        </div>
      </header>

      {renderSheet(cls, char, race, stats)}
    </section>
  );
}

interface SheetProps {
  cls: DndClass;
  char: ReturnType<typeof useCharacter.getState>;
  race: NonNullable<ReturnType<typeof getRace>>;
  stats: {
    hp: number;
    ac: number;
    profBonus: number;
    initiative: number;
    primaryMod: number;
    conMod: number;
    dexMod: number;
  };
}

function renderSheet(
  cls: DndClass,
  char: ReturnType<typeof useCharacter.getState>,
  race: NonNullable<ReturnType<typeof getRace>>,
  stats: SheetProps["stats"],
) {
  const props: SheetProps = { cls, char, race, stats };
  switch (cls.sheetLayout) {
    case "grimoire":
      return <GrimoireSheet {...props} />;
    case "warbanner":
      return <WarbannerSheet {...props} />;
    case "scripture":
      return <ScriptureSheet {...props} />;
    case "tribal":
      return <TribalSheet {...props} />;
    case "shadowdossier":
      return <ShadowSheet {...props} />;
    case "songbook":
      return <SongbookSheet {...props} />;
  }
}

/* ---------- Shared bits ---------- */

function AbilityGrid({ char, race, color }: { char: SheetProps["char"]; race: SheetProps["race"]; color: string }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {ABILITIES.map((a) => {
        const total = char.abilities[a.key] + (race.bonuses[a.key] ?? 0);
        const mod = modifier(total);
        return (
          <div
            key={a.key}
            className="rounded-lg border bg-background/60 p-3 text-center"
            style={{ borderColor: `${color}55` }}
          >
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{a.short}</p>
            <p className="mt-1 font-display text-2xl" style={{ color }}>{fmtMod(mod)}</p>
            <p className="font-mono text-xs text-foreground">{total}</p>
          </div>
        );
      })}
    </div>
  );
}

function StatBadge({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border p-3"
      style={{
        borderColor: `${color}66`,
        background: `linear-gradient(180deg, ${color}1a, transparent)`,
        boxShadow: `inset 0 0 18px ${color}22`,
      }}
    >
      <p className="font-display text-3xl text-glow" style={{ color }}>{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function Identity({ char, cls, race, color }: SheetProps & { color: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/40 pb-4">
      <div>
        <h2 className="font-display text-3xl text-foreground text-glow md:text-4xl">{char.name || "Sem nome"}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {race.name} · <span style={{ color }}>{cls.name}</span> · Nível {char.level}
          {char.background && ` · ${char.background}`}
          {char.alignment && ` · ${char.alignment}`}
        </p>
      </div>
      <span className="font-display text-5xl text-glow" style={{ color }}>{cls.glyph}</span>
    </div>
  );
}

/* ---------- 1. GRIMOIRE (Mago) ---------- */

function GrimoireSheet(props: SheetProps) {
  const { cls, char, race, stats } = props;
  return (
    <div
      className="rune-panel relative overflow-hidden rounded-2xl p-8"
      style={{ borderColor: cls.themeColor, boxShadow: `0 0 40px ${cls.themeColor}33, inset 0 0 60px ${cls.themeColor}1a` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20 animate-rune-spin"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${cls.themeColor}44, transparent 60%)`,
        }}
      />
      <div className="relative">
        <Identity {...props} color={cls.themeColor} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-display text-xs uppercase tracking-[0.4em]" style={{ color: cls.themeColor }}>Atributos Arcanos</h3>
              <AbilityGrid char={char} race={race} color={cls.themeColor} />
            </div>
            <div>
              <h3 className="mb-3 font-display text-xs uppercase tracking-[0.4em]" style={{ color: cls.themeColor }}>Grimório</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {cls.features.concat(race.traits).map((f) => (
                  <li key={f} className="rounded border border-border bg-background/60 px-3 py-2 text-sm">
                    <span style={{ color: cls.themeColor }}>✦</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            {char.bio && (
              <div>
                <h3 className="mb-2 font-display text-xs uppercase tracking-[0.4em]" style={{ color: cls.themeColor }}>Crônica</h3>
                <p className="rounded-lg border border-border bg-background/60 p-4 text-sm italic text-muted-foreground">{char.bio}</p>
              </div>
            )}
          </div>
          <aside className="space-y-3">
            <StatBadge label="PV" value={stats.hp} color={cls.themeColor} />
            <StatBadge label="CA" value={stats.ac} color={cls.themeColor} />
            <StatBadge label="Iniciat." value={fmtMod(stats.initiative)} color={cls.themeColor} />
            <StatBadge label="Prof." value={fmtMod(stats.profBonus)} color={cls.themeColor} />
            <StatBadge label="CD Magia" value={8 + stats.profBonus + stats.primaryMod} color={cls.themeColor} />
            <StatBadge label="Desloc." value={`${race.speed}m`} color={cls.themeColor} />
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. WARBANNER (Guerreiro) ---------- */

function WarbannerSheet(props: SheetProps) {
  const { cls, char, race, stats } = props;
  return (
    <div
      className="rune-panel rounded-none rounded-tl-2xl rounded-br-2xl p-8"
      style={{
        borderColor: cls.themeColor,
        background: `linear-gradient(135deg, oklch(0.18 0.04 30 / 0.9), oklch(0.14 0.03 290 / 0.95))`,
        boxShadow: `0 0 40px ${cls.themeColor}33`,
      }}
    >
      <Identity {...props} color={cls.themeColor} />
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <StatBadge label="PV" value={stats.hp} color={cls.themeColor} />
        <StatBadge label="CA" value={stats.ac} color={cls.themeColor} />
        <StatBadge label="Iniciativa" value={fmtMod(stats.initiative)} color={cls.themeColor} />
        <StatBadge label="Proficiência" value={fmtMod(stats.profBonus)} color={cls.themeColor} />
      </div>
      <div className="mt-6">
        <h3 className="mb-3 font-display text-xs uppercase tracking-[0.4em]" style={{ color: cls.themeColor }}>Atributos de Batalha</h3>
        <AbilityGrid char={char} race={race} color={cls.themeColor} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Panel title="Treinamento Marcial" color={cls.themeColor}>
          <ul className="space-y-1.5 text-sm">
            {cls.features.map((f) => <li key={f}>⚔ {f}</li>)}
          </ul>
        </Panel>
        <Panel title="Linhagem" color={cls.themeColor}>
          <ul className="space-y-1.5 text-sm">
            {race.traits.map((t) => <li key={t}>᛭ {t}</li>)}
          </ul>
        </Panel>
      </div>
      {char.bio && <Panel title="Estandarte" color={cls.themeColor} className="mt-4"><p className="text-sm italic text-muted-foreground">{char.bio}</p></Panel>}
    </div>
  );
}

/* ---------- 3. SCRIPTURE (Clérigo) ---------- */

function ScriptureSheet(props: SheetProps) {
  const { cls, char, race, stats } = props;
  return (
    <div
      className="rune-panel rounded-2xl p-8 text-center"
      style={{ borderColor: cls.themeColor, boxShadow: `0 0 40px ${cls.themeColor}33` }}
    >
      <span className="font-display text-6xl animate-flicker text-glow" style={{ color: cls.themeColor }}>{cls.glyph}</span>
      <h2 className="mt-3 font-display text-4xl text-foreground text-glow">{char.name || "Sem nome"}</h2>
      <p className="mt-1 text-sm uppercase tracking-[0.3em] text-muted-foreground">
        {race.name} · {cls.name} · Nível {char.level}
      </p>
      <div className="mx-auto mt-4 h-px w-32" style={{ background: cls.themeColor }} />
      {char.bio && <p className="mx-auto mt-4 max-w-xl text-sm italic text-muted-foreground">"{char.bio}"</p>}

      <div className="mt-8 grid gap-4 sm:grid-cols-3 md:grid-cols-6">
        <StatBadge label="PV" value={stats.hp} color={cls.themeColor} />
        <StatBadge label="CA" value={stats.ac} color={cls.themeColor} />
        <StatBadge label="Iniciat." value={fmtMod(stats.initiative)} color={cls.themeColor} />
        <StatBadge label="Prof." value={fmtMod(stats.profBonus)} color={cls.themeColor} />
        <StatBadge label="CD Magia" value={8 + stats.profBonus + stats.primaryMod} color={cls.themeColor} />
        <StatBadge label="Desloc." value={`${race.speed}m`} color={cls.themeColor} />
      </div>
      <div className="mt-8 text-left">
        <h3 className="mb-3 text-center font-display text-xs uppercase tracking-[0.4em]" style={{ color: cls.themeColor }}>Atributos Sagrados</h3>
        <AbilityGrid char={char} race={race} color={cls.themeColor} />
      </div>
      <div className="mt-6 grid gap-4 text-left md:grid-cols-2">
        <Panel title="Dons Divinos" color={cls.themeColor}>
          <ul className="space-y-1.5 text-sm">{cls.features.map((f) => <li key={f}>☩ {f}</li>)}</ul>
        </Panel>
        <Panel title="Linhagem" color={cls.themeColor}>
          <ul className="space-y-1.5 text-sm">{race.traits.map((t) => <li key={t}>✦ {t}</li>)}</ul>
        </Panel>
      </div>
    </div>
  );
}

/* ---------- 4. TRIBAL (Bárbaro) ---------- */

function TribalSheet(props: SheetProps) {
  const { cls, char, race, stats } = props;
  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: `linear-gradient(180deg, oklch(0.18 0.07 25 / 0.9), oklch(0.12 0.03 290 / 0.95))`,
        border: `2px solid ${cls.themeColor}`,
        boxShadow: `0 0 40px ${cls.themeColor}44, inset 0 0 80px ${cls.themeColor}22`,
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 pb-4" style={{ borderColor: `${cls.themeColor}55` }}>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.5em]" style={{ color: cls.themeColor }}>Clã · {race.name}</p>
          <h2 className="mt-1 font-display text-5xl text-foreground text-glow">{char.name || "Sem nome"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{cls.name} de Nível {char.level} · {char.alignment || "indomado"}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-7xl text-glow" style={{ color: cls.themeColor }}>{stats.hp}</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Pontos de Vida</p>
        </div>
      </div>

      <div className="mt-6">
        <AbilityGrid char={char} race={race} color={cls.themeColor} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <StatBadge label="CA" value={stats.ac} color={cls.themeColor} />
        <StatBadge label="Iniciat." value={fmtMod(stats.initiative)} color={cls.themeColor} />
        <StatBadge label="Prof." value={fmtMod(stats.profBonus)} color={cls.themeColor} />
        <StatBadge label="Desloc." value={`${race.speed}m`} color={cls.themeColor} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Panel title="Fúria Primal" color={cls.themeColor}>
          <ul className="space-y-1.5 text-sm">{cls.features.map((f) => <li key={f}>᛭ {f}</li>)}</ul>
        </Panel>
        <Panel title="Sangue Ancestral" color={cls.themeColor}>
          <ul className="space-y-1.5 text-sm">{race.traits.map((t) => <li key={t}>᛭ {t}</li>)}</ul>
        </Panel>
      </div>
      {char.bio && <Panel title="Lenda Tribal" color={cls.themeColor} className="mt-4"><p className="text-sm italic text-muted-foreground">{char.bio}</p></Panel>}
    </div>
  );
}

/* ---------- 5. SHADOW DOSSIER (Ladino) ---------- */

function ShadowSheet(props: SheetProps) {
  const { cls, char, race, stats } = props;
  return (
    <div
      className="rounded-2xl p-0 overflow-hidden"
      style={{
        background: "oklch(0.1 0.03 290 / 0.95)",
        border: `1px dashed ${cls.themeColor}88`,
        boxShadow: `0 0 30px ${cls.themeColor}33`,
      }}
    >
      <div className="border-b border-dashed p-6" style={{ borderColor: `${cls.themeColor}55` }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: cls.themeColor }}>
          ▸ Dossiê confidencial · {cls.name}
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <h2 className="font-display text-3xl text-foreground text-glow">{char.name || "[REDIGIDO]"}</h2>
          <span className="font-mono text-xs text-muted-foreground">NV-{char.level.toString().padStart(2, "0")}</span>
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          alvo: {race.name.toLowerCase()} · cobertura: {char.background?.toLowerCase() || "desconhecida"} · alinhamento: {char.alignment?.toLowerCase() || "?"}
        </p>
      </div>

      <div className="grid gap-0 md:grid-cols-[1fr_220px]">
        <div className="space-y-6 p-6">
          <div>
            <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: cls.themeColor }}>// atributos</h3>
            <AbilityGrid char={char} race={race} color={cls.themeColor} />
          </div>
          <div>
            <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: cls.themeColor }}>// truques do ofício</h3>
            <ul className="space-y-1 font-mono text-sm">
              {cls.features.concat(race.traits).map((f) => (
                <li key={f} className="text-muted-foreground">
                  <span style={{ color: cls.themeColor }}>▸</span> {f}
                </li>
              ))}
            </ul>
          </div>
          {char.bio && (
            <div>
              <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: cls.themeColor }}>// notas de campo</h3>
              <p className="font-mono text-sm italic text-muted-foreground">{char.bio}</p>
            </div>
          )}
        </div>
        <aside className="border-l border-dashed p-6 space-y-3" style={{ borderColor: `${cls.themeColor}55` }}>
          <StatBadge label="PV" value={stats.hp} color={cls.themeColor} />
          <StatBadge label="CA" value={stats.ac} color={cls.themeColor} />
          <StatBadge label="Iniciat." value={fmtMod(stats.initiative)} color={cls.themeColor} />
          <StatBadge label="Prof." value={fmtMod(stats.profBonus)} color={cls.themeColor} />
          <StatBadge label="Desloc." value={`${race.speed}m`} color={cls.themeColor} />
        </aside>
      </div>
    </div>
  );
}

/* ---------- 6. SONGBOOK (Bardo) ---------- */

function SongbookSheet(props: SheetProps) {
  const { cls, char, race, stats } = props;
  return (
    <div
      className="rune-panel rounded-2xl p-8"
      style={{
        borderColor: cls.themeColor,
        background: `linear-gradient(160deg, oklch(0.18 0.06 340 / 0.85), oklch(0.14 0.04 290 / 0.95))`,
        boxShadow: `0 0 40px ${cls.themeColor}44`,
      }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: cls.themeColor }}>♪ Canção de…</p>
          <h2 className="mt-1 font-display text-4xl italic text-foreground text-glow">{char.name || "Sem nome"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{race.name} · {cls.name} · Nível {char.level}</p>
        </div>
        <div className="rounded-full border px-4 py-2" style={{ borderColor: cls.themeColor, color: cls.themeColor }}>
          <span className="font-display text-2xl">{cls.glyph}</span>
        </div>
      </div>

      {char.bio && (
        <blockquote className="my-6 border-l-2 pl-4 italic text-muted-foreground" style={{ borderColor: cls.themeColor }}>
          "{char.bio}"
        </blockquote>
      )}

      <div className="mt-2 grid gap-3 sm:grid-cols-3 md:grid-cols-6">
        <StatBadge label="PV" value={stats.hp} color={cls.themeColor} />
        <StatBadge label="CA" value={stats.ac} color={cls.themeColor} />
        <StatBadge label="Iniciat." value={fmtMod(stats.initiative)} color={cls.themeColor} />
        <StatBadge label="Prof." value={fmtMod(stats.profBonus)} color={cls.themeColor} />
        <StatBadge label="CD Magia" value={8 + stats.profBonus + stats.primaryMod} color={cls.themeColor} />
        <StatBadge label="Desloc." value={`${race.speed}m`} color={cls.themeColor} />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-display text-xs uppercase tracking-[0.4em]" style={{ color: cls.themeColor }}>Refrão dos Atributos</h3>
        <AbilityGrid char={char} race={race} color={cls.themeColor} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Panel title="Versos & Inspiração" color={cls.themeColor}>
          <ul className="space-y-1.5 text-sm">{cls.features.map((f) => <li key={f}>♪ {f}</li>)}</ul>
        </Panel>
        <Panel title="Linhagem" color={cls.themeColor}>
          <ul className="space-y-1.5 text-sm">{race.traits.map((t) => <li key={t}>✦ {t}</li>)}</ul>
        </Panel>
      </div>
    </div>
  );
}

function Panel({
  title,
  color,
  children,
  className = "",
}: {
  title: string;
  color: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${className}`}
      style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}10, transparent)` }}
    >
      <h3 className="mb-2 font-display text-[11px] uppercase tracking-[0.3em]" style={{ color }}>{title}</h3>
      {children}
    </div>
  );
}
