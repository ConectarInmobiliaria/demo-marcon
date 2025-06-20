// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request) {
  // Público o restringido según quieras; por ejemplo, público para que frontend cargue categorías
  try {
    const cats = await prisma.category.findMany();
    return NextResponse.json(cats);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

export async function POST(request) {
  // Solo admin: verificar sesión y rol
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });
  }
  const body = await request.json();
  const { name } = body;
  if (!name) {
    return NextResponse.json({ error: 'Nombre es requerido' }, { status: 400 });
  }
  try {
    const cat = await prisma.category.create({ data: { name } });
    return NextResponse.json(cat, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al crear categoría' }, { status: 500 });
  }
}
