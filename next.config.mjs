/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Les photos (services, portfolio, équipe) sont ajoutées depuis l'admin sous
    // forme d'URL par les différents domaines — hébergeur non figé à l'avance.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
