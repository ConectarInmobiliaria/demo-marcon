// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
  try {
    const cats = await prisma.category.findMany();
    return NextResponse.json(cats);
  } catch (e) {
    console.error('categories GET error:', e);
    return NextResponse.json({ error: 'Error al listar categorías' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  // Aseguramos que el rol se maneje en mayúsculas o minúsculas según tu esquema:
  // Si en tu seed pones 'admin' en minúscula, compara con 'admin'
  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }
  const { name } = body;
  if (!name) {
    return NextResponse.json({ error: 'Nombre es requerido' }, { status: 400 });
  }
  try {
    const cat = await prisma.category.create({ data: { name } });
    return NextResponse.json(cat, { status: 201 });
  } catch (e) {
    console.error('categories POST error:', e);
    return NextResponse.json({ error: 'Error al crear categoría' }, { status: 500 });
  }
}
