export type AbilityKey = "for" | "des" | "con" | "int" | "sab" | "car";

export const ABILITIES: { key: AbilityKey; name: string; short: string }[] = [
  { key: "for", name: "Força", short: "FOR" },
  { key: "des", name: "Destreza", short: "DES" },
  { key: "con", name: "Constituição", short: "CON" },
  { key: "int", name: "Inteligência", short: "INT" },
  { key: "sab", name: "Sabedoria", short: "SAB" },
  { key: "car", name: "Carisma", short: "CAR" },
];

export type SkillKey =
  | "acrobacia" | "arcanismo" | "atletismo" | "atuacao" | "enganacao"
  | "furtividade" | "historia" | "intimidacao" | "intuicao" | "investigacao"
  | "lidar_animais" | "medicina" | "natureza" | "percepcao" | "persuasao"
  | "prestidigitacao" | "religiao" | "sobrevivencia";

export const SKILLS: { key: SkillKey; name: string; ability: AbilityKey }[] = [
  { key: "acrobacia", name: "Acrobacia", ability: "des" },
  { key: "arcanismo", name: "Arcanismo", ability: "int" },
  { key: "atletismo", name: "Atletismo", ability: "for" },
  { key: "atuacao", name: "Atuação", ability: "car" },
  { key: "enganacao", name: "Enganação", ability: "car" },
  { key: "furtividade", name: "Furtividade", ability: "des" },
  { key: "historia", name: "História", ability: "int" },
  { key: "intimidacao", name: "Intimidação", ability: "car" },
  { key: "intuicao", name: "Intuição", ability: "sab" },
  { key: "investigacao", name: "Investigação", ability: "int" },
  { key: "lidar_animais", name: "Lidar c/ Animais", ability: "sab" },
  { key: "medicina", name: "Medicina", ability: "sab" },
  { key: "natureza", name: "Natureza", ability: "int" },
  { key: "percepcao", name: "Percepção", ability: "sab" },
  { key: "persuasao", name: "Persuasão", ability: "car" },
  { key: "prestidigitacao", name: "Prestidigitação", ability: "des" },
  { key: "religiao", name: "Religião", ability: "int" },
  { key: "sobrevivencia", name: "Sobrevivência", ability: "sab" },
];

export const LANGUAGES = [
  "Comum", "Anão", "Élfico", "Gigante", "Gnômico", "Goblin", "Halfling", "Orc",
  "Abissal", "Celestial", "Dracônico", "Infernal", "Silvestre", "Subcomum", "Primordial",
];

export interface Race {
  id: string;
  name: string;
  description: string;
  bonuses: Partial<Record<AbilityKey, number>>;
  speed: number;
  traits: string[];
  languages: string[];
}

export const RACES: Race[] = [
  { id: "humano", name: "Humano", description: "Versáteis e ambiciosos, espalhados por todos os reinos.", bonuses: { for: 1, des: 1, con: 1, int: 1, sab: 1, car: 1 }, speed: 9, traits: ["Versatilidade", "Idioma adicional", "Perícia extra"], languages: ["Comum"] },
  { id: "elfo", name: "Elfo", description: "Graciosos imortais ligados à magia e à floresta antiga.", bonuses: { des: 2, int: 1 }, speed: 9, traits: ["Visão no escuro", "Ascendência feérica", "Transe"], languages: ["Comum", "Élfico"] },
  { id: "anao", name: "Anão", description: "Forjadores das montanhas, resistentes como a própria pedra.", bonuses: { con: 2, for: 1 }, speed: 7.5, traits: ["Visão no escuro", "Resistência anã", "Treinamento com armas"], languages: ["Comum", "Anão"] },
  { id: "halfling", name: "Halfling", description: "Pequenos, ágeis e estranhamente sortudos.", bonuses: { des: 2, car: 1 }, speed: 7.5, traits: ["Sortudo", "Bravura", "Agilidade Halfling"], languages: ["Comum", "Halfling"] },
  { id: "draconato", name: "Draconato", description: "Descendentes dos grandes dragões, com sopro elemental.", bonuses: { for: 2, car: 1 }, speed: 9, traits: ["Sopro de Dragão", "Resistência a Dano"], languages: ["Comum", "Dracônico"] },
  { id: "tiefling", name: "Tiefling", description: "Marcados por linhagens infernais, carregam fogo no sangue.", bonuses: { int: 1, car: 2 }, speed: 9, traits: ["Visão no escuro", "Resistência infernal", "Legado infernal"], languages: ["Comum", "Infernal"] },
  { id: "gnomo", name: "Gnomo", description: "Curiosos e engenhosos, mestres da ilusão e da mecânica.", bonuses: { int: 2, con: 1 }, speed: 7.5, traits: ["Visão no escuro", "Astúcia gnômica", "Magia menor"], languages: ["Comum", "Gnômico"] },
  { id: "meio-elfo", name: "Meio-Elfo", description: "Entre dois mundos, encantadores e adaptáveis.", bonuses: { car: 2, des: 1, int: 1 }, speed: 9, traits: ["Visão no escuro", "Ascendência feérica", "Versatilidade de perícias"], languages: ["Comum", "Élfico"] },
  { id: "meio-orc", name: "Meio-Orc", description: "Sangue selvagem, coração incansável.", bonuses: { for: 2, con: 1 }, speed: 9, traits: ["Visão no escuro", "Resistência implacável", "Ataques selvagens"], languages: ["Comum", "Orc"] },
  { id: "goliath", name: "Goliath", description: "Gigantes das cordilheiras, herança de titãs.", bonuses: { for: 2, con: 1 }, speed: 9, traits: ["Constituição de pedra", "Atletismo natural", "Aclimatação à altitude"], languages: ["Comum", "Gigante"] },
  { id: "aasimar", name: "Aasimar", description: "Tocados pela luz celestial, mensageiros dos deuses.", bonuses: { car: 2, sab: 1 }, speed: 9, traits: ["Visão no escuro", "Resistência celestial", "Mãos curativas"], languages: ["Comum", "Celestial"] },
  { id: "orc", name: "Orc", description: "Ferozes guerreiros de linhagem antiga.", bonuses: { for: 2, con: 1 }, speed: 9, traits: ["Visão no escuro", "Investida agressiva", "Vigor incansável"], languages: ["Comum", "Orc"] },
];

export interface Attack {
  name: string;
  ability: AbilityKey;
  damage: string;
  damageType: string;
  properties?: string;
}

export interface Spell {
  name: string;
  level: number; // 0 = truque
  school: string;
  desc: string;
}

export interface DndClass {
  id: string;
  name: string;
  description: string;
  hitDie: number;
  primary: AbilityKey;
  saves: AbilityKey[]; // proficient saves
  skillCount: number;
  skillOptions: SkillKey[];
  attacks: Attack[];
  spells: Spell[];
  themeColor: string;
  themeAccent: string;
  glyph: string;
  features: string[];
}

export const CLASSES: DndClass[] = [
  {
    id: "mago", name: "Mago", description: "Estudioso da arcana. Modela a realidade através de grimórios antigos.",
    hitDie: 6, primary: "int", saves: ["int", "sab"], skillCount: 2,
    skillOptions: ["arcanismo","historia","intuicao","investigacao","medicina","religiao"],
    themeColor: "oklch(0.68 0.28 305)", themeAccent: "oklch(0.78 0.22 290)", glyph: "✦",
    features: ["Conjuração arcana", "Recuperação arcana", "Tradição arcana"],
    attacks: [
      { name: "Adaga", ability: "des", damage: "1d4", damageType: "perfurante", properties: "Acuidade, arremesso" },
      { name: "Bordão Arcano", ability: "for", damage: "1d6", damageType: "contundente", properties: "Versátil (1d8)" },
    ],
    spells: [
      { name: "Raio de Fogo", level: 0, school: "Evocação", desc: "Ataque de magia à distância; 1d10 de fogo." },
      { name: "Prestidigitação", level: 0, school: "Transmutação", desc: "Efeitos mágicos menores de utilidade." },
      { name: "Míssil Mágico", level: 1, school: "Evocação", desc: "3 dardos de 1d4+1 de força; acerta automaticamente." },
      { name: "Escudo", level: 1, school: "Abjuração", desc: "+5 CA até seu próximo turno; anula míssil mágico." },
      { name: "Sono", level: 1, school: "Encantamento", desc: "5d8 PV em criaturas caem inconscientes." },
    ],
  },
  {
    id: "guerreiro", name: "Guerreiro", description: "Mestre das armas e armaduras. Disciplina marcial em forma de carne.",
    hitDie: 10, primary: "for", saves: ["for", "con"], skillCount: 2,
    skillOptions: ["acrobacia","atletismo","intimidacao","intuicao","percepcao","sobrevivencia"],
    themeColor: "oklch(0.62 0.22 30)", themeAccent: "oklch(0.82 0.16 85)", glyph: "⚔",
    features: ["Estilo de luta", "Surto de ação", "Segundo fôlego"],
    attacks: [
      { name: "Espada Longa", ability: "for", damage: "1d8", damageType: "cortante", properties: "Versátil (1d10)" },
      { name: "Arco Longo", ability: "des", damage: "1d8", damageType: "perfurante", properties: "Munição, duas mãos" },
    ],
    spells: [],
  },
  {
    id: "clerigo", name: "Clérigo", description: "Vaso de uma divindade. Canaliza poder sagrado em milagres.",
    hitDie: 8, primary: "sab", saves: ["sab", "car"], skillCount: 2,
    skillOptions: ["historia","intuicao","medicina","persuasao","religiao"],
    themeColor: "oklch(0.82 0.16 85)", themeAccent: "oklch(0.92 0.05 85)", glyph: "☩",
    features: ["Conjuração divina", "Domínio divino", "Canalizar divindade"],
    attacks: [
      { name: "Maça", ability: "for", damage: "1d6", damageType: "contundente" },
      { name: "Chama Sagrada", ability: "sab", damage: "1d8", damageType: "radiante", properties: "Truque, SAB CD" },
    ],
    spells: [
      { name: "Luz", level: 0, school: "Evocação", desc: "Objeto emite luz por 1 hora." },
      { name: "Orientação", level: 0, school: "Adivinhação", desc: "+1d4 em teste de habilidade." },
      { name: "Curar Ferimentos", level: 1, school: "Evocação", desc: "1d8 + mod SAB de cura." },
      { name: "Bênção", level: 1, school: "Encantamento", desc: "+1d4 em ataques e salvaguardas por 1 minuto." },
      { name: "Escudo da Fé", level: 1, school: "Abjuração", desc: "+2 CA por 10 minutos." },
    ],
  },
  {
    id: "barbaro", name: "Bárbaro", description: "Fúria primal, força bruta e instinto selvagem.",
    hitDie: 12, primary: "for", saves: ["for", "con"], skillCount: 2,
    skillOptions: ["atletismo","intimidacao","lidar_animais","natureza","percepcao","sobrevivencia"],
    themeColor: "oklch(0.5 0.22 20)", themeAccent: "oklch(0.68 0.18 40)", glyph: "᛭",
    features: ["Fúria", "Defesa sem armadura", "Ataque imprudente"],
    attacks: [
      { name: "Machado Grande", ability: "for", damage: "1d12", damageType: "cortante", properties: "Duas mãos, pesada" },
      { name: "Machadinha", ability: "for", damage: "1d6", damageType: "cortante", properties: "Leve, arremesso" },
    ],
    spells: [],
  },
  {
    id: "ladino", name: "Ladino", description: "Sombra, lâmina e oportunidade. Vence pelo engenho.",
    hitDie: 8, primary: "des", saves: ["des", "int"], skillCount: 4,
    skillOptions: ["acrobacia","atletismo","enganacao","furtividade","intimidacao","intuicao","investigacao","percepcao","persuasao","prestidigitacao"],
    themeColor: "oklch(0.55 0.18 270)", themeAccent: "oklch(0.72 0.18 290)", glyph: "✶",
    features: ["Ataque furtivo", "Perícia", "Gíria de ladrão"],
    attacks: [
      { name: "Rapieira", ability: "des", damage: "1d8", damageType: "perfurante", properties: "Acuidade" },
      { name: "Besta de Mão", ability: "des", damage: "1d6", damageType: "perfurante", properties: "Munição, leve" },
    ],
    spells: [],
  },
  {
    id: "bardo", name: "Bardo", description: "Tece a magia em canção. Inspiração e palavra como arma.",
    hitDie: 8, primary: "car", saves: ["des", "car"], skillCount: 3,
    skillOptions: ["acrobacia","arcanismo","atletismo","atuacao","enganacao","historia","intuicao","intimidacao","investigacao","medicina","natureza","percepcao","persuasao","prestidigitacao","religiao","sobrevivencia"],
    themeColor: "oklch(0.68 0.2 340)", themeAccent: "oklch(0.82 0.16 320)", glyph: "♪",
    features: ["Inspiração de bardo", "Conjuração", "Versátil"],
    attacks: [
      { name: "Espada Curta", ability: "des", damage: "1d6", damageType: "perfurante", properties: "Acuidade, leve" },
      { name: "Zombaria Cruel", ability: "car", damage: "1d4", damageType: "psíquico", properties: "Truque, CAR CD" },
    ],
    spells: [
      { name: "Mensagem", level: 0, school: "Transmutação", desc: "Sussurro a até 36m." },
      { name: "Ilusão Menor", level: 0, school: "Ilusão", desc: "Cria som ou imagem por 1 minuto." },
      { name: "Palavra Curativa", level: 1, school: "Evocação", desc: "1d4 + mod CAR de cura à distância como ação bônus." },
      { name: "Enfeitiçar Pessoa", level: 1, school: "Encantamento", desc: "Alvo humanoide fica enfeitiçado se falhar em SAB." },
      { name: "Riso Histérico", level: 1, school: "Encantamento", desc: "Alvo cai no chão rindo por 1 minuto." },
    ],
  },
  {
    id: "paladino", name: "Paladino", description: "Juramento sagrado feito lâmina. Cavaleiro da luz.",
    hitDie: 10, primary: "car", saves: ["sab", "car"], skillCount: 2,
    skillOptions: ["atletismo","intuicao","intimidacao","medicina","persuasao","religiao"],
    themeColor: "oklch(0.78 0.16 85)", themeAccent: "oklch(0.68 0.2 60)", glyph: "✟",
    features: ["Sentido divino", "Imposição de mãos", "Estilo de luta"],
    attacks: [
      { name: "Espada Longa", ability: "for", damage: "1d8", damageType: "cortante", properties: "Versátil (1d10)" },
      { name: "Golpe Divino", ability: "car", damage: "2d8", damageType: "radiante", properties: "Gasta espaço de magia" },
    ],
    spells: [
      { name: "Bênção", level: 1, school: "Encantamento", desc: "+1d4 em ataques e salvaguardas." },
      { name: "Curar Ferimentos", level: 1, school: "Evocação", desc: "1d8 + mod CAR de cura." },
      { name: "Escudo da Fé", level: 1, school: "Abjuração", desc: "+2 CA por 10 minutos." },
    ],
  },
  {
    id: "patrulheiro", name: "Patrulheiro", description: "Caçador das fronteiras. Guia entre selva e civilização.",
    hitDie: 10, primary: "des", saves: ["for", "des"], skillCount: 3,
    skillOptions: ["atletismo","furtividade","intuicao","investigacao","lidar_animais","natureza","percepcao","sobrevivencia"],
    themeColor: "oklch(0.58 0.16 145)", themeAccent: "oklch(0.72 0.18 130)", glyph: "☘",
    features: ["Inimigo predileto", "Explorador nato", "Estilo de luta"],
    attacks: [
      { name: "Arco Longo", ability: "des", damage: "1d8", damageType: "perfurante", properties: "Munição, duas mãos" },
      { name: "Espada Curta", ability: "des", damage: "1d6", damageType: "perfurante", properties: "Acuidade, leve" },
    ],
    spells: [
      { name: "Marca do Caçador", level: 1, school: "Adivinhação", desc: "+1d6 de dano contra o alvo marcado." },
      { name: "Aumentar Curar Ferimentos", level: 1, school: "Evocação", desc: "1d8 + mod SAB de cura." },
    ],
  },
  {
    id: "druida", name: "Druida", description: "Voz da natureza. Molda-se à floresta e à tempestade.",
    hitDie: 8, primary: "sab", saves: ["int", "sab"], skillCount: 2,
    skillOptions: ["arcanismo","lidar_animais","intuicao","medicina","natureza","percepcao","religiao","sobrevivencia"],
    themeColor: "oklch(0.6 0.14 155)", themeAccent: "oklch(0.75 0.14 120)", glyph: "❦",
    features: ["Conjuração druídica", "Forma selvagem", "Círculo druídico"],
    attacks: [
      { name: "Cimitarra", ability: "des", damage: "1d6", damageType: "cortante", properties: "Acuidade, leve" },
      { name: "Produzir Chama", ability: "sab", damage: "1d8", damageType: "fogo", properties: "Truque" },
    ],
    spells: [
      { name: "Orientação", level: 0, school: "Adivinhação", desc: "+1d4 em teste de habilidade." },
      { name: "Produzir Chama", level: 0, school: "Conjuração", desc: "Chama na mão; ataque à distância." },
      { name: "Enredar", level: 1, school: "Conjuração", desc: "Trepadeiras seguram alvos numa área." },
      { name: "Falar com Animais", level: 1, school: "Adivinhação", desc: "Comunicação com bestas por 10 min." },
      { name: "Aumentar Curar Ferimentos", level: 1, school: "Evocação", desc: "1d8 + mod SAB de cura." },
    ],
  },
  {
    id: "monge", name: "Monge", description: "Corpo como arma, ki como fluxo. Disciplina absoluta.",
    hitDie: 8, primary: "des", saves: ["for", "des"], skillCount: 2,
    skillOptions: ["acrobacia","atletismo","furtividade","historia","intuicao","religiao"],
    themeColor: "oklch(0.72 0.14 190)", themeAccent: "oklch(0.85 0.1 180)", glyph: "☯",
    features: ["Defesa sem armadura", "Artes marciais", "Ki"],
    attacks: [
      { name: "Ataque Desarmado", ability: "des", damage: "1d6", damageType: "contundente", properties: "Acuidade marcial" },
      { name: "Bordão", ability: "des", damage: "1d6", damageType: "contundente", properties: "Versátil (1d8)" },
    ],
    spells: [],
  },
  {
    id: "feiticeiro", name: "Feiticeiro", description: "Magia nas veias. Poder inato, imprevisível.",
    hitDie: 6, primary: "car", saves: ["con", "car"], skillCount: 2,
    skillOptions: ["arcanismo","enganacao","intuicao","intimidacao","persuasao","religiao"],
    themeColor: "oklch(0.65 0.24 20)", themeAccent: "oklch(0.78 0.2 40)", glyph: "✺",
    features: ["Conjuração inata", "Origem feiticeira", "Metamagia"],
    attacks: [
      { name: "Adaga", ability: "des", damage: "1d4", damageType: "perfurante", properties: "Acuidade, arremesso" },
      { name: "Rajada de Fogo", ability: "car", damage: "1d10", damageType: "fogo", properties: "Truque, à distância" },
    ],
    spells: [
      { name: "Prestidigitação", level: 0, school: "Transmutação", desc: "Efeitos mágicos menores." },
      { name: "Rajada de Fogo", level: 0, school: "Evocação", desc: "1d10 fogo à distância." },
      { name: "Míssil Mágico", level: 1, school: "Evocação", desc: "3 dardos de 1d4+1 de força." },
      { name: "Escudo", level: 1, school: "Abjuração", desc: "+5 CA reativo." },
    ],
  },
  {
    id: "bruxo", name: "Bruxo", description: "Pactuário. Poder emprestado por um patrono além do véu.",
    hitDie: 8, primary: "car", saves: ["sab", "car"], skillCount: 2,
    skillOptions: ["arcanismo","enganacao","historia","intimidacao","investigacao","natureza","religiao"],
    themeColor: "oklch(0.55 0.2 320)", themeAccent: "oklch(0.7 0.22 300)", glyph: "☠",
    features: ["Patrono do outro mundo", "Magia do pacto", "Invocações Místicas"],
    attacks: [
      { name: "Adaga", ability: "des", damage: "1d4", damageType: "perfurante", properties: "Acuidade" },
      { name: "Explosão Mística", ability: "car", damage: "1d10", damageType: "energia", properties: "Truque, à distância" },
    ],
    spells: [
      { name: "Explosão Mística", level: 0, school: "Evocação", desc: "1d10 de energia à distância." },
      { name: "Ilusão Menor", level: 0, school: "Ilusão", desc: "Som ou imagem por 1 min." },
      { name: "Enfeitiçar Pessoa", level: 1, school: "Encantamento", desc: "Enfeitiça humanoide." },
      { name: "Setas Amaldiçoadas", level: 1, school: "Necromancia", desc: "3 setas psíquicas de 2d6." },
    ],
  },
];

export const BACKGROUNDS = [
  "Acólito","Charlatão","Criminoso","Eremita","Forasteiro","Herói do Povo","Nobre","Sábio","Soldado",
];

export const ALIGNMENTS = [
  "Leal e Bom","Neutro e Bom","Caótico e Bom","Leal e Neutro","Neutro","Caótico e Neutro","Leal e Mau","Neutro e Mau","Caótico e Mau",
];

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

/** Point buy cost table (D&D 5e style). */
export const POINT_BUY_COST: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
};
export const POINT_BUY_TOTAL = 27;

export const modifier = (score: number) => Math.floor((score - 10) / 2);
export const fmtMod = (m: number) => (m >= 0 ? `+${m}` : `${m}`);

export const getRace = (id: string) => RACES.find((r) => r.id === id);
export const getClass = (id: string) => CLASSES.find((c) => c.id === id);
export const getSkill = (k: SkillKey) => SKILLS.find((s) => s.key === k)!;

export type AbilityMethod = "standard" | "random" | "pointbuy";

/** Roll 4d6 drop lowest. */
export function rollAbility(): number {
  const rolls = Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 6));
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}
