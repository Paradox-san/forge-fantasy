import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AbilityKey, AbilityMethod, Attack, SkillKey, Spell } from "./dnd-data";
import type { SystemId } from "./systems";

export interface CharacterState {
  system: SystemId;
  name: string;
  player: string;
  raceId: string;
  classId: string;
  level: number;
  background: string;
  alignment: string;
  abilities: Record<AbilityKey, number>;
  abilityMethod: AbilityMethod;
  skills: SkillKey[];
  languages: string[];
  bio: string;
  /** null = fall back to class defaults; array = user-edited */
  customAttacks: Attack[] | null;
  customSpells: Spell[] | null;
  setSystem: (s: SystemId) => void;
  setField: <K extends keyof CharacterState>(k: K, v: CharacterState[K]) => void;
  setAbility: (k: AbilityKey, v: number) => void;
  toggleSkill: (k: SkillKey, max: number) => void;
  toggleLanguage: (l: string) => void;
  setAttacks: (a: Attack[]) => void;
  setSpells: (s: Spell[]) => void;
  resetAttacks: () => void;
  resetSpells: () => void;
  reset: () => void;
}

const initial = {
  system: "dnd5e" as SystemId,
  name: "",
  player: "",
  raceId: "",
  classId: "",
  level: 1,
  background: "",
  alignment: "",
  abilities: { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 } as Record<AbilityKey, number>,
  abilityMethod: "standard" as AbilityMethod,
  skills: [] as SkillKey[],
  languages: ["Comum"] as string[],
  bio: "",
  customAttacks: null as Attack[] | null,
  customSpells: null as Spell[] | null,
};

export const useCharacter = create<CharacterState>()(
  persist(
    (set) => ({
      ...initial,
      setSystem: (s) => set({ system: s }),
      setField: (k, v) => set({ [k]: v } as Partial<CharacterState>),
      setAbility: (k, v) => set((state) => ({ abilities: { ...state.abilities, [k]: v } })),
      toggleSkill: (k, max) =>
        set((state) => {
          const has = state.skills.includes(k);
          if (has) return { skills: state.skills.filter((s) => s !== k) };
          if (state.skills.length >= max) return {};
          return { skills: [...state.skills, k] };
        }),
      toggleLanguage: (l) =>
        set((state) => ({
          languages: state.languages.includes(l)
            ? state.languages.filter((x) => x !== l)
            : [...state.languages, l],
        })),
      setAttacks: (a) => set({ customAttacks: a }),
      setSpells: (s) => set({ customSpells: s }),
      resetAttacks: () => set({ customAttacks: null }),
      resetSpells: () => set({ customSpells: null }),
      reset: () => set({ ...initial }),
    }),
    { name: "arcanum-character" },
  ),
);
