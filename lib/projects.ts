export type WorkProject = {
  number: string;
  client: string;
  year: string;
  title: string;
  tag: string;
  description: string;
  videoSrc: string;
  aspectRatio: "video" | "square";
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    number: "01",
    client: "VK STUDIO",
    year: "2026",
    title: "VSL VK Studio",
    tag: "VIDEO SALES LETTER",
    description:
      "Vidéo de vente pensée pour convertir. Rythme structuré, narration progressive, validée par l'équipe VK Studio.",
    videoSrc: "/vsl-vk-studio.mp4",
    aspectRatio: "video",
  },
  {
    number: "02",
    client: "OIIKOS",
    year: "2026",
    title: "Oiikos",
    tag: "MOTION DESIGN",
    description:
      "Un reel motion design pour Oiikos, une Délégation de service publique. Rythme, énergie et identité de marque.",
    videoSrc: "/oiikos-v1_1.mp4",
    aspectRatio: "video",
  },
  {
    number: "03",
    client: "PERSONAL PROJECT",
    year: "2026",
    title: "Mosaïque",
    tag: "MOTION DESIGN — SHOWREEL",
    description:
      "Neuf animations synchronisées dans une grille unique. Exercice de style sur la diversité des langages graphiques en mouvement.",
    videoSrc: "/showreel.mp4",
    aspectRatio: "square",
  },
];
