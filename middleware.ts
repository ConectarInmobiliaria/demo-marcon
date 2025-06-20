// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Proteger rutas que comienzan con /dashboard
  if (pathname.startsWith('/dashboard')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      // Redirige a login
      const signInUrl = new URL('/auth/login', req.url);
      return NextResponse.redirect(signInUrl);
    }
    const role = token.role;
    if (role !== 'ADMIN' && role !== 'CORREDOR') {
      // No autorizado
      return new NextResponse('Acceso denegado', { status: 403 });
    }
  }
  return NextResponse.next();
}

// next.config.mjs: si defines matcher, p. ej.:
export default {
  // ...
  // matcher: ['/dashboard/:path*'],
};
