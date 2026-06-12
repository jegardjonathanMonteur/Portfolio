# ReactBits — Installation & tests

## Commandes CLI (quand npm/ssl fonctionne)

```bash
npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW
npx jsrepo@latest add https://reactbits.dev/r/BlurText-TS-TW
npx jsrepo@latest add https://reactbits.dev/r/Threads-TS-TW
npx jsrepo@latest add https://reactbits.dev/r/TiltedCard-TS-TW
npx jsrepo@latest add https://reactbits.dev/r/ClickSpark-TS-TW
npx jsrepo@latest add https://reactbits.dev/r/Silk-TS-TW
npx jsrepo@latest add https://reactbits.dev/r/ScrollReveal-TS-TW
npx jsrepo@latest add https://reactbits.dev/r/DotGrid-TS-TW
npx jsrepo@latest add https://reactbits.dev/r/Magnet-TS-TW
npx jsrepo@latest add https://reactbits.dev/r/ShinyText-TS-TW
```

Dépendances officielles possibles : `gsap`, `ogl`, `three`, `@react-three/fiber`.

## Implémentation actuelle

Versions **monochrome** dans `components/reactbits/` (Framer Motion + Canvas/CSS), alignées sur l’ADN lac, sans dépendances externes bloquées par SSL.

## Guide de test rapide

| Section | Effet | Comment tester |
|---------|--------|----------------|
| Hero | Split Text + Blur Text | Recharger `/` — titre lettre par lettre, sous-titre flou → net |
| Work | Threads + Tilt + Spark | Scroller — fils crème subtils ; hover carte 3D ; clic = étincelles |
| Approach | Silk + Scroll Reveal | Scroll — vagues lentes ; texte apparaît en montant |
| Services | Dot Grid + glass | Hover souris — points s’illuminent ; cartes verre dépoli |
| Contact | Lac assombri + Magnet + Shiny | Bas de page — même image hero ; bouton suit la souris |

**Desktop** : traînée curseur + Threads visibles (canvas).  
**Réduit mouvement** : `prefers-reduced-motion` désactive animations (OS).

```bash
npm run dev
# http://localhost:3000 — Ctrl+Shift+R pour hard refresh
```
