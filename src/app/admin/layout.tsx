import Link from "next/link";
import { Container } from "@/components/Container";

const adminLinks = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/equipe", label: "Équipe" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="py-10">
      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <aside>
          <p className="text-sm font-semibold text-marine">Back-office</p>
          <nav className="mt-3 flex flex-col gap-1 text-sm">
            {adminLinks.map((l) => (
              <Link key={l.href} href={l.href} className="no-underline text-texte hover:text-bleu">
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </Container>
  );
}
