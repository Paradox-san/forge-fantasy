import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AbilityKey, AbilityMethod, SkillKey } from "./dreowacis-data";

export interface Attack {
  id: string;
  name: string;
  bonus: string;
  damage: string;
  notes: string;
}
export interface Ability {
  id: string;
  name: string;
  cost: string; // pontos de mana
  effect: string;
}

export interface DreowacisCharacter {
  name: string;
  player: string;
  level: number;
  kingdomId: string;
  deityId: string;
  concept: string; // conceito livre (raça/classe até termos PDFs oficiais)
  alignment: string;
  abilities: Record<AbilityKey, number>;
  abilityMethod: AbilityMethod;
  skills: SkillKey[];
  bio: string;
  attacks: Attack[];
  manaAbilities: Ability[];
  currentHp: number | null;
  currentMana: number | null;
  setField: <K extends keyof DreowacisCharacter>(k: K, v: DreowacisCharacter[K]) => void;
  setAbility: (k: AbilityKey, v: number) => void;
  toggleSkill: (k: SkillKey, max: number) => void;
  setAttacks: (a: Attack[]) => void;
  setManaAbilities: (a: Ability[]) => void;
  reset: () => void;
}

const initial = {
  name: "",
  player: "",
  level: 1,
  kingdomId: "",
  deityId: "",
  concept: "",
  alignment: "",
  abilities: { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 } as Record<AbilityKey, number>,
  abilityMethod: "standard" as AbilityMethod,
  skills: [] as SkillKey[],
  bio: "",
  attacks: [] as Attack[],
  manaAbilities: [] as Ability[],
  currentHp: null as number | null,
  currentMana: null as number | null,
};

export const useDreowacis = create<DreowacisCharacter>()(
  persist(
    (set) => ({
      ...initial,
      setField: (k, v) => set({ [k]: v } as Partial<DreowacisCharacter>),
      setAbility: (k, v) => set((s) => ({ abilities: { ...s.abilities, [k]: v } })),
      toggleSkill: (k, max) =>
        set((s) => {
          if (s.skills.includes(k)) return { skills: s.skills.filter((x) => x !== k) };
          if (s.skills.length >= max) return {};
          return { skills: [...s.skills, k] };
        }),
      setAttacks: (attacks) => set({ attacks }),
      setManaAbilities: (manaAbilities) => set({ manaAbilities }),
      reset: () => set({ ...initial }),
    }),
    { name: "arcanum-character-dreowacis" },
  ),
);
