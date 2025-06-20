// lib/api.js
import { supabaseClient } from '@/lib/supabaseClient';

export async function fetchPropiedades() {
  const { data, error } = await supabaseClient
    .from('propiedades')
    .select('id, titulo, descripcion, precio, imagen_url');
  if (error) {
    console.error('Error fetchPropiedades:', error);
    throw new Error(error.message);
  }
  return data.map(item => ({
    id: item.id,
    titulo: item.titulo,
    descripcion: item.descripcion,
    precio: item.precio,
    imagenUrl: item.imagen_url,
  }));
}

export async function fetchPropiedadById(id) {
  const { data, error } = await supabaseClient
    .from('propiedades')
    .select('id, titulo, descripcion, precio, ubicacion, imagen_url')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetchPropiedadById:', error);
    throw new Error(error.message);
  }
  return {
    id: data.id,
    titulo: data.titulo,
    descripcion: data.descripcion,
    precio: data.precio,
    ubicacion: data.ubicacion,
    imagenUrl: data.imagen_url,
  };
}
