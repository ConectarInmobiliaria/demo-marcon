// app/api/categories/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request, { params }) {
  const id = parseInt(params.id, 10);
  try {
    const cat = await prisma.category.findUnique({ where: { id } });
    if (!cat) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
    return NextResponse.json(cat);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });
  const id = parseInt(params.id, 10);
  const body = await request.json();
  const { name } = body;
  if (!name) return NextResponse.json({ error: 'Nombre es requerido' }, { status: 400 });
  try {
    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
    // Verificar no exista otra con mismo nombre
    const conflict = await prisma.category.findFirst({
      where: { name, NOT: { id } }
    });
    if (conflict) {
      return NextResponse.json({ error: 'Otra categoría con ese nombre ya existe' }, { status: 400 });
    }
    const updated = await prisma.category.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al actualizar categoría' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  // 1️⃣ Obtener params.id correctamente
  const { params } = await context;
  const id = parseInt(params.id, 10);

  // 2️⃣ Autorización
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });

  try {
    // 3️⃣ Verificar existencia y dependencias
    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });

    const propCount = await prisma.property.count({ where: { categoryId: id } });
    if (propCount > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar: existen propiedades asociadas' },
        { status: 400 }
      );
    }

    // 4️⃣ Borrar
    await prisma.category.delete({ where: { id } });

    // 5️⃣ Responder 204 sin body
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error('Error al eliminar categoría:', e);
    return NextResponse.json({ error: 'Error al eliminar categoría' }, { status: 500 });
  }
}