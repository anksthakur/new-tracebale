// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define role-based access
const rolePermissions: any = {
    admin: ['/', '/ginner', '/spinner', '/knitter'],
    ginner: ['/ginner', '/'],
    spinner: ['/spinner', '/'],
    knitter: ['/knitter', '/'],
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Retrieve the user role from cookies
    const role = request.cookies.get('role')?.value;

    const user: any = request.cookies.get('token')?.value;
    console.log(user, "0000000000")
    console.log(request.nextUrl.pathname, "pathname")
    
    if (user) {
        if (request.nextUrl.pathname.startsWith('/auth')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (role) {
        // Check if the current pathname is allowed for the user role
        const allowedRoutes = rolePermissions[role] || [];

        if (role === 'admin') {
            // Admin can access all routes, no further checks needed
            return NextResponse.next();
        }

        if (!allowedRoutes.includes(pathname)) {
            // If the route is not allowed for non-admin roles, redirect to home
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else {
        // If no role is found, redirect to login or unauthorized page
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return NextResponse.next(); // If everything is fine, continue
}

// Apply middleware to all routes
export const config = {
    matcher: [
        '/((?!_next|api|auth|favicon.ico).*)',
    ],
};
