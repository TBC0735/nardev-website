/** Petites icônes ligne, sobres, sans dépendance externe (cf. charte : pas d'effet voyant). */

export function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path
        d="M6.5 3h2.2l1.3 4.5-2 1.6a12 12 0 0 0 5.9 5.9l1.6-2 4.5 1.3V16.5a2 2 0 0 1-2.2 2C10.9 18 6 13.1 5.5 6.7A2 2 0 0 1 6.5 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14 8.5h-1.5A1.5 1.5 0 0 0 11 10v1.5H9V14h2v6h2.5v-6H15l.5-2.5h-2V10c0-.28.22-.5.5-.5H15V8.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16" strokeLinecap="round" />
      <circle cx="7.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11 16v-3.2c0-1.3.8-2.3 2.1-2.3s1.9 1 1.9 2.3V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
