import { createFileRoute, Link } from "@tanstack/react-router";
import { useCharacter } from "@/lib/character-store";

export const Route = createFileRoute("/create/$system/")({
  component: IdentityStep,
});

function IdentityStep() {
  const { name, player, level, setField } = useCharacter();

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo I
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Quem é você?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Toda lenda começa com um nome inscrito no pergaminho.
        </p>
      </header>

      <div className="rune-panel mx-auto max-w-xl rounded-xl p-8">
        <div className="space-y-5">
          <Field label="Nome do Personagem">
            <input
              value={name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Ex: Lyrandar das Sombras"
              className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:[box-shadow:var(--glow-neon-sm)]"
            />
          </Field>
          <Field label="Jogador (opcional)">
            <input
              value={player}
              onChange={(e) => setField("player", e.target.value)}
              placeholder="Seu nome"
              className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:[box-shadow:var(--glow-neon-sm)]"
            />
          </Field>
          <Field label="Nível Inicial">
            <input
              type="number"
              min={1}
              max={20}
              value={level}
              onChange={(e) => setField("level", Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
              className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:[box-shadow:var(--glow-neon-sm)]"
            />
          </Field>
        </div>
      </div>

      <NavRow next="race" nextLabel="Escolher Linhagem" disabled={!name.trim()} />
    </section>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-heading text-[11px] uppercase tracking-[0.3em] text-primary/80">
        {label}
      </span>
      {children}
    </label>
  );
}

type StepKey = "" | "race" | "class" | "abilities" | "details" | "sheet";

export function NavRow({
  prev,
  next,
  nextLabel = "Continuar",
  prevLabel = "Voltar",
  disabled,
}: {
  prev?: StepKey;
  next?: StepKey;
  nextLabel?: string;
  prevLabel?: string;
  disabled?: boolean;
}) {
  const system = useCharacter((s) => s.system);
  const navigate = useNavigate();

  const go = (step: StepKey) => {
    const map: Record<StepKey, string> = {
      "": `/create/${system}`,
      race: `/create/${system}/race`,
      class: `/create/${system}/class`,
      abilities: `/create/${system}/abilities`,
      details: `/create/${system}/details`,
      sheet: `/create/${system}/sheet`,
    };
    navigate({ to: map[step] });
  };

  return (
    <div className="mx-auto mt-10 flex max-w-xl items-center justify-between">
      {prev !== undefined ? (
        <button
          type="button"
          onClick={() => go(prev)}
          className="rounded-md border border-border bg-secondary/60 px-5 py-2.5 font-heading text-xs uppercase tracking-[0.2em] text-foreground hover:border-primary/60"
        >
          ← {prevLabel}
        </button>
      ) : (
        <Link
          to="/"
          className="rounded-md border border-border bg-secondary/60 px-5 py-2.5 font-heading text-xs uppercase tracking-[0.2em] text-foreground hover:border-primary/60"
        >
          ← Salão
        </Link>
      )}
      {next !== undefined &&
        (disabled ? (
          <span
            aria-disabled
            className="cursor-not-allowed rounded-md border border-border bg-secondary/30 px-6 py-2.5 font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground/60"
          >
            {nextLabel} →
          </span>
        ) : (
          <button
            type="button"
            onClick={() => go(next)}
            className="neon-btn hover:[box-shadow:var(--glow-neon)] rounded-md px-6 py-2.5 font-heading text-xs uppercase tracking-[0.2em]"
          >
            {nextLabel} →
          </button>
        ))}
    </div>
  );
}
