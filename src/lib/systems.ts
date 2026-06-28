export type SystemId = "dnd5e" | "dreowacis" | "quebra-do-tempo" | "autoral";

export interface SystemInfo {
  id: SystemId;
  name: string;
  tagline: string;
  description: string;
  status: "available" | "coming-soon";
  sigil: string; // single unicode glyph
}

export const SYSTEMS: SystemInfo[] = [
  {
    id: "dnd5e",
    name: "Dungeons & Dragons 5.5",
    tagline: "O clássico da fantasia heróica",
    description:
      "O sistema mais jogado do mundo. Reinos esquecidos, dragões antigos e magia arcana em um d20 só.",
    status: "available",
    sigil: "⚔",
  },
  {
    id: "dreowacis",
    name: "Dreowacis",
    tagline: "Sonhos despertos — sistema autoral",
    description:
      "Um sistema autoral de mistério onírico, onde a realidade se dobra ao redor dos sonhadores.",
    status: "coming-soon",
    sigil: "☾",
  },
  {
    id: "quebra-do-tempo",
    name: "Quebra do Tempo",
    tagline: "Cronomancia e paradoxo — sistema autoral",
    description:
      "Quando o tempo se quebra, heróis caminham entre eras. Sistema autoral de aventura temporal.",
    status: "coming-soon",
    sigil: "⧖",
  },
  {
    id: "autoral",
    name: "Sistema Autoral",
    tagline: "Construa suas próprias regras",
    description:
      "Um espaço para você definir as bases do seu próprio RPG. Em breve, modelagem livre de fichas.",
    status: "coming-soon",
    sigil: "✦",
  },
];

export const getSystem = (id: string) =>
  SYSTEMS.find((s) => s.id === id) ?? SYSTEMS[0];
