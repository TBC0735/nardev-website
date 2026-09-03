-- Renomme livrables -> pointsCles (même contenu, nom aligné sur le nouveau cahier des charges).
ALTER TABLE "Service" RENAME COLUMN "livrables" TO "pointsCles";

-- Nouveaux champs pour la direction artistique "chaleureuse" (hero/cartes avec photo, résumé court).
ALTER TABLE "Service" ADD COLUMN "resume" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Service" ADD COLUMN "imageUrl" TEXT;

ALTER TABLE "Service" ALTER COLUMN "resume" DROP DEFAULT;
