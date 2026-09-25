import type { LangueSite } from "@/lib/langue-site";

/**
 * Textes du site traduits (vitrine téléphone, barre du haut, page 404).
 * Noms des modes repris de l'app (mêmes mots que dans le jeu).
 */
type Textes = {
  barre: { portfolio: string; portfolioCourt: string; mentions: string; mentionsCourt: string };
  vitrine: {
    logoAlt: string;
    accroche: string;
    sousAccroche: string;
    enImages: string;
    capturesAria: string;
    capture: (legende: string) => string;
    lesModes: string;
    soutenirTexte: string;
    soutenir: string;
    bientotDispo: string;
    demoSurOrdi: string;
    bientotPlay: string;
    telechargerPlay: string;
    pasEncoreIos: string;
    androidDabord: string;
    suivre: string;
    pourSavoir: string;
    jouerSurOrdi: string;
    copierLien: string;
    lienCopie: string;
    lienManuel: string;
    agrandir: string;
  };
  captures: Record<"defi" | "clm" | "mosaique" | "carte" | "revision", string>;
  modes: { id: string; nom: string; description: string }[];
  introuvable: {
    titreOnglet: string;
    titre: string;
    texte: string;
    jouer: string;
    portfolio: string;
  };
};

export const TEXTES_SITE: Record<LangueSite, Textes> = {
  fr: {
    barre: { portfolio: "Portfolio monteur", portfolioCourt: "Portfolio", mentions: "Mentions légales", mentionsCourt: "Légal" },
    vitrine: {
      logoAlt: "Logo Vexi World",
      accroche: "Reconnais les 197 drapeaux du monde.",
      sousAccroche: "Un nouveau défi chaque jour.",
      enImages: "En images",
      capturesAria: "Captures de l'application",
      capture: (l) => `Vexi World : ${l}`,
      lesModes: "Les modes",
      soutenirTexte: "Vexi World est créé par une seule personne. Tu peux aider le projet à grandir.",
      soutenir: "♥ Soutenir Vexi",
      bientotDispo: "Bientôt disponible",
      demoSurOrdi: "Sur ordi, une démo jouable t'attend sur jonathanjegard.com.",
      bientotPlay: "Bientôt sur Google Play",
      telechargerPlay: "Télécharger sur Google Play",
      pasEncoreIos: "Pas encore sur iPhone et iPad",
      androidDabord: "Vexi World sort d'abord sur Android.",
      suivre: "Suis @vexi_world",
      pourSavoir: "pour savoir quand ça arrive",
      jouerSurOrdi: "Joue à la démo sur ton ordi",
      copierLien: "Copier le lien",
      lienCopie: "Lien copié, ouvre-le sur ton ordi",
      lienManuel: "Sur ton ordi, va sur jonathanjegard.com",
      agrandir: "Agrandis la fenêtre pour jouer à la démo.",
    },
    captures: {
      defi: "Défi du jour",
      clm: "Contre-la-montre",
      mosaique: "Mosaïque",
      carte: "La carte",
      revision: "Révision",
    },
    modes: [
      { id: "defi", nom: "Défi du jour", description: "Un nouveau défi chaque jour, et ta flamme qui grandit." },
      { id: "classique", nom: "Classique", description: "Choisis la difficulté et les continents, et trouve les drapeaux." },
      { id: "clm", nom: "Contre-la-montre", description: "Choisis ton chrono, réponds vite avant la fin du compte à rebours." },
      { id: "marathon", nom: "Marathon", description: "197 pays d'affilée. Une nouvelle saison chaque mois." },
      { id: "memoire", nom: "Mémoire", description: "Cite les pays de tête, ou retiens la suite." },
      { id: "mosaique", nom: "Mosaïque", description: "2 à 4 fragments de drapeaux à reconnaître." },
      { id: "revision", nom: "Révision", description: "Les 197 drapeaux et leur histoire, pour apprendre à ton rythme." },
    ],
    introuvable: {
      titreOnglet: "Page introuvable · Vexi World",
      titre: "Ce drapeau n'existe pas",
      texte: "La page que tu cherches est introuvable. Elle a peut-être changé d'adresse, ou le lien est incomplet.",
      jouer: "Jouer à Vexi World",
      portfolio: "Voir le portfolio monteur",
    },
  },
  en: {
    barre: { portfolio: "Video portfolio", portfolioCourt: "Portfolio", mentions: "Legal notice", mentionsCourt: "Legal" },
    vitrine: {
      logoAlt: "Vexi World logo",
      accroche: "Learn all 197 flags of the world.",
      sousAccroche: "A new challenge every day.",
      enImages: "Screenshots",
      capturesAria: "App screenshots",
      capture: (l) => `Vexi World: ${l}`,
      lesModes: "Game modes",
      soutenirTexte: "Vexi World is made by one person. You can help the project grow.",
      soutenir: "♥ Support Vexi",
      bientotDispo: "Coming soon",
      demoSurOrdi: "On a computer, a playable demo is waiting for you at jonathanjegard.com.",
      bientotPlay: "Coming soon to Google Play",
      telechargerPlay: "Get it on Google Play",
      pasEncoreIos: "Not on iPhone and iPad yet",
      androidDabord: "Vexi World is launching on Android first.",
      suivre: "Follow @vexi_world",
      pourSavoir: "to know when it arrives",
      jouerSurOrdi: "Play the demo on your computer",
      copierLien: "Copy the link",
      lienCopie: "Link copied, open it on your computer",
      lienManuel: "On your computer, go to jonathanjegard.com",
      agrandir: "Make the window wider to play the demo.",
    },
    captures: {
      defi: "Daily Challenge",
      clm: "Time Trial",
      mosaique: "Mosaic",
      carte: "The map",
      revision: "Review",
    },
    modes: [
      { id: "defi", nom: "Daily Challenge", description: "A new challenge every day, and a flame that keeps growing." },
      { id: "classique", nom: "Classic", description: "Pick the difficulty and continents, and find the flags." },
      { id: "clm", nom: "Time Trial", description: "Set your timer and answer fast before the countdown ends." },
      { id: "marathon", nom: "Marathon", description: "197 countries in a row. A new season every month." },
      { id: "memoire", nom: "Memory", description: "Name the countries from memory, or remember the sequence." },
      { id: "mosaique", nom: "Mosaic", description: "2 to 4 flag fragments to recognise." },
      { id: "revision", nom: "Review", description: "All 197 flags and their stories, to learn at your own pace." },
    ],
    introuvable: {
      titreOnglet: "Page not found · Vexi World",
      titre: "This flag doesn't exist",
      texte: "The page you're looking for can't be found. It may have moved, or the link is incomplete.",
      jouer: "Play Vexi World",
      portfolio: "See the video portfolio",
    },
  },
  es: {
    barre: { portfolio: "Portafolio de vídeo", portfolioCourt: "Portafolio", mentions: "Aviso legal", mentionsCourt: "Legal" },
    vitrine: {
      logoAlt: "Logo de Vexi World",
      accroche: "Reconoce las 197 banderas del mundo.",
      sousAccroche: "Un reto nuevo cada día.",
      enImages: "En imágenes",
      capturesAria: "Capturas de la aplicación",
      capture: (l) => `Vexi World: ${l}`,
      lesModes: "Los modos",
      soutenirTexte: "Vexi World lo crea una sola persona. Puedes ayudar a que el proyecto crezca.",
      soutenir: "♥ Apoya a Vexi",
      bientotDispo: "Muy pronto",
      demoSurOrdi: "En el ordenador, te espera una demo jugable en jonathanjegard.com.",
      bientotPlay: "Muy pronto en Google Play",
      telechargerPlay: "Descargar en Google Play",
      pasEncoreIos: "Aún no está en iPhone ni iPad",
      androidDabord: "Vexi World sale primero en Android.",
      suivre: "Sigue a @vexi_world",
      pourSavoir: "para saber cuándo llega",
      jouerSurOrdi: "Juega a la demo en tu ordenador",
      copierLien: "Copiar el enlace",
      lienCopie: "Enlace copiado, ábrelo en tu ordenador",
      lienManuel: "En tu ordenador, ve a jonathanjegard.com",
      agrandir: "Agranda la ventana para jugar a la demo.",
    },
    captures: {
      defi: "Reto Diario",
      clm: "Contrarreloj",
      mosaique: "Mosaico",
      carte: "El mapa",
      revision: "Repaso",
    },
    modes: [
      { id: "defi", nom: "Reto Diario", description: "Un reto nuevo cada día, y tu llama que crece." },
      { id: "classique", nom: "Clásico", description: "Elige la dificultad y los continentes, y encuentra las banderas." },
      { id: "clm", nom: "Contrarreloj", description: "Elige tu tiempo y responde rápido antes de que acabe la cuenta atrás." },
      { id: "marathon", nom: "Maratón", description: "197 países seguidos. Una temporada nueva cada mes." },
      { id: "memoire", nom: "Memoria", description: "Di los países de memoria, o recuerda la secuencia." },
      { id: "mosaique", nom: "Mosaico", description: "De 2 a 4 fragmentos de banderas para reconocer." },
      { id: "revision", nom: "Repaso", description: "Las 197 banderas y su historia, para aprender a tu ritmo." },
    ],
    introuvable: {
      titreOnglet: "Página no encontrada · Vexi World",
      titre: "Esta bandera no existe",
      texte: "No encontramos la página que buscas. Puede que haya cambiado de dirección, o que el enlace esté incompleto.",
      jouer: "Jugar a Vexi World",
      portfolio: "Ver el portafolio de vídeo",
    },
  },
  de: {
    barre: { portfolio: "Video-Portfolio", portfolioCourt: "Portfolio", mentions: "Impressum", mentionsCourt: "Impressum" },
    vitrine: {
      logoAlt: "Vexi World Logo",
      accroche: "Erkenne alle 197 Flaggen der Welt.",
      sousAccroche: "Jeden Tag eine neue Herausforderung.",
      enImages: "In Bildern",
      capturesAria: "Screenshots der App",
      capture: (l) => `Vexi World: ${l}`,
      lesModes: "Die Modi",
      soutenirTexte: "Vexi World wird von einer einzigen Person entwickelt. Du kannst helfen, das Projekt wachsen zu lassen.",
      soutenir: "♥ Vexi unterstützen",
      bientotDispo: "Bald verfügbar",
      demoSurOrdi: "Am Computer wartet eine spielbare Demo auf jonathanjegard.com.",
      bientotPlay: "Bald bei Google Play",
      telechargerPlay: "Bei Google Play herunterladen",
      pasEncoreIos: "Noch nicht für iPhone und iPad",
      androidDabord: "Vexi World erscheint zuerst für Android.",
      suivre: "Folge @vexi_world",
      pourSavoir: "um zu erfahren, wann es kommt",
      jouerSurOrdi: "Spiel die Demo am Computer",
      copierLien: "Link kopieren",
      lienCopie: "Link kopiert, öffne ihn am Computer",
      lienManuel: "Geh am Computer auf jonathanjegard.com",
      agrandir: "Mach das Fenster breiter, um die Demo zu spielen.",
    },
    captures: {
      defi: "Tägliche Herausforderung",
      clm: "Zeitrennen",
      mosaique: "Mosaik",
      carte: "Die Karte",
      revision: "Üben",
    },
    modes: [
      { id: "defi", nom: "Tägliche Herausforderung", description: "Jeden Tag eine neue Herausforderung, und deine Flamme wächst." },
      { id: "classique", nom: "Klassisch", description: "Wähle Schwierigkeit und Kontinente und finde die Flaggen." },
      { id: "clm", nom: "Zeitrennen", description: "Wähle deine Zeit und antworte schnell, bevor der Countdown abläuft." },
      { id: "marathon", nom: "Marathon", description: "197 Länder am Stück. Jeden Monat eine neue Saison." },
      { id: "memoire", nom: "Gedächtnis", description: "Nenne die Länder aus dem Kopf, oder merk dir die Reihenfolge." },
      { id: "mosaique", nom: "Mosaik", description: "2 bis 4 Flaggenteile zum Erkennen." },
      { id: "revision", nom: "Üben", description: "Alle 197 Flaggen und ihre Geschichte, zum Lernen in deinem Tempo." },
    ],
    introuvable: {
      titreOnglet: "Seite nicht gefunden · Vexi World",
      titre: "Diese Flagge gibt es nicht",
      texte: "Die gesuchte Seite wurde nicht gefunden. Vielleicht hat sich die Adresse geändert, oder der Link ist unvollständig.",
      jouer: "Vexi World spielen",
      portfolio: "Zum Video-Portfolio",
    },
  },
  it: {
    barre: { portfolio: "Portfolio video", portfolioCourt: "Portfolio", mentions: "Note legali", mentionsCourt: "Legale" },
    vitrine: {
      logoAlt: "Logo di Vexi World",
      accroche: "Riconosci le 197 bandiere del mondo.",
      sousAccroche: "Una nuova sfida ogni giorno.",
      enImages: "In immagini",
      capturesAria: "Schermate dell'app",
      capture: (l) => `Vexi World: ${l}`,
      lesModes: "Le modalità",
      soutenirTexte: "Vexi World è creato da una sola persona. Puoi aiutare il progetto a crescere.",
      soutenir: "♥ Sostieni Vexi",
      bientotDispo: "Presto disponibile",
      demoSurOrdi: "Sul computer ti aspetta una demo giocabile su jonathanjegard.com.",
      bientotPlay: "Presto su Google Play",
      telechargerPlay: "Scarica su Google Play",
      pasEncoreIos: "Non ancora su iPhone e iPad",
      androidDabord: "Vexi World esce prima su Android.",
      suivre: "Segui @vexi_world",
      pourSavoir: "per sapere quando arriva",
      jouerSurOrdi: "Gioca alla demo sul computer",
      copierLien: "Copia il link",
      lienCopie: "Link copiato, aprilo sul computer",
      lienManuel: "Sul computer, vai su jonathanjegard.com",
      agrandir: "Allarga la finestra per giocare alla demo.",
    },
    captures: {
      defi: "Sfida Quotidiana",
      clm: "Contro il tempo",
      mosaique: "Mosaico",
      carte: "La mappa",
      revision: "Ripasso",
    },
    modes: [
      { id: "defi", nom: "Sfida Quotidiana", description: "Una nuova sfida ogni giorno, e la tua fiamma che cresce." },
      { id: "classique", nom: "Classica", description: "Scegli la difficoltà e i continenti, e trova le bandiere." },
      { id: "clm", nom: "Contro il tempo", description: "Scegli il tuo tempo e rispondi in fretta prima della fine del conto alla rovescia." },
      { id: "marathon", nom: "Maratona", description: "197 paesi di fila. Una nuova stagione ogni mese." },
      { id: "memoire", nom: "Memoria", description: "Cita i paesi a memoria, o ricorda la sequenza." },
      { id: "mosaique", nom: "Mosaico", description: "Da 2 a 4 frammenti di bandiere da riconoscere." },
      { id: "revision", nom: "Ripasso", description: "Le 197 bandiere e la loro storia, per imparare con calma." },
    ],
    introuvable: {
      titreOnglet: "Pagina non trovata · Vexi World",
      titre: "Questa bandiera non esiste",
      texte: "La pagina che cerchi non è stata trovata. Forse ha cambiato indirizzo, oppure il link è incompleto.",
      jouer: "Gioca a Vexi World",
      portfolio: "Vedi il portfolio video",
    },
  },
};
