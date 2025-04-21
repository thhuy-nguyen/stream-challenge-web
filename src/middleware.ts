import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';
import { createServerClient } from '@supabase/ssr';

// Create next-intl middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'vi'],
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  
  // Auto-detect user language preferences
  localeDetection: true,
  
  // For better SEO, we want to use URLs like example.com/en/about and example.com/vi/about
  localePrefix: 'always'
});

// Combine Supabase middleware with next-intl middleware
export async function middleware(request: NextRequest) {
  // First update Supabase session
  await updateSession(request);
  
  // Get the actual session to check authentication status
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
  
  const { data: { session } } = await supabase.auth.getSession();
  
  const isAuthPage = 
    request.nextUrl.pathname.includes('/auth/login') || 
    request.nextUrl.pathname.includes('/auth/register') ||
    request.nextUrl.pathname.includes('/auth/callback') ||
    request.nextUrl.pathname.includes('/auth/reset-password') ||
    request.nextUrl.pathname.includes('/auth/update-password');
  
  // If accessing a protected route without a session, redirect to login
  if (!session && !isAuthPage && 
      !request.nextUrl.pathname.endsWith('/') && 
      !request.nextUrl.pathname.endsWith('/en') && 
      !request.nextUrl.pathname.endsWith('/vi')) {
    const locale = request.nextUrl.pathname.split('/')[1];
    const validLocale = ['en', 'vi'].includes(locale) ? locale : 'en';
    
    const url = new URL(`/${validLocale}/auth/login`, request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return Response.redirect(url);
  }
  
  // If accessing auth pages with a session, redirect to dashboard
  if (session && isAuthPage && !request.nextUrl.pathname.includes('/auth/callback')) {
    const locale = request.nextUrl.pathname.split('/')[1];
    const validLocale = ['en', 'vi'].includes(locale) ? locale : 'en';
    
    return Response.redirect(new URL(`/${validLocale}/dashboard`, request.url));
  }
  
  // Apply the internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - static files (e.g. files in the public directory)
    // - API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};