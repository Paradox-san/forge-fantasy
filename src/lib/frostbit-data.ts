// ============================================================
// FROSTBIT DATA — Sistema autoral de RPG
// Espécies, Classes, Origens, Atributos e Perícias
// ============================================================

// ---------- Tipos base ----------
export type AbilityKey = "for" | "des" | "con" | "int" | "sab" | "car";
export type AbilityMethod = "standard" | "point-buy" | "roll" | "manual";

export interface Ability {
  key: AbilityKey;
  name: string;
  short: string;
}

export const ABILITIES: Ability[] = [
  { key: "for", name: "Força", short: "FOR" },
  { key: "des", name: "Destreza", short: "DES" },
  { key: "con", name: "Constituição", short: "CON" },
  { key: "int", name: "Inteligência", short: "INT" },
  { key: "sab", name: "Sabedoria", short: "SAB" },
  { key: "car", name: "Carisma", short: "CAR" },
];

// ---------- Perícias ----------
export type SkillKey =
  | "acrobacia" | "atletismo" | "arcanismo" | "enganação"
  | "historia" | "intuicao" | "intimidacao" | "investigacao"
  | "medicina" | "natureza" | "percepcao" | "persuasao"
  | "prestidigitacao" | "religiao" | "furtividade" | "sobrevivencia"
  | "adestrar";

export interface Skill {
  key: SkillKey;
  name: string;
  ability: AbilityKey;
}

export const SKILLS: Skill[] = [
  { key: "acrobacia", name: "Acrobacia", ability: "des" },
  { key: "atletismo", name: "Atletismo", ability: "for" },
  { key: "arcanismo", name: "Arcanismo", ability: "int" },
  { key: "adestrar", name: "Adestrar Animais", ability: "sab" },
  { key: "enganação", name: "Enganação", ability: "car" },
  { key: "historia", name: "História", ability: "int" },
  { key: "intuicao", name: "Intuição", ability: "sab" },
  { key: "intimidacao", name: "Intimidação", ability: "car" },
  { key: "investigacao", name: "Investigação", ability: "int" },
  { key: "medicina", name: "Medicina", ability: "sab" },
  { key: "natureza", name: "Natureza", ability: "int" },
  { key: "percepcao", name: "Percepção", ability: "sab" },
  { key: "persuasao", name: "Persuasão", ability: "car" },
  { key: "prestidigitacao", name: "Prestidigitação", ability: "des" },
  { key: "religiao", name: "Religião", ability: "int" },
  { key: "furtividade", name: "Furtividade", ability: "des" },
  { key: "sobrevivencia", name: "Sobrevivência", ability: "sab" },
];
export const getSkill = (k: SkillKey) => SKILLS.find((s) => s.key === k)!;

// ---------- Utilidades ----------
export const modifier = (v: number) => Math.floor((v - 10) / 2);
export const fmtMod = (m: number) => (m >= 0 ? `+${m}` : `${m}`);
export const proficiencyBonus = (level: number) => {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
};
export const rollAbility = () => {
  const rolls = Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 6));
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
};


// ---------- Métodos de atributo ----------
export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
export const POINT_BUY_TOTAL = 27;
export const POINT_BUY_COST: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
};

// ============================================================
// ESPÉCIES
// ============================================================
export interface SpeciesVariant {
  id: string;
  name: string;
  attributes: Partial<Record<AbilityKey, number>>;
  trait: string;
  uncatalogued?: boolean;
  imageUrl?: string;
}

export interface Species {
  id: string;
  name: string;
  tagline: string;
  flavor: string;
  description: string;
  imageUrl: string;
  attributes: Partial<Record<AbilityKey, number>>;
  size: string;
  speed: string;
  special: boolean;
  traits: string[];
  languages: string[];
  variants?: SpeciesVariant[];
  variantLabel?: string;
}

export const SPECIES: Species[] = [
  // ===== COMUNS =====
  {
    id: "humano",
    name: "Humano",
    tagline: "Os adaptáveis por excelência",
    flavor: "Sobreviventes natos do gelo, os humanos se multiplicam onde outros perecem.",
    description:
      "Os humanos de Frostbit são herdeiros de impérios que o inverno engoliu. Versáteis e ambiciosos, " +
      "colonizam ruínas antigas, erguem vilarejos sobre solo congelado e negociam com qualquer espécie. " +
      "Sua diversidade é sua maior arma — enquanto elfos e anãos se especializam, os humanos se adaptam.",
    imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/forge-fantasy-assets/frostbit/especies/Humano.webp",
    attributes: { for: 1, des: 1, con: 1, int: 1, sab: 1, car: 1 },
    size: "Médio (1,60m–1,90m)",
    speed: "9m",
    special: false,
    traits: [
      "Versatilidade: +1 em todos os atributos.",
      "Adaptabilidade: proficiência em uma perícia adicional à escolha.",
      "Idioma extra: escolhe um idioma adicional.",
    ],
    languages: ["Comum"],
  },
  {
    id: "anao",
    name: "Anão",
    tagline: "Forjados na pedra, endurecidos pelo gelo",
    flavor: "Guardiões de salões subterrâneos aquecidos por fornalhas que ardem há séculos.",
    description:
      "Os anãos de Frostbit cavaram fundo para escapar do frio, construindo cidadelas- fornalha nas entranhas " +
      "da terra. Sua conexão com a pedra e o metal é quase sagrada — cada forja é um templo, cada martelo uma " +
      "oração. Desconfiam de superfície e de quem vive nela, mas seu aço é inigualável.",
    imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/frostbit/especies/anao.webp",
    attributes: { con: 2, for: 1 },
    size: "Médio (1,30m–1,50m)",
    speed: "7,5m",
    special: false,
    traits: [
      "Visão no Escuro 18m.",
      "Resistência Anã: vantagem contra veneno e resistência a dano de veneno.",
      "Treinamento de Combate Anão: proficiência com machados e martelos.",
      "Conhecimento de Pedra: vantagem em História sobre arquitetura e construções subterrâneas.",
    ],
    languages: ["Comum", "Anão"],
  },
  {
    id: "meio-orc",
    name: "Meio-Orc",
    tagline: "O sangue quente que o inverno não congelou",
    flavor: "Nascidos de dois mundos, aceitos por nenhum — sobrevivem pela força bruta.",
    description:
      "Os meio-orcs de Frostbit carregam a fúria ancestral dos clãs orcs que dominavam as tundras antes do " +
      "Grande Congelamento. São caçadores, batedores e guerreiros; raramente bem-vindos em cidades humanas, " +
      "mas indispensáveis em qualquer expedição no gelo. Seu corpo gera calor como uma fornalha.",
    imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/frostbit/especies/Meio-Orc.webp",
    attributes: { for: 2, con: 1 },
    size: "Médio (1,80m–2,00m)",
    speed: "9m",
    special: false,
    traits: [
      "Visão no Escuro 18m.",
      "Resistência Implacável: ao chegar a 0 PV, fica em 1 PV (1×/descanso longo).",
      "Ataques Selvagens: ao rolar dano crítico com arma, role um dado de dano extra.",
      "Intimidação Natural: proficiência em Intimidação.",
    ],
    languages: ["Comum", "Orc"],
  },
  {
    id: "gnomo",
    name: "Gnomo",
    tagline: "Engenho pequeno, mente incansável",
    flavor: "Inventores e ilusionistas que encontram calor nas engrenagens e nas ideias.",
    description:
      "Os gnomos construíram suas cidades dentro de geleiras — não apesar do frio, mas usando-o. Suas " +
      "engrenagens a vapor e armadilhas de gelo são lendárias. Curiosos até a obsessão, colecionam " +
      "fragmentos do mundo antigo em museus subterrâneos aquecidos por cristais geomânticos.",
    imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/",
    attributes: { int: 2, des: 1 },
    size: "Pequeno (0,90m–1,10m)",
    speed: "7,5m",
    special: false,
    traits: [
      "Visão no Escuro 18m.",
      "Astúcia Gnômica: vantagem em testes de resistência mentais (INT, SAB, CAR).",
      "Pequeno: tamanho Pequeno, não pode usar armas pesadas sem desvantagem.",
      "Truques: conhece um truque de ilusionista (à escolha).",
    ],
    languages: ["Comum", "Gnômico"],
  },
  {
    id: "tiefling",
    name: "Tiefling",
    tagline: "Sangue infernal em terras geladas",
    flavor: "A maldição queima por dentro — o gelo não os toca, mas o mundo os teme.",
    description:
      "Os tieflings de Frostbit carregam sangue infernal numa terra onde o inferno congelou. São perseguidos " +
      "em vilarejos supersticiosos, mas encontram refúgio nas cidades- fornalha dos anãos e nos mercados " +
      "livres. Sua resistência ao fogo os torna forasteiros curiosos num mundo de gelo — como se o inferno " +
      "ainda ardesse em suas veias, esperando o degelo.",
    imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/",
    attributes: { int: 1, car: 2 },
    size: "Médio (1,70m–1,90m)",
    speed: "9m",
    special: false,
    variantLabel: "Subespécie",
    traits: [
      "Visão no Escuro 18m.",
      "Resistência Infernal: resistência a dano de fogo.",
      "Legado Infernal: conhece o truque Taumaturgia. No 3º nível: Réprimenda; no 5º nível: Escuridão.",
      "Idioma: Infernal.",
    ],
    languages: ["Comum", "Infernal"],
    variants: [
      {
        id: "hexiliano",
        name: "Hexiliano",
        attributes: { int: 1 },
        trait:
          "Herdeiros de pactos de hexes: conhecem o truque Zombaria Viciosa e têm vantagem em testes para identificar maldições.",
        imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/frostbit-assets@main/img/especies/hexilianos.webp"
      },
      {
        id: "umbrelfo",
        name: "Umbrelfo",
        attributes: { des: 1 },
        trait:
          "Sangue infernal misturado ao élfico das sombras: Visão no Escuro 24m e podem se teleportar 4,5m para uma área escura (1×/descanso curto).",
        imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/frostbit/especies/Umbrelfos.webp"
      },
      {
        id: "asmodeano",
        name: "Asmodeano",
        attributes: { car: 1 },
        trait:
          "Linhagem direta de Asmodeus: conhecem o truque Chama Sagrada em versão infernal e têm vantagem em Intimidação contra criaturas que sabem de sua origem.",
        imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/frostbit/especies/Asmodeanos.webp"
      },
    ],
  },
  {
    id: "elfo",
    name: "Elfo",
    tagline: "Filhos das três luzes",
    flavor: "Quando o sol morreu, os elfos aprenderam a viver no brilho da lua e das estrelas.",
    description:
      "Os elfos de Frostbit são divididos em três linhagens que correspondem aos três momentos de luz que " +
      "ainda sobrevivem no mundo congelado. Cada subespécie desenvolveu magias e instintos próprios, mas " +
      "todos compartilham a longevidade e a melancolia de quem viu o mundo morrer lentamente.",
    imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/",
    attributes: { des: 2 },
    size: "Médio (1,65m–1,85m)",
    speed: "9m",
    special: false,
    variantLabel: "Subespécie",
    traits: [
      "Visão no Escuro 18m.",
      "Sentidos Élficos: proficiência em Percepção.",
      "Ancestral Feérico: vantagem contra encantamento; magia não pode colocá-lo para dormir.",
      "Transe: não dorme; medita 4h por dia.",
    ],
    languages: ["Comum", "Élfico"],
    variants: [
      {
        id: "amanhecer",
        name: "Elfo do Amanhecer",
        attributes: { car: 1 },
        trait:
          "Filhos da primeira luz: lembram do sol. Vantagem em testes contra escuridão mágica e conhecem o truque Luz.",
        imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/frostbit/especies/do Amanhecer.webp"
      },
      {
        id: "entardecer",
        name: "Elfo do Entardecer",
        attributes: { int: 1 },
        trait:
          "Guardiões do crepúsculo: vivem entre luz e sombra. Conhecem o truque Prestidigitação e têm vantagem em Furtividade ao anoitecer.",
        imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/frostbit/especies/do Entardecer.webp"
      },
      {
        id: "anoitecer",
        name: "Elfo do Anoitecer",
        attributes: { sab: 1 },
        trait:
          "Caçadores da lua: enxergam perfeitamente no escuro (Visão no Escuro 24m) e ganham proficiência em Sobrevivência.",
        imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/frostbit/especies/do%20Entardecer.webp
      },
    ],
  },
  {
    id: "draconato",
    name: "Draconato",
    tagline: "Sangue de dragão, sopro de fogo",
    flavor: "O último calor que o inverno não conseguiu apagar morde dentro de cada draconato.",
    description:
      "Draconatos são os descendentes de dragões antigos — criaturas que aqueciam o mundo com seu sopro " +
      "antes do Grande Congelamento. Cada linhagem dracônica carrega um tipo de sopro e uma resistência " +
      "elemental. Em Frostbit, são vistos como abençoados ou amaldiçoados: portadores do último fogo.",
    imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/",
    attributes: { for: 2, car: 1 },
    size: "Médio (1,80m–2,10m)",
    speed: "9m",
    special: false,
    variantLabel: "Linhagem Dracônica",
    traits: [
      "Arma de Sopro: sopro elemental (cone ou linha) causando 1d10 por nível (DEX save para metade). Recarga: descanso curto ou longo.",
      "Resistência Dracônica: resistência ao tipo de dano da linhagem escolhida.",
    ],
    languages: ["Comum", "Dracônico"],
    variants: [
      { id: "preto", name: "Preto", attributes: {}, trait: "Sopro: linha de ácido. Resistência a ácido.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
      { id: "azul", name: "Azul", attributes: {}, trait: "Sopro: linha de relâmpago. Resistência a relâmpago.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
      { id: "latão", name: "Latão", attributes: {}, trait: "Sopro: cone de fogo. Resistência a fogo.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
      { id: "bronze", name: "Bronze", attributes: {}, trait: "Sopro: linha de relâmpago. Resistência a relâmpago.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
      { id: "cobre", name: "Cobre", attributes: {}, trait: "Sopro: cone de ácido. Resistência a ácido.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
      { id: "ouro", name: "Ouro", attributes: {}, trait: "Sopro: cone de fogo. Resistência a fogo.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
      { id: "verde", name: "Verde", attributes: {}, trait: "Sopro: cone de veneno. Resistência a veneno.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
      { id: "vermelho", name: "Vermelho", attributes: {}, trait: "Sopro: cone de fogo. Resistência a fogo.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
      { id: "prata", name: "Prata", attributes: {}, trait: "Sopro: cone de frio. Resistência a frio.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
      { id: "branco", name: "Branco", attributes: {}, trait: "Sopro: cone de frio. Resistência a frio.", imageUrl: "https://cdn.jsdelivr.net/gh/Paradox-san/" },
    ],
  },

  // ===== ESPECIAIS (ocultas) =====
  {
    id: "reanimado",
    name: "Reanimado",
    tagline: "Voltou — e trouxe o frio junto",
    flavor: "Morreu no gelo e acordou de novo, sem saber quem o trouxe de volta.",
    description:
      "Reanimados são cadáveres que despertaram — não como mortos-vivos tradicionais, mas como algo entre a " +
      "vida e a morte. O corpo não esquenta, não apodrece, mas a mente... a mente é um campo de batalha entre " +
      "o que eram e o que são agora. Ninguém sabe quem ou o que os traz de volta. Alguns dizem que é o próprio " +
      "inverno devolvendo o que tomou, com um preço.",
    imageUrl: "",
    attributes: { con: 2, sab: 1 },
    size: "Médio",
    speed: "9m",
    special: true,
    variantLabel: "Tipo",
    traits: [
      "Carne Fria: imune a dano de frio ambiental e a exaustão por temperatura.",
      "Não Respira: não precisa respirar, comer ou dormir (4h de torpor).",
      "Memória Partida: desvantagem em testes de História sobre a própria vida.",
    ],
    languages: ["Comum", "um idioma da vida anterior"],
    variants: [
      { id: "v1", name: "V1", attributes: {}, trait: "Protótipo: o primeiro a voltar. Algo deu errado — habilidades instáveis." },
      { id: "nc", name: "Não Catalogado", attributes: {}, trait: "Fora dos registros. Origem desconhecida. Requer aval do mestre.", uncatalogued: true },
    ],
  },
  {
    id: "aasimar",
    name: "Aasimar",
    tagline: "Uma última faísca de luz",
    flavor: "Carrega uma centelha celestial num mundo que os deuses abandonaram.",
    description:
      "Em Frostbit, onde os deuses se calam há séculos, os aasimar são anomalias — portadores de uma luz " +
      "que não deveria existir mais. São vistos como profetas, monstros ou milagres ambulantes. Alguns " +
      "buscam a origem de sua centelha; outros fogem dela. Todos sentem o peso de algo maior olhando por " +
      "entre as frestas do céu congelado.",
    imageUrl: "",
    attributes: { car: 2, sab: 1 },
    size: "Médio",
    speed: "9m",
    special: true,
    variantLabel: "Tipo",
    traits: [
      "Visão no Escuro 18m.",
      "Resistência Celestial: resistência a dano radiante e necrótico.",
      "Mãos Curativas: cura PV igual ao seu nível (1×/descanso longo).",
      "Revelação Radiante (nível 3): asas de luz por 1 minuto, 1×/descanso longo.",
    ],
    languages: ["Comum", "Celestial"],
    variants: [
      { id: "sentinela", name: "Sentinela", attributes: {}, trait: "Guardião da luz residual. Detecta mortos-vivos a 18m." },
      { id: "nc", name: "Não Catalogado", attributes: {}, trait: "Origem celestial desconhecida. A centelha pulsa de forma anômala.", uncatalogued: true },
    ],
  },
  {
    id: "fafnir",
    name: "Fafnir",
    tagline: "A maldição do tesouro",
    flavor: "Linhagem amaldiçoada de um antigo devorador de ouro.",
    description:
      "Os Fafnir carregam a maldição do dragão que cobiçou tanto ouro que se tornou o próprio tesouro. " +
      "Escamas crescem sob a pele, a mente se fixa em brilho e valor. Ninguém sabe quantos existem — " +
      "todos os registros foram perdidos ou destruídos. Cada Fafnir descobre sua maldão sozinho, " +
      "geralmente tarde demais.",
    imageUrl: "",
    attributes: { for: 2, con: 2 },
    size: "Grande (2,10m+)",
    speed: "9m",
    special: true,
    variantLabel: "Lote",
    traits: [
      "Couro Escamado: CA base 13 + mod DES quando sem armadura.",
      "Ganância Ancestral: vantagem em testes para avaliar objetos e sentir metal precioso a 9m.",
      "Maldição de Fafnir: sofre 1 nível de exaustão se passar um descanso longo sem tesouro consigo.",
    ],
    languages: ["Comum", "Dracônico"],
    variants: [
      { id: "lote-1", name: "Lote Não Catalogado", attributes: {}, trait: "Manifestação dracônica instável. Escamas de cor incerta.", uncatalogued: true },
      { id: "lote-2", name: "Lote Não Catalogado", attributes: {}, trait: "Sopro fragmentado — tipo elemental aleatório a cada uso.", uncatalogued: true },
      { id: "lote-3", name: "Lote Não Catalogado", attributes: {}, trait: "Asas atrofiadas. Voo curto (3m) 1×/descanso curto.", uncatalogued: true },
      { id: "lote-4", name: "Lote Não Catalogado", attributes: {}, trait: "Olho dracônico: visão verdadeira 1×/dia por 1 minuto.", uncatalogued: true },
    ],
  },
];

export const COMMON_SPECIES = SPECIES.filter((s) => !s.special);
export const SPECIAL_SPECIES = SPECIES.filter((s) => s.special);
export const getSpecies = (id: string) => SPECIES.find((s) => s.id === id);
export const getSpeciesVariant = (speciesId: string, variantId: string) =>
  getSpecies(speciesId)?.variants?.find((v) => v.id === variantId);

export function speciesAttributeBonus(
  speciesId: string,
  variantId: string,
  key: AbilityKey,
): number {
  const sp = getSpecies(speciesId);
  if (!sp) return 0;
  const base = sp.attributes[key] ?? 0;
  const v = variantId ? getSpeciesVariant(speciesId, variantId) : undefined;
  return base + (v?.attributes[key] ?? 0);
}

// ============================================================
// CLASSES
// ============================================================
export interface Subclass {
  id: string;
  name: string;
  text: string;
  uncatalogued?: boolean;
}

export interface FrostClass {
  id: string;
  name: string;
  tagline: string;
  flavor: string;
  hitDie: number;
  keyAbility: AbilityKey;
  saves: AbilityKey[];
  skillCount: number;
  skillOptions: SkillKey[];
  caster: boolean;
  profs: string;
  subclassLabel: string;
  subclasses: Subclass[];
  features: string[];
  special?: boolean;
}

export const CLASSES: FrostClass[] = [
  {
    id: "barbaro",
    name: "Bárbaro",
    tagline: "A fúria é o único aquecedor confiável",
    flavor: "Enfrenta a nevasca no peito nu porque a raiva ferve mais que qualquer fogueira.",
    hitDie: 12, keyAbility: "for", saves: ["for", "con"], skillCount: 2,
    skillOptions: ["atletismo", "intimidacao", "adestrar", "natureza", "percepcao", "sobrevivencia"],
    caster: false,
    profs: "Armaduras leves e médias, escudos, armas simples e marciais",
    subclassLabel: "Trilha Primal (nível 1)",
    subclasses: [
      { id: "furia-ardente", name: "Trilha da Fúria Ardente", text: "A fúria incendeia: ataques causam +1d6 de fogo durante a fúria. No 6º nível, sopro de fogo em cone (3m) causando 2d6." },
      { id: "equilibrio-runico", name: "Trilha do Equilíbrio Rúnico", text: "Tatuagens rúnicas brilham na fúria: +1 CA e resistência a um tipo de dano à escolha. No 6º, pode gravar runas em armas." },
      { id: "guardiao-cosmico", name: "Trilha do Guardião Cósmico", text: "A fúria canaliza energia estelar: ataques causam +1d6 radiante. No 6º, aura de 3m que causa 1d4 radiante a inimigos no início do turno deles." },
      { id: "lua-ensanguentada", name: "Trilha da Lua Ensanguentada", text: "Fúria lunar: ao ficar abaixo de ½ PV em fúria, ataques causam +1d8 necrótico. No 6º, regenera 1 PV/turno enquanto enfurecido." },
    ],
    features: ["Fúria", "Defesa sem Armadura", "Ataque Imprudente"],
  },
  {
    id: "bardo",
    name: "Bardo",
    tagline: "Alguém precisa contar as histórias",
    flavor: "Numa terra silenciosa, quem canta é ouvido de longe — para o bem e para o mal.",
    hitDie: 8, keyAbility: "car", saves: ["des", "car"], skillCount: 3,
    skillOptions: SKILLS.map((s) => s.key),
    caster: true,
    profs: "Armaduras leves, armas simples, três instrumentos musicais",
    subclassLabel: "Colégio (nível 1)",
    subclasses: [
      { id: "tinta-viva", name: "Colégio da Tinta Viva", text: "Pinturas mágicas que cobram vida: cria um familiar de tinta 1×/descanso longo. No 6º, pinturas que causam dano ou curam." },
      { id: "mascara-dancante", name: "Colégio da Máscara Dançante", text: "Máscaras que trocam personalidade: +2 em uma perícia diferente por máscara. No 6º, assume a máscara de um inimigo derrotado." },
      { id: "coracao-errante", name: "Colégio do Coração Errante", text: "Canção que move aliados: ação bônus para deslocar um aliado 4,5m sem provocar ataque. No 6º, cura ao mover." },
      { id: "cantico-divino", name: "Colégio do Cântico Divino", text: "Música sagrada: trataInspiração de Bardo como dado divino (cura extra). No 6º, canaliza divindade através da canção." },
    ],
    features: ["Inspiração de Bardo", "Conjuração", "Faz-Tudo"],
  },
  {
    id: "druida",
    name: "Druida",
    tagline: "A natureza ainda respira sob a neve",
    flavor: "Guarda as sementes do mundo antigo esperando um degelo que talvez nunca chegue.",
    hitDie: 8, keyAbility: "sab", saves: ["int", "sab"], skillCount: 2,
    skillOptions: ["arcanismo", "adestrar", "intuicao", "medicina", "natureza", "percepcao", "religiao", "sobrevivencia"],
    caster: true,
    profs: "Armaduras leves e médias não metálicas, escudos, armas simples",
    subclassLabel: "Círculo (nível 1)",
    subclasses: [
      { id: "gelo-eterno", name: "Círculo do Gelo Eterno", text: "Forma Selvagem em bestas do gelo. Magias de frio causam +1 por dado. No 6º, terreno gelado ao redor (3m) dificil para inimigos." },
      { id: "espinhos-negros", name: "Círculo dos Espinhos Negros", text: "Espinhos necróticos brotam do solo: 1×/turno, ataque causa +1d4 perfurante. No 6º, espinhos explosivos (2d6) em área." },
      { id: "tempestade-branca", name: "Círculo da Tempestade Branca", text: "Invoca nevasca menor: 1×/descanso curto, criaturas em 3m têm desvantagem. No 6º, relâmpago de neve (3d8) em linha." },
      { id: "sangue-antigo", name: "Círculo do Sangue Antigo", text: "Forma Selvagem aprimorada com traços primais: +2 PV temporário por transformação. No 6º, ganha uma mordida (1d8) na Forma Selvagem." },
    ],
    features: ["Forma Selvagem", "Conjuração", "Linguagem Druídica"],
  },
  {
    id: "feiticeiro",
    name: "Feiticeiro",
    tagline: "O sangue não escolheu — simplesmente arde",
    flavor: "Magia que nasce dentro, não dos livros. Algo antigo pulsa em suas veias.",
    hitDie: 6, keyAbility: "car", saves: ["con", "car"], skillCount: 2,
    skillOptions: ["arcanismo", "enganação", "intimidacao", "intuicao", "persuasao", "religiao"],
    caster: true,
    profs: "Armaduras leves, armas simples",
    subclassLabel: "Origem de Sangue (nível 1)",
    subclasses: [
      { id: "geliferos", name: "Origem dos Gélidos", text: "Magias de frio aprimoradas: +1 por dado. Resistência a frio. No 6º, sopro de gelo (cone 5m, 3d6)." },
      { id: "draconica", name: "Origem Draconática", text: "Escolha um tipo de dragão. Resistência ao elemento. No 6º, asas (voo 6m) 1×/descanso longo." },
      { id: "selvagem", name: "Origem Selvagem", text: "Surto mágico: 1×/descanso curto, rola na Tabela de Surto. No 6º, controla o surto parcialmente." },
      { id: "vazio", name: "Não Catalogado", text: "Origem desconhecida. A magia pulsa de um lugar que não deveria existir. Requer aval do mestre.", uncatalogued: true },
    ],
    features: ["Conjuração", "Fonte de Magia", "Surto Mágico"],
  },
  {
    id: "guardiao",
    name: "Guardião",
    tagline: "A linha que separa o vivo do gelo",
    flavor: "Não luta para vencer — luta para que todos voltem para casa.",
    hitDie: 12, keyAbility: "con", saves: ["for", "con"], skillCount: 2,
    skillOptions: ["atletismo", "intimidacao", "investigacao", "percepcao", "sobrevivencia", "adestrar"],
    caster: false,
    profs: "Todas as armaduras, escudos, armas simples e marciais",
    subclassLabel: "Juramento de Guarda (nível 1)",
    subclasses: [
      { id: "mestre-bestas", name: "Mestre das Bestas", text: "Companheiro animal fiel (CR 1/4). No 6º, companheiro evolui (CR 1/2) e ganha ataque adicional." },
      { id: "guardiao-enxame", name: "Guardião do Enxame", text: "Insetos do frio: aura de 3m causa 1d4 de perfurante em inimigos no fim do turno deles. No 6º, enxame defensivo (reduz dano em 1d4)." },
      { id: "matador-horrores", name: "Matador de Horrores", text: "+2 dano contra aberrações e mortos-vivos. No 6º, marca um horror: aliados ganham +1d4 contra ele." },
      { id: "cacador-ecos", name: "Caçador dos Ecos", text: "Rastros de luz: vê passos recentes (10 min) como brilho. No 6º, eco fantasma: cria cópia por 1 rodada que distrai." },
    ],
    features: ["Defesa de Guarda", "Marcação", "Postura Protetora"],
  },
  {
    id: "guerreiro",
    name: "Guerreiro",
    tagline: "Aço é mais confiável que magia",
    flavor: "Onde a magia falha, o aço ainda corta. E em Frostbit, o aço nunca falha.",
    hitDie: 10, keyAbility: "for", saves: ["for", "con"], skillCount: 2,
    skillOptions: ["acrobacia", "atletismo", "adestrar", "historia", "intimidacao", "percepcao", "sobrevivencia"],
    caster: false,
    profs: "Todas as armaduras, escudos, armas simples e marciais",
    subclassLabel: "Estilo de Combate (nível 1)",
    subclasses: [
      { id: "arqueiro", name: "Arqueiro", text: "+2 em ataques à distância. No 6º, ignora cobertura parcial e -2 na parcial total." },
      { id: "defensor", name: "Defensor", text: "+1 CA quando usando escudo. No 6º, reação: aliado adjacente ganha +2 CA." },
      { id: "duelista", name: "Duelista", text: "+2 dano com arma de uma mão (outra mão livre). No 6º, riposte: ataque de oportunidade extra 1×/rodada." },
      { id: "mestre-armas", name: "Mestre de Armas", text: "Escolha um tipo de arma: +1 ataque e dano. No 6º, crítico em 19-20 com esse tipo." },
    ],
    features: ["Estilo de Luta", "Retomar Fôlego", "Surto de Ação"],
  },
  {
    id: "ladino",
    name: "Ladino",
    tagline: "A sombra que vê tudo",
    flavor: "Sua arma nunca é a que você empunha, mas a que ninguém vê chegar.",
    hitDie: 8, keyAbility: "des", saves: ["des", "int"], skillCount: 4,
    skillOptions: ["acrobacia", "atletismo", "atletismo", "enganação", "intuicao", "intimidacao", "investigacao", "percepcao", "persuasao", "prestidigitacao", "furtividade"],
    caster: false,
    profs: "Armaduras leves, armas simples, espadas curtas, rapieiras, adagas, bestas de mão",
    subclassLabel: "Especialização (nível 1)",
    subclasses: [
      { id: "ladrao", name: "Ladrão", text: "Mãos Ligeiras: vantagem em Prestidigitação e Furtividade. No 6º, Usar Objeto como ação bônus." },
      { id: "assassino", name: "Assassino", text: "Ataque Surpresa: vantagem contra criaturas que não agiram. No 6º, crítico automático em surpresa." },
      { id: "trapaceiro-arcano", name: "Trapaceiro Arcano", text: "Conjuração limitada (truques + magias de ladino). No 6º, Mão Mágica invisível com truques." },
      { id: "batedor", name: "Batedor", text: "Mobilidade: Desengajar como ação bônus. No 6º, movimento +3m e não provoca ataque de oportunidade." },
    ],
    features: ["Ataque Furtivo", "Esquiva Ágil", "Linguagem Secreta"],
  },
  {
    id: "mago",
    name: "Mago",
    tagline: "O conhecimento é a única chama que não se apaga",
    flavor: "Em torres-geleira isoladas, magos decifram o mundo em busca de calor.",
    hitDie: 6, keyAbility: "int", saves: ["int", "sab"], skillCount: 2,
    skillOptions: ["arcanismo", "historia", "intuicao", "investigacao", "medicina", "religiao"],
    caster: true,
    profs: "Armaduras (nenhuma), armas simples",
    subclassLabel: "Escola de Magia (nível 1)",
    subclasses: [
      { id: "evocacao", name: "Evocação", text: "Magias de dano causam +1 por dado. No 6º, maximiza um dado de dano por magia (1×/descanso curto)." },
      { id: "ilusao", name: "Ilusão", text: "Truques de ilusão aprimorados. No 6º, ilusões ganham textura e som (quase reais)." },
      { id: "necromancia", name: "Necromancia", text: "Magias necróticas +1 por dado. No 6º, commanding undead (1 servo de CR 1/2)." },
      { id: "transmutacao", name: "Transmutação", text: "Altera um componente físico de magia. No 6º, forma alternativa: transforma-se em fumaça por 1 min (1×/descanso longo)." },
    ],
    features: ["Conjuração", "Recuperação Arcana", "Grimório"],
  },
  {
    id: "monge",
    name: "Monge",
    tagline: "O corpo é o templo, o frio é o mestre",
    flavor: "Disciplina forjada em mosteiros congelados onde o silêncio pesa mais que a neve.",
    hitDie: 8, keyAbility: "des", saves: ["for", "des"], skillCount: 2,
    skillOptions: ["acrobacia", "atletismo", "historia", "intuicao", "religiao", "furtividade"],
    caster: false,
    profs: "Armaduras (nenhuma), armas simples, espadas curtas",
    subclassLabel: "Caminho (nível 1)",
    subclasses: [
      { id: "mao-aberta", name: "Caminho da Mão Aberta", text: "Golpe sem arma: pode empurrar ou derrubar como parte do ataque. No 6º, Negação de Ki: reação para reduzir dano." },
      { id: "quatro-ventos", name: "Caminho dos Quatro Ventos", text: "Salto elemental: +3m de movimento. No 6º, Rajada de Vento: empurra 4,5m (1×/descanso curto)." },
      { id: "sombria", name: "Caminho da Sombria", text: "Sombra Passo: teleporta 6m entre sombras (1 ponto de ki). No 6º, torna-se invisível na escuridão." },
      { id: "fogo-interior", name: "Caminho do Fogo Interior", text: "Palma Flamejante: ataque desarmado causa +1d4 de fogo. No 6º, corpo aquecido: imune a frio ambiental." },
    ],
    features: ["Artes Marciais", "Pontos de Ki", "Defesa sem Armadura"],
  },
  {
    id: "paladino",
    name: "Paladino",
    tagline: "O juramento aquece mais que o aço",
    flavor: "Em Frostbit, a fé é o último fogo — e o paladino é a tocha que a carrega.",
    hitDie: 10, keyAbility: "car", saves: ["sab", "car"], skillCount: 2,
    skillOptions: ["atletismo", "intimidacao", "intuicao", "medicina", "persuasao", "religiao"],
    caster: true,
    profs: "Todas as armaduras, escudos, armas simples e marciais",
    subclassLabel: "Juramento Sagrado (nível 1)",
    subclasses: [
      { id: "mares-calipso", name: "Juramento das Marés de Calipso", text: "Água benta: golpe canalizado causa +1d4 de frio. No 6º, onda curativa (2d6 em cone de 3m)." },
      { id: "terra-viva", name: "Juramento da Terra Viva", text: "Raízes sagradas: imobiliza alvo no golpe crítico. No 6º, cura 1 PV/turno em terreno natural." },
      { id: "escamas-eternas", name: "Juramento das Escamas Eternas", text: "Resistência dracônica: escolha um elemento, +1 CA. No 6º, soto menor (cone 3m, 2d6 do elemento)." },
      { id: "colera-ardente", name: "Juramento de Cólera Ardente", text: "Fúria divina: ataque canalizado causa +1d6 de fogo. No 6º, explosão de luz (2d8 radiante em 3m)." },
      { id: "renegado", name: "Juramento do Renegado", text: "Quebrou um juramento e fez outro. Vantagem em Intimidação. No 6º, marca do renegado: alvo marcado sofre +1d4 de todos." },
      { id: "nc-1", name: "Não Catalogada", text: "Juramento desconhecido. A divindade não responde pelo nome. Requer aval do mestre.", uncatalogued: true },
      { id: "nc-2", name: "Não Catalogada", text: "Juramento esquecido por todos exceto o paladino. Efeito incerto.", uncatalogued: true },
      { id: "nc-3", name: "Não Catalogada", text: "Juramento proibido pelos templários. Selado em silêncio.", uncatalogued: true },
      { id: "nc-4", name: "Não Catalogada", text: "Juramento que não deveria existir. A luz que emana não é natural.", uncatalogued: true },
    ],
    features: ["Sentido Divino", "Imposição de Mãos", "Conjuração"],
  },

  // ===== CLASSE ESPECIAL (oculta) =====
  {
   id: "bruxa",
   name: "Bruxa",
   tagline: "O pacto foi selado no gelo",
   flavor: "Algo antigo, enterrado sob a neve, sussurrou — e ela aceitou.",
   hitDie: 8, keyAbility: "car", saves: ["sab", "car"], skillCount: 2,
   skillOptions: ["arcanismo", "enganação", "historia", "intimidacao", "investigacao", "natureza", "religiao"],
   caster: true,
   profs: "Armaduras leves, armas simples",
   subclassLabel: "Patrono Gelado (nível 1)",
   subclasses: [
    { id: "inverno", name: "Patrono do Inverno", text: "Magias de frio aprimoradas." },
    { id: "corvo", name: "Patrono do Corvo", text: "Familiar corvo que vê a 300m." },
    { id: "lua-negra", name: "Patrono da Lua Negra", text: "Magias de ilusão e sombra +1 por dado." },
    { id: "profundezas", name: "Patrono das Profundezas", text: "Algo fala do fundo do gelo." },
   ],
   features: ["Conjuração", "Pacto Mágico", "Invocação Mística"],
   special: true,
  },
];

export const COMMON_CLASSES = CLASSES.filter((c) => !c.special);
export const SPECIAL_CLASSES = CLASSES.filter((c) => c.special);
export const getClass = (id: string) => CLASSES.find((c) => c.id === id);

// ============================================================
// ORIGENS (16 — com habilidade no 1º e 7º nível + passiva)
// ============================================================
export interface OriginAbility {
  name: string;
  text: string;
}

export interface Origin {
  id: string;
  name: string;
  description: string;
  flavor: string;
  skills: SkillKey[];
  level1: OriginAbility;
  level7: OriginAbility;
  passive: OriginAbility;
  feature: string; // = passive.text (compat com ficha atual)
}

export const ORIGINS: Origin[] = [
  {
    id: "ferreiro",
    name: "Ferreiro",
    description: "Forjou armas, armaduras e ferramentas — do minério à lâmina. Em Frostbit, um ferreiro é tão precioso quanto um curandeiro.",
    flavor: "A forja era o único lugar quente da vila.",
    skills: ["atletismo", "historia"],
    level1: { name: "Forja Improvisada", text: "Repara armas e armaduras sem custo com tempo e uma fonte de calor." },
    level7: { name: "Mestre Armeiro", text: "Cria uma arma ou armadura mágica simples (CA +1 ou dano +1) por descanso longo." },
    passive: { name: "Olho para Qualidade", text: "Avalia armas/armaduras instantaneamente (INT/Investigação CD 10)." },
    feature: "Avalia armas/armaduras instantaneamente (INT/Investigação CD 10).",
  },
  {
    id: "cacador",
    name: "Caçador",
    description: "Rastreia presas no gelo e alimenta a vila. Sabe onde os predadores dormem — e onde os mortos andam.",
    flavor: "O silêncio da neve é a sua língua materna.",
    skills: ["sobrevivencia", "percepcao"],
    level1: { name: "Pista no Gelo", text: "Vantagem em Sobrevivência para rastrear em neve ou terreno congelado." },
    level7: { name: "Emboscada Branca", text: "Primeiro ataque contra presa rastreada causa +1d6 de dano." },
    passive: { name: "Sentidos de Predador", text: "Não é surpreendido por bestas naturais." },
    feature: "Não é surpreendido por bestas naturais.",
  },
  {
    id: "erudito",
    name: "Erudito",
    description: "Decifra textos do mundo anterior ao gelo. Procura em bibliotecas congeladas a chave para o degelo — ou para a sobrevivência.",
    flavor: "O conhecimento é a única chama que não se apaga.",
    skills: ["historia", "arcanismo"],
    level1: { name: "Memória Eidética", text: "Vantagem em INT para lembrar textos lidos." },
    level7: { name: "Decifração Arcana", text: "Lê textos mágicos protegidos (INT/Arca­nismo CD 15) e aprende um truque adicional." },
    passive: { name: "Biblioteca Viva", text: "Sabe um fato obscuro relevante (1×/sessão, INT CD 15)." },
    feature: "Sabe um fato obscuro relevante (1×/sessão, INT CD 15).",
  },
  {
    id: "soldado",
    name: "Soldado",
    description: "Serviu em guarnições de fronteira, onde o inverno e os monstros atacavam juntos. Sabe lutar em formação e sozinho.",
    flavor: "A guerra acabou. A sobrevivência não.",
    skills: ["atletismo", "intimidacao"],
    level1: { name: "Posição de Combate", text: "Ganha proficiência com um tipo de arma marcial adicional." },
    level7: { name: "Veterano Endurecido", text: "+2 PV máximos por nível e vantagem contra medo." },
    passive: { name: "Hierarquia", text: "Reconhece patentes e identificia militares em qualquer vila." },
    feature: "Reconhece patentes e identificia militares em qualquer vila.",
  },
  {
    id: "marinheiro",
    name: "Marinheiro",
    description: "Navegou mares parcialmente congelados, onde icebergsmascaram horrores submersos. Conhece os ventos e as correntes geladas.",
    flavor: "O mar congelou, mas o perigo não.",
    skills: ["atletismo", "percepcao"],
    level1: { name: "Pernas de Maré", text: "Vantagem em Acrobacia e Atletismo em superfícies instáveis (gelo, convés, barco)." },
    level7: { name: "Navegante dos Gelos", text: "Pode guiar um grupo com segurança por mar congelado (dobro da velocidade de viagem)." },
    passive: { name: "Bússola Interna", text: "Sempre sabe a direção do norte e a hora aproximada." },
    feature: "Sempre sabe a direção do norte e a hora aproximada.",
  },
  {
    id: "medico",
    name: "Médico",
    description: "Cura corpos que o frio tenta destruir. Conhece ervas que crescem no gelo e magias que aquecem por dentro.",
    flavor: "Onde a vida se agarra, ali estão as suas mãos.",
    skills: ["medicina", "intuicao"],
    level1: { name: "Primeiros Socorros", text: "Ação: estabiliza e cura 1d4+INT a um aliado (1×/descanso curto)." },
    level7: { name: "Cirurgião de Campanha", text: "Cura 2d8+INT e remove uma condição (envenenado, paralisado, etc.) (1×/descanso longo)." },
    passive: { name: "Diagnóstico Rápido", text: "Sabe a PV exata de aliados que tocar." },
    feature: "Sabe a PV exata de aliados que tocar.",
  },
  {
    id: "artifice",
    name: "Artífice",
    description: "Constrói engenhocas com peças recuperadas do mundo antigo. Em Frostbit, engenho é sinônimo de sobrevivência.",
    flavor: "O gelo quebrou tudo. Eu conserto.",
    skills: ["investigacao", "arcanismo"],
    level1: { name: "Invenção Improvisada", text: "Cria uma ferramenta simples (alavanca, gancho, mecha) com materiais disponíveis." },
    level7: { name: "Engenho Arcano", text: "Cria um dispositivo mágico simples (ex: luz contínua, alarme) por descanso longo." },
    passive: { name: "Desmontar", text: "Desmonta mecanismos e armadilhas com vantagem (INT/Investigação)." },
    feature: "Desmonta mecanismos e armadilhas com vantagem (INT/Investigação).",
  },
  {
    id: "mercador",
    name: "Mercador",
    description: "Viaja entre vilas congeladas trocando o que sobrou do mundo antigo. Sabe o valor de tudo — inclusive de segredos.",
    flavor: "Tudo tem preço. Até o silêncio.",
    skills: ["persuasao", "intuicao"],
    level1: { name: "Negociação Gelada", text: "Vantagem em Persuasão para barganhar. Compra 10% mais barato, vende 10% mais caro." },
    level7: { name: "Rede de Contatos", text: "Encontra um contato em qualquer assentamento (1×/sessão) que fornece informação ou abrigo." },
    passive: { name: "Olho Avaliador", text: "Sabe o valor de mercado de qualquer item ao tocá-lo." },
    feature: "Sabe o valor de mercado de qualquer item ao tocá-lo.",
  },
  {
    id: "batedor",
    name: "Batedor",
    description: "Vai à frente do grupo, mapeia terreno hostil e identifica ameaças antes que elas cheguem. A primeiro a morrer — ou o único a voltar.",
    flavor: "Se eu voltar, o caminho é seguro. Se não voltar... também é.",
    skills: ["furtividade", "sobrevivencia"],
    level1: { name: "Passo Leve", text: "Vantagem em Furtividade em terreno natural. Não deixa rastros na neve." },
    level7: { name: "Olho de Águia", text: "Enxerga detalhes a 300m e identifica ameaças a 600m (SAB/Percepção automática)." },
    passive: { name: "Sentinela", text: "Sempre age na iniciativa máxima ao iniciar emboscada." },
    feature: "Sempre age na iniciativa máxima ao iniciar emboscada.",
  },
  {
    id: "nobre",
    name: "Nobre",
    description: "Sobrevivente de uma linhagem que o inverno quase apagou. O nome ainda abre portas — em alguns lugares.",
    flavor: "O sangue é azul, mas o frio não escolhe cor.",
    skills: ["persuasao", "historia"],
    level1: { name: "Privilégio de Nascimento", text: "Recebe abrigo e comida em propriedades aliadas. Autoridade reconhecida em assentamentos." },
    level7: { name: "Herança Antiga", text: "Recupera um item mágico de família (à escolha do mestre) ou um título político funcional." },
    passive: { name: "Presença Nobre", text: "Vantagem em Persuasão com autoridades e nobres." },
    feature: "Vantagem em Persuasão com autoridades e nobres.",
  },
  {
    id: "contrabandista",
    name: "Contrabandista",
    description: "Move mercadorias proibidas entre cidades- fornalha e vilas congeladas. Conhece passagens secretas e pessoas perigosas.",
    flavor: "O que o gelo esconde, eu encontro.",
    skills: ["furtividade", "enganação"],
    level1: { name: "Rotas Ocultas", text: "Conhece uma passagem secreta em qualquer assentamento que já visitou." },
    level7: { name: "Mestre do Disfarce", text: "Cria disfarces perfeitos (1×/descanso longo) que resistem a inspeção comum." },
    passive: { name: "Contatos do Submundo", text: "Encontra o mercado negro em qualquer cidade grande (CAR/Enganação CD 10)." },
    feature: "Encontra o mercado negro em qualquer cidade grande (CAR/Enganação CD 10).",
  },
  {
    id: "mineiro",
    name: "Mineiro",
    description: "Cava túneis sob o gelo buscando calor, minério e às vezes algo pior. Conhece o subterrâneo melhor que a superfície.",
    flavor: "Quanto mais fundo, mais quente. Mais escuro também.",
    skills: ["atletismo", "sobrevivencia"],
    level1: { name: "Instinto Subterrâneo", text: "Não se perde no subterrâneo. Sente vibrações em rocha (criaturas a 9m)." },
    level7: { name: "Escavação Rápida", text: "Cava 3m de túnel por hora (em rocha macia) ou encontra entrada para caverna natural." },
    passive: { name: "Pulmão de Ferro", text: "Resiste a gases e baixa oxigenação por 10 min." },
    feature: "Resiste a gases e baixa oxigenação por 10 min.",
  },
  {
    id: "tecelao",
    name: "Tecelão",
    description: "Tece roupas e mantos que significam a diferença entre vida e morte no gelo. Alguns dizem que suas linhas carregam magia antiga.",
    flavor: "Cada fio é uma oração contra o frio.",
    skills: ["intuicao", "prestidigitacao"],
    level1: { name: "Manto Aquecido", text: "Cria uma vestimenta que dá resistência a frio ambiental por 8h (1×/descanso longo)." },
    level7: { name: "Tecido Encantado", text: "Cria um manto mágico (CA +1 ou resistência a um elemento) por descanso longo." },
    passive: { name: "Reparo Rápido", text: "Repara roupas e armaduras de tecido/couro sem ferramentas." },
    feature: "Repara roupas e armaduras de tecido/couro sem ferramentas.",
  },
  {
    id: "cronista",
    name: "Cronista",
    description: "Registra tudo — os mortos, os vivos, os lugares que o gelo engoliu. Em Frostbit, quem lembra o passado controla o futuro.",
    flavor: "Se eu não escrever, nunca aconteceu.",
    skills: ["historia", "persuasao"],
    level1: { name: "Registro Preciso", text: "Lembra perfeitamente mapas, rostos e conversas (vantagem em História e Intuição para lembrar)." },
    level7: { name: "Crônica de Poder", text: "Aprende uma magia de rolagem que presenciou (nível máximo 3, 1×/descanso longo)." },
    passive: { name: "Contador de Histórias", text: "Vantagem em Persuasão ao contar história relevante (1×/sessão)." },
    feature: "Vantagem em Persuasão ao contar história relevante (1×/sessão).",
  },
  {
    id: "xama-aprendiz",
    name: "Xamã Aprendiz",
    description: "Aprendiz de um xamã que falava com os espíritos do gelo. O mestre morreu; o aprendiz carrega o que aprendeu — e o que não terminou de aprender.",
    flavor: "Os espíritos sussurram. Nem sempre eles são gentis.",
    skills: ["religiao", "medicina"],
    level1: { name: "Sussurro dos Espíritos", text: "Comunica-se com espíritos menores (1×/descanso longo, 3 perguntas sim/não)." },
    level7: { name: "Canal Espiritual", text: "Invoca um espírito guardião que protege um aliado (+2 CA por 1 min, 1×/descanso longo)." },
    passive: { name: "Visão Espiritual", text: "Vê aura mágica fraca em 3m (como Detectar Magia, passivo)." },
    feature: "Vê aura mágica fraca em 3m (como Detectar Magia, passivo).",
  },
  {
    id: "sobrevivente",
    name: "Sobrevivente",
    description: "Não é herói, soldado ou erudito. É alguém que simplesmente não morreu — e isso, em Frostbit, já é uma qualificação.",
    flavor: "Todo dia acordado é uma vitória.",
    skills: ["sobrevivencia", "percepcao"],
    level1: { name: "Instinto de Sobrevivência", text: "Encontra comida e abrigo em qualquer terreno natural (SAB/Sobrevivência CD 12)." },
    level7: { name: "Não Vai Morrer Hoje", text: "Ao chegar a 0 PV, fica em 1 PV (1×/descanso longo). Não fica inconsciente." },
    passive: { name: "Pele Grossa", text: "+1 CA natural (simboliza cicatrizes e adaptação ao frio)." },
    feature: "+1 CA natural (simboliza cicatrizes e adaptação ao frio).",
  },
];

export const getOrigin = (id: string) => ORIGINS.find((o) => o.id === id);
export const LANGUAGES = [
  "Comum",
  "Anão",
  "Élfico",
  "Gnômico",
  "Orc",
  "Dracônico",
  "Gigante",
  "Silvestre",
  "Infernal",
  "Celestial",
  "Subcomum",
  "Glacial",
];
