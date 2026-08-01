// Dados do sistema autoral FROSTBIT.
// Isolado do D&D 5.5 e do Dreowacis — usado apenas pelo fluxo /create/frostbit.

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
  { key: "con", name: "Constituição", short: "CON", hint: "Resistência ao frio e vigor" },
  { key: "int", name: "Inteligência", short: "INT", hint: "Lógica e memória" },
  { key: "sab", name: "Sabedoria", short: "SAB", hint: "Percepção e instinto" },
  { key: "car", name: "Carisma", short: "CAR", hint: "Presença e influência" },
];

export const modifier = (v: number) => Math.floor((v - 10) / 2);
export const fmtMod = (m: number) => (m >= 0 ? `+${m}` : `${m}`);

export const proficiencyBonus = (level: number) => {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
};

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

// ---------- Perícias ----------

export type SkillKey =
  | "atletismo"
  | "acrobacia" | "furtividade" | "prestidigitacao"
  | "arcanismo" | "historia" | "investigacao" | "natureza" | "religiao"
  | "adestrar" | "intuicao" | "medicina" | "percepcao" | "sobrevivencia"
  | "atuacao" | "enganacao" | "intimidacao" | "persuasao";

export interface Skill { key: SkillKey; name: string; ability: AbilityKey }

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

export const getSkill = (k: SkillKey) => SKILLS.find((s) => s.key === k)!;

// ---------- Espécies ----------

export interface SpeciesVariant {
  id: string;
  name: string;
  attributes: Partial<Record<AbilityKey, number>>;
  trait: string;
}

export interface Species {
  id: string;
  name: string;
  tagline: string;
  flavor: string;
  attributes: Partial<Record<AbilityKey, number>>;
  size: string;
  speed: string;
  traits: string[];
  languages: string[];
  /** Espécies especiais só aparecem quando reveladas pelo jogador/mestre. */
  special?: boolean;
  variantLabel?: string;
  variants?: SpeciesVariant[];
}

export const SPECIES: Species[] = [
  {
    id: "humano",
    name: "Humano",
    tagline: "Teimosos o bastante para viver no gelo",
    flavor:
      "Construíram as últimas cidadelas muradas do norte. Não são os mais fortes nem os mais sábios — apenas os que se recusam a morrer congelados.",
    attributes: { for: 1, des: 1, con: 1, int: 1, sab: 1, car: 1 },
    size: "Médio (1,60m–1,90m)",
    speed: "9m",
    traits: [
      "Versatilidade: ganhe 1 perícia treinada adicional.",
      "Vontade Teimosa: vantagem contra medo causado pelo frio ou pelo escuro.",
    ],
    languages: ["Comum"],
  },
  {
    id: "anao",
    name: "Anão",
    tagline: "Forjas acesas sob a neve",
    flavor:
      "Vivem em salões escavados sob a geleira, onde o calor das forjas é a única religião necessária.",
    attributes: { con: 2, for: 1 },
    size: "Médio-baixo (1,20m–1,50m)",
    speed: "7,5m",
    traits: [
      "Visão no Escuro 18m.",
      "Resistência Anã: vantagem contra veneno e resistência a dano de veneno.",
      "Pele de Forja: resistência a dano de fogo.",
    ],
    languages: ["Comum", "Anão"],
  },
  {
    id: "meio-orc",
    name: "Meio-Orc",
    tagline: "O sangue quente que o gelo não apaga",
    flavor:
      "Nascidos entre dois povos que se odeiam, sobrevivem porque nenhuma nevasca é mais dura que a própria infância.",
    attributes: { for: 2, con: 1 },
    size: "Médio (1,75m–2,05m)",
    speed: "9m",
    traits: [
      "Visão no Escuro 18m.",
      "Resistência Implacável: ao cair a 0 PV, fique com 1 PV (1×/descanso longo).",
      "Ataques Selvagens: +1 dado de dano em acertos críticos com armas corpo a corpo.",
    ],
    languages: ["Comum", "Orc"],
  },
  {
    id: "gnomo",
    name: "Gnomo",
    tagline: "Engenhocas contra o inverno",
    flavor:
      "Pequenos, curiosos e responsáveis por metade das invenções que mantêm as cidadelas aquecidas — e pela outra metade dos incêndios.",
    attributes: { int: 2, des: 1 },
    size: "Pequeno (0,90m–1,20m)",
    speed: "7,5m",
    traits: [
      "Visão no Escuro 18m.",
      "Astúcia Gnômica: vantagem em salvaguardas de INT, SAB e CAR contra magia.",
      "Engenhoqueiro: monta um dispositivo simples com materiais improvisados.",
    ],
    languages: ["Comum", "Gnômico"],
  },
  {
    id: "tiefling",
    name: "Tiefling",
    tagline: "Brasa que nunca esfria",
    flavor:
      "O sangue infernal é a razão de nunca sentirem o frio — e de serem culpados por toda desgraça que atinge a vila.",
    attributes: { car: 2, int: 1 },
    size: "Médio (1,60m–1,90m)",
    speed: "9m",
    traits: [
      "Visão no Escuro 18m.",
      "Resistência Infernal: resistência a dano de fogo.",
      "Legado Infernal: conhece o truque Chamas Menores; a partir do nível 3, Repreensão Infernal 1×/dia.",
    ],
    languages: ["Comum", "Infernal"],
  },
  {
    id: "elfo",
    name: "Elfo",
    tagline: "Memória mais longa que o inverno",
    flavor:
      "Lembram do mundo antes do gelo. É por isso que quase nunca sorriem.",
    attributes: { des: 2 },
    size: "Médio (1,60m–1,95m)",
    speed: "9m",
    traits: [
      "Visão no Escuro 18m.",
      "Ascendência Feérica: vantagem contra ser enfeitiçado; imune a sono mágico.",
      "Transe: 4 horas de meditação equivalem a 8 de sono.",
    ],
    languages: ["Comum", "Élfico"],
    variantLabel: "Linhagem Élfica",
    variants: [
      {
        id: "alto-elfo",
        name: "Alto Elfo",
        attributes: { int: 1 },
        trait: "Conhece 1 truque arcano à sua escolha (INT) e 1 idioma extra.",
      },
      {
        id: "elfo-floresta",
        name: "Elfo da Floresta",
        attributes: { sab: 1 },
        trait: "Deslocamento 10,5m e pode se esconder em neve, névoa ou vegetação densa.",
      },
      {
        id: "elfo-negro",
        name: "Elfo Negro (Drow)",
        attributes: { car: 1 },
        trait: "Visão no Escuro Superior 36m; conhece Globos de Luz. Desvantagem sob luz solar direta.",
      },
    ],
  },
  {
    id: "draconato",
    name: "Draconato",
    tagline: "Filhos dos dragões adormecidos",
    flavor:
      "Escamas grossas, orgulho maior ainda. Cada linhagem carrega o sopro de um ancestral que dorme sob a montanha.",
    attributes: { for: 2, car: 1 },
    size: "Médio-alto (1,80m–2,10m)",
    speed: "9m",
    traits: [
      "Sopro Dracônico: dano igual à sua linhagem (2d6, aumenta com o nível).",
      "Resistência Ancestral: resistência ao tipo de dano da sua linhagem.",
    ],
    languages: ["Comum", "Dracônico"],
    variantLabel: "Linhagem Dracônica",
    variants: [
      { id: "branco", name: "Branco", attributes: {}, trait: "Sopro em cone de 4,5m · dano de frio." },
      { id: "azul", name: "Azul", attributes: {}, trait: "Sopro em linha de 9m · dano elétrico." },
      { id: "verde", name: "Verde", attributes: {}, trait: "Sopro em cone de 4,5m · dano de veneno." },
      { id: "vermelho", name: "Vermelho", attributes: {}, trait: "Sopro em cone de 4,5m · dano de fogo." },
      { id: "preto", name: "Preto", attributes: {}, trait: "Sopro em linha de 9m · dano de ácido." },
      { id: "prata", name: "Prata", attributes: {}, trait: "Sopro em cone de 4,5m · dano de frio." },
      { id: "ouro", name: "Ouro", attributes: {}, trait: "Sopro em cone de 4,5m · dano de fogo." },
      { id: "bronze", name: "Bronze", attributes: {}, trait: "Sopro em linha de 9m · dano elétrico." },
      { id: "latao", name: "Latão", attributes: {}, trait: "Sopro em linha de 9m · dano de fogo." },
      { id: "cobre", name: "Cobre", attributes: {}, trait: "Sopro em linha de 9m · dano de ácido." },
    ],
  },

  // ---- Espécies especiais (ocultas) ----
  {
    id: "reanimado",
    name: "Reanimado",
    tagline: "Voltou — e trouxe o frio junto",
    flavor:
      "Morreu no gelo e acordou de novo, sem saber quem o trouxe de volta. O corpo não esquenta mais, mas também não apodrece.",
    attributes: { con: 2, sab: 1 },
    size: "Médio",
    speed: "9m",
    special: true,
    traits: [
      "Carne Fria: imune a dano de frio ambiental e a exaustão por temperatura.",
      "Não Respira: não precisa respirar, comer ou dormir (4h de torpor).",
      "Memória Partida: desvantagem em testes de História sobre a própria vida.",
    ],
    languages: ["Comum", "um idioma da vida anterior"],
  },
  {
    id: "aasimar",
    name: "Aasimar",
    tagline: "Uma última faísca de luz",
    flavor:
      "Carrega uma centelha celestial num mundo que os deuses abandonaram. As pessoas se ajoelham — ou fogem.",
    attributes: { car: 2, sab: 1 },
    size: "Médio",
    speed: "9m",
    special: true,
    traits: [
      "Visão no Escuro 18m.",
      "Resistência Celestial: resistência a dano radiante e necrótico.",
      "Mãos Curativas: cura PV igual ao seu nível (1×/descanso longo).",
      "Revelação Radiante (nível 3): asas de luz por 1 minuto, 1×/descanso longo.",
    ],
    languages: ["Comum", "Celestial"],
  },
  {
    id: "fafnir",
    name: "Fafnir",
    tagline: "A maldição do tesouro",
    flavor:
      "Linhagem amaldiçoada de um antigo devorador de ouro. Quanto mais cobiça, mais escamas nascem.",
    attributes: { for: 2, con: 2 },
    size: "Grande (2,10m+)",
    speed: "9m",
    special: true,
    traits: [
      "Couro Escamado: CA base 13 + mod DES quando sem armadura.",
      "Ganância Ancestral: vantagem em testes para avaliar objetos e sentir metal precioso a 9m.",
      "Maldição de Fafnir: sofre 1 nível de exaustão se passar um descanso longo sem tesouro consigo.",
    ],
    languages: ["Comum", "Dracônico"],
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

// ---------- Classes ----------

export interface Subclass {
  id: string;
  name: string;
  text: string;
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
      { id: "berserker", name: "Trilha do Berserker", text: "Frenesi: ataque adicional durante a fúria, ao custo de exaustão." },
      { id: "totem", name: "Trilha do Totem Gélido", text: "Espírito do lobo branco: resistência a frio e aliados ganham vantagem contra alvos adjacentes." },
      { id: "tempestade", name: "Trilha do Arauto da Nevasca", text: "Na fúria, o vento gelado gira ao redor: 1d6 de frio a quem terminar o turno adjacente." },
      { id: "zeloso", name: "Trilha do Zeloso", text: "Fúria divina: dano necrótico extra e resiste à morte enquanto enfurecido." },
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
      { id: "saber", name: "Colégio do Saber", text: "Palavras Cortantes e perícias adicionais." },
      { id: "bravura", name: "Colégio da Bravura", text: "Inspiração de combate: proficiência marcial e armaduras médias." },
      { id: "lamento", name: "Colégio do Lamento", text: "Canções fúnebres que amaldiçoam inimigos com desvantagem." },
      { id: "contadores", name: "Colégio dos Contadores de Gelo", text: "Narra o passado de um local para revelar pistas e segredos." },
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
      { id: "terra", name: "Círculo da Terra", text: "Magias adicionais ligadas à tundra e recuperação de espaços." },
      { id: "lua", name: "Círculo da Lua", text: "Forma Selvagem aprimorada: feras de combate desde o começo." },
      { id: "gelo", name: "Círculo do Gelo Eterno", text: "Molda gelo em barreiras e armas temporárias." },
      { id: "raizes", name: "Círculo das Raízes Adormecidas", text: "Desperta plantas sob a neve para prender e curar." },
    ],
    features: ["Conjuração Druídica", "Forma Selvagem", "Linguagem Silvestre"],
  },
  {
    id: "feiticeiro",
    name: "Feiticeiro",
    tagline: "A magia veio sem pedir licença",
    flavor: "Não estudou nada. Simplesmente acordou um dia com a tempestade dentro do peito.",
    hitDie: 6, keyAbility: "car", saves: ["con", "car"], skillCount: 2,
    skillOptions: ["arcanismo", "enganacao", "intuicao", "intimidacao", "persuasao", "religiao"],
    caster: true,
    profs: "Armas simples",
    subclassLabel: "Origem Mágica (nível 1)",
    subclasses: [
      { id: "dracônica", name: "Linhagem Dracônica", text: "+1 PV por nível e resistência elemental da linhagem." },
      { id: "selvagem", name: "Magia Selvagem", text: "Surtos caóticos que podem salvar ou condenar a cena." },
      { id: "invernal", name: "Coração Invernal", text: "Converte dano de magias em frio e cria terreno de gelo." },
      { id: "abissal", name: "Marca Abissal", text: "Rouba vitalidade ao conjurar, à custa de PV próprios." },
    ],
    features: ["Conjuração Inata", "Fonte de Magia", "Metamagia"],
  },
  {
    id: "guardiao",
    name: "Guardião",
    tagline: "Entre a vila e o que vem do escuro",
    flavor: "Não protege muros: protege pessoas. Fica de pé até que todos estejam dentro.",
    hitDie: 10, keyAbility: "con", saves: ["for", "sab"], skillCount: 2,
    skillOptions: ["atletismo", "intuicao", "intimidacao", "medicina", "percepcao", "sobrevivencia"],
    caster: false,
    profs: "Todas as armaduras, escudos, armas simples e marciais",
    subclassLabel: "Voto de Guarda (nível 1)",
    subclasses: [
      { id: "muralha", name: "Voto da Muralha", text: "Impõe-se como cobertura viva: aliados adjacentes ganham +2 de CA." },
      { id: "vigilia", name: "Voto da Vigília", text: "Nunca é surpreendido e concede iniciativa extra ao grupo." },
      { id: "caçada", name: "Voto da Caçada", text: "Marca uma criatura do escuro e a persegue com bônus de dano." },
      { id: "fogueira", name: "Voto da Fogueira", text: "Acende um refúgio: aliados próximos ignoram frio e recuperam PV no descanso curto." },
    ],
    features: ["Postura de Guarda", "Provocar", "Resistência ao Frio"],
  },
  {
    id: "guerreiro",
    name: "Guerreiro",
    tagline: "Aço, disciplina e sobrevivência",
    flavor: "Treinou até que segurar a espada com as mãos congeladas virasse instinto.",
    hitDie: 10, keyAbility: "for", saves: ["for", "con"], skillCount: 2,
    skillOptions: ["acrobacia", "atletismo", "historia", "intuicao", "intimidacao", "percepcao", "sobrevivencia"],
    caster: false,
    profs: "Todas as armaduras, escudos, armas simples e marciais",
    subclassLabel: "Arquétipo Marcial (nível 1)",
    subclasses: [
      { id: "campeao", name: "Campeão", text: "Críticos em 19–20 e atletismo aprimorado." },
      { id: "mestre-armas", name: "Mestre de Armas", text: "Manobras táticas com dados de superioridade." },
      { id: "cavaleiro", name: "Cavaleiro Rúnico", text: "Grava runas na arma para efeitos mágicos limitados." },
      { id: "batedor", name: "Batedor de Neve", text: "Move-se sem penalidade em neve e ataca ao final do movimento." },
    ],
    features: ["Estilo de Luta", "Segundo Fôlego", "Surto de Ação"],
  },
  {
    id: "ladino",
    name: "Ladino",
    tagline: "A neve apaga pegadas — use isso",
    flavor: "Onde há escassez, há quem viva do que os outros deixam mal guardado.",
    hitDie: 8, keyAbility: "des", saves: ["des", "int"], skillCount: 4,
    skillOptions: ["acrobacia", "atletismo", "enganacao", "furtividade", "intimidacao", "intuicao", "investigacao", "percepcao", "persuasao", "prestidigitacao"],
    caster: false,
    profs: "Armaduras leves, armas simples, bestas de mão, rapieiras, espadas curtas, ferramentas de ladrão",
    subclassLabel: "Arquétipo Ladino (nível 1)",
    subclasses: [
      { id: "trapaceiro", name: "Trapaceiro", text: "Especialista em fechaduras, armadilhas e furtos." },
      { id: "assassino", name: "Assassino", text: "Dano brutal contra alvos surpresos." },
      { id: "espreitador", name: "Espreitador do Breu", text: "Some na escuridão e reaparece atrás do alvo." },
      { id: "contrabandista", name: "Contrabandista", text: "Rotas secretas, contatos e cargas que ninguém deveria ter." },
    ],
    features: ["Ataque Furtivo", "Especialização", "Ação Ardilosa"],
  },
  {
    id: "mago",
    name: "Mago",
    tagline: "Estudo enquanto ainda há velas",
    flavor: "Carrega livros num mundo em que papel é combustível. Isso diz tudo sobre suas prioridades.",
    hitDie: 6, keyAbility: "int", saves: ["int", "sab"], skillCount: 2,
    skillOptions: ["arcanismo", "historia", "intuicao", "investigacao", "medicina", "religiao"],
    caster: true,
    profs: "Adagas, bordões, bestas leves, fundas",
    subclassLabel: "Tradição Arcana (nível 1)",
    subclasses: [
      { id: "evocacao", name: "Evocação", text: "Explosões controladas que poupam aliados." },
      { id: "abjuracao", name: "Abjuração", text: "Barreira arcana que absorve dano." },
      { id: "necromancia", name: "Necromancia", text: "Domina o limiar entre vida e morte gelada." },
      { id: "criomancia", name: "Criomancia", text: "Tradição autoral: converte magias em frio e congela o terreno." },
    ],
    features: ["Conjuração Arcana", "Grimório", "Recuperação Arcana"],
  },
  {
    id: "monge",
    name: "Monge",
    tagline: "O corpo é a última fogueira",
    flavor: "Aprendeu a gerar calor com a respiração enquanto os outros procuravam lenha.",
    hitDie: 8, keyAbility: "des", saves: ["for", "des"], skillCount: 2,
    skillOptions: ["acrobacia", "atletismo", "furtividade", "historia", "intuicao", "religiao"],
    caster: false,
    profs: "Armas simples, espadas curtas, um tipo de ferramenta de artesão",
    subclassLabel: "Tradição Monástica (nível 1)",
    subclasses: [
      { id: "mao-aberta", name: "Caminho da Mão Aberta", text: "Golpes que derrubam, empurram e negam reações." },
      { id: "sombra", name: "Caminho da Sombra", text: "Move-se entre sombras e escurece a área." },
      { id: "sopro", name: "Caminho do Sopro Quente", text: "Aquece o próprio corpo e o de aliados; imune a frio." },
      { id: "punho-gelo", name: "Caminho do Punho de Gelo", text: "Reveste os punhos em gelo: dano extra e redução de deslocamento." },
    ],
    features: ["Artes Marciais", "Defesa sem Armadura", "Ki"],
  },
  {
    id: "paladino",
    name: "Paladino",
    tagline: "Um juramento vale mais que um mapa",
    flavor: "Os deuses calaram, mas o juramento continua sendo dito toda manhã.",
    hitDie: 10, keyAbility: "car", saves: ["sab", "car"], skillCount: 2,
    skillOptions: ["atletismo", "intuicao", "intimidacao", "medicina", "persuasao", "religiao"],
    caster: true,
    profs: "Todas as armaduras, escudos, armas simples e marciais",
    subclassLabel: "Juramento (nível 1)",
    subclasses: [
      { id: "devocao", name: "Juramento de Devoção", text: "Luz sagrada, proteção contra o profano." },
      { id: "vinganca", name: "Juramento de Vingança", text: "Persegue um alvo até o fim, sem trégua." },
      { id: "inverno", name: "Juramento do Inverno", text: "Julgamento gelado: castiga inimigos com frio e imobilidade." },
      { id: "ancioes", name: "Juramento dos Anciões", text: "Preserva a vida que resta; cura e aura de resiliência." },
    ],
    features: ["Sentido Divino", "Imposição de Mãos", "Estilo de Luta"],
  },
];

export const getClass = (id: string) => CLASSES.find((c) => c.id === id);

// ---------- Origens ----------

export interface Origin {
  id: string;
  name: string;
  text: string;
  skills: SkillKey[];
  feature: string;
}

export const ORIGINS: Origin[] = [
  { id: "cacador", name: "Caçador de Peles", text: "Passou a vida seguindo rastros na neve.", skills: ["sobrevivencia", "percepcao"], feature: "Sabe encontrar abrigo e comida em terreno gelado para até 6 pessoas." },
  { id: "lenhador", name: "Lenhador", text: "Derrubou árvores até que a floresta congelasse.", skills: ["atletismo", "natureza"], feature: "Trata madeira como recurso: monta fogueiras que duram o dobro." },
  { id: "pescador-gelo", name: "Pescador de Gelo", text: "Horas de silêncio sobre um lago congelado.", skills: ["sobrevivencia", "intuicao"], feature: "Sabe julgar a espessura do gelo e sempre encontra pesca em água congelada." },
  { id: "soldado", name: "Soldado da Muralha", text: "Serviu num posto avançado que ninguém queria.", skills: ["atletismo", "intimidacao"], feature: "Patente reconhecida: acesso a acampamentos e informações militares." },
  { id: "orfao", name: "Órfão da Nevasca", text: "Cresceu sozinho depois que a vila sumiu sob a neve.", skills: ["furtividade", "prestidigitacao"], feature: "Sempre encontra um esconderijo ou rota de fuga numa cidade." },
  { id: "curandeiro", name: "Curandeiro de Vila", text: "Costurou mais membros congelados do que gostaria.", skills: ["medicina", "natureza"], feature: "Estabiliza aliados sem teste e trata ferimentos de frio." },
  { id: "erudito", name: "Erudito da Torre", text: "Estudou o inverno como quem estuda uma doença.", skills: ["arcanismo", "historia"], feature: "Sabe onde buscar informação: acesso a bibliotecas e arquivos." },
  { id: "acolito", name: "Acólito do Silêncio", text: "Serviu num templo cujos deuses pararam de responder.", skills: ["religiao", "intuicao"], feature: "Hospitalidade religiosa: abrigo em qualquer santuário." },
  { id: "mercador", name: "Mercador de Rota", text: "Cruzou passagens que matam caravanas inteiras.", skills: ["persuasao", "investigacao"], feature: "Contatos comerciais: preços melhores e boatos de outras cidadelas." },
  { id: "contrabandista", name: "Contrabandista", text: "Levava o que era proibido para quem podia pagar.", skills: ["enganacao", "furtividade"], feature: "Conhece um contato ilegal em cada cidade grande." },
  { id: "artista", name: "Artista Errante", text: "Trocava canções por sopa quente.", skills: ["atuacao", "persuasao"], feature: "Sempre consegue cama e comida se houver uma taverna aberta." },
  { id: "ferreiro", name: "Ferreiro", text: "A forja era o único lugar quente da vila.", skills: ["atletismo", "historia"], feature: "Repara armas e armaduras sem custo com tempo e forja disponíveis." },
  { id: "batedor", name: "Batedor de Ruínas", text: "Vasculhava cidades engolidas pelo gelo.", skills: ["investigacao", "acrobacia"], feature: "Identifica estruturas instáveis e armadilhas antigas." },
  { id: "nobre", name: "Nobre Deposto", text: "Sua casa caiu com a última fome.", skills: ["historia", "persuasao"], feature: "Nome ainda reconhecido: audiência com autoridades locais." },
  { id: "criminoso", name: "Criminoso Marcado", text: "A marca no braço conta o que você não conta.", skills: ["enganacao", "intimidacao"], feature: "Reconhece e é reconhecido pelo submundo." },
  { id: "sobrevivente", name: "Sobrevivente Solitário", text: "Foi o único a voltar da expedição.", skills: ["sobrevivencia", "medicina"], feature: "Suporta um nível de exaustão a mais antes de sofrer penalidades." },
];

export const getOrigin = (id: string) => ORIGINS.find((o) => o.id === id);

export const LANGUAGES = [
  "Comum", "Anão", "Élfico", "Gnômico", "Orc", "Dracônico", "Infernal",
  "Celestial", "Gigante", "Silvestre", "Primordial (Aquan/Auran)",
];
