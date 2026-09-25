"use client";

import { useEffect } from "react";

/**
 * Avant, jonathanjegard.com était le portfolio sur une seule page, avec des ancres
 * (#accueil, #apropos, #contact). Ces anciens liens circulent encore (cartes de visite,
 * LinkedIn, anciens mails). Sans ça, ils ouvriraient maintenant le jeu Vexi.
 * On renvoie donc ces ancres vers la même section du portfolio.
 */
const ANCRES_PORTFOLIO = new Set(["#accueil", "#apropos", "#contact"]);

export function RedirectionAnciensLiens() {
  useEffect(() => {
    const ancre = window.location.hash;
    if (ANCRES_PORTFOLIO.has(ancre)) {
      window.location.replace(`/portfolio${ancre}`);
    }
  }, []);
  return null;
}
