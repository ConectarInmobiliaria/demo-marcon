// app/api/propiedades/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
  try {
    const props = await prisma.property.findMany({
      include: { category: true, creator: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(props);
  } catch (e) {
    console.error('propiedades GET error:', e);
    return NextResponse.json({ error: 'Error al listar propiedades' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const role = session.user.role;
  if (!['admin', 'corredor'].includes(role)) {
    return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }
  const { title, description, price, location, categoryId, imageUrl } = body;
  if (!title || !description || !price || !location || !categoryId) {
    return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
  }
  try {
    const newProp = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        location,
        categoryId: parseInt(categoryId, 10),
        creatorId: session.user.id,
        imageUrl: imageUrl || null,
        otherImageUrls: [],
      },
    });
    return NextResponse.json(newProp, { status: 201 });
  } catch (e) {
    console.error('propiedades POST error:', e);
    return NextResponse.json({ error: 'Error al crear propiedad' }, { status: 500 });
  }
}
