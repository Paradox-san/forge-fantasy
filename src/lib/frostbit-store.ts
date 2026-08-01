import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AbilityKey, AbilityMethod, SkillKey } from "./frostbit-data";

export interface Attack {
  id: string;
  name: string;
  bonus: string;
  damage: string;
  notes: string;
}

export interface SpellEntry {
  id: string;
  name: string;
  level: string;
  school: string;
  effect: string;
}

export interface FrostbitCharacter {
  name: string;
  player: string;
  level: number;
  speciesId: string;
  speciesVariantId: string;
  showSpecialSpecies: boolean;
  classId: string;
  subclassId: string;
  originId: string;
  alignment: string;
  abilities: Record<AbilityKey, number>;
  abilityMethod: AbilityMethod;
  skills: SkillKey[];
  languages: string[];
  bio: string;
  attacks: Attack[];
  spells: SpellEntry[];
  currentHp: number | null;
  setField: <K extends keyof FrostbitCharacter>(k: K, v: FrostbitCharacter[K]) => void;
  setAbility: (k: AbilityKey, v: number) => void;
  toggleSkill: (k: SkillKey, max: number) => void;
  toggleLanguage: (l: string) => void;
  setAttacks: (a: Attack[]) => void;
  setSpells: (s: SpellEntry[]) => void;
  reset: () => void;
}

const initial = {
  name: "",
  player: "",
  level: 1,
  speciesId: "",
  speciesVariantId: "",
  showSpecialSpecies: false,
  classId: "",
  subclassId: "",
  originId: "",
  alignment: "",
  abilities: { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 } as Record<AbilityKey, number>,
  abilityMethod: "standard" as AbilityMethod,
  skills: [] as SkillKey[],
  languages: [] as string[],
  bio: "",
  attacks: [] as Attack[],
  spells: [] as SpellEntry[],
  currentHp: null as number | null,
};

export const useFrostbit = create<FrostbitCharacter>()(
  persist(
    (set) => ({
      ...initial,
      setField: (k, v) => set({ [k]: v } as Partial<FrostbitCharacter>),
      setAbility: (k, v) => set((s) => ({ abilities: { ...s.abilities, [k]: v } })),
      toggleSkill: (k, max) =>
        set((s) => {
          if (s.skills.includes(k)) return { skills: s.skills.filter((x) => x !== k) };
          if (s.skills.length >= max) return {};
          return { skills: [...s.skills, k] };
        }),
      toggleLanguage: (l) =>
        set((s) => ({
          languages: s.languages.includes(l)
            ? s.languages.filter((x) => x !== l)
            : [...s.languages, l],
        })),
      setAttacks: (attacks) => set({ attacks }),
      setSpells: (spells) => set({ spells }),
      reset: () => set({ ...initial }),
    }),
    { name: "arcanum-character-frostbit" },
  ),
);
