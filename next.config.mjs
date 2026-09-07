/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Ajouter ici l'hôte des images servies depuis l'admin (photos de services,
    // projets, membres) une fois l'hébergeur d'images choisi, ex. :
    //   remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    // Tant que rien n'est défini, seules les images du dossier /public sont acceptées.
    remotePatterns: [],
  },
};

export default nextConfig;
