import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (!req.url.includes('/api')) {
    if (
      (req.url.includes('/login') || req.url.includes('/signup')) &&
      req.cookies.get('chanstorysession')
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    } else if (
      req.url.includes('/profile') &&
      !req.cookies.get('chanstorysession')
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}
