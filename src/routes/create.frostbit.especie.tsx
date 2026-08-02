import { createFileRoute } from "@tanstack/react-router";
import {
  COMMON_SPECIES, SPECIAL_SPECIES, getSpecies, getSpeciesVariant, type Species,
} from "@/lib/frostbit-data";
import { useFrostbit } from "@/lib/frostbit-store";
import { NavRow } from "./create.frostbit.index";

export const Route = createFileRoute("/create/frostbit/especie")({
  component: SpeciesStep,
});

const fmtAttrs = (attrs: Species["attributes"]) =>
  Object.entries(attrs)
    .map(([k, v]) => `${k.toUpperCase()} ${(v ?? 0) >= 0 ? "+" : ""}${v}`)
    .join(" · ") || "—";

function SpeciesStep() {
  const {
    speciesId, speciesVariantId, showSpecialSpecies, setField,
  } = useFrostbit();

  const sp = speciesId ? getSpecies(speciesId) : undefined;
  const variant =
    sp?.variants && speciesVariantId ? getSpeciesVariant(speciesId, speciesVariantId) : undefined;

  const pick = (id: string) => {
    if (id === speciesId) return;
    setField("speciesId", id);
    setField("speciesVariantId", "");
  };

  const canContinue = !!sp && (!sp.variants || !!speciesVariantId);

  const Card = ({ s }: { s: Species }) => {
    const sel = speciesId === s.id;
    return (
      <button
        type="button"
        onClick={() => pick(s.id)}
        className={`rune-panel rounded-xl p-4 text-left transition ${
          sel
            ? "border-primary/80 [box-shadow:var(--glow-neon)] -translate-y-0.5"
            : "hover:-translate-y-0.5 hover:border-primary/60"
        }`}
      >
        
        
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-heading text-base text-foreground">{s.name}</h3>
          {s.special && (
            <span className="rounded border border-primary/50 bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary">
              especial
            </span>
          )}
        </div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.tagline}</p>
        <p className="mt-2 text-xs text-muted-foreground">{s.flavor}</p>
        <p className="mt-2 font-mono text-[10px] text-primary/80">{fmtAttrs(s.attributes)}</p>
      </button>
    );
  };

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo II · Espécie
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">O que sobreviveu ao inverno</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Espécies comuns habitam as cidadelas. As especiais são raras — e raramente bem-vindas.
        </p>
      </header>

      <div>
        <p className="mb-3 font-heading text-[11px] uppercase tracking-[0.35em] text-primary/70">
          Espécies Comuns
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMMON_SPECIES.map((s) => (
            <Card key={s.id} s={s} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-heading text-[11px] uppercase tracking-[0.35em] text-primary/70">
            Espécies Especiais
          </p>
          <button
            type="button"
            onClick={() => setField("showSpecialSpecies", !showSpecialSpecies)}
            className="rounded-md border border-primary/50 bg-primary/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-primary hover:bg-primary/20"
          >
            {showSpecialSpecies ? "Ocultar" : "Revelar (requer aval do mestre)"}
          </button>
        </div>
        {showSpecialSpecies ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIAL_SPECIES.map((s) => (
              <Card key={s.id} s={s} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border/70 bg-secondary/20 px-4 py-6 text-center text-xs text-muted-foreground">
            Três linhagens estão trancadas atrás do gelo. Fale com seu mestre antes de revelá-las.
          </p>
        )}
      </div>

      {sp && (
        <div className="mt-8 space-y-4">
          {sp.variants && (
            <div className="rune-panel rounded-xl p-5">
              <h3 className="mb-3 font-heading text-[12px] uppercase tracking-[0.3em] text-primary/80">
                {sp.variantLabel ?? "Variante"}
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {sp.variants.map((v) => {
                  const sel = speciesVariantId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setField("speciesVariantId", v.id)}
                      className={`rounded-lg border p-3 text-left text-xs transition ${
                        sel
                          ? "border-primary bg-primary/10 text-primary [box-shadow:var(--glow-neon-sm)]"
                          : "border-border bg-secondary/40 text-foreground hover:border-primary/50"
                      }`}
                    >
                      <p className="font-heading text-sm">{v.name}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{v.trait}</p>
                      {Object.keys(v.attributes).length > 0 && (
                        <p className="mt-1 font-mono text-[10px] text-primary/80">
                          {fmtAttrs(v.attributes)}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="rune-panel rounded-xl p-5">
            <div className="grid gap-5 sm:grid-cols-[minmax(0,240px)_1fr]">
              <div className="flex h-56 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-secondary/30">
                {variant?.imageUrl || sp.imageUrl ? (
                  <img
                    key={variant?.imageUrl || sp.imageUrl}
                    src={variant?.imageUrl || sp.imageUrl}
                    alt={variant ? `${sp.name} · ${variant.name}` : sp.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="px-3 text-center text-[10px] uppercase tracking-widest text-muted-foreground/50">
                    [ imagem de {variant ? `${sp.name} · ${variant.name}` : sp.name} ]
                  </span>
                )}
              </div>

              <div>
                <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
                  {sp.name}
                  {variant ? ` · ${variant.name}` : ""}
                </h2>
                <p className="mt-2 text-xs text-muted-foreground">{sp.description}</p>
                <div className="mt-3 grid gap-2 text-[11px] sm:grid-cols-3">
                  <p><span className="text-primary/80">Tamanho: </span>{sp.size}</p>
                  <p><span className="text-primary/80">Deslocamento: </span>{sp.speed}</p>
                  <p><span className="text-primary/80">Idiomas: </span>{sp.languages.join(", ")}</p>
                </div>
                <ul className="mt-3 space-y-1 text-[11px] text-muted-foreground">
                  {sp.traits.map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                  {variant && <li className="text-primary/90">· {variant.trait}</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <NavRow prev="" next="classe" disabled={!canContinue} nextLabel="Escolher Classe" />
    </section>
  );
}
