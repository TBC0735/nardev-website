/**
 * Étincelle à 4 branches — le motif du logo Nardev (entre le « D » et le « E »).
 * Réutilisée comme puce, marqueur de sur-titre et élément décoratif.
 */
export function Spark({
  className = "h-4 w-4",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 0c.5 5.7 6.3 11.5 12 12-5.7.5-11.5 6.3-12 12-.5-5.7-6.3-11.5-12-12C5.7 11.5 11.5 5.7 12 0Z" />
    </svg>
  );
}
