import {
  MonitorIcon,
  LayersIcon,
  PaletteIcon,
  MapPinIcon,
} from "@/components/icons";

const map: Record<string, (p: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
  "sites-vitrines": MonitorIcon,
  "sites-dynamiques": LayersIcon,
  "flyers-affiches": PaletteIcon,
  "visibilite-google": MapPinIcon,
};

/** Icône SVG associée à un service (par son slug). */
export function ServiceIcon({
  slug,
  className = "h-6 w-6",
}: {
  slug: string;
  className?: string;
}) {
  const Icon = map[slug] ?? MonitorIcon;
  return <Icon className={className} />;
}
