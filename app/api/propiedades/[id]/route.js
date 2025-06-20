// app/api/propiedades/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

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
    console.error('propiedades/[id] GET error:', e);
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
  const role = session.user.role;
  if (role !== 'admin' && session.user.id !== existing.creatorId) {
    return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }
  const { title, description, price, location, categoryId, imageUrl } = body;
  try {
    const updated = await prisma.property.update({
      where: { id: propId },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        price: price !== undefined ? parseFloat(price) : existing.price,
        location: location ?? existing.location,
        categoryId: categoryId !== undefined ? parseInt(categoryId, 10) : existing.categoryId,
        imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error('propiedades/[id] PUT error:', e);
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
  const role = session.user.role;
  if (role !== 'admin' && session.user.id !== existing.creatorId) {
    return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });
  }
  try {
    await prisma.property.delete({ where: { id: propId } });
    // Devolvemos 204 No Content
    return new Response(null, { status: 204 });
  } catch (e) {
    console.error('propiedades/[id] DELETE error:', e);
    return NextResponse.json({ error: 'Error al eliminar propiedad' }, { status: 500 });
  }
}
