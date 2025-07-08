export { auth as middleware } from "@/auth";

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "./prisma"
import { auth } from "./auth";

const middleware = async (req: NextRequest) => {
  console.log("Middleware hit:", req.nextUrl.pathname, req.nextUrl.hostname);
  
  // Skip middleware for static files, API routes, and Next.js internals
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.includes('.') ||
    req.nextUrl.pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const baseHostname = process.env.NEXT_PUBLIC_BASE_URL?.replace("https://", "").replace("http://", "");
  console.log("Base hostname:", baseHostname, "Request hostname:", req.nextUrl.hostname);

  if (req.nextUrl.hostname === baseHostname) {
    const slug = req.nextUrl.pathname.replace("/", "");
    console.log("Extracted slug:", slug);
    
    // Skip if it's the root path or known app routes
    if (!slug || slug === 'dashboard' || slug === 'login' || slug === 'signup') {
      console.log("Skipping known route");
      return NextResponse.next();
    }

    try {
      const link = await prisma.link.update({
        where: { slug },
        data: { clicks: { increment: 1 } },
        select: { url: true }
      });

      if (link) {
        console.log("Redirecting to link:", link.url);
        return NextResponse.redirect(link.url, 301);
      } else {
        console.log("Link not found, would redirect to:", process.env.NEXT_PUBLIC_WEB_URL);
        // Instead of redirecting, return 404 for now to break the loop
        return new NextResponse('Not Found', { status: 404 });
      }
    } catch (error) {
      console.error("Database error:", error);
      return new NextResponse('Server Error', { status: 500 });
    }
  }

  // For other hostnames, continue normally
  return NextResponse.next();
}

export default auth(middleware);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}