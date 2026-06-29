import { createFileRoute, Link } from "@tanstack/react-router";
import { useCharacter } from "@/lib/character-store";
import { getRace, getClass, ABILITIES, modifier, fmtMod } from "@/lib/dnd-data";
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

  const conMod = modifier(char.abilities.con + (race.bonuses.con ?? 0));
  const dexMod = modifier(char.abilities.des + (race.bonuses.des ?? 0));
  const primaryMod = modifier(
    char.abilities[cls.primary] + (race.bonuses[cls.primary] ?? 0),
  );
  const hp =
    cls.hitDie + conMod + (char.level - 1) * (Math.floor(cls.hitDie / 2) + 1 + conMod);
  const ac = 10 + dexMod;
  const profBonus = 2 + Math.floor((char.level - 1) / 4);
  const initiative = dexMod;
  const spellDC = 8 + profBonus + primaryMod;

  const color = cls.themeColor;
  const accent = cls.themeAccent;
  const glyph = cls.glyph;

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p
            className="font-heading text-xs uppercase tracking-[0.4em] text-glow-soft"
            style={{ color }}
          >
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

      {/* Unified sheet — only icon + color vary by class */}
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
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden
            style={{
              background: `radial-gradient(circle at 50% 0%, ${color}55, transparent 60%)`,
            }}
          />

          {/* Identity */}
          <div
            className="relative flex flex-wrap items-center justify-between gap-4 border-b pb-4"
            style={{ borderColor: `${color}55` }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex size-20 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: color,
                  boxShadow: `0 0 18px ${color}66, inset 0 0 18px ${color}33`,
                }}
              >
                <span
                  className="font-display text-4xl text-glow"
                  style={{ color }}
                >
                  {glyph}
                </span>
              </div>
              <div>
                <h2 className="font-display text-3xl text-foreground text-glow md:text-4xl">
                  {char.name || "Sem nome"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {race.name} · <span style={{ color }}>{cls.name}</span> · Nível{" "}
                  {char.level}
                  {char.background && ` · ${char.background}`}
                  {char.alignment && ` · ${char.alignment}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-display text-5xl text-glow" style={{ color }}>
                {hp}
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Pontos de Vida
              </p>
            </div>
          </div>

          {/* Stat row */}
          <div className="relative mt-6 grid gap-3 sm:grid-cols-3 md:grid-cols-6">
            <StatBadge label="CA" value={ac} color={color} />
            <StatBadge label="Iniciat." value={fmtMod(initiative)} color={color} />
            <StatBadge label="Prof." value={fmtMod(profBonus)} color={color} />
            <StatBadge label="CD Magia" value={spellDC} color={color} />
            <StatBadge label="Desloc." value={`${race.speed}m`} color={color} />
            <StatBadge label="Dado" value={`d${cls.hitDie}`} color={color} />
          </div>

          {/* Abilities */}
          <div className="relative mt-6">
            <SectionTitle color={color} glyph={glyph}>
              Atributos
            </SectionTitle>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {ABILITIES.map((a) => {
                const total = char.abilities[a.key] + (race.bonuses[a.key] ?? 0);
                const mod = modifier(total);
                return (
                  <div
                    key={a.key}
                    className="rounded-lg border bg-background/60 p-3 text-center"
                    style={{ borderColor: `${color}55` }}
                  >
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {a.short}
                    </p>
                    <p className="mt-1 font-display text-2xl" style={{ color }}>
                      {fmtMod(mod)}
                    </p>
                    <p className="font-mono text-xs text-foreground">{total}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features & Traits */}
          <div className="relative mt-6 grid gap-4 md:grid-cols-2">
            <Panel title="Habilidades de Classe" color={color} glyph={glyph}>
              <ul className="space-y-1.5 text-sm">
                {cls.features.map((f) => (
                  <li key={f}>
                    <span style={{ color }}>{glyph}</span> {f}
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Traços de Linhagem" color={color} glyph={glyph}>
              <ul className="space-y-1.5 text-sm">
                {race.traits.map((t) => (
                  <li key={t}>
                    <span style={{ color }}>{glyph}</span> {t}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          {/* Bio */}
          {char.bio && (
            <div className="relative mt-6">
              <SectionTitle color={color} glyph={glyph}>
                Crônica
              </SectionTitle>
              <p
                className="mt-3 rounded-lg border bg-background/60 p-4 text-sm italic text-muted-foreground"
                style={{ borderColor: `${color}55` }}
              >
                {char.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StatBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border p-3"
      style={{
        borderColor: `${color}66`,
        background: `linear-gradient(180deg, ${color}1a, transparent)`,
        boxShadow: `inset 0 0 18px ${color}22`,
      }}
    >
      <p className="font-display text-3xl text-glow" style={{ color }}>
        {value}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function SectionTitle({
  color,
  glyph,
  children,
}: {
  color: string;
  glyph: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.4em]"
      style={{ color }}
    >
      <span aria-hidden>{glyph}</span>
      {children}
    </h3>
  );
}

function Panel({
  title,
  color,
  glyph,
  children,
}: {
  title: string;
  color: string;
  glyph: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{
        borderColor: `${color}55`,
        background: `linear-gradient(180deg, ${color}10, transparent)`,
      }}
    >
      <SectionTitle color={color} glyph={glyph}>
        {title}
      </SectionTitle>
      <div className="mt-2">{children}</div>
    </div>
  );
}
