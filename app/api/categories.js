// pages/api/categories.js
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  // Si solo admin o corredor pueden gestionar categorías, verifica role:
  if (session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Permiso denegado' });
  }

  if (req.method === 'GET') {
    const cats = await prisma.category.findMany();
    return res.status(200).json(cats);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Nombre es requerido' });
    }
    try {
      const cat = await prisma.category.create({ data: { name } });
      return res.status(201).json(cat);
    } catch (e) {
      return res.status(500).json({ error: 'Error al crear categoría' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
}

