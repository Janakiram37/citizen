import { NextResponse } from 'next/server';
import { auth } from '@/app/firebase/config';

export async function middleware(request) {
  // Get the path name
  const path = request.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ['/apply', '/services'];
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  // Get the user's authentication status from the cookie
  const token = request.cookies.get('auth-token')?.value;

  if (isProtectedRoute && !token) {
    // Redirect to login if accessing protected route without auth
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/apply/:path*', '/services/:path*'],
};
