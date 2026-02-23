import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;
  const authRole = request.cookies.get('auth_role')?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isAdminPage = pathname.startsWith('/admin');
  const isProfilePage = pathname.startsWith('/profile');
  const isCheckoutPage = pathname.startsWith('/checkout');

  // If user is authenticated and trying to access auth pages
  // Only redirect if they are not specifically trying to access /login or /signup
  // For now, let's remove the auto-redirect to allow the login/signup pages to open as requested.
  // if (isAuthPage && authToken) {
  //   if (authRole === 'ADMIN') {
  //       return NextResponse.redirect(new URL('/admin', request.url));
  //   }
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // If user is trying to access admin pages
  if (isAdminPage) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (authRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if ((isProfilePage || isCheckoutPage) && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/signup', '/profile', '/checkout'],
};
