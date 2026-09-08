/** Jeu d'icônes ligne, géométriques, sans dépendance externe. Trait 1.6. */

type P = React.SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* — Services — */

export function MonitorIcon(props: P) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
      <path d="M7 8h5M7 11h9" stroke="currentColor" opacity="0.5" />
    </Svg>
  );
}

export function LayersIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 18 9 5 9-5" opacity="0.5" />
    </Svg>
  );
}

export function PaletteIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M12 3a9 9 0 1 0 0 18c1.7 0 2-1.3 1.2-2.2-.8-1-.4-2.3 1-2.6l1.6-.3A4.2 4.2 0 0 0 21 11.6 9 9 0 0 0 12 3Z" />
      <circle cx="8.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function MapPinIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  );
}

/* — Génériques — */

export function ArrowRightIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="m5 13 4 4L19 7" strokeWidth={2} />
    </Svg>
  );
}

export function ChatIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.3A8 8 0 1 1 21 12Z" />
    </Svg>
  );
}

export function PenRulerIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="m4 20 4-1 9-9-3-3-9 9-1 4Z" />
      <path d="m14 6 3 3M15 3l6 6-2 2-6-6 2-2Z" opacity="0.6" />
    </Svg>
  );
}

export function RocketIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M14 4c3 0 6 3 6 6-2 4-6 6-6 6l-4-4s2-4 4-6a6 6 0 0 1 0-2Z" />
      <path d="m10 14-3 3M14 10l-4 4M7 17l-3 1 1-3" />
    </Svg>
  );
}

export function ShieldIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" strokeWidth={1.8} />
    </Svg>
  );
}

export function UserIcon(props: P) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.3 3-5.5 7-5.5s7 2.2 7 5.5" />
    </Svg>
  );
}

export function EyeIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="2.6" />
    </Svg>
  );
}

export function LinkIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11 7" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7L13 17" />
    </Svg>
  );
}

export function MailIcon(props: P) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  );
}

export function MenuIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

/* — Réseaux — */

export function PhoneIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M6.5 3h2.2l1.3 4.5-2 1.6a12 12 0 0 0 5.9 5.9l1.6-2 4.5 1.3V16.5a2 2 0 0 1-2.2 2C10.9 18 6 13.1 5.5 6.7A2 2 0 0 1 6.5 3Z" />
    </Svg>
  );
}

export function WhatsappIcon(props: P) {
  return (
    <Svg {...props}>
      <path d="M4 20l1.4-4A8 8 0 1 1 9 19.6L4 20Z" />
      <path
        d="M9 9c0 3 2.5 5.5 5.5 5.5.6 0 1-.4 1-1v-.7c0-.3-.2-.6-.5-.7l-1.3-.5c-.3-.1-.6 0-.8.2l-.3.4c-1-.4-1.8-1.2-2.2-2.2l.4-.3c.2-.2.3-.5.2-.8L9.9 7.9c-.1-.3-.4-.5-.7-.5H8.5c-.6 0-1 .4-1 1"
        strokeWidth={1.3}
      />
    </Svg>
  );
}

export function FacebookIcon(props: P) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path
        d="M14 8.5h-1.5A1.5 1.5 0 0 0 11 10v1.5H9V14h2v6h2.5v-6H15l.5-2.5h-2V10c0-.28.22-.5.5-.5H15V8.5Z"
        fill="currentColor"
        stroke="none"
      />
    </Svg>
  );
}

export function InstagramIcon(props: P) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function LinkedinIcon(props: P) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16" />
      <circle cx="7.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11 16v-3.2c0-1.3.8-2.3 2.1-2.3s1.9 1 1.9 2.3V16" />
    </Svg>
  );
}
