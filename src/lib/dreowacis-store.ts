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
  raceId: string;
  raceVariantId: string;
  raceAbilities: string[]; // ids das habilidades escolhidas
  raceCommonAbility: string; // id da comum (Homens-Fera/Sereias)
  classId: string;
  classSubChoiceId: string;
  classAbilities: string[]; // ids das habilidades de classe escolhidas
  kingdomId: string;
  backgroundId: string;
  deityId: string;
  concept: string;
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
  toggleRaceAbility: (id: string, max: number) => void;
  toggleClassAbility: (id: string, max: number) => void;
  setAttacks: (a: Attack[]) => void;
  setManaAbilities: (a: Ability[]) => void;
  reset: () => void;
}

const initial = {
  name: "",
  player: "",
  level: 1,
  raceId: "",
  raceVariantId: "",
  raceAbilities: [] as string[],
  raceCommonAbility: "",
  classId: "",
  classSubChoiceId: "",
  classAbilities: [] as string[],
  kingdomId: "",
  backgroundId: "",
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
      toggleRaceAbility: (id, max) =>
        set((s) => {
          if (s.raceAbilities.includes(id))
            return { raceAbilities: s.raceAbilities.filter((x) => x !== id) };
          if (s.raceAbilities.length >= max) return {};
          return { raceAbilities: [...s.raceAbilities, id] };
        }),
      toggleClassAbility: (id, max) =>
        set((s) => {
          if (s.classAbilities.includes(id))
            return { classAbilities: s.classAbilities.filter((x) => x !== id) };
          if (s.classAbilities.length >= max) return {};
          return { classAbilities: [...s.classAbilities, id] };
        }),
      setAttacks: (attacks) => set({ attacks }),
      setManaAbilities: (manaAbilities) => set({ manaAbilities }),
      reset: () => set({ ...initial }),
    }),
    { name: "arcanum-character-dreowacis" },
  ),
);

