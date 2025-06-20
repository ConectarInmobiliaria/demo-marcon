// app/api/inquiries/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request) {
  // Crear solicitud de visita (público)
  const body = await request.json();
  const { propertyId, name, email, phone, message } = body;
  if (!propertyId || !name || !email) {
    return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
  }
  try {
    // Si quieres asociar usuario autenticado:
    const session = await getServerSession(authOptions);
    let userId = null;
    if (session) userId = session.user.id;
    const inq = await prisma.inquiry.create({
      data: {
        propertyId: parseInt(propertyId, 10),
        userId,
        name,
        email,
        phone: phone || null,
        message: message || null,
      },
    });
    // Opcional: enviar email notificando al creador o admin
    return NextResponse.json(inq, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al crear solicitud' }, { status: 500 });
  }
}

export async function GET(request) {
  // Sólo admin o corredor ve solicitudes
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const role = session.user.role;
  try {
    if (role === 'corredor') {
      // Obtener propiedades de este corredor
      const props = await prisma.property.findMany({
        where: { creatorId: session.user.id },
        select: { id: true },
      });
      const propIds = props.map((p) => p.id);
      const inqs = await prisma.inquiry.findMany({
        where: { propertyId: { in: propIds } },
        include: { property: true, user: true },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(inqs);
    } else if (role === 'admin') {
      const inqs = await prisma.inquiry.findMany({
        include: { property: true, user: true },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(inqs);
    } else {
      return NextResponse.json({ error: 'Permiso denegado' }, { status: 403 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al listar solicitudes' }, { status: 500 });
  }
}
