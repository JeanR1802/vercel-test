export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host');
  const rootDomain = 'gestularia.com'; // Asegúrate de que este es tu dominio

  if (host && host !== rootDomain && !host.startsWith('www.')) {
    const subdomain = host.replace(`.${rootDomain}`, '');
    url.pathname = `/_sites/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};