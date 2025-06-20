// app/api/propiedades/[id]/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const prop = await prisma.property.findUnique({
      where: { id: parseInt(id, 10) },
      include: { category: true, creator: true, inquiries: true },
    });
    if (!prop) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 });
    }
    return NextResponse.json(prop);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al obtener propiedad' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const propId = parseInt(id, 10);
  const existing = await prisma.property.findUnique({ where: { id: propId } });
  if (!existing) {
    return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 });
  }
  if (session.user.role !== 'admin' && session.user.id !== existing.creatorId) {
    return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });
  }
  const body = await request.json();
  const { title, description, price, location, categoryId, imageUrl } = body;
  try {
    const updated = await prisma.property.update({
      where: { id: propId },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        price: price ? parseFloat(price) : existing.price,
        location: location ?? existing.location,
        categoryId: categoryId ? parseInt(categoryId, 10) : existing.categoryId,
        imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al actualizar propiedad' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const propId = parseInt(id, 10);
  const existing = await prisma.property.findUnique({ where: { id: propId } });
  if (!existing) {
    return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 });
  }
  if (session.user.role !== 'admin' && session.user.id !== existing.creatorId) {
    return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });
  }
  try {
    await prisma.property.delete({ where: { id: propId } });
    return NextResponse.json({}, { status: 204 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al eliminar propiedad' }, { status: 500 });
  }
}
