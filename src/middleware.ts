import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // Update the session with Supabase
  const response = await updateSession(request);
  
  // Create a Supabase client to check the session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set() {}, // We don't need to set cookies in middleware check
        remove() {} // We don't need to remove cookies in middleware check
      }
    }
  );
  
  // Get the actual session to check authentication status
  const { data: { session } } = await supabase.auth.getSession();
  
  const isAuthPage = 
    request.nextUrl.pathname.startsWith('/auth/login') || 
    request.nextUrl.pathname.startsWith('/auth/register') ||
    request.nextUrl.pathname.startsWith('/auth/callback') ||
    request.nextUrl.pathname.startsWith('/auth/reset-password') ||
    request.nextUrl.pathname.startsWith('/auth/update-password');
  
  // If accessing a protected route without a session, redirect to login
  if (!session && !isAuthPage && request.nextUrl.pathname !== '/') {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  // If accessing auth pages with a session, redirect to dashboard
  if (session && isAuthPage && !request.nextUrl.pathname.startsWith('/auth/callback')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};