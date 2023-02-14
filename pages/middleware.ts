import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!req.url.includes('/api')) {
    if (
      (req.url.includes('/login') || req.url.includes('/signup')) &&
      // @ts-ignore
      req.cookies.chanstorysession
    ) {
      return NextResponse.redirect(new URL('/profile', req.url));
      // @ts-ignore
    } else if (req.url.includes('/profile') && !req.cookies.chanstorysession) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}
