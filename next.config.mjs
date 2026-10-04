/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  // jonathanjegard.com → jonathanjegard.com/vexi (règle du 04/10/2026). Renvoi temporaire
  // (307) : rien n'est gravé dans le navigateur si un jour l'accueil change. Les paramètres
  // (?merci=1 au retour de Stripe, utm_…) sont gardés automatiquement.
  async redirects() {
    return [{ source: "/", destination: "/vexi", permanent: false }];
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/demo/:path*",
          destination: "/demo/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
