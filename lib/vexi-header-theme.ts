/** Clé localStorage écrite par la démo (AsyncStorage web). */
export const VEXI_THEME_STORAGE_KEY = "vexi_theme_mode";

/** Classe posée sur <html> uniquement sur la route Vexi, en mode nuit. */
export const VEXI_HEADER_NUIT_CLASS = "vexi-header-nuit";

/**
 * Valeurs actuelles écrites par le jeu : « clair » | « sombre ».
 * Ancien réglage « systeme » (et toute autre valeur / absence) : suivre l’OS.
 */
export function isVexiNightFromStorage(
  stored: string | null,
  prefersDark: boolean,
): boolean {
  if (stored === "sombre") return true;
  if (stored === "clair") return false;
  return prefersDark;
}

export function prefersColorSchemeDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyVexiHeaderNight(night: boolean) {
  const root = document.documentElement;
  root.classList.toggle(VEXI_HEADER_NUIT_CLASS, night);
  if (night) {
    root.style.setProperty("--site-header-bg", "#1A2740");
    root.style.setProperty("--site-header-border", "rgba(232, 224, 208, 0.28)");
    root.style.setProperty("--site-header-shadow", "0 6px 20px rgba(0, 0, 0, 0.55)");
  } else {
    root.style.removeProperty("--site-header-bg");
    root.style.removeProperty("--site-header-border");
    root.style.removeProperty("--site-header-shadow");
  }
}

/** Script bloquant : applique le thème avant le premier paint, pas de flash. */
export const VEXI_HEADER_THEME_BOOT = `(function(){
  try {
    var p = location.pathname;
    if (p !== "/vexi" && p !== "/vexi/" && p !== "/") return;
    var v = localStorage.getItem(${JSON.stringify(VEXI_THEME_STORAGE_KEY)});
    var night = v === "sombre" || (v !== "clair" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var root = document.documentElement;
    root.classList.toggle(${JSON.stringify(VEXI_HEADER_NUIT_CLASS)}, night);
    if (night) {
      root.style.setProperty("--site-header-bg", "#1A2740");
      root.style.setProperty("--site-header-border", "rgba(232, 224, 208, 0.28)");
      root.style.setProperty("--site-header-shadow", "0 6px 20px rgba(0, 0, 0, 0.55)");
    }
  } catch (e) {}
})();`;
