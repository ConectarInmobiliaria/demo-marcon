// pages/api/inquiries.js
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Cualquier usuario (incluso no autenticado) puede enviar solicitud:
    const { propertyId, name, email, phone, message } = req.body;
    if (!propertyId || !name || !email) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
      // Si está autenticado, asociamos userId
      let userId = null;
      const session = await getSession({ req });
      if (session) {
        userId = session.user.id;
      }
      const inq = await prisma.inquiry.create({
        data: {
          propertyId: parseInt(propertyId, 10),
          userId: userId,
          name,
          email,
          phone: phone || null,
          message: message || null,
        },
      });
      // Opcional: notificar al creador de la propiedad o admin por email (usar nodemailer)
      return res.status(201).json(inq);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Error al crear solicitud' });
    }
  } else if (req.method === 'GET') {
    // Solo admin o corredor ven solicitudes:
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    if (session.user.role !== 'admin' && session.user.role !== 'corredor') {
      return res.status(403).json({ error: 'Permiso denegado' });
    }
    // Si deseas filtrar solo solicitudes de propiedades del corredor:
    // Primero obtener propiedades donde creatorId == session.user.id
    if (session.user.role === 'corredor') {
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
      return res.status(200).json(inqs);
    } else {
      // admin ve todas las solicitudes
      const inqs = await prisma.inquiry.findMany({
        include: { property: true, user: true },
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(inqs);
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
}
