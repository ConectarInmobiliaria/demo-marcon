// pages/api/properties/index.js
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  if (req.method === 'GET') {
    // Listar todas las propiedades
    const props = await prisma.property.findMany({
      include: { category: true, creator: true },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(props);
  } else if (req.method === 'POST') {
    // Crear propiedad
    // Solo corredores o admin
    if (!['admin', 'corredor'].includes(session.user.role)) {
      return res.status(403).json({ error: 'Permiso denegado' });
    }
    const { title, description, price, location, categoryId, imageUrl } = req.body;
    if (!title || !description || !price || !location || !categoryId) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
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
      return res.status(201).json(newProp);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Error al crear propiedad' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
}

