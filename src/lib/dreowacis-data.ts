// Dados canônicos do sistema Dreowacis — extraídos dos PDFs
// "Dreowacis RPG — Regras" e "Dreowacis RPG — História".
// Este arquivo é isolado do D&D 5.5 e só é usado pelo fluxo /create/dreowacis.

export type AbilityKey = "for" | "des" | "con" | "int" | "sab" | "car";

export interface Ability {
  key: AbilityKey;
  name: string;
  short: string;
  hint: string;
}

export const ABILITIES: Ability[] = [
  { key: "for", name: "Força", short: "FOR", hint: "Poder físico bruto" },
  { key: "des", name: "Destreza", short: "DES", hint: "Agilidade e reflexos" },
  { key: "con", name: "Constituição", short: "CON", hint: "Resistência e vigor" },
  { key: "int", name: "Inteligência", short: "INT", hint: "Lógica e memória" },
  { key: "sab", name: "Sabedoria", short: "SAB", hint: "Percepção e bom senso" },
  { key: "car", name: "Carisma", short: "CAR", hint: "Presença e influência" },
];

export const modifier = (v: number) => Math.floor((v - 10) / 2);
export const fmtMod = (m: number) => (m >= 0 ? `+${m}` : `${m}`);

// Regras — testes de habilidade
export const CD_TABLE = [
  ["Muito fácil", 5],
  ["Fácil", 10],
  ["Médio", 15],
  ["Difícil", 20],
  ["Muito difícil", 25],
  ["Quase impossível", 30],
] as const;

// Bônus de proficiência por nível (PDF Regras p.3)
export const proficiencyBonus = (level: number) => {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
};

// Progressão de XP (PDF Regras p.7)
export const XP_TABLE = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];

export type AbilityMethod = "standard" | "random" | "pointbuy";
export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
export const POINT_BUY_TOTAL = 27;
export const POINT_BUY_COST: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
};

export const rollAbility = () => {
  const rolls = Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 6));
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
};

// ---------- Perícias (PDF Regras p.3-4) ----------

export type SkillKey =
  | "atletismo"
  | "acrobacia" | "furtividade" | "prestidigitacao"
  | "arcanismo" | "historia" | "investigacao" | "natureza" | "religiao"
  | "adestrar" | "intuicao" | "medicina" | "percepcao" | "sobrevivencia"
  | "atuacao" | "enganacao" | "intimidacao" | "persuasao";

export interface Skill { key: SkillKey; name: string; ability: AbilityKey; }

export const SKILLS: Skill[] = [
  { key: "atletismo", name: "Atletismo", ability: "for" },
  { key: "acrobacia", name: "Acrobacia", ability: "des" },
  { key: "furtividade", name: "Furtividade", ability: "des" },
  { key: "prestidigitacao", name: "Prestidigitação", ability: "des" },
  { key: "arcanismo", name: "Arcanismo", ability: "int" },
  { key: "historia", name: "História", ability: "int" },
  { key: "investigacao", name: "Investigação", ability: "int" },
  { key: "natureza", name: "Natureza", ability: "int" },
  { key: "religiao", name: "Religião", ability: "int" },
  { key: "adestrar", name: "Adestrar Animais", ability: "sab" },
  { key: "intuicao", name: "Intuição", ability: "sab" },
  { key: "medicina", name: "Medicina", ability: "sab" },
  { key: "percepcao", name: "Percepção", ability: "sab" },
  { key: "sobrevivencia", name: "Sobrevivência", ability: "sab" },
  { key: "atuacao", name: "Atuação", ability: "car" },
  { key: "enganacao", name: "Enganação", ability: "car" },
  { key: "intimidacao", name: "Intimidação", ability: "car" },
  { key: "persuasao", name: "Persuasão", ability: "car" },
];

// ---------- Reinos (PDF História p.3-5) ----------

export interface Kingdom {
  id: string;
  name: string;
  tagline: string;
  language: string;
  description: string;
  bonusAbility: AbilityKey;
  themeColor: string;
}

export const KINGDOMS: Kingdom[] = [
  {
    id: "clearmedow",
    name: "Clearmedow",
    tagline: "Terra da magia abundante",
    language: "Eilfarik",
    description:
      "Rica em mana e habitada por espécies fábriles. A torre mágica influencia mais que o próprio rei.",
    bonusAbility: "int",
    themeColor: "#a78bfa",
  },
  {
    id: "driowollow",
    name: "Driowollow",
    tagline: "Campos sempre verdes",
    language: "Iradano",
    description:
      "Terra fértil, família real representativa mais que comandante. Vestes simples e elegantes.",
    bonusAbility: "car",
    themeColor: "#34d399",
  },
  {
    id: "silverford",
    name: "Silverford",
    tagline: "Império do aço e da fé",
    language: "Ooktani",
    description:
      "Teocracia gélida do Deus da Vida. Considera outras divindades heresia. Aço silverfordiano é sua marca bélica.",
    bonusAbility: "for",
    themeColor: "#e5e7eb",
  },
  {
    id: "shouthmallow",
    name: "Shouthmallow",
    tagline: "Natureza e tecnologia a vapor",
    language: "Naafrada",
    description:
      "Matriarcado onde inteligência vale mais que força. Mistura mágica com engenharia verde.",
    bonusAbility: "sab",
    themeColor: "#f59e0b",
  },
  {
    id: "dracmead",
    name: "Dracmead",
    tagline: "Terra abençoada e mestiça",
    language: "Aimdem",
    description:
      "Reino equilibrado, governado pelo rei junto ao parlamento de nobres. Coisas estranhas acontecem aqui.",
    bonusAbility: "des",
    themeColor: "#f472b6",
  },
];

export const getKingdom = (id: string) => KINGDOMS.find((k) => k.id === id);

// ---------- Panteão (PDF História) ----------

export interface Deity {
  id: string;
  name: string;
  title: string;
  domain: string;
  alignment: string;
  colors: string;
}

export const DEITIES: Deity[] = [
  {
    id: "vida",
    name: "Deus da Vida",
    title: "O Guardião do Sopro",
    domain: "Vida, cura, renascimento",
    alignment: "Bondoso",
    colors: "Branco, dourado, verde-claro",
  },
  {
    id: "morte",
    name: "Deusa da Morte",
    title: "A Ceifadora Silenciosa",
    domain: "Fim, transição, juramentos",
    alignment: "Neutro",
    colors: "Cinza, negro, prata",
  },
  {
    id: "protecao",
    name: "Deusa da Proteção",
    title: "A Guardiã dos Escudos",
    domain: "Guarda, defesa dos fracos",
    alignment: "Leal",
    colors: "Azul, prata",
  },
  {
    id: "guerra",
    name: "Deus da Guerra",
    title: "O Estrategista, O General Divino",
    domain: "Guerra honrosa, estratégia",
    alignment: "Leal",
    colors: "Vermelho, aço",
  },
  {
    id: "comercio",
    name: "Deusa do Comércio",
    title: "A Balança dos Contratos",
    domain: "Trocas, contratos, equilíbrio",
    alignment: "Neutro",
    colors: "Dourado, verde",
  },
  {
    id: "crepusculo",
    name: "Deus do Crepúsculo (Inbris)",
    title: "A Fonte, o Limiar",
    domain: "Realidade, mistério, conhecimento proibido",
    alignment: "Inescrutável",
    colors: "Violeta, negro",
  },
];

export const getDeity = (id: string) => DEITIES.find((d) => d.id === id);

// ---------- Sistema de Mana (PDF Regras p.5-6) ----------

export const MANA_KEY_ABILITY: AbilityKey = "int"; // padrão até termos classes

export const manaMax = (level: number, keyAbilityValue: number) =>
  Math.max(1, level + modifier(keyAbilityValue));

export const MANA_COSTS = [
  ["Habilidade Menor", "1"],
  ["Habilidade Moderada", "2–3"],
  ["Habilidade Poderosa", "4–5"],
  ["Magia de Alto Nível", "6+"],
] as const;

// ---------- Condições (PDF Regras p.7-8) ----------
export const CONDITIONS = [
  ["Agarrado", "Velocidade 0, desvantagem em ataques"],
  ["Atordoado", "Incapacitado, falha em testes de FOR/DES"],
  ["Cego", "Desvantagem em ataques; ataques contra você têm vantagem"],
  ["Envenenado", "Desvantagem em testes e ataques"],
  ["Inconsciente", "Incapacitado, cai no chão"],
] as const;
