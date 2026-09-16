# Workflow Git — Nardev

## Branches

- `main` — production (protégée). Déploiement automatique sur Vercel.
- `dev` — intégration quotidienne (protégée). Toutes les features arrivent ici d'abord.
- `feature/xxx` — une branche par tâche, créée **depuis `dev`**.

Exemples : `feature/auth-admin`, `feature/api-portfolio`, `feature/page-accueil`, `feature/admin-equipe`.

## Cycle d'une tâche

1. Une **Issue** GitHub par tâche, assignée, placée sur le tableau Projects.
2. Créer la branche depuis `dev` à jour :
   ```bash
   git checkout dev && git pull
   git checkout -b feature/ma-tache
   ```
3. Développer. Commits en français, courts et à l'impératif :
   `ajoute la page portfolio`, `corrige le filtre par service`.
4. Pousser et ouvrir une **Pull Request vers `dev`** (jamais vers `main` directement).
5. La PR doit :
   - passer la CI (build + lint verts) ;
   - être **relue et approuvée par un autre membre** ;
   - être liée à son Issue (`Closes #12`).
6. Fusion en **Squash and merge**. Supprimer la branche après fusion.

## Version de Node

Utiliser la version indiquée dans `.nvmrc` (`nvm use`). La CI lit ce même fichier.
Si `npm ci` échoue en CI juste après un changement de dépendances, c'est que le
`package-lock.json` a été généré avec une version de npm différente : régénère-le
avec la bonne version (`nvm use` puis `rm -rf node_modules package-lock.json && npm install`).

## Règles

- Aucune fusion directe vers `dev` ou `main` : toujours une PR.
- Pas de secret dans le code : tout passe par `.env` (jamais commité).
- Une migration Prisma = un fichier commité dans `prisma/migrations/`. Prévenir l'équipe
  quand on modifie `schema.prisma` (tout le monde doit refaire `prisma migrate dev`).
- `dev` → `main` : seulement quand tout est testé, via une PR de release relue à deux.

## Mise en route de la base après un pull

Si `schema.prisma` ou les migrations ont changé :
```bash
npm install
npx prisma migrate dev
```
