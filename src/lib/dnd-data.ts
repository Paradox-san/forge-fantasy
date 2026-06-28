export type AbilityKey = "for" | "des" | "con" | "int" | "sab" | "car";

export const ABILITIES: { key: AbilityKey; name: string; short: string }[] = [
  { key: "for", name: "Força", short: "FOR" },
  { key: "des", name: "Destreza", short: "DES" },
  { key: "con", name: "Constituição", short: "CON" },
  { key: "int", name: "Inteligência", short: "INT" },
  { key: "sab", name: "Sabedoria", short: "SAB" },
  { key: "car", name: "Carisma", short: "CAR" },
];

export interface Race {
  id: string;
  name: string;
  description: string;
  bonuses: Partial<Record<AbilityKey, number>>;
  speed: number;
  traits: string[];
}

export const RACES: Race[] = [
  {
    id: "humano",
    name: "Humano",
    description: "Versáteis e ambiciosos, espalhados por todos os reinos.",
    bonuses: { for: 1, des: 1, con: 1, int: 1, sab: 1, car: 1 },
    speed: 9,
    traits: ["Versatilidade", "Idioma adicional"],
  },
  {
    id: "elfo",
    name: "Elfo",
    description: "Graciosos imortais ligados à magia e à floresta antiga.",
    bonuses: { des: 2, int: 1 },
    speed: 9,
    traits: ["Visão no escuro", "Ascendência feérica", "Transe"],
  },
  {
    id: "anao",
    name: "Anão",
    description: "Forjadores das montanhas, resistentes como a própria pedra.",
    bonuses: { con: 2, for: 1 },
    speed: 7.5,
    traits: ["Visão no escuro", "Resistência anã", "Treinamento com armas"],
  },
  {
    id: "halfling",
    name: "Halfling",
    description: "Pequenos, ágeis e estranhamente sortudos.",
    bonuses: { des: 2, car: 1 },
    speed: 7.5,
    traits: ["Sortudo", "Bravura", "Agilidade Halfling"],
  },
  {
    id: "draconato",
    name: "Draconato",
    description: "Descendentes dos grandes dragões, com sopro elemental.",
    bonuses: { for: 2, car: 1 },
    speed: 9,
    traits: ["Sopro de Dragão", "Resistência a Dano"],
  },
  {
    id: "tiefling",
    name: "Tiefling",
    description: "Marcados por linhagens infernais, carregam fogo no sangue.",
    bonuses: { int: 1, car: 2 },
    speed: 9,
    traits: ["Visão no escuro", "Resistência infernal", "Legado infernal"],
  },
];

export type ClassTheme = "arcane" | "martial" | "divine" | "primal" | "shadow" | "song";

export interface DndClass {
  id: string;
  name: string;
  description: string;
  hitDie: number;
  primary: AbilityKey;
  theme: ClassTheme;
  themeColor: string; // oklch
  themeAccent: string;
  glyph: string;
  features: string[];
  /** Layout style for the final sheet */
  sheetLayout: "grimoire" | "warbanner" | "scripture" | "tribal" | "shadowdossier" | "songbook";
}

export const CLASSES: DndClass[] = [
  {
    id: "mago",
    name: "Mago",
    description: "Estudioso da arcana. Modela a realidade através de grimórios antigos.",
    hitDie: 6,
    primary: "int",
    theme: "arcane",
    themeColor: "oklch(0.68 0.28 305)",
    themeAccent: "oklch(0.78 0.22 290)",
    glyph: "✦",
    features: ["Conjuração arcana", "Recuperação arcana", "Tradição arcana"],
    sheetLayout: "grimoire",
  },
  {
    id: "guerreiro",
    name: "Guerreiro",
    description: "Mestre das armas e armaduras. Disciplina marcial em forma de carne.",
    hitDie: 10,
    primary: "for",
    theme: "martial",
    themeColor: "oklch(0.62 0.22 30)",
    themeAccent: "oklch(0.82 0.16 85)",
    glyph: "⚔",
    features: ["Estilo de luta", "Surto de ação", "Segundo fôlego"],
    sheetLayout: "warbanner",
  },
  {
    id: "clerigo",
    name: "Clérigo",
    description: "Vaso de uma divindade. Canaliza poder sagrado em milagres.",
    hitDie: 8,
    primary: "sab",
    theme: "divine",
    themeColor: "oklch(0.82 0.16 85)",
    themeAccent: "oklch(0.92 0.05 85)",
    glyph: "☩",
    features: ["Conjuração divina", "Domínio divino", "Canalizar divindade"],
    sheetLayout: "scripture",
  },
  {
    id: "barbaro",
    name: "Bárbaro",
    description: "Fúria primal, força bruta e instinto selvagem.",
    hitDie: 12,
    primary: "for",
    theme: "primal",
    themeColor: "oklch(0.5 0.22 20)",
    themeAccent: "oklch(0.68 0.18 40)",
    glyph: "᛭",
    features: ["Fúria", "Defesa sem armadura", "Ataque imprudente"],
    sheetLayout: "tribal",
  },
  {
    id: "ladino",
    name: "Ladino",
    description: "Sombra, lâmina e oportunidade. Vence pelo engenho.",
    hitDie: 8,
    primary: "des",
    theme: "shadow",
    themeColor: "oklch(0.55 0.18 270)",
    themeAccent: "oklch(0.72 0.18 290)",
    glyph: "✶",
    features: ["Ataque furtivo", "Perícia", "Gíria de ladrão"],
    sheetLayout: "shadowdossier",
  },
  {
    id: "bardo",
    name: "Bardo",
    description: "Tece a magia em canção. Inspiração e palavra como arma.",
    hitDie: 8,
    primary: "car",
    theme: "song",
    themeColor: "oklch(0.68 0.2 340)",
    themeAccent: "oklch(0.82 0.16 320)",
    glyph: "♪",
    features: ["Inspiração de bardo", "Conjuração", "Versátil"],
    sheetLayout: "songbook",
  },
];

export const BACKGROUNDS = [
  "Acólito",
  "Charlatão",
  "Criminoso",
  "Eremita",
  "Forasteiro",
  "Herói do Povo",
  "Nobre",
  "Sábio",
  "Soldado",
];

export const ALIGNMENTS = [
  "Leal e Bom",
  "Neutro e Bom",
  "Caótico e Bom",
  "Leal e Neutro",
  "Neutro",
  "Caótico e Neutro",
  "Leal e Mau",
  "Neutro e Mau",
  "Caótico e Mau",
];

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export const modifier = (score: number) => Math.floor((score - 10) / 2);
export const fmtMod = (m: number) => (m >= 0 ? `+${m}` : `${m}`);

export const getRace = (id: string) => RACES.find((r) => r.id === id);
export const getClass = (id: string) => CLASSES.find((c) => c.id === id);
