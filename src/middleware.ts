import { NextResponse, type NextRequest } from 'next/server';

// Define role-based access
const rolePermissions: Record<string, string[]> = {
    admin: ['/', '/ginner', '/spinner', '/knitter','/cache'],
    ginner: ['/ginner', '/'],
    spinner: ['/spinner', '/'],
    knitter: ['/knitter', '/']
};

const excludedPaths = [
    '/_next/static/',
    '/favicon.ico',
    '/_next/',
    '/public/',
    '/assets/',
    '/fonts.googleapis.com/',
    '/fonts.gstatic.com/',
    '/api',
    '/500',
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow excluded paths to be accessed without restrictions
    if (excludedPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    const role = request.cookies.get('role')?.value;
    const user = request.cookies.get('token')?.value;

    // Redirect to home if user is logged in and trying to access auth routes
    if (user && pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If no user, redirect to login
    if (!user) {
        if (pathname === '/auth/signin' || pathname === '/auth/signup') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    if (role) {
        const allowedRoutes = rolePermissions[role] || [];
        if (role === 'admin' || allowedRoutes.includes(pathname)) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/((?!_next/static|favicon.ico|public/).*)'],
};
