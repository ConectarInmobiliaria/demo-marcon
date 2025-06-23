// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/dashboard')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signInUrl = new URL('/auth/login', req.url);
      return NextResponse.redirect(signInUrl);
    }
    if (!['ADMIN', 'CORREDOR'].includes(token.role)) {
      return new NextResponse('Acceso denegado', { status: 403 });
    }
  }
  return NextResponse.next();
}
