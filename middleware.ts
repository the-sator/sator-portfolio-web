import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "./data/admin";

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware(routing);

// Define public paths that don't require authentication
const publicPaths = ["/admin/login", "/admin/register"];

// Helper function to check if a path is public
const isPublicPath = (pathname: string) => {
  return publicPaths.some((path) =>
    pathname.replace(/^\/(en|kh)/, "").startsWith(path),
  );
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip authentication check for public paths
  if (isPublicPath(pathname)) {
    return intlMiddleware(req);
  }

  // Check if the path is under /admin
  if (pathname.replace(/^\/(en|kh)/, "").startsWith("/admin")) {
    const { error } = await getAdminSession();

    if (error) {
      // Get the locale from the current path or default to 'en'
      const locale = pathname.startsWith("/kh") ? "kh" : "en";
      const url = new URL(`/${locale}/admin/login`, req.url);

      // Add the original URL as a callback parameter
      url.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(url);
    }

    // Handle the /admin root path redirect
    if (pathname.replace(/^\/(en|kh)/, "") === "/admin") {
      const locale = pathname.startsWith("/kh") ? "kh" : "en";
      return NextResponse.redirect(
        new URL(`/${locale}/admin/dashboard`, req.url),
      );
    }
  }

  // Continue with internationalization middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // However, match all pathnames within `/users`, optionally with a locale prefix
    "/([\\w-]+)?/users/(.+)",
  ],
};
