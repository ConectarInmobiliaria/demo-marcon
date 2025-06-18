// pages/api/properties/[id].js
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const propId = parseInt(id, 10);
  if (method === 'GET') {
    const prop = await prisma.property.findUnique({
      where: { id: propId },
      include: { category: true, creator: true, inquiries: true },
    });
    if (!prop) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    return res.status(200).json(prop);
  } else if (method === 'PUT') {
    // Actualizar propiedad: solo creador o admin
    const prop = await prisma.property.findUnique({ where: { id: propId } });
    if (!prop) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    if (session.user.role !== 'admin' && session.user.id !== prop.creatorId) {
      return res.status(403).json({ error: 'Permiso denegado' });
    }
    const { title, description, price, location, categoryId, imageUrl } = req.body;
    try {
      const updated = await prisma.property.update({
        where: { id: propId },
        data: {
          title: title ?? prop.title,
          description: description ?? prop.description,
          price: price ? parseFloat(price) : prop.price,
          location: location ?? prop.location,
          categoryId: categoryId ? parseInt(categoryId, 10) : prop.categoryId,
          imageUrl: imageUrl !== undefined ? imageUrl : prop.imageUrl,
        },
      });
      return res.status(200).json(updated);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Error al actualizar propiedad' });
    }
  } else if (method === 'DELETE') {
    // Borrar propiedad: solo admin o creador
    const prop = await prisma.property.findUnique({ where: { id: propId } });
    if (!prop) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    if (session.user.role !== 'admin' && session.user.id !== prop.creatorId) {
      return res.status(403).json({ error: 'Permiso denegado' });
    }
    try {
      await prisma.property.delete({ where: { id: propId } });
      return res.status(204).end();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Error al eliminar propiedad' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Método ${method} no permitido`);
  }
}

