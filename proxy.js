import { NextResponse } from "next/server";

/**
 * Proxy: protect /admin/* routes.
 * Cookie "bsm_admin_session" is set on client after login; we check it here.
 * Login page is always allowed.
 */
export function proxy(request) {
    const { pathname } = request.nextUrl;

    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }
    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("bsm_admin_session");
    if (!sessionCookie?.value) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path*"],
};
