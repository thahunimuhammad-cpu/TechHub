import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  // Check if route starts with /admin
  if (pathname.startsWith('/admin')) {
    const adminKey = searchParams.get('key');
    const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN;

    // Verify admin key
    if (!adminKey || adminKey !== adminPin) {
      // Redirect to home if key is invalid
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
