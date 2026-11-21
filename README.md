# Tech'lux — Site vitrine & catalogue d'aménagement lumière

Refonte moderne du site web de **Tech'lux**, agence d'aménagement lumière et d'éclairage extérieur implantée à Charbonnières-les-Bains (69) et Vimines (73).

## Fonctionnalités

- **Accueil éditorial & simulateur photométrique interactif** : bascule en temps réel entre scénarios (*Patrimoine 2700K*, *Trame Noire 2200K*, *Solaire 3000K*, *Sportif 4000K*) et mode d'abaissement nocturne.
- **9 solutions d'éclairage**, chacune avec sa page `/solutions/[slug]` : Rénovation LED, Trame noire, Éclairage solaire, Éclairage de voirie, Smart City, Mâts d'éclairage, Mise en lumière du patrimoine, Éclairage d'ambiance, Éclairage de stades.
- **Réalisations (`/realisations`)** : 24 références filtrables par domaine, département et mot-clé, avec fiches techniques détaillées.
- **Partenaires européens (`/fournisseurs`)** : annuaire des 7 fabricants représentés (Aubrilam, Chrysalis, Cometa, Meyer, Petitjean, Siteco, Solux) avec filtre interactif par département (`01` à `974`).
- **Actualités & Innovations (`/actualites`)** : nouveautés produits classées par fabricant.
- **Contact & demande d'étude (`/contact`)** : formulaire local (copie du résumé dans le presse-papiers) et coordonnées des deux agences.
- **Mentions légales (`/mentions-legales`)**.

## Stack technique

- **Next.js 16** (App Router) & **React 19**
- **TypeScript**
- **Tailwind CSS v4** & **shadcn/ui** (`@base-ui/react`)
- **Lucide React**

## Lancer en local

```bash
npm install
npm run dev -- --port 4317
```

Puis ouvrez [http://localhost:4317](http://localhost:4317).

## Scripts disponibles

- `npm run dev` — Démarre le serveur de développement
- `npm run build` — Compile l'application pour la production
- `npm run start` — Lance le serveur de production
- `npm run lint` — Vérifie la qualité du code avec ESLint

## Dépôt GitHub

Code source : [Cartiermillon/techlux.fr](https://github.com/Cartiermillon/techlux.fr) (dépôt privé).

Pour publier `main` sur GitHub depuis une machine où vous êtes connecté à GitHub :

```bash
git remote add github https://github.com/Cartiermillon/techlux.fr.git  # une seule fois
git push -u github main
```
