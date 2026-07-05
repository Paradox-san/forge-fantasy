import { createFileRoute } from "@tanstack/react-router";
import { RACES, getRace, getVariant, ABILITIES, type Race, type RaceVariant } from "@/lib/dreowacis-data";
import { useDreowacis } from "@/lib/dreowacis-store";
import { NavRow } from "./create.dreowacis.index";

export const Route = createFileRoute("/create/dreowacis/raca")({
  component: RaceStep,
});

const fmtAttrs = (attrs: Race["attributes"]) =>
  Object.entries(attrs)
    .map(([k, v]) => `${k.toUpperCase()} ${(v ?? 0) >= 0 ? "+" : ""}${v}`)
    .join(" · ") || "—";

function RaceStep() {
  const {
    raceId,
    raceVariantId,
    raceAbilities,
    raceCommonAbility,
    setField,
    toggleRaceAbility,
  } = useDreowacis();

  const race = raceId ? getRace(raceId) : undefined;
  const variant = race?.variants && raceVariantId ? getVariant(raceId, raceVariantId) : undefined;

  const pickRace = (id: string) => {
    if (id === raceId) return;
    setField("raceId", id);
    setField("raceVariantId", "");
    setField("raceAbilities", []);
    setField("raceCommonAbility", "");
  };

  const pickVariant = (id: string) => {
    setField("raceVariantId", id);
    setField("raceAbilities", []); // reset variant-exclusive picks
  };

  // Validação: precisa ter escolhido raça, se houver variantes precisa variante,
  // atingir chooseAbilities e chooseCommonAbility se aplicável.
  const commonOk = !race?.chooseCommonAbility || !!raceCommonAbility;
  const variantOk = !race?.variants || !!raceVariantId;
  const abilitiesRequired = (() => {
    if (!race) return 0;
    if (race.variants && variant) return 1; // variant exclusiveAbilities: choose 1
    return race.chooseAbilities;
  })();
  const abilitiesOk = raceAbilities.length === abilitiesRequired;
  const canContinue = !!race && variantOk && commonOk && abilitiesOk;

  return (
    <section>
      <header className="mb-8 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo II · Raça
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Que sangue corre em você?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Nove povos habitam Dreowacis. Cada um traz sua herança para a próxima aventura.
        </p>
      </header>

      {/* Escolha da Raça */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RACES.map((r) => {
          const selected = raceId === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => pickRace(r.id)}
              className={`rune-panel relative rounded-xl p-5 text-left transition ${
                selected
                  ? "border-primary/80 [box-shadow:var(--glow-neon)] -translate-y-0.5"
                  : "hover:-translate-y-0.5 hover:border-primary/60"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-heading text-lg text-foreground">{r.name}</h3>
                {selected && (
                  <span className="rounded-full border border-primary bg-primary/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                    Escolhido
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-primary/70">
                {r.tagline}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{r.flavor}</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-primary">
                  {fmtAttrs(r.attributes)}
                </span>
                <span className="rounded border border-border bg-secondary/60 px-2 py-0.5 text-muted-foreground">
                  {r.speed}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Painel de detalhes da raça escolhida */}
      {race && (
        <div className="mt-10 space-y-5">
          <div className="rune-panel rounded-xl p-6">
            <div className="grid gap-3 md:grid-cols-4">
              <Info label="Raça" value={race.name} />
              <Info label="Tamanho" value={race.size} />
              <Info label="Deslocamento" value={race.speed} />
              <Info label="Longevidade" value={race.lifespan} />
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
              {ABILITIES.map((abil) => {
                const rb = race.attributes[abil.key] ?? 0;
                const vb = variant?.attributes[abil.key] ?? 0;
                const total = rb + vb;
                if (!total) return null;
                return (
                  <span
                    key={abil.key}
                    className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-primary"
                  >
                    {abil.short} {total >= 0 ? "+" : ""}
                    {total}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Habilidade automática */}
          <AbilityBlock
            title="Habilidade Automática"
            items={[race.automaticAbility]}
          />

          {/* Traço especial da raça (se existir e não variante-based) */}
          {race.specialTrait && !race.variants && (
            <AbilityBlock title="Traço Especial" items={[race.specialTrait]} />
          )}

          {/* Escolha de variante */}
          {race.variants && (
            <div>
              <h2 className="mb-3 font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
                Escolha uma espécie / variante
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {race.variants.map((v) => {
                  const sel = raceVariantId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => pickVariant(v.id)}
                      className={`rune-panel rounded-xl p-4 text-left transition ${
                        sel
                          ? "border-primary/80 [box-shadow:var(--glow-neon-sm)]"
                          : "hover:border-primary/60"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-heading text-base text-foreground">{v.name}</h3>
                        {sel && (
                          <span className="rounded-full border border-primary bg-primary/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-[13px] text-muted-foreground">{v.variantAbility.text}</p>
                      {Object.keys(v.attributes).length > 0 && (
                        <p className="mt-2 font-mono text-[11px] text-primary">
                          {fmtAttrs(v.attributes)}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {variant && (
            <>
              <AbilityBlock title="Habilidade de Variante" items={[variant.variantAbility]} />
              {variant.specialTrait && (
                <AbilityBlock title="Traço Especial" items={[variant.specialTrait]} />
              )}
              {race.specialTrait && (
                <AbilityBlock title={`Traço Unificador (${race.name})`} items={[race.specialTrait]} />
              )}
            </>
          )}

          {/* Habilidade comum (para Homens-Fera / Sereias) */}
          {race.commonAbilities && race.chooseCommonAbility && (
            <PickList
              title={`Habilidade Comum (escolha ${race.chooseCommonAbility})`}
              options={race.commonAbilities}
              selectedIds={raceCommonAbility ? [raceCommonAbility] : []}
              onToggle={(id) =>
                setField("raceCommonAbility", raceCommonAbility === id ? "" : id)
              }
              max={1}
            />
          )}

          {/* Habilidades de raça OU exclusivas de variante */}
          {race.variants && variant ? (
            <PickList
              title={`Habilidade Exclusiva de ${variant.name} (escolha 1)`}
              options={variant.exclusiveAbilities}
              selectedIds={raceAbilities}
              onToggle={(id) => toggleRaceAbility(id, 1)}
              max={1}
            />
          ) : race.abilities.length > 0 ? (
            <PickList
              title={`Habilidades de Raça (escolha ${race.chooseAbilities})`}
              options={race.abilities}
              selectedIds={raceAbilities}
              onToggle={(id) => toggleRaceAbility(id, race.chooseAbilities)}
              max={race.chooseAbilities}
            />
          ) : null}
        </div>
      )}

      <NavRow
        prev=""
        next="reino"
        disabled={!canContinue}
        nextLabel="Escolher Reino"
      />
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}

function AbilityBlock({
  title,
  items,
}: {
  title: string;
  items: { id: string; name: string; text: string }[];
}) {
  return (
    <div className="rune-panel rounded-xl p-5">
      <h3 className="mb-2 font-heading text-[11px] uppercase tracking-[0.3em] text-primary/80">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((it) => (
          <div key={it.id}>
            <p className="font-heading text-sm text-foreground">{it.name}</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PickList({
  title,
  options,
  selectedIds,
  onToggle,
  max,
}: {
  title: string;
  options: { id: string; name: string; text: string }[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  max: number;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-heading text-sm uppercase tracking-[0.3em] text-primary/80">{title}</h3>
        <span className="text-[11px] text-muted-foreground">
          {selectedIds.length}/{max}
        </span>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {options.map((op) => {
          const sel = selectedIds.includes(op.id);
          const full = selectedIds.length >= max && !sel;
          return (
            <button
              key={op.id}
              type="button"
              disabled={full}
              onClick={() => onToggle(op.id)}
              className={`rounded-lg border p-3 text-left transition ${
                sel
                  ? "border-primary/80 bg-primary/10 [box-shadow:var(--glow-neon-sm)]"
                  : full
                    ? "cursor-not-allowed border-border/40 bg-secondary/20 opacity-50"
                    : "border-border/60 bg-secondary/30 hover:border-primary/50"
              }`}
            >
              <p className="font-heading text-sm text-foreground">{op.name}</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">{op.text}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// silence unused type import warnings
export type _KeepTypes = RaceVariant;
