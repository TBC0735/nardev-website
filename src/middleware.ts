import { withAuth } from "next-auth/middleware";

// Protège /admin. La page /admin/login reste publique (sinon boucle de redirection).
export default withAuth({
  pages: { signIn: "/admin/login" },
});

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
