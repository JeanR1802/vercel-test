// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { hostname } = req.nextUrl;

  // Cambia 'localhost' por tu dominio principal en producción
  const mainDomain = 'localhost'; 
  
  // Extraer el subdominio
  const subdomain = hostname.split('.')[0];
  
  // Si no es el dominio principal y no es 'www', lo consideramos un subdominio de tienda
  if (!hostname.includes(mainDomain) || subdomain === 'www') {
    return NextResponse.next();
  }

  // Reescribe la URL para que apunte a la página de la tienda
  // ej: 'tienda1.localhost:3000/producto' -> 'localhost:3000/_stores/tienda1/producto'
  url.pathname = `/_stores/${subdomain}${url.pathname}`;
  return NextResponse.rewrite(url);
}

// Configuración para que el middleware se ejecute en todas las rutas
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};