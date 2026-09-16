-- Liste des bénéfices client par service (section "Avantages" sur /services).
ALTER TABLE "Service" ADD COLUMN "avantages" TEXT[] NOT NULL DEFAULT '{}';
