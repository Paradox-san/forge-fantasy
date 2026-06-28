import { createFileRoute, Link } from "@tanstack/react-router";
import { SYSTEMS } from "@/lib/systems";
import { useCharacter } from "@/lib/character-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arcanum — Forja de Fichas de RPG" },
      {
        name: "description",
        content:
          "Boas-vindas à Arcanum. Escolha seu sistema de RPG e forje sua ficha em minutos.",
      },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const setSystem = useCharacter((s) => s.setSystem);
  const reset = useCharacter((s) => s.reset);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Decorative rune ring */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[700px] -translate-x-1/2 opacity-30 animate-rune-spin"
        aria-hidden
      >
        <div className="absolute inset-0 rounded-full border border-primary/30" />
        <div className="absolute inset-10 rounded-full border border-primary/20" />
        <div className="absolute inset-24 rounded-full border border-primary/10" />
      </div>

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-3xl text-primary text-glow animate-flicker">✦</span>
          <span className="font-display text-xl tracking-[0.3em] text-foreground">ARCANUM</span>
        </div>
        <nav className="hidden gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
          <a href="#sistemas" className="hover:text-primary">Sistemas</a>
          <a href="#como" className="hover:text-primary">Como funciona</a>
        </nav>
      </header>

      <section className="relative mx-auto max-w-5xl px-6 pt-12 pb-20 text-center">
        <p className="mb-4 font-heading text-xs uppercase tracking-[0.5em] text-primary text-glow-soft">
          Forja de fichas · v1
        </p>
        <h1 className="font-display text-5xl leading-tight text-foreground text-glow md:text-7xl">
          Conjure seu herói.
          <br />
          <span className="text-primary">Que a ficha se escreva sozinha.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          Um atelier arcano para criar personagens de RPG. Escolha um sistema, percorra os passos
          rituais e receba uma ficha viva — moldada à classe que escolher.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/create/$system"
            params={{ system: "dnd5e" }}
            onClick={() => {
              reset();
              setSystem("dnd5e");
            }}
            className="neon-btn hover:[box-shadow:var(--glow-neon)] inline-flex items-center gap-2 rounded-md px-7 py-3 font-heading text-sm uppercase tracking-[0.2em] transition"
          >
            <span>Começar com D&D 5.5</span>
            <span aria-hidden>→</span>
          </Link>
          <a
            href="#sistemas"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/60 px-6 py-3 font-heading text-sm uppercase tracking-[0.2em] text-foreground transition hover:border-primary/60"
          >
            Ver sistemas
          </a>
        </div>
      </section>

      <section id="sistemas" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl text-foreground md:text-4xl">Os Quatro Códices</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Comece com D&D 5.5. Os demais despertam em breve.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEMS.map((sys) => {
            const available = sys.status === "available";
            const card = (
              <article
                className={`group rune-panel relative flex h-full flex-col rounded-xl p-6 transition ${
                  available
                    ? "hover:-translate-y-1 hover:[box-shadow:var(--glow-neon)]"
                    : "opacity-70"
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <span
                    className={`font-display text-4xl ${
                      available ? "text-primary text-glow" : "text-muted-foreground"
                    }`}
                  >
                    {sys.sigil}
                  </span>
                  {!available && (
                    <span className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      Em breve
                    </span>
                  )}
                  {available && (
                    <span className="rounded-full border border-primary/50 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                      Pronto
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-lg text-foreground">{sys.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-primary/80">
                  {sys.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">{sys.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
                  {available ? "Forjar ficha" : "Aguarde"}
                  {available && <span aria-hidden>→</span>}
                </span>
              </article>
            );
            return available ? (
              <Link
                key={sys.id}
                to="/create/$system"
                params={{ system: sys.id }}
                onClick={() => {
                  reset();
                  setSystem(sys.id);
                }}
              >
                {card}
              </Link>
            ) : (
              <div key={sys.id} aria-disabled>
                {card}
              </div>
            );
          })}
        </div>
      </section>

      <section id="como" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rune-panel rounded-xl p-8 md:p-10">
          <h2 className="font-display text-2xl text-foreground md:text-3xl">O Ritual</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-5">
            {[
              ["I", "Identidade", "Nome, jogador e nível"],
              ["II", "Linhagem", "Escolha sua raça"],
              ["III", "Vocação", "Escolha sua classe"],
              ["IV", "Atributos", "Distribua o array padrão"],
              ["V", "Ficha", "Layout único da sua classe"],
            ].map(([num, title, desc]) => (
              <li key={num} className="text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-lg text-primary text-glow-soft">
                  {num}
                </div>
                <p className="font-heading text-sm text-foreground">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-center text-xs text-muted-foreground">
        <p>Arcanum · forja arcana de fichas · feito para mestres e jogadores</p>
      </footer>
    </main>
  );
}
