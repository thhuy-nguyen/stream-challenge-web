import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = 
    request.nextUrl.pathname.startsWith('/auth/login') || 
    request.nextUrl.pathname.startsWith('/auth/register') ||
    request.nextUrl.pathname.startsWith('/auth/callback');
  
  // If accessing a protected route without a token, redirect to login
  if (!token && !isAuthPage && request.nextUrl.pathname !== '/') {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  // If accessing auth pages with a token, redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/profile/:path*',
  ],
};