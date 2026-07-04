export type SystemId = "dnd5e" | "autoral" | "quebra-do-tempo" | "dreowacis";

export interface SystemTheme {
  /** Primary hover color (border / glow) */
  primary: string;
  /** Secondary hover color (accent / inner bg) */
  secondary: string;
  /** Text color for hover state */
  text: string;
  /** Subtle background gradient for pages using this system */
  pageBg: string;
}

export interface SystemInfo {
  id: SystemId;
  name: string;
  tagline: string;
  description: string;
  status: "available" | "coming-soon";
  sigil: string;
  theme: SystemTheme;
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
    theme: {
      primary: "#b91c1c",
      secondary: "#e8c877",
      text: "#f5e6b8",
      pageBg:
        "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(185,28,28,0.32), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(232,200,119,0.18), transparent 60%), radial-gradient(ellipse at top, rgb(38,18,10) 0%, rgb(18,10,6) 70%)",
    },
  },
  {
    id: "autoral",
    name: "Frostbit",
    tagline: "Gelo, silêncio e ossos partidos — autoral",
    description:
      "Sistema autoral de sobrevivência gélida. Onde cada respiração custa calor e cada segredo custa sangue.",
    status: "coming-soon",
    sigil: "❄",
    theme: {
      primary: "#38bdf8",
      secondary: "#0b1220",
      text: "#e0f2fe",
      pageBg:
        "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,189,248,0.30), transparent 60%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(14,165,233,0.18), transparent 60%), radial-gradient(ellipse at top, rgb(8,14,26) 0%, rgb(3,6,12) 70%)",
    },
  },
  {
    id: "quebra-do-tempo",
    name: "Despertar da Escuridão",
    tagline: "Cronomancia e paradoxo — autoral",
    description:
      "Quando o tempo se quebra, heróis caminham entre eras. Sistema autoral de aventura temporal.",
    status: "coming-soon",
    sigil: "⧖",
    theme: {
      primary: "#7c3aed",
      secondary: "#0a0a0a",
      text: "#ede9fe",
      pageBg:
        "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.32), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(88,28,135,0.22), transparent 60%), radial-gradient(ellipse at top, rgb(14,8,24) 0%, rgb(5,3,10) 70%)",
    },
  },
  {
    id: "dreowacis",
    name: "Dreowacis",
    tagline: "Continente dos deuses e reinos — autoral",
    description:
      "Sistema d20 autoral com mana unificada, cinco reinos em disputa e um panteão que interfere no destino.",
    status: "available",
    sigil: "☾",
    theme: {
      primary: "#e11d48",
      secondary: "#7c3aed",
      text: "#fce7f3",
      pageBg:
        "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(225,29,72,0.28), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(124,58,237,0.28), transparent 60%), radial-gradient(ellipse at top, rgb(24,8,20) 0%, rgb(10,4,14) 70%)",
    },
  },
];

export const getSystem = (id: string) =>
  SYSTEMS.find((s) => s.id === id) ?? SYSTEMS[0];
