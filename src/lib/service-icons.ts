/** Icône de repli affichée sur le dégradé tant qu'aucune photo de service n'est fournie. */
const icones: Record<string, string> = {
  "sites-vitrines": "🖥️",
  "sites-dynamiques": "⚙️",
  "flyers-affiches": "🎨",
  "visibilite-google": "📍",
};

export function serviceIcon(slug: string): string {
  return icones[slug] ?? "✨";
}
