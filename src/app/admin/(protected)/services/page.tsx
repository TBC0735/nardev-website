import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ServicesManager } from "./ServicesManager";

export const metadata: Metadata = { title: "Services — Admin" };
export const dynamic = "force-dynamic";

async function getServices() {
  try {
    return await prisma.service.findMany({ orderBy: { ordre: "asc" } });
  } catch {
    return [];
  }
}

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div>
      <h1 className="text-2xl">Services</h1>
      <p className="mt-2 text-sm text-texte-secondaire">
        Les 4 services affichés sur <code>/</code> et <code>/services</code>.
        L&apos;ordre d&apos;affichage suit le champ « ordre » (croissant).
      </p>
      <ServicesManager servicesInitiaux={services} />
    </div>
  );
}
