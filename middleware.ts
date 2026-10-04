import { doitRenvoyerVersVitrine } from "@/lib/redirection-demo";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Sur téléphone ou tablette, l'adresse de la démo (/demo/…) renvoie vers la vitrine (/vexi).
 * Les règles sont dans lib/redirection-demo.ts.
 */
export function middleware(req: NextRequest) {
  const renvoyer = doitRenvoyerVersVitrine(
    req.nextUrl.pathname,
    req.headers.get("user-agent") ?? "",
    req.headers.get("sec-fetch-dest"),
  );
  if (!renvoyer) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/vexi";
  url.search = "";
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/demo", "/demo/:path*"],
};
