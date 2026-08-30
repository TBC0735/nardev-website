# Nardev — Site web

Site de l'agence Nardev. Next.js 14 (App Router) · TypeScript · Tailwind · Prisma · PostgreSQL · NextAuth.

## Prérequis

- Node.js 20+ (`nvm use` lit le `.nvmrc`)
- Un accès à la base de données PostgreSQL de dev (Neon) — demander la connection string à l'équipe
- VS Code + extensions : ESLint, Prisma, Tailwind CSS IntelliSense

## Installation

```bash
git clone <url-du-repo>
cd nardev-website
npm install
cp .env.example .env      # puis remplir les valeurs (voir l'équipe)
npx prisma migrate deploy # applique les migrations existantes
npm run db:seed           # crée le compte admin de départ
npm run dev
```

Le site tourne sur http://localhost:3000 — l'admin sur http://localhost:3000/admin
(connexion via les identifiants du seed).

## Scripts

| Script | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | build de production |
| `npm run lint` | ESLint (bloquant en CI) |
| `npm run db:migrate` | crée/applique une migration (dev) |
| `npm run db:push` | pousse le schéma sans migration (prototypage) |
| `npm run db:seed` | seed (compte admin) |
| `npm run db:studio` | Prisma Studio (explorateur de base) |

## Structure

```
src/
  app/
    (pages publiques : /, services, portfolio, a-propos, contact, mentions-legales)
    admin/            back-office (protégé par NextAuth)
    api/              routes API
  components/         Header, Footer, Button, Container, PageIntro…
  lib/               prisma.ts, auth.ts
prisma/
  schema.prisma      tables : Service, Projet, Message, Membre, User
  seed.ts
```

## Répartition (cf. cahier des charges §4)

| Domaine | Personne | Pages / table |
|---|---|---|
| Équipe & config | Ndiawar | `/a-propos`, table `Membre`, admin équipe, déploiement + CI |
| Services & Accueil | Mame Diarra | `/`, `/services`, table `Service`, admin services |
| Portfolio | Rokhaya | `/portfolio`, `/portfolio/[slug]`, table `Projet`, admin portfolio |
| Contact | Awa Ndao | `/contact`, table `Message`, envoi email, admin messages |

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour le workflow Git.
