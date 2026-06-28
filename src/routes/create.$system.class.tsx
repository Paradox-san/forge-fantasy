import { createFileRoute } from "@tanstack/react-router";
import { CLASSES } from "@/lib/dnd-data";
import { useCharacter } from "@/lib/character-store";
import { NavRow } from "./create.$system.index";

export const Route = createFileRoute("/create/$system/class")({
  component: ClassStep,
});

function ClassStep() {
  const { classId, setField } = useCharacter();

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo III
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Escolha sua Vocação</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A classe define mais que poder — define o ritual da sua ficha.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CLASSES.map((cls) => {
          const selected = classId === cls.id;
          return (
            <button
              key={cls.id}
              type="button"
              onClick={() => setField("classId", cls.id)}
              className={`rune-panel relative overflow-hidden rounded-xl p-5 text-left transition ${
                selected
                  ? "-translate-y-0.5 [box-shadow:var(--glow-neon)]"
                  : "hover:-translate-y-0.5 hover:border-primary/60"
              }`}
              style={
                selected
                  ? {
                      borderColor: cls.themeColor,
                      boxShadow: `0 0 24px ${cls.themeColor}55, inset 0 0 30px ${cls.themeColor}22`,
                    }
                  : undefined
              }
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-30 blur-2xl"
                style={{ background: cls.themeColor }}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <span
                    className="font-display text-3xl text-glow"
                    style={{ color: cls.themeColor }}
                  >
                    {cls.glyph}
                  </span>
                  <h3 className="mt-2 font-heading text-lg text-foreground">{cls.name}</h3>
                </div>
                {selected && (
                  <span
                    className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest"
                    style={{
                      borderColor: cls.themeColor,
                      color: cls.themeColor,
                      background: `${cls.themeColor}1a`,
                    }}
                  >
                    Escolhida
                  </span>
                )}
              </div>
              <p className="relative mt-2 text-sm text-muted-foreground">{cls.description}</p>
              <div className="relative mt-4 flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded border border-border bg-secondary/60 px-2 py-0.5 text-muted-foreground">
                  Dado de Vida d{cls.hitDie}
                </span>
                <span
                  className="rounded border px-2 py-0.5 font-mono"
                  style={{
                    borderColor: `${cls.themeColor}66`,
                    color: cls.themeColor,
                    background: `${cls.themeColor}14`,
                  }}
                >
                  {cls.primary.toUpperCase()} primária
                </span>
              </div>
              <ul className="relative mt-3 flex flex-wrap gap-1 text-[11px] text-muted-foreground">
                {cls.features.map((f) => (
                  <li key={f} className="rounded bg-secondary/40 px-1.5 py-0.5">
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <NavRow prev="race" next="abilities" disabled={!classId} nextLabel="Distribuir Atributos" />
    </section>
  );
}
