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

// ---------- Raças (PDF Raças p.1-46) ----------

export interface RaceAbility {
  id: string;
  name: string;
  text: string;
}

export interface RaceVariant {
  id: string;
  name: string;
  attributes: Partial<Record<AbilityKey, number>>;
  variantAbility: RaceAbility;
  specialTrait?: RaceAbility;
  exclusiveAbilities: RaceAbility[]; // choose 1
}

export interface Race {
  id: string;
  name: string;
  tagline: string;
  flavor: string;
  attributes: Partial<Record<AbilityKey, number>>;
  size: string;
  speed: string;
  lifespan: string;
  automaticAbility: RaceAbility;
  chooseAbilities: number;
  abilities: RaceAbility[];
  specialTrait?: RaceAbility;
  chooseCommonAbility?: number;
  commonAbilities?: RaceAbility[];
  variants?: RaceVariant[];
}

const a = (id: string, name: string, text: string): RaceAbility => ({ id, name, text });

export const RACES: Race[] = [
  {
    id: "humano",
    name: "Humanos",
    tagline: "Os adaptáveis por excelência",
    flavor:
      "Presentes em todos os reinos, ambiciosos e versáteis. Enquanto outras raças se especializam, os humanos se diversificam.",
    attributes: { for: 1, des: 1, con: 1, int: 1, sab: 1, car: 1 },
    size: "Médio (1,60m–1,90m)",
    speed: "9m",
    lifespan: "Adulto aos 18; vivem 80–100 anos",
    automaticAbility: a(
      "versatilidade",
      "Versatilidade Humana",
      "Escolha uma perícia adicional para ser treinado.",
    ),
    chooseAbilities: 2,
    abilities: [
      a("determinacao", "Determinação", "Uma vez por descanso, ao falhar em um teste, você pode rolar os dados novamente."),
      a("diplomata", "Diplomata Nato", "Vantagem em Persuasão ao negociar, barganhar ou convencer outros humanos."),
      a("aprendiz", "Aprendiz Rápido", "Escolha uma ferramenta ou idioma: você é proficiente nele."),
      a("marcas", "Marcas da Alma", "+1 em testes de resistência contra encantamento e ilusão."),
      a("heranca", "Herança Diversa", "Escolha um Reino ancestral (Silverford: resistência a frio; Shouthmallow: +1 Sobrevivência; Clearmeadow: +10 Mana inicial; Driowollow: +1 Natureza; Dracmead: +40 moedas). Vantagem em História sobre esse reino."),
      a("impeto", "Ímpeto do Triunfo", "Ao alcançar um objetivo importante, recupere 1d6 PV."),
    ],
    specialTrait: a("multicultural", "Multicultural", "Você fala Xilan (idioma do comércio) mais um idioma adicional à sua escolha."),
  },
  {
    id: "elfo",
    name: "Elfos",
    tagline: "Longevos filhos das florestas",
    flavor:
      "Graciosos, longevos e conectados à mana natural. Sociedade matriarcal e frugal em Clearmeadow.",
    attributes: { des: 2, sab: 1 },
    size: "Médio (1,60m–1,70m), esguio",
    speed: "9m",
    lifespan: "Adulto aos 60; vivem até 750 anos",
    automaticAbility: a("sentidos-elficos", "Sentidos Élficos", "Vantagem em testes de Percepção baseados em visão ou audição."),
    chooseAbilities: 2,
    abilities: [
      a("graca", "Graça Natural", "+1 na CA quando não estiver usando armadura pesada. Desvantagem em testes de DES se usar mais que armadura de couro."),
      a("sangue-magico", "Sangue Mágico", "Conhecimento inato de um truque de magia, conjurado com sua mana natural."),
      a("amigo-florestas", "Amigo das Florestas", "Vantagem em Sobrevivência em ambientes florestais."),
      a("precisao-elfica", "Precisão Élfica", "+1 em jogadas de ataque com arcos."),
      a("resistencia-encantada", "Resistência Encantada", "Vantagem em testes de resistência para não ser enfeitiçado."),
    ],
  },
  {
    id: "meio-elfo",
    name: "Meio-Elfos",
    tagline: "Entre dois mundos",
    flavor:
      "Herdam a graça élfica e a adaptabilidade humana. Muitas vezes vivem entre ambos os mundos.",
    attributes: { car: 2 },
    size: "Médio",
    speed: "9m",
    lifespan: "Adulto aos 20; vivem até 180 anos",
    automaticAbility: a("meio-auto", "Versatilidade OU Sentidos", "Escolha uma: Versatilidade Humana (perícia extra) ou Sentidos Élficos (vantagem em Percepção)."),
    chooseAbilities: 2,
    abilities: [
      a("me-perícias", "+1 em dois atributos à sua escolha", "Além de +2 Carisma, escolha dois outros atributos para +1."),
      a("me-determinacao", "Determinação", "Uma vez por descanso, ao falhar, role novamente."),
      a("me-graca", "Graça Natural", "+1 na CA sem armadura pesada."),
      a("me-amigo", "Amigo das Florestas", "Vantagem em Sobrevivência florestal."),
      a("me-sangue", "Sangue Mágico", "Um truque de magia inato."),
    ],
  },
  {
    id: "meio-demonio",
    name: "Meio-Demônios",
    tagline: "Paradoxos vivos, marcados pela Morte",
    flavor:
      "Herança amaldiçoada e magnetismo inquietante. Uma centelha da Deusa da Morte aguarda o Despertar.",
    attributes: { car: 2, int: 1 },
    size: "Médio (1,70m–2,10m)",
    speed: "9m",
    lifespan: "Adulto aos 18; vivem até 150 anos",
    automaticAbility: a("res-infernal", "Resistência Infernal", "Resistente a exaustão. Uma vez por descanso longo, refaça um teste de FOR ou CON falho."),
    chooseAbilities: 2,
    abilities: [
      a("legado-morte", "Legado da Morte", "Uma vez por descanso, invisível por 1 rodada. Termina se atacar ou conjurar."),
      a("visao-escuro", "Visão no Escuro", "Enxerga 18m no escuro como se fosse luz baixa; luz baixa como plena."),
      a("persuasao-int", "Persuasão Intimidante", "Vantagem em testes de Intimidação."),
      a("pele-resistente", "Pele Resistente", "+1 na CA natural."),
      a("sangue-corrompido", "Sangue Corrompido", "Vantagem em resistência contra venenos e doenças comuns."),
      a("presenca-amed", "Presença Amedrontadora", "Aura passiva: criaturas hostis em 3m têm desvantagem em testes contra medo."),
    ],
    specialTrait: a("aparencia", "Aparência Incomum", "Beleza perturbadora que atrai ou aterroriza; reações de NPCs variam radicalmente."),
  },
  {
    id: "sioungua",
    name: "Sioungua",
    tagline: "Guardiões silenciosos das terras selvagens",
    flavor:
      "Pedra fundamental de Dreowacis. Vivem em pequenas comunidades integradas às florestas e montanhas.",
    attributes: { for: 2, sab: 1 },
    size: "Médio-Grande (2,10m–2,50m)",
    speed: "9m",
    lifespan: "Adulto aos 30; vivem até 500 anos",
    automaticAbility: a("forca-silvestre", "Força Silvestre", "Carrega, levanta e empurra o dobro do peso normal."),
    chooseAbilities: 2,
    abilities: [
      a("fala-bestas", "Fala com Bestas e Plantas", "Comunicação simples com bestas e plantas (fome, medo, alerta, paz)."),
      a("caminhante-florestas", "Caminhante das Florestas", "Quase não deixa rastro; move-se em vegetação densa sem redução."),
      a("pele-cascuda", "Pele Cascuda", "Armadura Natural 13 + mod. DES."),
      a("conh-ancestral", "Conhecimento Ancestral", "Vantagem em Natureza e Sobrevivência em ambientes naturais."),
      a("presenca-calmante", "Presença Calmante", "Acalma criatura não-hostil, dando-lhe vantagem contra medo."),
      a("res-natural", "Resistência Natural", "Vantagem em resistência contra doenças."),
    ],
    specialTrait: a("guardador", "Guardador dos Segredos", "Uma vez por aventura, revele um segredo do seu povo para alterar fundamentalmente uma situação."),
  },
  {
    id: "ghiaccino",
    name: "Ghiaccino",
    tagline: "Filhos do gelo, senhores das tundras",
    flavor:
      "Forjados pela Deusa da Morte e temperados por sangue angelical. Únicos senhores das terras geladas de Silverford.",
    attributes: { con: 2, for: 1 },
    size: "Médio (1,80m–2,20m), robusto",
    speed: "9m",
    lifespan: "Adulto aos 18; vivem até 120 anos",
    automaticAbility: a("sangue-gelo", "Sangue de Gelo", "Resistência a dano de frio."),
    chooseAbilities: 2,
    abilities: [
      a("adaptado-frio", "Adaptado ao Frio", "Imune a efeitos debilitantes de frio extremo não-mágico."),
      a("pele-gelada", "Pele Gelada", "Armadura Natural 12 + mod. CON."),
      a("respiracao-glacial", "Respiração Glacial", "1×/dia: cone de frio (4,5m), CD 8+CON+prof, 2d6 de dano de frio."),
      a("montanhista", "Montanhista Nato", "Vantagem em Atletismo em terreno montanhoso, rochoso ou gelado."),
      a("visao-nevasca", "Visão na Nevasca", "Sem desvantagem em Percepção causada por neve, névoa ou vento forte."),
      a("det-nordica", "Determinação Nórdica", "Vantagem em testes de resistência contra ser atordoado."),
    ],
    specialTrait: a("soberania", "Soberania do Inverno Eterno", "1×/descanso longo, refaça teste falho de Persuasão ou Intimidação em apelo de honra."),
  },
  {
    id: "homem-fera",
    name: "Homens-Fera",
    tagline: "Encarnação viva do ciclo Vida/Morte",
    flavor:
      "Forma verdadeira é animal; forma humanoide é uma segunda pele. Vivem em Alcateias na Floresta Negra de Dracmead.",
    attributes: { des: 1, con: 1 },
    size: "Médio",
    speed: "9m (algumas espécies têm mais)",
    lifespan: "Adulto aos 15; vivem até 200 anos",
    automaticAbility: a("instinto-animal", "Instinto Animal", "Vantagem em Percepção baseada em olfato, visão ou audição."),
    chooseCommonAbility: 1,
    commonAbilities: [
      a("garras-naturais", "Garras / Armas Naturais", "Ataques desarmados causam 1d4 + mod. FOR (corte/impacto)."),
      a("sentidos-agu", "Sentidos Aguçados", "Escolha um sentido (audição/olfato/visão noturna): vantagem em Investigação com ele."),
      a("adapt-ambiental", "Adaptação Ambiental", "Vantagem em Sobrevivência no habitat associado à sua espécie."),
      a("com-animal", "Comunicação Animal", "Comunicação simples com animais da mesma espécie."),
    ],
    chooseAbilities: 0,
    abilities: [],
    specialTrait: a("alma-ciclo", "Alma Marcada pelo Ciclo", "Fúria do Legado Divino (dano adicional quando < ½ PV, custa exaustão) + Instinto de Alcateia ou Solidão."),
    variants: [
      {
        id: "lobo",
        name: "Lobos / Cães / Coiotes",
        attributes: {},
        variantAbility: a("v-lobo", "Predador de Alcateia", "Instintos de matilha; sentidos aguçados; caçador persistente."),
        exclusiveAbilities: [
          a("faro-in", "Faro Inigualável", "Rastreia pelo cheiro por até uma semana, mesmo sob chuva leve."),
          a("uivo-am", "Uivo Amedrontador", "Ação: inimigos próximos fazem teste de SAB ou ficam amedrontados por 1 rodada."),
          a("pers-cacador", "Persistência de Caçador", "Ação de Corrida como ação bônus, 1×/combate."),
        ],
      },
      {
        id: "raposa",
        name: "Raposas",
        attributes: {},
        variantAbility: a("v-raposa", "Astúcia da Raposa", "Ágil, esquiva e observadora."),
        exclusiveAbilities: [
          a("esquiva-natural", "Esquiva Natural", "Ao errarem CaC contra você, use reação para mover 1,5m sem provocar oportunidade."),
          a("s-oportunidade", "Sentido de Oportunidade", "Vantagem em ataques de oportunidade."),
          a("peq-rapido", "Pequeno e Rápido", "Tamanho Pequeno; deslocamento +3m."),
        ],
      },
      {
        id: "felino",
        name: "Onças / Pumas / Tigres / Leopardos",
        attributes: {},
        variantAbility: a("v-felino", "Predador Felino", "Salto poderoso, garras retráteis e camuflagem."),
        exclusiveAbilities: [
          a("salto-poderoso", "Salto Poderoso", "Salto (dist./alt.) dobrado; ignora primeiros 1,5m de queda ao pular."),
          a("garras-retrateis", "Garras Retráteis", "Garras causam 1d6; escala superfícies verticais com vantagem."),
          a("camuflagem-nat", "Camuflagem Natural", "Vantagem em Furtividade em vegetação/sombras densas."),
        ],
      },
      {
        id: "urso",
        name: "Ursos",
        attributes: {},
        variantAbility: a("v-urso", "Força do Urso", "Massivo, resistente e esmagador."),
        exclusiveAbilities: [
          a("abraco-esmagador", "Abraço Esmagador", "Ao acertar com garras, tente agarrar como parte da mesma ação."),
          a("res-tenaz", "Resistência Tenaz", "Vantagem em resistência contra veneno."),
          a("forca-descom", "Força Descomunal", "Carrega, empurra ou puxa o dobro do peso normal."),
        ],
      },
      {
        id: "aguia",
        name: "Águias / Aves de Rapina",
        attributes: {},
        variantAbility: a("v-aguia", "Voo do Predador", "Céu como caçada."),
        exclusiveAbilities: [
          a("voo-limitado", "Voo Limitado", "Deslocamento de voo 9m (sem armadura média/pesada); planeio 18m de local elevado."),
          a("garras-afiadas", "Garras Afiadas", "Ataques com garras causam 1d6 cortante."),
          a("s-direcao", "Sentido de Direção", "Nunca se perde; sempre sabe a direção cardinal exata."),
        ],
      },
    ],
  },
  {
    id: "redblood",
    name: "Clã Redblood",
    tagline: "Sentinelas graciosos da coroa",
    flavor:
      "Humanos com sangue felino latente. Nobreza de serviço em Dracmead; ascenderam por lealdade e habilidade.",
    attributes: { des: 2, car: 1 },
    size: "Médio (1,65m–1,85m), esguio",
    speed: "12m",
    lifespan: "Adulto aos 18; vivem até 150 anos",
    automaticAbility: a("agilidade-felina", "Agilidade Felina", "Escalada = deslocamento (12m); sem penalidade padrão em superfícies ásperas."),
    chooseAbilities: 3,
    abilities: [
      a("olhos-gato", "Olhos de Gato", "Visão no escuro 18m; luz baixa como plena."),
      a("rb-garras", "Garras Retráteis", "Ataques desarmados 1d4 + DES cortante; usa DES no lugar de FOR."),
      a("curiosidade", "Curiosidade Insaciável", "Vantagem em Investigação para achar compartimentos ocultos ou detalhes."),
      a("aterrissagem", "Aterrissagem Graciosa", "Metade do dano de queda; se levanta gastando 1,5m."),
      a("furt-natural", "Furtividade Natural", "Vantagem em testes de Furtividade."),
      a("salto-felino", "Salto Felino", "Salto em distância +1,5m; em altura +0,75m."),
      a("atracao", "Atração Fascinante", "Vantagem em Persuasão ou Intimidação por charme/presença magnética."),
    ],
    specialTrait: a("comp-felino", "Comportamento Felino", "Instintos do Guerreiro-Espião + Graça sob Pressão (Mestre pode conceder pistas ou Inspiração conforme o roleplay felino)."),
  },
  {
    id: "sereia",
    name: "Sereias",
    tagline: "Filhas guerreiras do oceano",
    flavor:
      "Nascidas do sangue de um Deus dos Mares. Guardiãs implacáveis dos domínios salgados; sociedade matriarcal fluida.",
    attributes: { car: 1, con: 1 },
    size: "Médio",
    speed: "9m (terra), 18m (água)",
    lifespan: "Adulto aos 16; vivem até 300 anos",
    automaticAbility: a("resp-aquatica", "Respiração Aquática", "Respira debaixo d'água indefinidamente."),
    chooseCommonAbility: 1,
    commonAbilities: [
      a("cam-oceanica", "Camuflagem Oceânica", "Vantagem em Furtividade quando submerso."),
      a("con-mares", "Conhecimento das Marés", "Nunca se perde no mar; sempre sabe direção da costa e previsão de marés."),
      a("amiz-marinha", "Amizade Marinha", "Vantagem em Adestrar/Intimidação com criaturas aquáticas."),
      a("canto-ondas", "Canto das Ondas", "Comunica conceitos básicos com criaturas aquáticas que ouçam."),
    ],
    chooseAbilities: 0,
    abilities: [],
    specialTrait: a(
      "sangue-marinho",
      "Sangue do Deus-Marinho",
      "Fúria das Profundezas (+1d6 dano de frio/perfurante submerso, custa exaustão) + União das Tribos (ataque coordenado com Sereia de variante diferente).",
    ),
    variants: [
      {
        id: "mediterranea",
        name: "Sereia Mediterrânea",
        attributes: { car: 2 },
        variantAbility: a(
          "canto-encantador",
          "Canto Encantador",
          "1×/descanso longo, humanoides em 18m fazem SAB (CD 8+CAR+prof) ou ficam encantados por 1 min.",
        ),
        specialTrait: a("forma-prof", "Forma da Profundidade", "Cauda na água (nado 18m); em terra pernas humanas, ganha exaustão a cada 24h sem mar salgado."),
        exclusiveAbilities: [
          a("fala-aq", "Fala com Animais Aquáticos", "Fala com criaturas aquáticas como se compartilhassem uma língua."),
          a("bel-hip", "Beleza Hipnótica", "Vantagem em Persuasão contra criaturas atraídas por você."),
          a("ondas-menor", "Controle de Ondas Menor", "Ação: cria pequena onda para empurrar objeto ou atrapalhar equilíbrio."),
        ],
      },
      {
        id: "selkie",
        name: "Selkie",
        attributes: { sab: 2 },
        variantAbility: a(
          "troca-peles",
          "Troca de Peles",
          "Pele de foca mágica: transforma-se em foca ágil. Perdida a pele, fica preso à forma atual.",
        ),
        specialTrait: a("dupla-nat", "Dupla Natureza", "Muda entre formas usando ação, apenas em contato com água."),
        exclusiveAbilities: [
          a("sent-foca", "Sentidos de Foca", "Vantagem em Percepção (audição/visão) submerso."),
          a("nat-poderosa", "Natação Poderosa", "Nado em forma de foca sobe para 21m."),
          a("af-tempestades", "Afinidade com Tempestades", "Sente tempestades horas antes; vantagem contra relâmpago/vento."),
        ],
      },
      {
        id: "guerreira",
        name: "Sereia Guerreira",
        attributes: { for: 1, con: 1 },
        variantAbility: a(
          "cour-escamas",
          "Couraça de Escamas",
          "Sem armadura, CA 13 + mod. DES; pode usar escudo com esse cálculo.",
        ),
        specialTrait: a("marca-guerreiro", "Marca do Guerreiro", "Escamas visíveis mesmo em forma humana; vantagem em Intimidação contra quem reconheça o perigo."),
        exclusiveAbilities: [
          a("lanca-esp", "Lança Espiritual", "Conjura lança de água/gelo; 1d6 + FOR perfurante ou frio, conta como mágico."),
          a("res-frio-prof", "Resistência ao Frio das Profundezas", "Resistência a dano de frio."),
          a("cmd-marinhas", "Comando de Criaturas Marinhas Menores", "Ação bônus: comanda cardume/crustáceos para distrair."),
        ],
      },
      {
        id: "naiade",
        name: "Náiade",
        attributes: { des: 2 },
        variantAbility: a(
          "ess-liquida",
          "Essência Líquida",
          "1×/dia: torna-se massa de água viva por 1 min (resistência não-mágica, passa por frestas), mas não ataca nem manipula objetos.",
        ),
        specialTrait: a("vinc-fonte", "Vínculo com a Fonte", "Vida ligada a um corpo d'água; longe >10km por >1 semana, exaustão diária até retornar."),
        exclusiveAbilities: [
          a("cura-aguas", "Cura pelas Águas", "Toque cura 1d6 + SAB PV; usos = bônus de proficiência por descanso longo."),
          a("com-esp-aq", "Comunicação com Espíritos Aquáticos", "Percebe e conversa com elementais/fadas da sua fonte."),
          a("plantas-aq", "Controle de Plantas Aquáticas", "Faz algas crescerem para prender/atrapalhar em quadrado de 1,5m."),
        ],
      },
    ],
  },
];

export const getRace = (id: string) => RACES.find((r) => r.id === id);
export const getVariant = (raceId: string, variantId: string) =>
  getRace(raceId)?.variants?.find((v) => v.id === variantId);

/** Soma bônus de atributo de raça + variante */
export const raceAttributeBonus = (
  raceId: string,
  variantId: string,
  key: AbilityKey,
): number => {
  const r = getRace(raceId);
  if (!r) return 0;
  const rb = r.attributes[key] ?? 0;
  const vb = variantId ? getVariant(raceId, variantId)?.attributes[key] ?? 0 : 0;
  return rb + vb;
};

// ---------- Antecedentes (PDF Antecedentes e Origens) ----------

export interface Background {
  id: string;
  name: string;
  flavor: string;
  item: string;
  proficiencies: string;
  languages?: string;
  supportName: string;
  supportText: string;
}

export const BACKGROUNDS: Background[] = [
  {
    id: "boticario", name: "Boticário",
    flavor: "Trabalhou em uma botica, dominando ervas, poções e venenos.",
    item: "Kit de alquimia (frascos, funis, almofariz, ingredientes)",
    proficiencies: "Medicina, Natureza",
    languages: "Um idioma adicional à escolha",
    supportName: "Conhecimento de Poções",
    supportText: "Identifica poções (INT/Natureza CD 15). 1×/descanso longo prepara uma poção de cura menor (1d8 + INT).",
  },
  {
    id: "combatente", name: "Combatente",
    flavor: "Serviu em um exército, milícia ou como guarda-costas.",
    item: "Uma arma marcial à escolha + armadura média",
    proficiencies: "Intimidação, Atletismo",
    supportName: "Instinto de Sobrevivência",
    supportText: "Vantagem em CON contra exaustão por marchas forçadas. Reconhece regimentos por insígnias.",
  },
  {
    id: "fazendeiro", name: "Fazendeiro",
    flavor: "A vida simples do campo ensinou lições valiosas.",
    item: "Foice (1d6 cortante) + kit de agricultor",
    proficiencies: "Sobrevivência, Adestrar Animais",
    supportName: "Trabalho Duro",
    supportText: "Trabalha 10h sem cansaço (outros 8h). Identifica plantas comestíveis e clima (SAB/Sobrevivência CD 10).",
  },
  {
    id: "pirata", name: "Pirata / Corsário",
    flavor: "A vida no mar moldou seu caráter — portos, navios e rotas.",
    item: "Sabre (1d8 cortante) + kit de marinheiro (corda, anzol, bússola)",
    proficiencies: "Atletismo, Percepção",
    languages: "Um idioma portuário comum",
    supportName: "Pés de Marujo",
    supportText: "Vantagem em DES para equilíbrio em superfícies instáveis. Conhece ventos e marés da região natal.",
  },
  {
    id: "acolito", name: "Acólito",
    flavor: "Serviu em um templo, aprendendo ritos e dogmas.",
    item: "Símbolo sagrado + vestes religiosas",
    proficiencies: "Religião, Persuasão",
    languages: "Dois idiomas sagrados",
    supportName: "Rede de Templos",
    supportText: "Abrigo e comida simples em templos aliados. Reconhece símbolos e heresias (INT/Religião CD 12).",
  },
  {
    id: "ferreiro", name: "Ferreiro",
    flavor: "Forjou armas, armaduras e ferramentas — do minério à lâmina.",
    item: "Martelo de ferreiro (1d4 concussão) + avental de couro",
    proficiencies: "Investigação, uma ferramenta de artesão à escolha",
    supportName: "Olho para Qualidade",
    supportText: "Avalia armas/armaduras (INT/Investigação CD 10). Repara equipamentos metálicos durante descansos.",
  },
  {
    id: "lutador", name: "Lutador",
    flavor: "Aprendeu a lutar nas ruas, arenas ou circos.",
    item: "Bandagens de lutador (+1 Atletismo por 1h) + item de aposta vencido",
    proficiencies: "Atletismo, Intimidação",
    supportName: "Conhecer o Oponente",
    supportText: "Vantagem em SAB/Intuição para prever movimentos em CaC. Conhece arenas ilegais das grandes cidades.",
  },
  {
    id: "menestrel", name: "Menestrel",
    flavor: "Viajou contando histórias e tocando música por todo canto.",
    item: "Instrumento musical + livro de histórias",
    proficiencies: "Atuação, Persuasão",
    languages: "Dois idiomas adicionais",
    supportName: "Contador de Histórias",
    supportText: "Vantagem em CAR/Persuasão ao contar história relevante. 1 lenda útil por região (1×/sessão).",
  },
  {
    id: "artista-rua", name: "Artista de Rua",
    flavor: "Sobreviveu (e prosperou) com talento, truques e carisma.",
    item: "Kit de malabarista/máscaras + 10 moedas falsas óbvias",
    proficiencies: "Enganação, Prestidigitação",
    supportName: "Conhecer as Ruas",
    supportText: "Encontra o submundo em cidades grandes (SAB/Intuição CD 10). Vantagem em Furtividade urbana.",
  },
  {
    id: "sobrevivente", name: "Sobrevivente",
    flavor: "Um desastre marcou tudo — e você foi um dos poucos que restou.",
    item: "Kit de sobrevivência + item lembrança dos perdidos",
    proficiencies: "Sobrevivência, Intuição",
    supportName: "Instinto de Presa",
    supportText: "Vantagem em SAB/Percepção contra perigos iminentes. 1×/dia refaz resistência contra medo.",
  },
  {
    id: "escravo", name: "Escravo",
    flavor: "Foi propriedade de alguém. As marcas permanecem.",
    item: "Ferro quebrado (antiga algema) + ferramenta improvisada (1d4)",
    proficiencies: "Furtividade, Intuição",
    supportName: "Olhos Baixos, Ouvidos Atentos",
    supportText: "Vantagem em SAB/Percepção para ouvir conversas quando parece ocupado. Identifica donos e mercados negros.",
  },
  {
    id: "taverneiro", name: "Taverneiro",
    flavor: "Serviu bebidas e ouviu segredos de todos os tipos.",
    item: "Caneca de estanho sempre limpa + garrafa de licor local",
    proficiencies: "Intuição, Persuasão",
    supportName: "Ouvido de Taverna",
    supportText: "Vantagem em SAB/Intuição contra mentiras casuais. Rumores locais em tavernas (CAR/Persuasão CD 10).",
  },
  {
    id: "amnesico", name: "Amnésico",
    flavor: "Não sabe quem era antes de \"acordar\".",
    item: "Item misterioso (chave sem fechadura, carta incompleta, medalhão…)",
    proficiencies: "Duas perícias à escolha (talentos subconscientes)",
    supportName: "Vazio a Preencher",
    supportText: "Começa com um espaço vazio. Ao encontrar mentor, feito heroico ou clareza, ganha uma habilidade nova.",
  },
  {
    id: "estudioso", name: "Estudioso",
    flavor: "Anos em bibliotecas, academias ou como aprendiz de um sábio.",
    item: "Livro de notas + kit de escriba (penas, tinta, papel)",
    proficiencies: "História + uma perícia de INT à escolha",
    languages: "Três idiomas adicionais",
    supportName: "Memória Eidética",
    supportText: "Vantagem em INT para lembrar leituras. INT CD 15 para lembrar fato obscuro relevante (1×/sessão).",
  },
];

export const getBackground = (id: string) => BACKGROUNDS.find((b) => b.id === id);

// ---------- Magias (PDF Magias) ----------

export type SpellElement = "Água" | "Ar" | "Fogo" | "Terra";

export interface Spell {
  id: string;
  name: string;
  element: SpellElement | SpellElement[];
  level: number; // 0 = truque
  time: string;
  range: string;
  components: string;
  duration: string;
  text: string;
}

export const SPELLS: Spell[] = [
  // Água
  { id: "orbe-agua", name: "Orbe de Água", element: "Água", level: 0, time: "1 ação", range: "3 m", components: "S", duration: "Instantânea",
    text: "Conjura ~1 litro de água pura em um recipiente aberto à sua escolha dentro do alcance." },
  { id: "maos-secas", name: "Mãos Secas", element: "Água", level: 0, time: "1 ação", range: "Toque", components: "V, S", duration: "Instantânea",
    text: "Seca completamente uma criatura ou objeto tocado. Não afeta criaturas aquáticas." },
  { id: "jato-dagua", name: "Jato d'Água", element: "Água", level: 1, time: "1 ação", range: "9 m", components: "V, S", duration: "Instantânea",
    text: "Ataque de magia à distância. Se acertar, 1d8 de frio. +1d8 por nível de espaço acima do 1º." },
  { id: "armadura-gelo", name: "Armadura de Gelo", element: "Água", level: 1, time: "1 ação", range: "Toque", components: "V, S, M (cubo de gelo)", duration: "1 hora",
    text: "A criatura tocada ganha +2 de CA até a magia acabar." },
  { id: "nevoa-espessa", name: "Névoa Espessa", element: "Água", level: 2, time: "1 ação", range: "18 m", components: "V, S", duration: "Concentração, 1 h",
    text: "Cubo de 6 m de névoa densa fortemente obscurecida. Dispersa em 1 h ou com vento forte." },
  { id: "escudo-gelo", name: "Escudo de Gelo", element: "Água", level: 2, time: "1 reação (ao ser atingido)", range: "Pessoal", components: "V, S", duration: "1 rodada",
    text: "Ganha +4 de CA até o início do próximo turno, inclusive contra o ataque desencadeador." },
  { id: "bola-neve", name: "Bola de Neve", element: "Água", level: 3, time: "1 ação", range: "18 m", components: "V, S, M (floco de neve)", duration: "Instantânea",
    text: "Esfera de 3 m de raio. Resistência de DES ou 4d6 de frio (metade se passar). +1d6 acima do 3º." },
  { id: "muralha-gelo", name: "Muralha de Gelo", element: "Água", level: 3, time: "1 ação", range: "18 m", components: "V, S, M (quartzo)", duration: "Concentração, 10 min",
    text: "Muralha de gelo (linha 6 m, círculo 3 m ou cúpula 3 m). Empurra criaturas — DES ou 4d6 de frio e impedida." },
  { id: "controle-agua", name: "Controle da Água", element: "Água", level: 4, time: "1 ação", range: "90 m", components: "V, S, M (gota d'água)", duration: "Concentração, 10 min",
    text: "Controla toda água não-mágica em 30 m: eleva/abaixa nível, cria ondas, altera correntes, forma figuras." },
  { id: "congelar", name: "Congelar", element: "Água", level: 4, time: "1 ação", range: "18 m", components: "V, S", duration: "1 hora",
    text: "Transforma até 3 m³ de água em gelo sólido. Criatura aquática: CON ou fica restrita." },
  { id: "cone-frio", name: "Cone de Frio", element: "Água", level: 5, time: "1 ação", range: "Cone de 15 m", components: "V, S, M (cristal de gelo)", duration: "Instantânea",
    text: "CON contra o cone. Falha: 8d8 de frio; sucesso: metade. +1d8 acima do 5º." },

  // Ar
  { id: "sopro-leve", name: "Sopro Leve", element: "Ar", level: 0, time: "1 ação", range: "3 m", components: "V, S", duration: "Instantânea",
    text: "Rajada suave empurra um objeto até 1 kg por até 3 m na direção escolhida." },
  { id: "sussurro", name: "Sussurro", element: "Ar", level: 0, time: "1 ação", range: "30 m", components: "V", duration: "1 rodada",
    text: "Envia uma mensagem sussurrada só ao alvo, que pode responder no mesmo tom." },
  { id: "rajada-vento", name: "Rajada de Vento", element: "Ar", level: 1, time: "1 ação", range: "Linha de 9 m", components: "V, S", duration: "Instantânea",
    text: "Cada criatura na linha faz FOR ou é empurrada 1,5 m para longe." },
  { id: "passos-leves", name: "Passos Leves", element: "Ar", level: 1, time: "1 ação bônus", range: "Toque", components: "V", duration: "Concentração, 1 min",
    text: "Triplica a distância de salto da criatura tocada." },
  { id: "ataque-relampago", name: "Ataque de Relâmpago", element: "Ar", level: 2, time: "1 ação", range: "18 m", components: "V, S", duration: "Instantânea",
    text: "Ataque de magia à distância. Se acertar, 2d8 de eletricidade. +1d8 acima do 2º." },
  { id: "relampago", name: "Relâmpago", element: "Ar", level: 3, time: "1 ação", range: "36 m", components: "V, S, M (pele e âmbar)", duration: "Instantânea",
    text: "Ataque de magia à distância. Se acertar, 4d8 de eletricidade; salta para uma segunda criatura em 9 m." },
  { id: "voo", name: "Voo", element: "Ar", level: 3, time: "1 ação", range: "Toque", components: "V, S, M (pena)", duration: "Concentração, 10 min",
    text: "A criatura tocada voa a 18 m; se terminar o turno no ar, cai." },
  { id: "cadeia-relampagos", name: "Cadeia de Relâmpagos", element: "Ar", level: 4, time: "1 ação", range: "45 m", components: "V, S, M (âmbar e cobre)", duration: "Instantânea",
    text: "DES: 6d8 eletricidade (metade se passar); salta até 9 m causando 5d8 e depois 4d8." },
  { id: "tempestade-granizo", name: "Tempestade de Granizo", element: ["Ar", "Água"], level: 4, time: "1 ação", range: "45 m", components: "V, S, M (granizo)", duration: "Concentração, 1 min",
    text: "Cilindro de 6 m altura × 6 m raio. DES: 4d6 frio + 4d6 concussão (metade se passar). No turno lá: 2d6+2d6." },
  { id: "trovao-atordoante", name: "Trovão Atordoante", element: "Ar", level: 5, time: "1 ação", range: "36 m", components: "V, S, M (sino de bronze)", duration: "Instantânea",
    text: "CON: 8d8 de trovão + atordoado até o fim do próximo turno; sucesso metade e sem atordoar." },
  { id: "voo-grupo", name: "Voo em Grupo", element: "Ar", level: 5, time: "1 ação", range: "Toque", components: "V, S, M (penas)", duration: "1 hora",
    text: "Até 5 criaturas voam a 18 m. Cada alvo adicional por nível de espaço acima do 5º." },

  // Fogo
  { id: "chama-palma", name: "Chama na Palma", element: "Fogo", level: 0, time: "1 ação", range: "Pessoal", components: "V, S", duration: "10 min",
    text: "Chama controlada em sua mão: luz plena em 3 m e penumbra por mais 3 m." },
  { id: "aquecer-objeto", name: "Aquecer Objeto", element: "Fogo", level: 0, time: "1 ação", range: "Toque", components: "V, S", duration: "Concentração, 1 min",
    text: "Aquece objeto não-mágico até ~60°C. Serve para preparar alimentos." },
  { id: "maos-flamejantes", name: "Mãos Flamejantes", element: "Fogo", level: 1, time: "1 ação", range: "Cone de 4,5 m", components: "V, S", duration: "Instantânea",
    text: "DES: 2d6 de fogo (metade se passar). +1d6 acima do 1º." },
  { id: "bola-fogo-pequena", name: "Bola de Fogo Pequena", element: "Fogo", level: 2, time: "1 ação", range: "18 m", components: "V, S, M (guano e enxofre)", duration: "Instantânea",
    text: "Esfera de 3 m. DES: 3d6 de fogo (metade se passar)." },
  { id: "bola-fogo", name: "Bola de Fogo", element: "Fogo", level: 3, time: "1 ação", range: "45 m", components: "V, S, M (guano e enxofre)", duration: "Instantânea",
    text: "Esfera de 6 m. DES: 6d6 de fogo (metade se passar). +1d6 acima do 3º. Incendeia objetos." },
  { id: "parede-fogo", name: "Parede de Fogo", element: "Fogo", level: 3, time: "1 ação", range: "36 m", components: "V, S, M (fósforo)", duration: "Concentração, 1 min",
    text: "Muralha (18×6 m) ou anel de fogo (6 m diâm). Ao entrar/terminar turno: 4d6 de fogo." },
  { id: "imolacao", name: "Imolação", element: "Fogo", level: 4, time: "1 ação", range: "18 m", components: "V, S, M (alcatrão)", duration: "Concentração, 1 min",
    text: "DES: 8d6 de fogo e em chamas (2d6 por turno). Sucesso: metade e sem pegar fogo. +1d6 acima do 4º." },
  { id: "chuva-meteoros", name: "Chuva de Meteoros", element: "Fogo", level: 4, time: "1 ação", range: "45 m", components: "V, S, M (ferro meteórico)", duration: "Instantânea",
    text: "4 esferas de 3 m de raio. DES: 4d6 de fogo cada (metade se passar); criatura em várias é afetada 1×." },
  { id: "inferno", name: "Inferno", element: "Fogo", level: 5, time: "1 ação", range: "45 m", components: "V, S, M (enxofre e guano)", duration: "Instantânea",
    text: "Área de 12 m. DES: 10d10 de fogo (metade se passar). Ignora cobertura, incendeia objetos. +1d10 acima do 5º." },
  { id: "fenix", name: "Fênix", element: "Fogo", level: 5, time: "1 reação (ao ir a 0 PV)", range: "Pessoal", components: "V", duration: "Instantânea",
    text: "Você renasce após 1 h com metade dos PV. Cura condições e restaura membros. 1× por aventura." },

  // Terra
  { id: "mover-terra", name: "Mover Terra", element: "Terra", level: 0, time: "1 ação", range: "6 m", components: "S", duration: "Instantânea",
    text: "Molda até 30 cm³ de terra solta, areia ou argila em forma simples." },
  { id: "endurecer-barro", name: "Endurecer Barro", element: "Terra", level: 0, time: "1 ação", range: "Toque", components: "V, S", duration: "1 h",
    text: "Transforma até 30 cm³ de barro/argila molhada em pedra macia." },
  { id: "projetil-pedra", name: "Projétil de Pedra", element: "Terra", level: 1, time: "1 ação", range: "18 m", components: "V, S", duration: "Instantânea",
    text: "Ataque de magia à distância. Se acertar, 1d8 de concussão. +1d8 acima do 1º." },
  { id: "espinhos", name: "Espinhos", element: "Terra", level: 2, time: "1 ação", range: "18 m", components: "V, S, M (espinhos)", duration: "Concentração, 10 min",
    text: "Área de 6 m: terreno difícil. DES ao entrar/começar turno: 2d6 perfurante e velocidade -1/2." },
  { id: "terremoto-menor", name: "Terremoto Menor", element: "Terra", level: 3, time: "1 ação", range: "18 m", components: "V, S, M (terra abalada)", duration: "Instantânea",
    text: "Raio de 6 m. DES: 4d6 concussão e cai no chão. +1d6 acima do 3º." },
  { id: "desintegrar-pedra", name: "Desintegrar Pedra", element: "Terra", level: 4, time: "1 ação", range: "18 m", components: "V, S, M (areia)", duration: "Instantânea",
    text: "Desintegra até 3 m³ de pedra. Contra criatura de pedra: DES ou 8d8 de força (metade se passar)." },
  { id: "jardim-instantaneo", name: "Jardim Instantâneo", element: "Terra", level: 4, time: "1 hora", range: "9 m", components: "V, S, M (sementes)", duration: "Instantânea",
    text: "9 m² de terra arada produzem alimento para 20 humanoides por 1 dia. Desaparece em 24 h se não colhido." },
  { id: "terremoto", name: "Terremoto", element: "Terra", level: 5, time: "1 ação", range: "90 m", components: "V, S", duration: "Concentração, 1 min",
    text: "Tremor de grande escala em raio de 30 m: derruba criaturas, abre fissuras e danifica estruturas." },
];

export const getSpell = (id: string) => SPELLS.find((s) => s.id === id);

export const SPELL_ELEMENT_COLORS: Record<SpellElement, string> = {
  "Água": "#60a5fa",
  "Ar": "#a5b4fc",
  "Fogo": "#f97316",
  "Terra": "#84cc16",
};

// ---------- Perícias concedidas pelos Antecedentes ----------
export const BACKGROUND_SKILLS: Record<string, SkillKey[]> = {
  boticario: ["medicina", "natureza"],
  combatente: ["intimidacao", "atletismo"],
  fazendeiro: ["sobrevivencia", "adestrar"],
  pirata: ["atletismo", "percepcao"],
  acolito: ["religiao", "persuasao"],
  ferreiro: ["investigacao"],
  lutador: ["atletismo", "intimidacao"],
  menestrel: ["atuacao", "persuasao"],
  "artista-rua": ["enganacao", "prestidigitacao"],
  sobrevivente: ["sobrevivencia", "intuicao"],
  escravo: ["furtividade", "intuicao"],
  taverneiro: ["intuicao", "persuasao"],
  amnesico: [],
  estudioso: ["historia"],
};

// ---------- Classes (PDF Classes) ----------

export interface ClassAbilityDef { id: string; name: string; text: string; }
export interface ClassSubChoice {
  label: string;
  options: ClassAbilityDef[];
}
export type ClassCategory = "Magia" | "Marcial" | "Habilidade";

export interface DClass {
  id: string;
  name: string;
  altName?: string;
  category: ClassCategory;
  tagline: string;
  flavor: string;
  attrBonuses: Partial<Record<AbilityKey, number>>;
  keyAbility: AbilityKey;
  hitDie: 6 | 8 | 10 | 12;
  profs: string;
  restriction?: string;
  autoAbility: ClassAbilityDef;
  subChoice?: ClassSubChoice;
  chooseAbilities: number;
  abilities: ClassAbilityDef[];
}

const c = (id: string, name: string, text: string): ClassAbilityDef => ({ id, name, text });

export const CLASSES: DClass[] = [
  // ===== MAGIA =====
  {
    id: "mago", name: "Mago", category: "Magia",
    tagline: "Arquiteto da realidade",
    flavor: "Você não conjura magia; você a demonstra. Cada feitiço é uma equação perfeita.",
    attrBonuses: { int: 1, sab: 1 }, keyAbility: "int", hitDie: 6,
    profs: "Bastões, adagas, bestas leves. Nenhuma armadura ou escudo.",
    autoAbility: c("estudo-arcano", "Estudo Arcano",
      "Atinge o Nível 2 de Proficiência num elemento à escolha (Ar, Água, Fogo, Terra ou Cura)."),
    subChoice: {
      label: "Elemento do Estudo Arcano",
      options: [
        c("el-ar", "Ar", "Especializa em Ar."),
        c("el-agua", "Água", "Especializa em Água."),
        c("el-fogo", "Fogo", "Especializa em Fogo."),
        c("el-terra", "Terra", "Especializa em Terra."),
        c("el-cura", "Cura", "Especializa em Cura."),
      ],
    },
    chooseAbilities: 2,
    abilities: [
      c("m-foco", "Foco Elemental", "+1 em testes de habilidade e de ataque com magias do seu elemento."),
      c("m-livro", "Livro de Feitiços", "Aprende 2 truques adicionais de qualquer elemento em que tenha nível 1+."),
      c("m-resist", "Resistência Arcana", "Vantagem em resistência contra magias e efeitos mágicos."),
      c("m-estudioso", "Estudioso", "Ganha proficiência em 2 perícias entre Arcanismo, História, Investigação, Natureza ou Religião."),
      c("m-canaliz", "Canalização Rápida", "Lance um truque conhecido como ação bônus, 1×/turno (requer Livro de Feitiços)."),
      c("m-barreira", "Barreira Mágica Reativa", "Reação: +2 CA contra um ataque. Usos = mod INT (mín 1) por descanso longo."),
    ],
  },
  {
    id: "druida", name: "Guardião da Natureza", altName: "Druida", category: "Magia",
    tagline: "Voz consciente da floresta",
    flavor: "Você não controla a natureza; você a convida a cooperar.",
    attrBonuses: { sab: 2 }, keyAbility: "sab", hitDie: 8,
    profs: "Armaduras leves/médias naturais, escudos de madeira/carapaça, foices, lanças, cajados, fundas.",
    autoAbility: c("forma-selvagem", "Forma Selvagem",
      "1×/descanso longo, assume forma de besta (CR ≤ nível/3). Dura até 1h. Mantém INT/SAB/personalidade."),
    chooseAbilities: 2,
    abilities: [
      c("d-comunhao", "Comunhão com a Natureza", "Comunica-se à vontade com animais e plantas."),
      c("d-caminhar", "Caminhar na Floresta", "Não deixa rastros comuns; ignora terreno difícil vegetal."),
      c("d-verdor", "Toque do Verdor", "1×/descanso: toque cura 1d8 + SAB."),
      c("d-companheiro", "Companheiro do Coração Selvagem", "Companheiro animal fiel, age em sua iniciativa."),
      c("d-bosques", "Proteção dos Bosques", "+1 CA em terreno natural (+2 no nível 7)."),
      c("d-retaliacao", "Retaliação da Terra", "Reação (1×/desc longo): 1d6 perfurante ao agressor CaC adjacente."),
    ],
  },
  {
    id: "clerigo", name: "Servidor dos Deuses", altName: "Clérigo", category: "Magia",
    tagline: "Canal vivo do divino",
    flavor: "Sua fé é uma forja que molda milagres.",
    attrBonuses: { sab: 1, car: 1 }, keyAbility: "sab", hitDie: 8,
    profs: "Todas as armaduras e escudos. Todas as armas simples.",
    autoAbility: c("dominio-divino", "Domínio Divino", "Ganha uma habilidade única baseada no Domínio escolhido."),
    subChoice: {
      label: "Domínio Divino",
      options: [
        c("dom-vida", "Vida", "Mãos Curandeiras: rola novamente 1s nos dados de cura."),
        c("dom-morte", "Morte", "Toque do Lóculo: +1d4 necrótico contra alvos com ≤½ PV."),
        c("dom-guerra", "Guerra", "Guerreiro Abençoado: proficiência com 1 arma marcial; refaz dano 1–2."),
        c("dom-protecao", "Proteção", "Vigia Divina: reações protetoras alcançam +1 aliado."),
        c("dom-comercio", "Comércio", "Olho para Oportunidades: vantagem em avaliação/barganha."),
        c("dom-crepusculo", "Crepúsculo", "Visão do Limiar: enxerga 9m no escuro; vantagem em luz fraca."),
      ],
    },
    chooseAbilities: 2,
    abilities: [
      c("cl-simbolo", "Invocar Símbolo Sagrado", "+1 ataque e dano com magias/ataques divinos ao empunhar o símbolo."),
      c("cl-bencao", "Bênção Divina", "Aliados adjacentes ganham +1 em resistência até seu próximo turno."),
      c("cl-palavra", "Palavra de Poder", "Ação: força criatura em 18m a se afastar (CD SAB)."),
      c("cl-canalizar", "Canalizar Divindade", "1×/descanso: ativa efeito especial do Domínio."),
      c("cl-fe", "Proteção da Fé", "+1 CA enquanto exibir seu símbolo sagrado."),
      c("cl-verdade", "Verdade Inquestionável", "1×/desc longo: vantagem em Intuição contra 1 alvo por 1 min."),
    ],
  },
  {
    id: "xama", name: "Mediador Espiritual", altName: "Xamã", category: "Magia",
    tagline: "Ponte entre mundos",
    flavor: "Você não comanda espíritos; você negocia com eles.",
    attrBonuses: { sab: 1, con: 1 }, keyAbility: "sab", hitDie: 8,
    profs: "Armaduras leves, escudos de madeira/ossos, armas simples (cajados, foices, lanças, machados leves).",
    restriction: "Apenas Sioungua, Elfo ou Homem-Fera de habitat florestal/montanhoso.",
    autoAbility: c("veu", "Olhar através do Véu",
      "1×/dia após 10 min de ritual: pergunta simbólica ao Mestre sobre o futuro próximo."),
    chooseAbilities: 2,
    abilities: [
      c("x-guardiao", "Invocar Espírito Guardião", "Ritual 1 min: aliado ganha +1 CA e vantagem contra medo por 1h."),
      c("x-terra", "Sabedoria da Terra", "1×/desc longo: unguento cura 2d8 + SAB."),
      c("x-ancestrais", "Sabedoria dos que se Foram", "Vantagem em História de tradições naturais + 1 pista por descanso curto."),
      c("x-corrupcao", "Expulsar a Corrupção", "Ritual 10 min: remove envenenado/doente (magias fortes exigem teste)."),
      c("x-antigos", "Bênção dos Antigos", "Ação bônus: 3 aliados ganham vantagem contra medo por 1 min."),
      c("x-fluxo", "Sentir o Fluxo Espiritual", "Detecta criaturas etéreas/fantasmas em 18m; vantagem em Percepção mágica."),
    ],
  },
  {
    id: "necromante", name: "Arcano da Morte", altName: "Necromante", category: "Magia",
    tagline: "Herege do ciclo natural",
    flavor: "Você espiona os domínios divinos e rouba seus segredos.",
    attrBonuses: { int: 1, con: 1 }, keyAbility: "int", hitDie: 6,
    profs: "Adagas, foices, bestas leves. Nenhuma armadura ou escudo.",
    restriction: "Não pode ser Devoto dos domínios de Vida ou Morte.",
    autoAbility: c("toque-ruina", "Toque da Ruína",
      "Ataque desarmado: 1d8 + INT necrótico. Recupera metade do dano em PV."),
    chooseAbilities: 2,
    abilities: [
      c("n-carnical", "Invocar Servo Carniçal", "Ritual 1 min: cria servo esquelético. Até nível/2 servos simultâneos por 1h."),
      c("n-sifao", "Sifão Vital", "Recupera 25% do dano necrótico causado em PV."),
      c("n-tumba", "Constituição da Tumba", "Vantagem contra doenças/venenos; resistência a dano de veneno."),
      c("n-visao", "Visão do Lóculo", "Visão no escuro 18m; vê em cinza/azul/preto no escuro total."),
      c("n-pavor", "Pavor Inato", "Inimigos que vêm seus servos têm desvantagem em ataques contra eles."),
      c("n-aura", "Aura de Decomposição", "Ação bônus: aura 1,5m causa 1 necrótico/turno. Usos = mod INT por desc longo."),
    ],
  },
  // ===== MARCIAIS =====
  {
    id: "guerreiro", name: "Guerreiro", category: "Marcial",
    tagline: "Artesão do conflito",
    flavor: "A eloquência inquestionável do aço.",
    attrBonuses: { for: 1, con: 1 }, keyAbility: "for", hitDie: 10,
    profs: "Todas as armaduras, todos os escudos, todas as armas.",
    autoAbility: c("estilo-comb", "Estilo de Combate", "Ganha um estilo de luta que molda cada movimento."),
    subChoice: {
      label: "Estilo de Combate",
      options: [
        c("gs-duas", "Duas Armas", "Modificador de habilidade no dano do ataque bônus com armas leves."),
        c("gs-defesa", "Defesa", "+1 CA usando armadura."),
        c("gs-duelista", "Duelista", "+2 dano com arma CaC de uma mão (escudo permitido)."),
        c("gs-haste", "Armas de Haste", "Reação: ataque de oportunidade quando inimigo entra no alcance."),
      ],
    },
    chooseAbilities: 2,
    abilities: [
      c("g-furia", "Fúria do Guerreiro", "Ataque duplo (requer Duas Armas)."),
      c("g-esmagador", "Golpe Esmagador", "+2 dano em ataques CaC com armas."),
      c("g-couraca", "Couraça Natural", "+1 CA natural, cumulativo."),
      c("g-incentivo", "Incentivo Marcial", "Ação bônus: aliados a 9m ganham +1 ataque até seu próximo turno."),
      c("g-indomavel", "Resistência Indomável", "1×/descanso: refaz teste de resistência falho."),
      c("g-mestre", "Mestre de Armas", "Proficiência com todas armas; ignora 'pesada'; duas mãos com uma se FOR ≥ 18."),
    ],
  },
  {
    id: "espadachim", name: "Espadachim", category: "Marcial",
    tagline: "Artista da lâmina",
    flavor: "Sua lâmina é sua pena; cada combate, uma assinatura.",
    attrBonuses: { des: 2 }, keyAbility: "des", hitDie: 8,
    profs: "Armaduras leves/médias, todas as armas de uma mão e armas leves.",
    autoAbility: c("esgrima", "Esgrima Superior",
      "Adiciona mod. DES ao dano de ataques com armas de uma mão (além de FOR se aplicável)."),
    chooseAbilities: 2,
    abilities: [
      c("e-esquiva", "Esquiva Reflexiva", "Reação: +2 CA; se errar por ≥5, contra-ataque imediato."),
      c("e-fluir", "Fluir da Lâmina", "Ação bônus: ataque adicional com arma leve na outra mão."),
      c("e-abertura", "Aproveitar a Abertura", "Reação: ataque de oportunidade quando inimigo erra CaC contra você."),
      c("e-instinto", "Instinto de Duelista", "+2 iniciativa; não pode ser surpreendido enquanto consciente."),
      c("e-finta", "Finta Engenhosa", "Ação: Enganação vs Intuição; próximo ataque com vantagem se passar."),
      c("e-danca", "Passo de Dança", "Movimento não provoca oportunidade; Desengajar como ação bônus."),
    ],
  },
  {
    id: "paladino", name: "Paladino", category: "Marcial",
    tagline: "Espada erguida da fé",
    flavor: "Um juramento que o próprio universo parece endossar.",
    attrBonuses: { for: 1, car: 1 }, keyAbility: "car", hitDie: 10,
    profs: "Todas as armaduras, todos os escudos, todas as armas.",
    autoAbility: c("juramento", "Juramento Sagrado", "Ganha habilidade única baseada no Juramento."),
    subChoice: {
      label: "Juramento Sagrado",
      options: [
        c("jur-vinganca", "Vingança", "Caçador dos Iníquos: vantagem em rastrear/discernir Inimigo Jurado."),
        c("jur-protecao", "Proteção", "Sentinelas Unidos: move-se ½ deslocamento com ataques de oportunidade."),
        c("jur-justica", "Justiça", "Olho da Justiça: vantagem contra ilusões/encantamento; detecta mentiras flagrantes."),
      ],
    },
    chooseAbilities: 2,
    abilities: [
      c("p-golpe", "Golpe Divino", "Gasta 1 mana para adicionar 1d8 radiante (2d8 nv 6; 3d8 nv 10)."),
      c("p-cura", "Cura pelas Mãos", "Reservatório de PV = 5×nível para curar/aliviar veneno/doença por toque."),
      c("p-aura", "Aura de Coragem", "Aliados a 3m ganham +1 em resistência (+2/6m no nível 10)."),
      c("p-corrup", "Sentir a Corrupção", "Ação: detecta criaturas malignas em 18m; vantagem em Intuição por 1 min."),
      c("p-olhar", "Olhar Intimidador", "Ação: criatura em 9m fica amedrontada em falha SAB."),
      c("p-escudo", "Escudo da Fé", "Reação (com escudo): impõe desvantagem em ataque contra aliado a 1,5m."),
    ],
  },
  {
    id: "patrulheiro", name: "Patrulheiro", category: "Marcial",
    tagline: "Flecha no escuro",
    flavor: "Elimina ameaças antes que alcancem os portões da cidade.",
    attrBonuses: { des: 1, sab: 1 }, keyAbility: "sab", hitDie: 10,
    profs: "Armaduras leves/médias, escudos, todas as armas simples e marciais.",
    autoAbility: c("inimigo-fav", "Inimigo Favorecido",
      "Vantagem para rastrear/lembrar fraquezas; +2 dano contra o tipo escolhido."),
    subChoice: {
      label: "Tipo de Inimigo Favorecido",
      options: [
        c("if-ab", "Aberrações", "—"),
        c("if-bestas", "Bestas", "—"),
        c("if-drag", "Dragões", "—"),
        c("if-elem", "Elementais", "—"),
        c("if-fadas", "Fadas", "—"),
        c("if-gig", "Gigantes", "—"),
        c("if-mon", "Monstruosidades", "—"),
        c("if-mv", "Mortos-Vivos", "—"),
      ],
    },
    chooseAbilities: 2,
    abilities: [
      c("pt-arqueiro", "Estilo de Arqueiro", "+1 ataque à distância; ignora desvantagem em CaC."),
      c("pt-rast", "Rastreador Incansável", "Vantagem para rastrear; ritmo forçado sem penalidade de percepção."),
      c("pt-embosc", "Emboscada", "1º ataque no 1º turno com vantagem se agir antes de 1+ inimigo."),
      c("pt-comp", "Companheiro de Caça", "Companheiro animal treinado que age em sua iniciativa."),
      c("pt-camu", "Camuflagem Natural", "Vantagem em Furtividade em terreno natural."),
      c("pt-tiro", "Tiro Certeiro", "Ignora cobertura parcial; +50% alcance à distância."),
    ],
  },
  {
    id: "guardiao", name: "Guardião", category: "Marcial",
    tagline: "A rocha inabalável",
    flavor: "Sua maior vitória é ver o dia terminar com todos vivos.",
    attrBonuses: { con: 2 }, keyAbility: "con", hitDie: 12,
    profs: "Todas as armaduras, todos os escudos, todas as armas simples e marciais.",
    autoAbility: c("interposicao", "Interposição",
      "Reação (1×/desc longo): redireciona ataque contra aliado a 1,5m para você."),
    chooseAbilities: 2,
    abilities: [
      c("gd-escudo", "Mestre do Escudo", "+2 CA com escudo (cumulativo ao bônus normal)."),
      c("gd-enraizado", "Enraizado", "Vantagem contra derrubar/empurrar/puxar/teletransportar."),
      c("gd-desafio", "Desafio do Protetor", "Ação bônus: 3 inimigos em 9m têm desvantagem contra outros alvos."),
      c("gd-baluarte", "Baluarte Vivo", "Aliados atrás de você têm cobertura parcial (¾ no nv 10)."),
      c("gd-ferrea", "Determinação Férrea", "Abaixo de ½ PV, regenera 1 PV/turno."),
      c("gd-marcacao", "Marcação Inescapável", "Ação: alvo em 9m não pode se afastar (SAB nega)."),
    ],
  },
  // ===== HABILIDADE =====
  {
    id: "ladino", name: "Ladino", category: "Habilidade",
    tagline: "Sombra que vê tudo",
    flavor: "Sua arma nunca é a que você empunha, mas a que ninguém vê chegar.",
    attrBonuses: { des: 2 }, keyAbility: "des", hitDie: 8,
    profs: "Armaduras leves, armas simples, bestas de mão, espadas curtas, rapieiras e adagas.",
    autoAbility: c("furtivo", "Ataque Furtivo",
      "1×/turno: +2d6 (3d6 nv 7; 4d6 nv 10) ao acertar com arma perfurante/cortante em vantagem tática."),
    chooseAbilities: 2,
    abilities: [
      c("l-maos", "Mãos Ligeiras", "Vantagem em Prestidigitação e Furtividade."),
      c("l-especialista", "Especialista", "Perícia com proficiência dobrada (2ª no nv 5)."),
      c("l-esquiva", "Esquiva Ágil", "Reação: reduz dano de um ataque pela metade."),
      c("l-calculista", "Movimento Calculista", "Desengajar/Esconder como ação bônus."),
      c("l-instinto", "Instinto de Sobrevivência", "Não é surpreendido; vantagem em iniciativa."),
      c("l-arcano", "Intuição para o Arcano", "Usa itens mágicos ignorando restrições (teste INT/DES)."),
    ],
  },
  {
    id: "bardo", name: "Bardo", category: "Habilidade",
    tagline: "Tecelão de realidades",
    flavor: "Sua arte é uma arma, um escudo, uma chave e uma ponte.",
    attrBonuses: { car: 2 }, keyAbility: "car", hitDie: 8,
    profs: "Armaduras leves, armas simples, 3 instrumentos musicais à escolha.",
    autoAbility: c("inspiracao", "Inspiração Bárdica",
      "3 dados d6. Ação bônus: presenteia aliado; usa em 10 min para +teste. Recupera em desc longo."),
    chooseAbilities: 2,
    abilities: [
      c("b-melodia", "Melodia Restauradora", "Após desc curto com performance: cada aliado recupera +1d6 PV."),
      c("b-hula", "Performance Cativante", "Ação: alvos em 18m fazem SAB ou ficam fascinados (1 min)."),
      c("b-canco", "Sabedoria das Mil Canções", "Proficiência em Arcanismo, História, Natureza e Religião."),
      c("b-seda", "Palavras como Seda", "Vantagem em Enganação e Persuasão."),
      c("b-batalha", "Música de Batalha", "Ação bônus + concentração: aliados a 9m ganham +1 ataque por 1 min."),
      c("b-talentos", "Dom de Muitos Talentos", "Perícia + ferramenta/instrumento adicional. Instrumentos como foco mágico."),
    ],
  },
  {
    id: "bucaneiro", name: "Bucaneiro", category: "Habilidade",
    tagline: "Sopro do vento nas velas",
    flavor: "Seu domínio é a linha do horizonte — e tudo além dela.",
    attrBonuses: { des: 1, car: 1 }, keyAbility: "car", hitDie: 8,
    profs: "Armaduras leves, todas as armas marciais, armas de fogo, alabardas e redes.",
    autoAbility: c("pistoleiro", "Estilo do Pistoleiro",
      "Ação bônus: atirar com pistola após ataque com arma de uma mão. Ignora recarga de pólvora leve em combate."),
    chooseAbilities: 2,
    abilities: [
      c("bu-cordame", "Mestre do Cordame", "Escalada = deslocamento (12m); vantagem em Atletismo/Acrobacia em navios."),
      c("bu-gato", "Golpe do Gato-do-Mar", "Move ≥ 1,5m antes do ataque: adiciona DES ao dano."),
      c("bu-marinheiro", "Salmos do Marinheiro", "Vantagem em História marítima e Sobrevivência no mar."),
      c("bu-vento", "Lâmina do Vento", "Usa DES em vez de FOR com sabres, espadas curtas e rapieiras."),
      c("bu-porto", "Lábia do Porto", "Vantagem em Enganação/Intimidação/Persuasão em contexto portuário."),
      c("bu-mira", "Mira de Longo Alcance", "Sem desvantagem em alcance longo com pólvora; +50% alcance."),
    ],
  },
  {
    id: "nobre", name: "Nobre", category: "Habilidade",
    tagline: "Voz que unifica",
    flavor: "Sua mera presença firma vontades e molda destinos.",
    attrBonuses: { car: 2 }, keyAbility: "car", hitDie: 8,
    profs: "Armaduras leves, todas as armas simples, 1 arma marcial à escolha.",
    autoAbility: c("comandante", "Presença Comandante",
      "Aura passiva: aliados amigáveis a 9m ganham +1 em testes de resistência."),
    chooseAbilities: 2,
    abilities: [
      c("nb-bolsa", "Bolsa Abastada", "Começa com 800 mo em vez de 400; acesso a crédito em cidades."),
      c("nb-rede", "Rede de Contatos", "Vantagem em Persuasão para audiências/burocracia; em casa: Intimidação/Enganação social."),
      c("nb-tatica", "Tática de Campo", "Ação bônus: aliado ganha vantagem no próximo ataque contra alvo em 18m."),
      c("nb-corte", "Maneiras Cortesãs", "Proficiência em Etiqueta; expertise em História (Nobreza)."),
      c("nb-corte-p", "Corte Pessoal", "1d4 servos/assistentes leais para tarefas simples."),
      c("nb-discurso", "Discurso Inspirador", "1×/desc longo: 3 aliados recuperam 1d8 + CAR de PV."),
    ],
  },
  {
    id: "mosqueteiro", name: "Mosqueteiro", altName: "Atirador de Shouthmallow", category: "Habilidade",
    tagline: "Estouro do progresso",
    flavor: "Seu domínio é medido em jardas de alcance e em segundos para recarregar.",
    attrBonuses: { des: 2 }, keyAbility: "des", hitDie: 8,
    profs: "Armaduras leves, todas armas simples, todas armas de pólvora (pistolas, mosquetes, bacamartes).",
    autoAbility: c("recarga", "Recarga Veloz",
      "Recarrega arma de pólvora com propriedade 'recarga' usando ação bônus."),
    chooseAbilities: 2,
    abilities: [
      c("mo-estab", "Estabilidade de Mestre", "+1 ataque com pólvora; ignora desvantagem em alcance longo."),
      c("mo-debil", "Tiro Debilitante", "CON (CD 8+DES+prof) ou velocidade -½ até seu próximo turno."),
      c("mo-engen", "Engenhoca", "Prepara munições especiais (incendiária, perfurante, alarme). Usos = prof."),
      c("mo-duel", "Esquiva de Duelista", "+1 CA com uma arma na mão e sem escudo."),
      c("mo-duplo", "Tiro Duplo", "Ação: dispara duas armas de pólvora leves em ataques separados."),
      c("mo-tec", "Conhecimento Tecnológico", "Reconhece assinaturas de armeiros de Shouthmallow e mecanismos."),
    ],
  },
];

export const getClass = (id: string) => CLASSES.find((cl) => cl.id === id);

