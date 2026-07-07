import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ABILITIES, SKILLS, modifier, fmtMod, proficiencyBonus,
  getKingdom, getDeity, getRace, getVariant, raceAttributeBonus,
  manaMax, MANA_KEY_ABILITY, CD_TABLE, MANA_COSTS,
  getBackground, SPELLS, SPELL_ELEMENT_COLORS, type SpellElement,
} from "@/lib/dreowacis-data";
import { useDreowacis, type Attack, type Ability } from "@/lib/dreowacis-store";
import { NavRow } from "./create.dreowacis.index";


export const Route = createFileRoute("/create/dreowacis/ficha")({
  component: SheetStep,
});

function newAttack(): Attack {
  return { id: crypto.randomUUID(), name: "", bonus: "+0", damage: "1d6", notes: "" };
}
function newAbility(): Ability {
  return { id: crypto.randomUUID(), name: "", cost: "1", effect: "" };
}

function SheetStep() {
  const s = useDreowacis();
  const kingdom = s.kingdomId ? getKingdom(s.kingdomId) : undefined;
  const deity = s.deityId && s.deityId !== "nenhum" ? getDeity(s.deityId) : undefined;
  const race = s.raceId ? getRace(s.raceId) : undefined;
  const variant = s.raceId && s.raceVariantId ? getVariant(s.raceId, s.raceVariantId) : undefined;
  const background = s.backgroundId ? getBackground(s.backgroundId) : undefined;
  const prof = proficiencyBonus(s.level);
  const [spellElement, setSpellElement] = useState<SpellElement | "Todas">("Todas");
  const [spellLevel, setSpellLevel] = useState<number | "Todos">("Todos");

  const totalAbility = (k: (typeof ABILITIES)[number]["key"]) => {
    const kingdomBonus = kingdom?.bonusAbility === k ? 1 : 0;
    const raceBonus = s.raceId ? raceAttributeBonus(s.raceId, s.raceVariantId, k) : 0;
    return s.abilities[k] + kingdomBonus + raceBonus;
  };


  const conMod = modifier(totalAbility("con"));
  const dexMod = modifier(totalAbility("des"));
  const keyMod = modifier(totalAbility(MANA_KEY_ABILITY));

  const hpMax = 10 + conMod + (s.level - 1) * (6 + conMod);
  const mana = manaMax(s.level, totalAbility(MANA_KEY_ABILITY));
  const ac = 10 + dexMod;
  const initiative = dexMod;

  const setAttack = (id: string, patch: Partial<Attack>) =>
    s.setAttacks(s.attacks.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const setAbil = (id: string, patch: Partial<Ability>) =>
    s.setManaAbilities(s.manaAbilities.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const handlePrint = () => window.print();

  return (
    <section>
      <header className="mb-6 text-center no-print">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-primary text-glow-soft">
          Passo Final · Ficha
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Ficha de Dreowacis</h1>
      </header>

      <div className="mb-4 flex justify-center gap-2 no-print">
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-xs uppercase tracking-widest text-primary hover:bg-primary/20"
        >
          🖨 Imprimir / Baixar PDF
        </button>
      </div>

      <div className="sheet-print-area space-y-6">
        {/* Cabeçalho */}
        <div className="rune-panel rounded-xl p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <SheetField label="Personagem" value={s.name || "—"} big />
            <SheetField label="Jogador" value={s.player || "—"} />
            <SheetField label="Nível" value={String(s.level)} />
            <SheetField
              label="Raça"
              value={race ? (variant ? `${race.name} · ${variant.name}` : race.name) : "—"}
            />
            <SheetField label="Reino" value={kingdom?.name ?? "—"} />
            <SheetField label="Devoção" value={deity?.name ?? "Sem devoção"} />
            <SheetField label="Conceito" value={s.concept || "—"} />
            <SheetField label="Antecedente" value={background?.name ?? "—"} />
          </div>
          {background && (
            <div className="mt-4 rounded border border-primary/30 bg-primary/5 p-3 text-[11px]">
              <p className="font-heading uppercase tracking-widest text-primary">
                {background.supportName}
              </p>
              <p className="mt-1 text-muted-foreground">{background.supportText}</p>
              <p className="mt-2 text-muted-foreground">
                <span className="text-primary/80">Item: </span>{background.item} ·{" "}
                <span className="text-primary/80">Proficiências: </span>{background.proficiencies}
                {background.languages && (
                  <>
                    {" · "}<span className="text-primary/80">Idiomas: </span>{background.languages}
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Atributos + estatísticas */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rune-panel rounded-xl p-6 md:col-span-2">
            <h2 className="mb-3 font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
              Atributos
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {ABILITIES.map((a) => {
                const val = totalAbility(a.key);
                return (
                  <div key={a.key} className="rounded-lg border border-border/60 bg-secondary/30 p-3 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{a.name}</p>
                    <p className="mt-1 font-display text-3xl text-primary">{fmtMod(modifier(val))}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{val}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rune-panel rounded-xl p-6 space-y-3">
            <Stat label="Pontos de Vida (máx)" value={hpMax} />
            <Stat label="Mana (máx)" value={mana} hint={`nível + mod ${MANA_KEY_ABILITY.toUpperCase()}`} />
            <Stat label="Classe de Armadura" value={ac} hint="10 + DES" />
            <Stat label="Iniciativa" value={fmtMod(initiative)} />
            <Stat label="Bônus de Proficiência" value={`+${prof}`} />
            <Stat label="Deslocamento" value="9m" hint="padrão" />
          </div>
        </div>

        {/* Perícias */}
        <div className="rune-panel rounded-xl p-6">
          <h2 className="mb-3 font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
            Perícias
          </h2>
          <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((sk) => {
              const trained = s.skills.includes(sk.key);
              const mod = modifier(totalAbility(sk.ability)) + (trained ? prof : 0);
              return (
                <div
                  key={sk.key}
                  className={`flex items-center justify-between rounded border px-3 py-1.5 text-sm ${
                    trained ? "border-primary/60 bg-primary/10 text-primary" : "border-border/60 bg-secondary/30 text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${trained ? "bg-primary" : "bg-muted-foreground/40"}`} />
                    {sk.name}
                    <span className="text-[10px] uppercase text-muted-foreground">{sk.ability}</span>
                  </span>
                  <span className="font-mono">{fmtMod(mod)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ataques */}
        <div className="rune-panel rounded-xl p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-primary/80">Ataques</h2>
            <button
              type="button"
              onClick={() => s.setAttacks([...s.attacks, newAttack()])}
              className="rounded border border-primary/50 bg-primary/10 px-2 py-1 text-[11px] uppercase tracking-widest text-primary hover:bg-primary/20 no-print"
            >
              + Adicionar
            </button>
          </div>
          {s.attacks.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum ataque cadastrado.</p>
          ) : (
            <div className="space-y-2">
              {s.attacks.map((a) => (
                <div key={a.id} className="grid gap-2 rounded-lg border border-border/50 bg-secondary/20 p-2 md:grid-cols-[2fr_1fr_1fr_2fr_auto]">
                  <input value={a.name} onChange={(e) => setAttack(a.id, { name: e.target.value })} placeholder="Nome" className="rounded border border-border bg-input/60 px-2 py-1 text-sm" />
                  <input value={a.bonus} onChange={(e) => setAttack(a.id, { bonus: e.target.value })} placeholder="+ ataque" className="rounded border border-border bg-input/60 px-2 py-1 font-mono text-sm" />
                  <input value={a.damage} onChange={(e) => setAttack(a.id, { damage: e.target.value })} placeholder="dano" className="rounded border border-border bg-input/60 px-2 py-1 font-mono text-sm" />
                  <input value={a.notes} onChange={(e) => setAttack(a.id, { notes: e.target.value })} placeholder="notas" className="rounded border border-border bg-input/60 px-2 py-1 text-sm" />
                  <button
                    type="button"
                    onClick={() => s.setAttacks(s.attacks.filter((x) => x.id !== a.id))}
                    className="rounded border border-destructive/50 bg-destructive/10 px-2 text-xs text-destructive hover:bg-destructive/20 no-print"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Habilidades / Magias com custo de mana */}
        <div className="rune-panel rounded-xl p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
              Habilidades &amp; Magias (Mana)
            </h2>
            <button
              type="button"
              onClick={() => s.setManaAbilities([...s.manaAbilities, newAbility()])}
              className="rounded border border-primary/50 bg-primary/10 px-2 py-1 text-[11px] uppercase tracking-widest text-primary hover:bg-primary/20 no-print"
            >
              + Adicionar
            </button>
          </div>
          <p className="mb-3 text-[11px] text-muted-foreground">
            Custos: {MANA_COSTS.map(([l, c]) => `${l} ${c}`).join(" · ")}
          </p>
          {s.manaAbilities.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma habilidade cadastrada.</p>
          ) : (
            <div className="space-y-2">
              {s.manaAbilities.map((a) => (
                <div key={a.id} className="grid gap-2 rounded-lg border border-border/50 bg-secondary/20 p-2 md:grid-cols-[2fr_1fr_3fr_auto]">
                  <input value={a.name} onChange={(e) => setAbil(a.id, { name: e.target.value })} placeholder="Nome" className="rounded border border-border bg-input/60 px-2 py-1 text-sm" />
                  <input value={a.cost} onChange={(e) => setAbil(a.id, { cost: e.target.value })} placeholder="mana" className="rounded border border-border bg-input/60 px-2 py-1 font-mono text-sm" />
                  <input value={a.effect} onChange={(e) => setAbil(a.id, { effect: e.target.value })} placeholder="efeito" className="rounded border border-border bg-input/60 px-2 py-1 text-sm" />
                  <button
                    type="button"
                    onClick={() => s.setManaAbilities(s.manaAbilities.filter((x) => x.id !== a.id))}
                    className="rounded border border-destructive/50 bg-destructive/10 px-2 text-xs text-destructive hover:bg-destructive/20 no-print"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* Grimório — importar magias do compêndio */}
        <div className="rune-panel rounded-xl p-6 no-print">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
              Grimório · Compêndio de Magias
            </h2>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <select
                value={spellElement}
                onChange={(e) => setSpellElement(e.target.value as SpellElement | "Todas")}
                className="rounded border border-border bg-input/60 px-2 py-1 text-foreground"
              >
                <option value="Todas">Todos elementos</option>
                {(["Água", "Ar", "Fogo", "Terra"] as SpellElement[]).map((el) => (
                  <option key={el} value={el}>{el}</option>
                ))}
              </select>
              <select
                value={String(spellLevel)}
                onChange={(e) =>
                  setSpellLevel(e.target.value === "Todos" ? "Todos" : Number(e.target.value))
                }
                className="rounded border border-border bg-input/60 px-2 py-1 text-foreground"
              >
                <option value="Todos">Todos níveis</option>
                {[0, 1, 2, 3, 4, 5].map((l) => (
                  <option key={l} value={l}>{l === 0 ? "Truque" : `Nível ${l}`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SPELLS.filter((sp) => {
              const elements = Array.isArray(sp.element) ? sp.element : [sp.element];
              const elOk = spellElement === "Todas" || elements.includes(spellElement);
              const lvOk = spellLevel === "Todos" || sp.level === spellLevel;
              return elOk && lvOk;
            }).map((sp) => {
              const elements = Array.isArray(sp.element) ? sp.element : [sp.element];
              const alreadyIn = s.manaAbilities.some((a) => a.id === sp.id);
              return (
                <div
                  key={sp.id}
                  className="flex flex-col justify-between rounded-lg border border-border/60 bg-secondary/20 p-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-heading text-sm text-foreground">{sp.name}</p>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {sp.level === 0 ? "Truque" : `Nv ${sp.level}`}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {elements.map((el) => (
                        <span
                          key={el}
                          className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest"
                          style={{
                            borderColor: `${SPELL_ELEMENT_COLORS[el]}66`,
                            color: SPELL_ELEMENT_COLORS[el],
                            background: `${SPELL_ELEMENT_COLORS[el]}14`,
                          }}
                        >
                          {el}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      <span className="text-primary/80">Alcance:</span> {sp.range} ·{" "}
                      <span className="text-primary/80">Dur.:</span> {sp.duration}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{sp.text}</p>
                  </div>
                  <button
                    type="button"
                    disabled={alreadyIn}
                    onClick={() =>
                      s.setManaAbilities([
                        ...s.manaAbilities,
                        {
                          id: sp.id,
                          name: `${sp.name} (${sp.level === 0 ? "Truque" : `Nv ${sp.level}`})`,
                          cost: sp.level === 0 ? "0" : String(Math.max(1, sp.level)),
                          effect: `${sp.range} · ${sp.duration} · ${sp.text}`,
                        },
                      ])
                    }
                    className={`mt-3 rounded border px-2 py-1 text-[11px] uppercase tracking-widest transition ${
                      alreadyIn
                        ? "cursor-not-allowed border-border bg-secondary/30 text-muted-foreground/60"
                        : "border-primary/50 bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {alreadyIn ? "✓ No grimório" : "+ Adicionar à ficha"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Referência de CD */}
        <div className="rune-panel rounded-xl p-6">
          <h2 className="mb-3 font-heading text-sm uppercase tracking-[0.3em] text-primary/80">
            Tabela de CD (referência)
          </h2>
          <div className="grid gap-1.5 text-sm sm:grid-cols-3">
            {CD_TABLE.map(([label, cd]) => (
              <div key={label} className="flex items-center justify-between rounded border border-border/50 bg-secondary/30 px-3 py-1.5">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-mono text-primary">CD {cd}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        {s.bio && (
          <div className="rune-panel rounded-xl p-6">
            <h2 className="mb-3 font-heading text-sm uppercase tracking-[0.3em] text-primary/80">Biografia</h2>
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">{s.bio}</p>
          </div>
        )}

        {/* usar keyMod para evitar warning de unused */}
        <p className="hidden">{keyMod}</p>
      </div>

      <NavRow prev="antecedente" />
    </section>
  );
}

function SheetField({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-1 ${big ? "font-display text-2xl text-foreground" : "text-sm text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between rounded-lg border border-border/60 bg-secondary/30 px-3 py-2">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        {hint && <p className="text-[10px] text-muted-foreground/70">{hint}</p>}
      </div>
      <p className="font-display text-2xl text-primary">{value}</p>
    </div>
  );
}
