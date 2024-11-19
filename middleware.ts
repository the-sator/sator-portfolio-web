import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // However, match all pathnames within `/users`, optionally with a locale prefix
    "/([\\w-]+)?/users/(.+)",
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Check if the requested URL is `/admin`
  if (url.pathname.replace(/^\/(en|kh)/, "") === "/admin") {
    // Redirect to `/admin/dashboard`
    url.pathname = "/admin/dashboard";
    return Response.redirect(url);
  }

  // Continue with other logic (internationalization or other routing)
  return createMiddleware(routing)(req);
}
