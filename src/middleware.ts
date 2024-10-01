// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define role-based access control rules
const rolePermissions = {
  admin: ['/', '/ginner', '/spinner', '/knitter', '/auth'],
  ginner: ['/ginner','/'],
  spinner: ['/spinner','/'],
  knitter: ['/knitter','/'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Retrieve the user role from cookies
  const role = request.cookies.get('role')?.value; 
  console.log("role : - ", role); // Logging the role for debugging
  
  if (role) {
    // Check if the current pathname is allowed for the user role
    const allowedRoutes = rolePermissions[role] || [];
    
    if (!allowedRoutes.includes(pathname)) {
      // If the route is not allowed, redirect to the unauthorized page or home
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
    '/((?!_next|api|auth|favicon.ico).*)', // Exclude Next.js internal routes, API routes, and auth routes
  ],
};
